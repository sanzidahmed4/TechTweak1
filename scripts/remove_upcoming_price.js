const mongoose = require('mongoose');
require('dotenv').config({path: '.env.local'});

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const Phone = mongoose.model('Phone', new mongoose.Schema({},{strict:false}));
    
    // Find all upcoming or rumored phones
    const result = await Phone.updateMany(
        { 
            $or: [
                { phone_status: { $in: ['upcoming', 'rumored'] } },
                { launch_status: { $regex: /rumored/i } }
            ]
        },
        { 
            $unset: { 
                price: "", 
                price_usd: "", 
                price_bdt: "", 
                price_display_text: "" 
            } 
        }
    );
    
    console.log(`Successfully removed price fields from ${result.modifiedCount} upcoming/rumored phones.`);
    
    mongoose.disconnect();
});
