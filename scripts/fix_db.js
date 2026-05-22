const mongoose = require('mongoose');

mongoose.connect('mongodb://sanzid_admin:sanzid4%40@ac-olfahzz-shard-00-00.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-01.fhnlrss.mongodb.net:27017,ac-olfahzz-shard-00-02.fhnlrss.mongodb.net:27017/techtweak?ssl=true&authSource=admin&replicaSet=atlas-109zzp-shard-0&appName=TechTweak')
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
