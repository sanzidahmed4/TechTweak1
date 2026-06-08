require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');

async function run() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/techtweak';
    console.log("Connecting to:", uri.replace(/:[^:]*@/, ':***@'));
    await mongoose.connect(uri);
    
    const db = mongoose.connection.db;
    
    const phonesCount = await db.collection('phones').countDocuments();
    const brandsCount = await db.collection('brands').countDocuments();
    const postsCount = await db.collection('posts').countDocuments();
    const categoriesCount = await db.collection('categories').countDocuments();
    
    console.log(JSON.stringify({
      phones: phonesCount,
      brands: brandsCount,
      posts: postsCount,
      categories: categoriesCount,
      total: phonesCount + brandsCount + postsCount + categoriesCount
    }, null, 2));
    
    await mongoose.disconnect();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

run();
