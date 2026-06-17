require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
.then(async () => {
  const db = mongoose.connection.db;
  const phones = await db.collection('phones').find({ name: /17 Pro/i }).toArray();
  for (const phone of phones) {
    let oldImgs = phone.images;
    let fixedImgs = [];
    for (let i = 0; i < oldImgs.length; i++) {
       if (oldImgs[i].endsWith('f_auto') && i+1 < oldImgs.length) {
          fixedImgs.push(oldImgs[i] + ',' + oldImgs[i+1]);
          i++;
       } else {
          fixedImgs.push(oldImgs[i]);
       }
    }
    await db.collection('phones').updateOne({ _id: phone._id }, { $set: { images: fixedImgs } });
    console.log('Fixed', phone.name);
  }
  process.exit(0);
});
