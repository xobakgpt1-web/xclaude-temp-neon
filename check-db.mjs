import { getEmailsByAddress } from './server/db.ts';

const testEmail = 'brightcat4579@aksesgptmurah.tech';

console.log('Checking database for:', testEmail);

try {
  const emails = await getEmailsByAddress(testEmail);
  console.log('Found', emails.length, 'emails in database');
  
  if (emails.length > 0) {
    console.log('\nFirst email:');
    console.log('Subject:', emails[0].subject);
    console.log('From:', emails[0].fromAddress);
    console.log('To:', emails[0].toAddress);
  }
} catch (error) {
  console.error('❌ Database error:', error.message);
}
