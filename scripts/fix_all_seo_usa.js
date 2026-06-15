const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function fixAllUsSEO() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));

  // Find all phones
  const phones = await Phone.find({});
  let count = 0;

  for (const phone of phones) {
    let updated = false;

    const replaceText = (text) => {
      if (!text || typeof text !== 'string') return text;
      return text
        .replace(/in Bangladesh/gi, 'in the US')
        .replace(/Bangladesh/gi, 'the US')
        .replace(/ BD\b/gi, ' USA')
        .replace(/\bBD\b/gi, 'USA')
        .replace(/Taka/gi, 'Dollars')
        .replace(/BDT/gi, 'USD')
        .replace(/৳/gi, '$');
    };

    const fieldsToUpdate = [
      'seo_overview', 'verdict', 'keywords', 'meta_keywords', 
      'meta_title', 'meta_description', 'display_price', 'price'
    ];

    for (const field of fieldsToUpdate) {
      if (phone[field]) {
        const newText = replaceText(phone[field]);
        if (newText !== phone[field]) {
          phone[field] = newText;
          updated = true;
        }
      }
    }

    if (phone.faqs && Array.isArray(phone.faqs)) {
      phone.faqs = phone.faqs.map(faq => {
        const newQ = replaceText(faq.question);
        const newA = replaceText(faq.answer);
        if (newQ !== faq.question || newA !== faq.answer) updated = true;
        return { question: newQ, answer: newA };
      });
    }

    if (phone.pros && Array.isArray(phone.pros)) {
      phone.pros = phone.pros.map(pro => {
        const newPro = replaceText(pro);
        if (newPro !== pro) updated = true;
        return newPro;
      });
    }

    if (phone.cons && Array.isArray(phone.cons)) {
      phone.cons = phone.cons.map(con => {
        const newCon = replaceText(con);
        if (newCon !== con) updated = true;
        return newCon;
      });
    }

    if (updated) {
      await phone.save();
      count++;
    }
  }

  console.log(`Successfully converted ${count} phones to US-based SEO globally!`);
  await mongoose.disconnect();
}

fixAllUsSEO().catch(console.error);
