const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function fixUsSEO() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));

  const phones = await Phone.find({ slug: /iphone/i });
  let count = 0;

  for (const phone of phones) {
    let updated = false;

    const replaceText = (text) => {
      if (!text) return text;
      return text
        .replace(/in Bangladesh/gi, 'in the US')
        .replace(/Bangladesh/gi, 'the US')
        .replace(/ BD\b/gi, ' USA')
        .replace(/\bBD\b/gi, 'USA')
        .replace(/Taka/gi, 'Dollars')
        .replace(/BDT/gi, 'USD');
    };

    if (phone.seo_overview) {
      phone.seo_overview = replaceText(phone.seo_overview);
      updated = true;
    }
    if (phone.verdict) {
      phone.verdict = replaceText(phone.verdict);
      updated = true;
    }
    if (phone.keywords) {
      phone.keywords = replaceText(phone.keywords);
      updated = true;
    }
    if (phone.meta_keywords) {
      phone.meta_keywords = replaceText(phone.meta_keywords);
      updated = true;
    }
    if (phone.meta_title) {
      phone.meta_title = replaceText(phone.meta_title);
      updated = true;
    }
    if (phone.meta_description) {
      phone.meta_description = replaceText(phone.meta_description);
      updated = true;
    }

    if (phone.faqs && Array.isArray(phone.faqs)) {
      phone.faqs = phone.faqs.map(faq => ({
        question: replaceText(faq.question),
        answer: replaceText(faq.answer)
      }));
      updated = true;
    }

    if (updated) {
      await phone.save();
      count++;
    }
  }

  console.log(`Successfully converted ${count} iPhones to US-based SEO!`);
  await mongoose.disconnect();
}

fixUsSEO().catch(console.error);
