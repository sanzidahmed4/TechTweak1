const mongoose = require('mongoose');
require('dotenv').config({path: '.env.local'});

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const Phone = mongoose.model('Phone', new mongoose.Schema({},{strict:false}));
    
    // Pick one flagship and one budget phone to verify logic
    const flagship = await Phone.findOne({ slug: /xiaomi-14/ });
    const budget = await Phone.findOne({ slug: /redmi-13c/ });
    
    console.log("=== FLAGSHIP SEO TEST (Xiaomi 14 series) ===");
    if(flagship) {
        console.log("Meta Title:", flagship.meta_title);
        console.log("Keywords:", flagship.keywords);
    } else { console.log("Flagship not found"); }
    
    console.log("\n=== BUDGET SEO TEST (Redmi 13C) ===");
    if(budget) {
        console.log("Meta Title:", budget.meta_title);
        console.log("Keywords:", budget.keywords);
    } else { console.log("Budget phone not found"); }
    
    mongoose.disconnect();
});
