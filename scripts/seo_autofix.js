const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

function clean(str) { return str ? str.replace(/"/g, '').replace(/,/g, '') : 'Unknown'; }
function getWordCount(str) { return (str || '').split(/\s+/).filter(w => w).length; }

const overviews = [
  (p) => `The **${p.name}** has arrived as a highly anticipated smartphone in the competitive USA mobile market, offering an impressive blend of modern design and robust hardware. At the heart of this device lies the highly capable **${p.processor}**, a chipset designed to handle intensive multitasking, high-end mobile gaming, and daily productivity with exceptional efficiency. For those who prioritize media consumption, the ${p.name} features a stunning **${p.screen_size} display**, ensuring that every video, image, and game is presented with vivid colors, deep contrasts, and smooth refresh rates. 

When it comes to photography, this smartphone does not disappoint. The rear camera module is spearheaded by a **${p.camera_main}** setup, which captures remarkable detail even in challenging lighting conditions. Whether you are an amateur photographer snapping daily moments or an enthusiast looking for sharp portraits, the camera software leverages advanced computational photography to deliver consistently excellent results. On the front, it provides crisp and clear selfies perfect for social media and high-definition video calls.

Battery life is another critical factor where the ${p.name} shines. Equipped with a substantial **${p.battery_capacity} battery**, it is engineered to easily last through a full day of heavy usage without needing a midday top-up. Coupled with its fast charging capabilities, you spend less time tethered to a wall outlet and more time enjoying your device. With its sleek build, reliable connectivity options including 5G support, and an intuitive user interface, the ${p.name} stands out as a top-tier choice for consumers looking for reliability and performance in their next smartphone upgrade.`,

  (p) => `For smartphone enthusiasts in the USA searching for a perfect balance between price and premium features, the **${p.name}** emerges as a fantastic option. This sleek and modern device is powered by the dependable **${p.processor}**, delivering snappy responsiveness whether you are browsing heavy websites, streaming high-definition media, or playing graphically demanding games. The visual experience is anchored by a gorgeous **${p.screen_size} screen**, which provides immersive viewing angles, excellent peak brightness for outdoor visibility, and a buttery-smooth scrolling experience that feels incredibly premium.

In the photography department, the ${p.name} is fully equipped to help you capture your best memories. Its primary **${p.camera_main}** lens is tuned to produce vibrant, color-accurate photos with excellent dynamic range. Night photography is significantly improved over previous generations, allowing users to take bright and noise-free images after dark. The camera app is packed with versatile modes, including portrait, ultra-wide (if applicable), and professional video recording features that content creators will absolutely love.

Endurance is a major highlight of this device. Thanks to its massive **${p.battery_capacity} power cell**, battery anxiety is a thing of the past. The phone's intelligent power management software works in tandem with the efficient chipset to maximize screen-on time, easily surviving a full day of intensive use. Additionally, the ${p.name} offers a premium build quality that feels great in the hand, solid networking capabilities, and a polished software experience, making it a highly recommended daily driver for a wide range of users.`,

  (p) => `The **${p.name}** represents a significant leap forward in smartphone technology, specifically tailored for consumers in the USA who demand top-tier performance and reliability. Driving this powerhouse is the cutting-edge **${p.processor}**, ensuring that applications launch instantaneously and background processes run without a hitch. This processing power is beautifully complemented by an expansive **${p.screen_size} display** that brings entertainment to life. With deep blacks, striking color accuracy, and fluid animations, it provides an unparalleled viewing experience for movies, gaming, and everyday reading.

Smartphone photography continues to evolve, and the ${p.name} is at the forefront with its highly advanced **${p.camera_main}** imaging system. The primary sensor excels at capturing natural skin tones, intricate textures, and breathtaking landscapes. Advanced optical and electronic stabilization ensure that your videos remain cinematic and shake-free, while the dedicated night mode pulls in an impressive amount of light for spectacular low-light shots. It's a versatile camera setup that empowers users to unleash their creativity anytime, anywhere.

Powering all these high-end features is a robust **${p.battery_capacity} battery** that guarantees exceptional longevity. Even under the strain of heavy gaming sessions, GPS navigation, and continuous 5G usage, the battery holds up remarkably well. When it is finally time to recharge, the included fast-charging technology replenishes the battery at lightning speed. Wrapped in a sophisticated and durable chassis, the ${p.name} is a comprehensive package that delivers on every front, setting a new benchmark for what users should expect from a modern smartphone.`
];

const verdicts = [
  (p) => `The ${p.name} is an exceptional smartphone that successfully merges top-tier performance with an elegant design. With its powerful ${clean(p.processor).split(' ')[0]} processor and gorgeous ${p.screen_size} display, it handles everything from mobile gaming to media consumption flawlessly. The reliable ${p.camera_main} camera system ensures you never miss a perfect shot, while the massive ${p.battery_capacity} battery provides peace of mind throughout the day. For USA buyers seeking a premium, future-proof device that offers tremendous value and reliability without major compromises, the ${p.name} earns our highest recommendation as a daily driver.`,
  
  (p) => `If you are looking for a device that checks all the essential boxes, the ${p.name} is a fantastic choice. It delivers a snappy user experience courtesy of the ${clean(p.processor).split(' ')[0]} chipset, and its vibrant ${p.screen_size} screen is a joy to use. While it may face stiff competition, its versatile ${p.camera_main} camera setup and enduring ${p.battery_capacity} battery give it a distinct edge. USA consumers looking for a well-rounded smartphone that perfectly balances price, battery life, and overall performance will find the ${p.name} to be an incredibly smart and satisfying purchase.`,
  
  (p) => `The ${p.name} stands out as a highly capable and refined smartphone tailored for the modern user. Its seamless combination of a responsive ${p.screen_size} display and the efficient ${clean(p.processor).split(' ')[0]} processor guarantees a lag-free experience. The impressive ${p.battery_capacity} battery ensures you stay connected from morning until night, and the sharp ${p.camera_main} camera captures memories beautifully. For shoppers in the USA wanting a dependable, stylish, and high-performing smartphone that won't let them down, the ${p.name} is undeniably one of the most compelling options currently available on the market.`
];

function generatePros(p) {
  const pros = [
    `Powerful ${clean(p.processor).split(' ')[0]} processor ensures smooth and lag-free performance.`,
    `Large and vibrant ${p.screen_size} display provides an excellent media viewing experience.`,
    `Long-lasting ${p.battery_capacity} battery easily survives a full day of heavy usage.`,
    `High-quality ${clean(p.camera_main).split(',')[0]} primary camera captures stunning, detailed photos.`
  ];
  return pros;
}

function generateCons(p) {
  const cons = [];
  if (p.has_audio_jack === false) cons.push('Lacks a dedicated 3.5mm headphone jack.');
  if (p.charging_wireless === 'Not Supported') cons.push('Does not support wireless charging technology.');
  if (p.water_resistance && p.water_resistance.toLowerCase().includes('not')) cons.push('Lacks an official IP rating for water and dust resistance.');
  
  // Fill if empty
  if (cons.length < 2) cons.push('The physical dimensions and weight may feel slightly bulky to some users.');
  if (cons.length < 2) cons.push('Pre-installed bloatware applications may require manual removal.');
  if (cons.length < 2) cons.push('The camera housing protrudes significantly from the back panel.');
  
  return cons.slice(0, 3);
}

function generateFaqs(p) {
  return [
    { question: `What processor is used in the ${p.name}?`, answer: `The ${p.name} is powered by the highly capable ${p.processor}, ensuring snappy performance for daily tasks and gaming.` },
    { question: `How large is the battery on the ${p.name}?`, answer: `This smartphone is equipped with a substantial ${p.battery_capacity} battery, designed to easily provide all-day battery life under normal usage.` },
    { question: `Does the ${p.name} feature a good camera?`, answer: `Yes, it features a versatile rear camera setup highlighted by a ${p.camera_main} primary sensor, capable of capturing high-quality photos and videos.` },
    { question: `What is the screen size of the ${p.name}?`, answer: `The device boasts a beautiful ${p.screen_size} display, offering immersive visuals, vibrant colors, and excellent viewing angles.` },
    { question: `Is the ${p.name} a good phone for USA buyers?`, answer: `Absolutely. With its strong connectivity features, excellent battery life, and robust processing power, the ${p.name} is highly recommended for users in the USA.` }
  ];
}

function generateMeta(p) {
  const title = `${p.name} Price in USA & Full Specs | Buy or Skip?`;
  
  // Create a 140-160 char description
  let desc = `Discover the ${p.name} featuring a ${clean(p.processor).split(' ')[0]} processor and a ${p.battery_capacity} battery. Read our full USA review, specs, pros, and cons here.`;
  
  if (desc.length > 160) desc = desc.substring(0, 157) + '...';
  if (desc.length < 140) desc = desc.padEnd(145, '.').replace(/\.+$/, ' review and detailed specs.');
  if (desc.length > 160) desc = desc.substring(0, 157) + '...';

  return { title, desc };
}

async function fixSeo() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));
  
  // We only fix phones that are published.
  const phones = await Phone.find({ is_published: true });
  console.log(`Found ${phones.length} total phones. Processing...`);

  let updatedCount = 0;

  for (let i = 0; i < phones.length; i++) {
    const p = phones[i];
    
    // Check if it's already perfect (Vivo phones mostly)
    const allText = [p.seo_overview || '', p.verdict || '', p.meta_title || '', p.meta_description || ''].join(' ');
    const ov = getWordCount(p.seo_overview);
    const vl = getWordCount(p.verdict);
    const ml = (p.meta_description || '').length;
    const isBd = /bangladesh|BD\b|BDT/i.test(allText);

    if (!isBd && ov >= 150 && vl >= 80 && ml >= 140 && ml <= 160 && Array.isArray(p.pros) && p.pros.length >= 3 && Array.isArray(p.faqs) && p.faqs.length === 5) {
      continue; // Skip perfect phones
    }

    const tIndex = i % 3;
    const newOverview = overviews[tIndex]({
      name: p.name,
      processor: clean(p.processor),
      screen_size: clean(p.screen_size),
      camera_main: clean(p.camera_main || p.cam_main_sensor),
      battery_capacity: clean(p.battery_capacity || p.battery)
    });

    const newVerdict = verdicts[tIndex]({
      name: p.name,
      processor: clean(p.processor),
      screen_size: clean(p.screen_size),
      camera_main: clean(p.camera_main || p.cam_main_sensor),
      battery_capacity: clean(p.battery_capacity || p.battery)
    });

    const newPros = generatePros({
      processor: clean(p.processor),
      screen_size: clean(p.screen_size),
      battery_capacity: clean(p.battery_capacity || p.battery),
      camera_main: clean(p.camera_main || p.cam_main_sensor)
    });

    const newCons = generateCons(p);
    const newFaqs = generateFaqs({
      name: p.name,
      processor: clean(p.processor),
      battery_capacity: clean(p.battery_capacity || p.battery),
      camera_main: clean(p.camera_main || p.cam_main_sensor),
      screen_size: clean(p.screen_size)
    });

    const { title, desc } = generateMeta({
      name: p.name,
      processor: clean(p.processor),
      battery_capacity: clean(p.battery_capacity || p.battery)
    });

    // Ensure USA keywords
    const newKeywords = `${p.name} price USA, ${p.name} specs, ${p.name} review, buy ${p.name}, best smartphone 2026`;

    await Phone.updateOne({ _id: p._id }, {
      $set: {
        seo_overview: newOverview,
        verdict: newVerdict,
        pros: newPros,
        cons: newCons,
        faqs: newFaqs,
        meta_title: title,
        meta_description: desc,
        keywords: newKeywords,
        primary_keyword: `${p.name} specs USA`,
        manual_seo_done: true
      }
    });

    updatedCount++;
    if (updatedCount % 50 === 0) console.log(`Updated ${updatedCount} phones...`);
  }

  console.log(`\n✅ Successfully fixed SEO for ${updatedCount} phones!`);
  await mongoose.disconnect();
}

fixSeo().catch(console.error);
