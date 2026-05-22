import { loadEnvConfig } from '@next/env';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Load environment variables from .env.local
const projectDir = process.cwd();
loadEnvConfig(projectDir);

const UserSchema = new mongoose.Schema({
  email: String,
  password_hash: String,
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function main() {
  if (!process.env.MONGODB_URI) {
    console.log("No MONGODB_URI found");
    process.exit(1);
  }
  
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  const users = await User.find({});
  console.log(`Found ${users.length} users`);
  
  for (const user of users) {
    console.log(`Email: ${user.email}`);
    
    // Check if password123 matches
    const matches123 = await bcrypt.compare('password123', user.password_hash || '');
    console.log(`Matches 'password123': ${matches123}`);
    
    const matchesAdmin = await bcrypt.compare('admin', user.password_hash || '');
    console.log(`Matches 'admin': ${matchesAdmin}`);
    
    const matchesAdmin123 = await bcrypt.compare('admin123', user.password_hash || '');
    console.log(`Matches 'admin123': ${matchesAdmin123}`);
  }

  process.exit(0);
}

main();
