const mongoose = require('mongoose');
require('dotenv').config({path: '.env.local'});

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const Phone = mongoose.model('Phone', new mongoose.Schema({},{strict:false}));
    
    // Find all phones marked as upcoming/rumored globally
    const upcomingPhones = await Phone.find({
        $or: [
            { launch_status: { $regex: /Upcoming|Rumored|Coming soon|Expected/i } },
            { launch_date: { $regex: /Upcoming|Rumored|Coming soon|Expected/i } }
        ]
    }).select('name brand_id launch_status');
    
    console.log(`\nTotal Upcoming Phones in Database: ${upcomingPhones.length}`);
    if (upcomingPhones.length > 0) {
        console.log("List of upcoming phones:");
        upcomingPhones.forEach(p => console.log(`- ${p.name} (Status: ${p.launch_status})`));
    }
    
    mongoose.disconnect();
});
