import { google } from 'googleapis';

function getGmailClient() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    'urn:ietf:wg:oauth:2.0:oob'
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  });

  return google.gmail({ version: 'v1', auth: oauth2Client });
}

export interface GmailMessage {
  id: string;
  threadId: string;
  subject: string;
  from: string;
  to: string;
  date: Date;
  textContent: string;
  htmlContent: string;
}

/**
 * Fetch emails from Gmail inbox for a specific recipient address
 */
export async function fetchGmailMessages(emailAddress: string): Promise<GmailMessage[]> {
  const gmail = getGmailClient();
  try {
    // Search for messages sent to the specified email address
    const response = await gmail.users.messages.list({
      userId: 'me',
      q: `to:${emailAddress}`,
      maxResults: 50,
    });

    const messages = response.data.messages || [];
    const detailedMessages: GmailMessage[] = [];

    for (const message of messages) {
      if (!message.id) continue;

      const details = await gmail.users.messages.get({
        userId: 'me',
        id: message.id,
        format: 'full',
      });

      const headers = details.data.payload?.headers || [];
      const subject = headers.find((h: any) => h.name === 'Subject')?.value || '(No Subject)';
      const from = headers.find((h: any) => h.name === 'From')?.value || '';
      const to = headers.find((h: any) => h.name === 'To')?.value || '';
      const dateStr = headers.find((h: any) => h.name === 'Date')?.value || '';
      const date = dateStr ? new Date(dateStr) : new Date();

      let textContent = '';
      let htmlContent = '';

      // Extract email body
      const parts = details.data.payload?.parts || [];
      if (parts.length > 0) {
        for (const part of parts) {
          if (part.mimeType === 'text/plain' && part.body?.data) {
            textContent = Buffer.from(part.body.data, 'base64').toString('utf-8');
          } else if (part.mimeType === 'text/html' && part.body?.data) {
            htmlContent = Buffer.from(part.body.data, 'base64').toString('utf-8');
          }
        }
      } else if (details.data.payload?.body?.data) {
        // Single part message
        const bodyData = details.data.payload.body.data;
        const mimeType = details.data.payload.mimeType;
        const content = Buffer.from(bodyData, 'base64').toString('utf-8');
        
        if (mimeType === 'text/html') {
          htmlContent = content;
        } else {
          textContent = content;
        }
      }

      detailedMessages.push({
        id: message.id,
        threadId: details.data.threadId || '',
        subject,
        from,
        to,
        date,
        textContent,
        htmlContent,
      });
    }

    return detailedMessages;
  } catch (error) {
    console.error('Error fetching Gmail messages:', error);
    throw new Error('Failed to fetch emails from Gmail');
  }
}

/**
 * Sync Gmail messages to database
 */
export async function syncGmailToDatabase(emailAddress: string) {
  const { insertEmail, getEmailsByAddress } = await import('./db');
  
  try {
    const gmailMessages = await fetchGmailMessages(emailAddress);
    const existingEmails = await getEmailsByAddress(emailAddress);
    
    // Create a set of existing message IDs to avoid duplicates
    const existingIds = new Set(existingEmails.map(e => e.id));
    
    for (const message of gmailMessages) {
      // Check if message already exists (you might want to add a gmailMessageId field to schema)
      await insertEmail({
        emailAddress,
        subject: message.subject,
        fromAddress: message.from,
        toAddress: message.to,
        textContent: message.textContent,
        htmlContent: message.htmlContent,
        receivedAt: message.date,
      });
    }
    
    return { success: true, count: gmailMessages.length };
  } catch (error) {
    console.error('Error syncing Gmail to database:', error);
    throw error;
  }
}
