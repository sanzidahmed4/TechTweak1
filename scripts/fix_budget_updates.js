const mongoose = require('mongoose');
require('dotenv').config({path: '.env.local'});
mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const Phone = mongoose.model('Phone', new mongoose.Schema({},{strict:false}));
    const phones = await Phone.find({slug: /^samsung-/i});
    let count = 0;
    for(const p of phones) {
        const s = p.slug;
        if (s.includes('-a0') || s.includes('-a1') || s.includes('-a2') || 
            s.includes('-m0') || s.includes('-m1') || s.includes('-m2') || 
            s.includes('-f0') || s.includes('-f1') || s.includes('-f2') || 
            s.includes('-core') || s.includes('prime')) {
            if (p.update_policy === '4 Years OS Updates') {
                await Phone.updateOne({_id: p._id}, {$set: {update_policy: '2 Years OS Updates'}});
                count++;
            }
        }
    }
    console.log('Fixed OS update policy for ' + count + ' budget phones.');
    mongoose.disconnect();
});
