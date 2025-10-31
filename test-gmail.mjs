import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  'urn:ietf:wg:oauth:2.0:oob'
);

oauth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

async function testGmail() {
  try {
    console.log('Testing Gmail API connection...');
    console.log('Client ID:', process.env.GMAIL_CLIENT_ID ? 'SET' : 'NOT SET');
    console.log('Client Secret:', process.env.GMAIL_CLIENT_SECRET ? 'SET' : 'NOT SET');
    console.log('Refresh Token:', process.env.GMAIL_REFRESH_TOKEN ? 'SET' : 'NOT SET');
    
    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 5,
    });
    
    console.log('\n✅ Gmail API connection successful!');
    console.log('Found', response.data.messages?.length || 0, 'messages');
    
    if (response.data.messages && response.data.messages.length > 0) {
      const firstMessage = response.data.messages[0];
      const details = await gmail.users.messages.get({
        userId: 'me',
        id: firstMessage.id,
        format: 'full',
      });
      
      const headers = details.data.payload?.headers || [];
      const subject = headers.find(h => h.name === 'Subject')?.value || '(No Subject)';
      const from = headers.find(h => h.name === 'From')?.value || '';
      const to = headers.find(h => h.name === 'To')?.value || '';
      
      console.log('\nFirst email:');
      console.log('Subject:', subject);
      console.log('From:', from);
      console.log('To:', to);
    }
  } catch (error) {
    console.error('\n❌ Gmail API error:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

testGmail();
