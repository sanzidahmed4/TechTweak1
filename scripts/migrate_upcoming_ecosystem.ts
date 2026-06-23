import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const phoneSchema = new mongoose.Schema({}, { strict: false });
const Phone = mongoose.models.Phone || mongoose.model('Phone', phoneSchema);

async function migrateUpcomingEcosystem() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined');
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  // Migrate legacy upcoming: true to phone_status: 'upcoming'
  const legacyPhones = await Phone.find({ upcoming: true });
  console.log(`Found ${legacyPhones.length} phones with legacy upcoming: true`);

  for (const phone of legacyPhones) {
    phone.phone_status = 'upcoming';
    // If not already set, we could clear it, but let's just make sure status is set
    await phone.save();
    console.log(`Migrated status for ${phone.name}`);
  }

  // Update iQOO 14 specifically
  const iqoo14 = await Phone.findOne({ name: 'iQOO 14' });
  if (iqoo14) {
    iqoo14.phone_status = 'upcoming';
    iqoo14.price_usd = null;
    iqoo14.price_display_text = "Expected Price: TBA";
    iqoo14.price_status = 'unannounced';
    iqoo14.leak_confidence = 'moderate';
    iqoo14.upcoming = true; // maintain legacy until fully deprecated just in case
    await iqoo14.save();
    console.log('Updated iQOO 14 to new ecosystem schema');
  } else {
    console.log('iQOO 14 not found');
  }

  // Update iQOO Neo 11 specifically
  const neo11 = await Phone.findOne({ name: 'iQOO Neo 11' });
  if (neo11) {
    neo11.phone_status = 'upcoming';
    neo11.price_usd = null;
    neo11.price_display_text = "Expected Price: TBA";
    neo11.price_status = 'unannounced';
    neo11.leak_confidence = 'moderate';
    neo11.upcoming = true;
    await neo11.save();
    console.log('Updated iQOO Neo 11 to new ecosystem schema');
  } else {
    console.log('iQOO Neo 11 not found');
  }
  
  // Set default phone_status for others if missing
  const result = await Phone.updateMany(
    { phone_status: { $exists: false } },
    { $set: { phone_status: 'released', price_status: 'official' } }
  );
  console.log(`Set default phone_status for ${result.modifiedCount} phones`);

  await mongoose.disconnect();
  console.log('Done');
}

migrateUpcomingEcosystem().catch(console.error);
