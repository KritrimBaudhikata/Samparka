import { extractTags, createSlackMessage } from '@samparka/shared';

export interface NotificationData {
  useCase: string;
  data: any;
  tags: string[];
  leadId: string;
}

export class NotificationService {
  private slackWebhookUrl: string;

  constructor() {
    this.slackWebhookUrl = process.env.SLACK_WEBHOOK_URL || '';
  }

  async sendSlackNotification(notificationData: NotificationData): Promise<boolean> {
    if (!this.slackWebhookUrl) {
      console.log('No Slack webhook URL configured, skipping notification');
      return false;
    }

    try {
      const message = createSlackMessage(
        notificationData.useCase,
        notificationData.data,
        notificationData.tags
      );

      const payload = {
        text: message,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: message
            }
          },
          {
            type: 'actions',
            elements: [
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: 'View in Inbox'
                },
                url: `${process.env.NEXT_PUBLIC_APP_URL}/inbox`,
                style: 'primary'
              }
            ]
          }
        ]
      };

      const response = await fetch(this.slackWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Slack API error: ${response.status}`);
      }

      console.log('Slack notification sent successfully');
      return true;
    } catch (error) {
      console.error('Failed to send Slack notification:', error);
      return false;
    }
  }

  async sendEmailNotification(notificationData: NotificationData): Promise<boolean> {
    // For MVP, we'll skip email notifications and focus on Slack
    // In production, you'd integrate with SendGrid, AWS SES, etc.
    console.log('Email notifications not implemented in MVP');
    return false;
  }
}
