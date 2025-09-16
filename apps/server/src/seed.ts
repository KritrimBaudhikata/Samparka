import { prisma } from './db';

async function seed() {
  console.log('🌱 Seeding database...');

  // Create sample leads for demo
  const sampleLeads = [
    {
      useCase: 'SALES',
      payload: JSON.stringify({
        name: 'John Smith',
        email: 'john@techcorp.com',
        company: 'TechCorp Inc',
        teamSize: '21-50',
        problemStatement: 'We need a better way to manage our customer data and automate our sales process',
        budgetBand: '$25k-$100k',
        urgency: 'ASAP'
      }),
      tags: JSON.stringify(['priority', 'urgent']),
      status: 'NEW',
      source: 'demo'
    },
    {
      useCase: 'APPT',
      payload: JSON.stringify({
        name: 'Sarah Johnson',
        email: 'sarah@designstudio.com',
        serviceType: 'Brand Consultation',
        preferredDate: '2024-01-15',
        preferredTime: '2:00 PM',
        timezone: 'EST',
        location: 'online',
        notes: 'Looking for a complete brand overhaul'
      }),
      tags: JSON.stringify([]),
      status: 'SEEN',
      source: 'demo'
    },
    {
      useCase: 'SUPPORT',
      payload: JSON.stringify({
        email: 'support@usercompany.com',
        productArea: 'Dashboard',
        severity: 'blocker',
        description: 'The dashboard is completely broken and showing error messages. Users cannot access any data.',
        environment: {
          os: 'Windows 10',
          browser: 'Chrome 120'
        }
      }),
      tags: JSON.stringify(['blocker']),
      status: 'NEW',
      source: 'demo'
    }
  ];

  for (const leadData of sampleLeads) {
    const lead = await prisma.lead.create({
      data: leadData
    });

    // Create conversation for each lead
    await prisma.conversation.create({
      data: {
        leadId: lead.id,
        turns: JSON.stringify([
          {
            role: 'user',
            content: 'Hello, I need help with something',
            timestamp: new Date()
          },
          {
            role: 'assistant',
            content: 'I\'d be happy to help! Let me gather some information from you.',
            timestamp: new Date()
          }
        ]),
        modelSummary: `Sample ${leadData.useCase} conversation for demo purposes`
      }
    });
  }

  console.log('✅ Database seeded successfully!');
  console.log(`📊 Created ${sampleLeads.length} sample leads`);
}

seed()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
