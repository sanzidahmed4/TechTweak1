const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env.local') });

async function testMongoose() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  // Create a new schema
  const TestModel = mongoose.model('TestStrict', new mongoose.Schema({}, { strict: false }));
  
  // Insert a full document directly via MongoDB driver so Mongoose doesn't know about it
  await mongoose.connection.collection('teststricts').insertOne({
    name: 'Test Phone',
    hidden_field_1: 'Should remain',
    hidden_field_2: 'Should also remain'
  });
  
  // Now load it via the empty schema
  const doc = await TestModel.findOne({ name: 'Test Phone' });
  console.log("Before save:", doc.toObject());
  
  // Modify one field
  doc.set('new_field', 'Added');
  await doc.save();
  
  // Fetch again
  const docAfter = await TestModel.findOne({ name: 'Test Phone' });
  console.log("After save:", docAfter.toObject());
  
  // Cleanup
  await mongoose.connection.collection('teststricts').drop();
  mongoose.disconnect();
}
testMongoose();
