import { Router } from 'express';
import { prisma } from '../db';
import { extractTags } from '@samparka/shared';
import { NotificationService } from '../notifications';
import { z } from 'zod';

const router = Router();
const notificationService = new NotificationService();

const CreateLeadSchema = z.object({
  useCase: z.enum(['SALES', 'APPT', 'SUPPORT']),
  data: z.record(z.any()),
  source: z.string().default('demo'),
});

// Create a new lead
router.post('/', async (req, res) => {
  try {
    const { useCase, data, source } = CreateLeadSchema.parse(req.body);

    // Extract tags based on use case and data
    const tags = extractTags(useCase, data);

    // Create lead in database
    const lead = await prisma.lead.create({
      data: {
        useCase,
        payload: JSON.stringify(data),
        tags: JSON.stringify(tags),
        source,
      },
    });

    // Create conversation record
    await prisma.conversation.create({
      data: {
        leadId: lead.id,
        turns: JSON.stringify([]), // We'll store conversation history here
        modelSummary: `New ${useCase} lead from ${source}`,
      },
    });

    // Send notification
    await notificationService.sendSlackNotification({
      useCase,
      data,
      tags,
      leadId: lead.id,
    });

    res.json({
      success: true,
      data: {
        leadId: lead.id,
        message: 'Lead created successfully'
      }
    });

  } catch (error) {
    console.error('Create lead error:', error);
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get all leads with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const useCase = req.query.useCase as string;
    const status = req.query.status as string;
    const search = req.query.search as string;

    const where: any = {};
    
    if (useCase) {
      where.useCase = useCase;
    }
    
    if (status) {
      where.status = status;
    }
    
    if (search) {
      where.payload = {
        contains: search
      };
    }

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          conversations: {
            select: {
              modelSummary: true,
              createdAt: true,
            }
          }
        }
      }),
      prisma.lead.count({ where })
    ]);

    // Parse payload and tags JSON for each lead
    const leadsWithParsedData = leads.map(lead => ({
      ...lead,
      payload: JSON.parse(lead.payload),
      tags: JSON.parse(lead.tags),
    }));

    res.json({
      success: true,
      data: {
        leads: leadsWithParsedData,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Get leads error:', error);
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get a specific lead
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await prisma.lead.findUnique({
      where: { id },
      include: {
        conversations: true
      }
    });

    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found'
      });
    }

    res.json({
      success: true,
      data: {
        ...lead,
        payload: JSON.parse(lead.payload),
        tags: JSON.parse(lead.tags),
        conversations: lead.conversations.map(conv => ({
          ...conv,
          turns: JSON.parse(conv.turns)
        }))
      }
    });

  } catch (error) {
    console.error('Get lead error:', error);
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Update lead status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['NEW', 'SEEN', 'REPLIED'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status'
      });
    }

    const lead = await prisma.lead.update({
      where: { id },
      data: { status }
    });

    res.json({
      success: true,
      data: lead
    });

  } catch (error) {
    console.error('Update lead error:', error);
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Export leads as CSV
router.get('/export/csv', async (req, res) => {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' }
    });

    const csvHeader = 'ID,Use Case,Name,Email,Company,Status,Tags,Created At,Source\n';
    const csvRows = leads.map(lead => {
      const payload = JSON.parse(lead.payload);
      const tags = JSON.parse(lead.tags);
      const name = payload.name || '';
      const email = payload.email || '';
      const company = payload.company || '';
      
      return [
        lead.id,
        lead.useCase,
        `"${name}"`,
        `"${email}"`,
        `"${company}"`,
        lead.status,
        `"${tags.join(', ')}"`,
        lead.createdAt.toISOString(),
        lead.source
      ].join(',');
    }).join('\n');

    const csv = csvHeader + csvRows;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=leads.csv');
    res.send(csv);

  } catch (error) {
    console.error('Export error:', error);
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
