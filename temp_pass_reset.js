const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });
async function reset() {
  await mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection.db;
  const hash = await bcrypt.hash('admin123', 10);
  await db.collection('users').updateOne(
    { email: 'admin@techtweak.com' },
    { $set: { password_hash: hash } }
  );
  console.log('Password reset to admin123');
  mongoose.connection.close();
}
reset().catch(console.error);
