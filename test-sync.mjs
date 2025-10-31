import { syncGmailToDatabase } from './server/gmail.ts';

const testEmail = 'brightcat4579@aksesgptmurah.tech';

console.log('Testing email sync for:', testEmail);

try {
  const result = await syncGmailToDatabase(testEmail);
  console.log('✅ Sync successful:', result);
} catch (error) {
  console.error('❌ Sync failed:', error.message);
  console.error(error);
}
