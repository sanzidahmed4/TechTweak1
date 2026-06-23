const mongoose = require('mongoose');
require('dotenv').config({path: '.env.local'});

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const Phone = mongoose.model('Phone', new mongoose.Schema({},{strict:false}));
    const Brand = mongoose.model('Brand', new mongoose.Schema({},{strict:false}));
    
    const pocoBrand = await Brand.findOne({ slug: 'poco' });
    if (!pocoBrand) {
        console.log("POCO brand not found");
        return mongoose.disconnect();
    }
    
    // Find POCO phones that might be marked as upcoming
    const upcomingPoco = await Phone.find({
        brand_id: pocoBrand._id,
        $or: [
            { launch_status: { $regex: /Upcoming|Rumored|Coming soon|Expected/i } },
            { launch_date: { $regex: /2024|2025|2026/i } },
            { release_date: { $regex: /2024|2025|2026/i } }
        ]
    }).select('name slug launch_status launch_date release_date');
    
    console.log(`Found ${upcomingPoco.length} POCO phones with upcoming/recent statuses:`);
    upcomingPoco.forEach(p => console.log(`- ${p.name} (Slug: ${p.slug}, Status: ${p.launch_status || p.launch_date})`));

    // Fix them to be released
    let updated = 0;
    for (const phone of upcomingPoco) {
        // Example: "Rumored" or "2025-05-10" -> "Available. Released 2024/2025"
        // Let's just set them to Available. Released.
        // We will extract the year if possible, or just default to the name's year if present, or generic "Available".
        
        let releaseYear = "2024"; // Default for recent POCOs if not specified
        const yearMatch = phone.name.match(/202[0-6]/);
        if (yearMatch) releaseYear = yearMatch[0];
        else if (phone.launch_date && phone.launch_date.match(/202[0-6]/)) {
            releaseYear = phone.launch_date.match(/202[0-6]/)[0];
        }

        const newStatus = `Available. Released ${releaseYear}`;
        
        const res = await Phone.updateOne(
            { _id: phone._id },
            { $set: { 
                launch_status: newStatus, 
                launch_date: newStatus.replace("Available. ", ""),
                release_date: newStatus.replace("Available. ", "")
            }}
        );
        if (res.modifiedCount > 0) updated++;
    }
    
    console.log(`\nSuccessfully updated release status for ${updated} POCO phones.`);
    mongoose.disconnect();
});
