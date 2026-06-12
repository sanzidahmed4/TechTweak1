const mongoose = require('mongoose');
require('dotenv').config({path: '.env.local'});
mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const Phone = mongoose.model('Phone', new mongoose.Schema({},{strict:false}));
    const Brand = mongoose.model('Brand', new mongoose.Schema({},{strict:false}));
    const counts = await Phone.aggregate([{$group: {_id: '$brand_id', count: {$sum: 1}}}]);
    for (let c of counts) {
        const b = await Brand.findById(c._id);
        console.log(b ? b.name : c._id, c.count);
    }
    mongoose.disconnect();
});
