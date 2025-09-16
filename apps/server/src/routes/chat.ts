import { Router } from 'express';
import { LLMService, getIsLLMAvailable, LLM_PROVIDER } from '../llm';
import { MockLLMService } from '../llm-mock';
import { UseCase } from '@samparka/playbooks';
import { z } from 'zod';

const router = Router();

// Store active conversations in memory (in production, use Redis or database)
const activeConversations = new Map<string, LLMService | MockLLMService>();


const ChatRequestSchema = z.object({
  sessionId: z.string(),
  useCase: z.enum(['SALES', 'APPT', 'SUPPORT']),
  message: z.string().min(1),
});

const ConfirmRequestSchema = z.object({
  sessionId: z.string(),
  data: z.record(z.any()),
});

// Start or continue a chat conversation
router.post('/chat', async (req, res) => {
  try {
    const { sessionId, useCase, message } = ChatRequestSchema.parse(req.body);

    // Get or create conversation
    let conversation = activeConversations.get(sessionId);
    if (!conversation) {
      if (getIsLLMAvailable()) {
        console.log(`Using ${LLM_PROVIDER.toUpperCase()} LLM Service`);
        conversation = new LLMService(useCase as UseCase);
      } else {
        console.log('Using Mock LLM Service (No LLM provider available)');
        conversation = new MockLLMService(useCase as UseCase);
      }
      activeConversations.set(sessionId, conversation);
    }

    const response = await conversation.processMessage(message);

    res.json({
      success: true,
      data: response
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Confirm and submit the form data
router.post('/confirm', async (req, res) => {
  try {
    const { sessionId, data } = ConfirmRequestSchema.parse(req.body);

    const conversation = activeConversations.get(sessionId);
    if (!conversation) {
      return res.status(404).json({
        success: false,
        error: 'Conversation not found'
      });
    }

    const isValid = await conversation.confirmSubmission(data);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        error: 'Invalid form data'
      });
    }

    // Clean up conversation
    activeConversations.delete(sessionId);

    res.json({
      success: true,
      message: 'Form data confirmed and ready for submission'
    });

  } catch (error) {
    console.error('Confirm error:', error);
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get conversation history
router.get('/history/:sessionId', (req, res) => {
  try {
    const { sessionId } = req.params;
    const conversation = activeConversations.get(sessionId);

    if (!conversation) {
      return res.status(404).json({
        success: false,
        error: 'Conversation not found'
      });
    }

    res.json({
      success: true,
      data: {
        history: conversation.getConversationHistory(),
        summary: conversation.generateSummary()
      }
    });

  } catch (error) {
    console.error('History error:', error);
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
