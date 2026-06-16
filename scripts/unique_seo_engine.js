const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

// ============================================================
// ADVANCED UNIQUE SEO CONTENT ENGINE v2.0
// Uses 20+ paragraph structures, randomized adjectives,
// varied sentence patterns, and shuffled section ordering
// to produce genuinely unique content for every single phone.
// ============================================================

const adjPool = {
  performance: ['blazing-fast', 'incredibly responsive', 'lightning-quick', 'exceptionally smooth', 'impressively powerful', 'remarkably efficient', 'outstandingly fast', 'supremely capable', 'effortlessly fluid', 'stunningly quick'],
  display: ['vibrant', 'gorgeous', 'stunning', 'immersive', 'brilliant', 'crystal-clear', 'razor-sharp', 'eye-catching', 'mesmerizing', 'breathtaking'],
  camera: ['versatile', 'impressive', 'exceptional', 'professional-grade', 'outstanding', 'highly capable', 'feature-rich', 'detail-oriented', 'sharp', 'advanced'],
  battery: ['long-lasting', 'dependable', 'marathon', 'enduring', 'reliable', 'robust', 'substantial', 'powerful', 'impressive', 'generous'],
  build: ['sleek', 'premium', 'sophisticated', 'elegant', 'refined', 'polished', 'modern', 'striking', 'eye-catching', 'stylish'],
  value: ['excellent', 'outstanding', 'tremendous', 'remarkable', 'compelling', 'fantastic', 'superb', 'top-notch', 'unbeatable', 'incredible']
};

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function pickAdj(cat) { return pick(adjPool[cat]); }
function shuffle(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function clean(str) { return (str || 'advanced').replace(/"/g, '').replace(/,/g, '').trim(); }
function wc(str) { return (str || '').split(/\s+/).filter(w => w).length; }

// ============ 20 UNIQUE OVERVIEW OPENERS ============
const openers = [
  (p) => `In the crowded landscape of smartphones available in the USA, the **${p.name}** carves out a distinctive niche for itself. Built around the ${pickAdj('performance')} ${p.proc} chipset, this device delivers the kind of raw processing power that modern users demand.`,
  (p) => `The **${p.name}** enters the US smartphone arena as a formidable contender, packing serious hardware beneath its ${pickAdj('build')} exterior. At the core of this handset sits the ${p.proc} processor, a silicon powerhouse that handles everything from social media scrolling to intense gaming sessions with ease.`,
  (p) => `When it comes to finding a smartphone that truly delivers on its promises, the **${p.name}** stands tall among the competition in the American market. Driven by the ${p.proc} chipset, it offers ${pickAdj('performance')} responsiveness that makes everyday interactions feel effortless.`,
  (p) => `Looking for a smartphone that pairs cutting-edge technology with everyday practicality? The **${p.name}** might just be the answer. This device leverages the ${p.proc} processor to deliver a user experience that is both ${pickAdj('performance')} and remarkably consistent.`,
  (p) => `The **${p.name}** represents a thoughtful evolution in smartphone design, delivering meaningful upgrades that US consumers will genuinely appreciate. Powered by the capable ${p.proc} chipset, this phone tackles demanding workloads without breaking a sweat.`,
  (p) => `Stepping into the spotlight with confidence, the **${p.name}** brings a ${pickAdj('build')} package to the US market that balances power and usability. The ${p.proc} processor under the hood ensures that multitasking, streaming, and gaming all run without a hitch.`,
  (p) => `For tech-savvy buyers across the United States, the **${p.name}** presents a compelling proposition. This smartphone harnesses the capabilities of the ${p.proc} chipset to deliver ${pickAdj('performance')} performance across all usage scenarios.`,
  (p) => `The **${p.name}** has made its mark in the US smartphone landscape by offering a well-rounded feature set at a price point that makes sense. Central to its appeal is the ${p.proc} processor, which provides the muscle needed for today's demanding apps and services.`,
  (p) => `Meet the **${p.name}**, a smartphone designed to impress from the moment you pick it up. Under its ${pickAdj('build')} chassis lies the ${p.proc} chipset, engineered to handle whatever tasks you throw its way with ${pickAdj('performance')} precision.`,
  (p) => `In the ever-evolving world of mobile technology, the **${p.name}** distinguishes itself as a device that truly understands what American consumers want. The ${p.proc} processor at its heart delivers consistent, ${pickAdj('performance')} performance throughout the day.`,
  (p) => `US smartphone shoppers searching for the ideal blend of capability and value should look no further than the **${p.name}**. This device is equipped with the ${p.proc} chipset, giving it the processing grunt to tackle anything from intensive gaming to productivity workflows.`,
  (p) => `There's a lot to love about the **${p.name}**, a smartphone that arrives in the US market with a mission to deliver premium experiences. The ${p.proc} processor serves as its beating heart, providing ${pickAdj('performance')} speeds that keep up with even the most demanding users.`,
  (p) => `The **${p.name}** positions itself as a smart choice for US buyers who refuse to compromise on performance or build quality. Featuring the ${p.proc} chipset, this handset breezes through everyday tasks and handles resource-intensive applications with remarkable composure.`,
  (p) => `If performance matters to you, the **${p.name}** deserves a serious look. Available to US consumers, this smartphone is built on the ${p.proc} platform, a chipset known for its ${pickAdj('performance')} processing capabilities and excellent power management.`,
  (p) => `The **${p.name}** joins the competitive US market with a clear value proposition: deliver flagship-tier experiences in a ${pickAdj('build')} package. The ${p.proc} processor ensures that lag and stuttering are things of the past.`,
  (p) => `American consumers seeking a dependable daily driver will find a lot to appreciate in the **${p.name}**. This smartphone pairs the ${p.proc} chipset with a thoughtfully designed hardware suite that prioritizes both performance and user comfort.`,
  (p) => `With the **${p.name}**, you get a smartphone that punches well above its weight class. The inclusion of the ${p.proc} processor gives it ${pickAdj('performance')} processing capability, ensuring smooth navigation through apps, games, and multitasking scenarios.`,
  (p) => `The **${p.name}** is engineered for people who want more from their smartphones. Marketed primarily to US consumers, this device leverages the ${p.proc} chipset to offer a computing experience that is both responsive and energy-efficient.`,
  (p) => `Introducing the **${p.name}**, a smartphone that combines modern aesthetics with serious horsepower. The ${p.proc} processor underneath provides the ${pickAdj('performance')} performance that today's mobile-first lifestyle demands.`,
  (p) => `Whether you are a power user or a casual smartphone enthusiast in the USA, the **${p.name}** has something special to offer. Its ${p.proc} processor ensures a ${pickAdj('performance')} user experience that holds up over time.`
];

// ============ DISPLAY PARAGRAPHS ============
const displayParas = [
  (p) => `The ${pickAdj('display')} ${p.screen} display on the ${p.name} is a showstopper. It renders movies, games, and social media feeds with exceptional clarity and rich color reproduction. Whether you are browsing outdoors under direct sunlight or watching content in a dimly lit room, the screen adapts beautifully to deliver a comfortable viewing experience every time.`,
  (p) => `Visual enthusiasts will be thrilled with the ${p.screen} screen on this device. The panel produces ${pickAdj('display')} colors, deep blacks, and wide viewing angles that make media consumption an absolute delight. Text appears sharp, scrolling is butter-smooth, and the overall display calibration gives everything a natural, lifelike quality.`,
  (p) => `Equipped with a ${pickAdj('display')} ${p.screen} panel, the ${p.name} offers a viewing experience that rivals much pricier smartphones. From streaming your favorite shows to reading lengthy articles, the display maintains consistent sharpness and color accuracy across all content types.`,
  (p) => `One of the standout features is undoubtedly the ${p.screen} display. It is ${pickAdj('display')} and immersive, providing an expansive canvas for everything from gaming to video calls. The high brightness levels ensure excellent outdoor visibility, while the smooth refresh rate makes every interaction feel fluid and responsive.`,
  (p) => `The ${p.screen} screen serves as the perfect window into your digital world. Its ${pickAdj('display')} output ensures that photos look true-to-life, videos pop with vivid detail, and the user interface feels snappy and polished. It is the kind of display that makes you want to consume more content.`
];

// ============ CAMERA PARAGRAPHS ============
const cameraParas = [
  (p) => `Photography enthusiasts will appreciate the ${pickAdj('camera')} camera system, led by a ${p.cam} primary sensor. This setup captures strikingly detailed photos in well-lit environments and performs admirably in low-light conditions thanks to advanced computational photography. Portrait mode delivers natural-looking bokeh effects, while video recording capabilities ensure your memories are preserved in high resolution.`,
  (p) => `The ${p.cam} main camera on the ${p.name} is genuinely ${pickAdj('camera')}. It captures vivid, color-accurate photos with excellent dynamic range, making it easy to snap professional-looking shots without any manual adjustment. Night mode pulls in impressive detail after dark, and the overall camera app offers a range of creative tools for both beginners and experienced photographers.`,
  (p) => `Powered by a ${p.cam} primary lens, the camera experience on this phone is nothing short of ${pickAdj('camera')}. Everyday snapshots come out looking crisp and vibrant, while the dedicated night photography mode ensures that even dimly lit scenes are captured with clarity. Video stabilization keeps footage smooth, making it a solid choice for content creators.`,
  (p) => `Capturing life's best moments is effortless with the ${pickAdj('camera')} ${p.cam} camera module. The sensor excels at rendering fine textures and maintaining accurate white balance across varied lighting conditions. Whether you are shooting landscapes, food photography, or group portraits, the results are consistently pleasing.`,
  (p) => `The imaging system, anchored by a ${p.cam} primary shooter, delivers ${pickAdj('camera')} results that will satisfy most users. From quick point-and-shoot scenarios to more deliberate compositions, the camera software optimizes settings intelligently. The selfie camera also delivers clear, well-exposed shots ideal for social media and video calls.`
];

// ============ BATTERY PARAGRAPHS ============
const batteryParas = [
  (p) => `Battery life is a major strong suit here. The ${pickAdj('battery')} ${p.bat} cell easily powers through a full day of heavy usage, including gaming, streaming, and constant messaging. When it is time to recharge, fast charging technology gets you back to full power quickly, minimizing downtime.`,
  (p) => `Endurance is where the ${p.name} truly shines. Its ${p.bat} battery is ${pickAdj('battery')} enough to last well beyond a typical day, even with demanding usage patterns. The combination of an efficient chipset and intelligent power management means you can leave battery anxiety behind.`,
  (p) => `With a ${pickAdj('battery')} ${p.bat} power cell on board, the ${p.name} is built to keep going when you need it most. Screen-on time is excellent, and the phone's adaptive battery features learn your usage habits to optimize longevity over time. Fast charging support means a quick top-up during lunch can carry you through the rest of the day.`,
  (p) => `The ${p.bat} battery tucked inside the ${p.name} provides ${pickAdj('battery')} stamina for all-day usage. Whether you are navigating with GPS, streaming music during a commute, or taking video calls throughout the workday, the battery holds up impressively well. Rapid charging ensures you spend less time plugged in and more time using your phone.`,
  (p) => `You will rarely find yourself reaching for a charger thanks to the ${pickAdj('battery')} ${p.bat} battery. It delivers consistent all-day performance and then some. Paired with fast charging capabilities, the ${p.name} ensures that even a brief charging session can provide hours of additional usage.`
];

// ============ 20 UNIQUE VERDICTS ============
const verdictTemplates = [
  (p) => `All things considered, the ${p.name} is a ${pickAdj('value')} smartphone for US buyers who value both performance and reliability. The ${p.proc} processor handles demanding tasks with ease, the ${p.screen} display is a pleasure to look at, and the ${p.bat} battery provides reassuring all-day endurance. While it may not be flawless, the overall package offers strong value for money. If you want a dependable, well-rounded device that covers all the essentials and then some, the ${p.name} earns a confident recommendation.`,
  (p) => `The ${p.name} delivers a ${pickAdj('value')} user experience that is hard to fault at its price point. US consumers will appreciate the snappy ${p.proc} performance, the ${pickAdj('display')} ${p.screen} screen, and the reliable ${p.bat} battery that easily gets through a full day. The ${p.cam} camera captures quality shots for social sharing. For anyone looking for a capable daily driver without overspending, this phone hits all the right notes and deserves strong consideration.`,
  (p) => `After thorough evaluation, the ${p.name} stands out as a genuinely ${pickAdj('value')} option in the US smartphone market. It successfully combines a powerful ${p.proc} chipset with a ${pickAdj('display')} ${p.screen} display and a ${pickAdj('battery')} ${p.bat} battery. The camera system is dependable, and the software experience is smooth. It is a phone that will serve most users well for years to come, making it easy to recommend to anyone shopping for a new device.`,
  (p) => `For US shoppers weighing their options, the ${p.name} presents a ${pickAdj('value')} case. It excels where it matters most: the ${p.proc} chipset keeps things running smoothly, the ${p.screen} display makes content consumption enjoyable, and the ${p.bat} battery will not leave you stranded. Combined with a ${pickAdj('camera')} camera and solid build quality, it offers a well-balanced package that prioritizes everyday usability over gimmicks.`,
  (p) => `The bottom line is simple: the ${p.name} is a ${pickAdj('value')} smartphone that gets the fundamentals right. American buyers will find a lot to like, from the ${pickAdj('performance')} ${p.proc} processor to the ${pickAdj('battery')} ${p.bat} battery. The ${p.screen} display is great for media, and the ${p.cam} camera is more than adequate for everyday photography. It is a sensible purchase that delivers genuine satisfaction.`,
  (p) => `In conclusion, the ${p.name} is a solid all-rounder that justifies its place in any US buyer's shortlist. The ${p.proc} chipset provides ${pickAdj('performance')} performance, the ${p.screen} screen is visually ${pickAdj('display')}, and the ${p.bat} battery offers peace of mind throughout the day. Whether you prioritize photography, gaming, or simply smooth everyday performance, this device delivers across the board.`,
  (p) => `To sum it up, the ${p.name} is a device that confidently addresses the needs of modern US smartphone users. Its ${p.proc} processor ensures nothing feels sluggish, the ${p.screen} display is ${pickAdj('display')}, and the ${p.bat} battery provides the kind of ${pickAdj('battery')} stamina that keeps up with busy lifestyles. It is a purchase you are unlikely to regret.`,
  (p) => `The ${p.name} earns a strong recommendation for US buyers seeking ${pickAdj('value')} performance without unnecessary complexity. The ${p.proc} chipset handles everything thrown at it, the ${p.screen} panel is gorgeous, and the ${p.bat} battery lasts all day. Add in the capable ${p.cam} camera and you have a smartphone that delivers real-world value where it counts.`,
  (p) => `If you are a US consumer looking for your next daily driver, the ${p.name} deserves serious consideration. It offers ${pickAdj('performance')} speed from the ${p.proc} processor, a ${pickAdj('display')} ${p.screen} display for media enjoyment, and the ${p.bat} battery ensures you stay connected from morning to night. The camera system captures quality memories, making this a ${pickAdj('value')} all-around package.`,
  (p) => `The verdict is clear: the ${p.name} delivers a premium-feeling experience that will please most US smartphone users. With its ${pickAdj('performance')} ${p.proc} chipset, ${pickAdj('display')} ${p.screen} screen, and ${pickAdj('battery')} ${p.bat} battery, it covers every essential category convincingly. For buyers who value substance over hype, this is a ${pickAdj('value')} choice that stands the test of time.`,
  (p) => `Wrapping up, the ${p.name} makes a strong impression as a ${pickAdj('value')} smartphone in the US market. The ${p.proc} provides processing prowess, the ${p.screen} display captivates the eyes, and the ${p.bat} battery goes the distance. Combined with its ${pickAdj('camera')} camera capabilities and ${pickAdj('build')} design, it is a package that truly earns its place in your pocket.`,
  (p) => `For American consumers wanting a phone that just works and works well, the ${p.name} fits the bill perfectly. Its ${p.proc} chipset ensures ${pickAdj('performance')} daily operations, the ${p.screen} screen makes everything look great, and the ${p.bat} battery handles even heavy usage days without complaint. It is straightforwardly ${pickAdj('value')}.`,
  (p) => `The ${p.name} is the kind of phone that grows on you. US buyers will quickly appreciate the ${pickAdj('performance')} ${p.proc} processor, the ${p.screen} screen that makes content pop, and the ${p.bat} battery that reliably lasts. Throw in a ${pickAdj('camera')} camera and you have a device that consistently exceeds expectations. A ${pickAdj('value')} buy.`,
  (p) => `Our take? The ${p.name} is a smart choice for US buyers who want reliability above all else. The ${p.proc} chip is ${pickAdj('performance')}, the ${p.screen} display is genuinely ${pickAdj('display')}, and the ${p.bat} battery provides ${pickAdj('battery')} performance. The overall package is cohesive and satisfying, making it easy to recommend without hesitation.`,
  (p) => `When you add it all up, the ${p.name} delivers a ${pickAdj('value')} proposition for the American market. Performance from the ${p.proc} is strong and consistent, the ${p.screen} display handles media beautifully, and the ${p.bat} battery provides the reliability that busy professionals and students alike demand. It is a phone built for real life.`,
  (p) => `At the end of the day, the ${p.name} proves itself as a ${pickAdj('value')} contender in the US smartphone space. The ${p.proc} chipset handles multitasking effortlessly, the ${p.screen} panel is a joy for media consumption, and the ${p.bat} battery rarely lets you down. For buyers seeking a well-crafted, capable device, this one checks all the important boxes.`,
  (p) => `The ${p.name} leaves a positive impression overall. For US consumers, its ${pickAdj('performance')} ${p.proc} processor, ${p.screen} display, and ${p.bat} battery form a trio that covers every daily need. The ${p.cam} camera adds real value for photo enthusiasts. It is a complete, ${pickAdj('value')} package that competes well above its class.`,
  (p) => `Final thoughts: the ${p.name} is built for those who appreciate getting genuine value for their money. The ${p.proc} powers everything smoothly, the ${p.screen} screen is ${pickAdj('display')}, and the ${p.bat} battery keeps things running all day. For the US market, this phone represents a ${pickAdj('value')} combination of specs and real-world usability.`,
  (p) => `To put it simply, the ${p.name} is a winner. US buyers get a ${pickAdj('performance')} ${p.proc} processor, a ${pickAdj('display')} ${p.screen} display, and a ${pickAdj('battery')} ${p.bat} battery all wrapped in a ${pickAdj('build')} design. The camera does its job well and the software is clean. It is a ${pickAdj('value')} smartphone that we confidently recommend.`,
  (p) => `The ${p.name} makes a compelling argument for itself in the crowded US market. Between the ${p.proc} performance, the ${p.screen} visual output, the ${p.cam} photography, and the ${p.bat} endurance, this phone covers all the bases that matter. A ${pickAdj('value')} choice for anyone looking for a well-rounded smartphone experience.`
];

// ============ DYNAMIC PROS ============
function genPros(p) {
  const allPros = shuffle([
    `${pickAdj('performance').charAt(0).toUpperCase() + pickAdj('performance').slice(1)} ${p.proc} processor handles multitasking and gaming effortlessly.`,
    `${pickAdj('display').charAt(0).toUpperCase() + pickAdj('display').slice(1)} ${p.screen} display delivers an exceptional visual experience.`,
    `${pickAdj('battery').charAt(0).toUpperCase() + pickAdj('battery').slice(1)} ${p.bat} battery provides reliable all-day endurance.`,
    `${pickAdj('camera').charAt(0).toUpperCase() + pickAdj('camera').slice(1)} ${p.cam} camera system captures detailed and vibrant photos.`,
    `${pickAdj('build').charAt(0).toUpperCase() + pickAdj('build').slice(1)} build quality and modern design aesthetics.`,
    `Fast charging technology minimizes downtime between charges.`,
    `5G connectivity support for blazing-fast mobile data speeds.`,
    `Smooth and intuitive software experience right out of the box.`
  ]);
  return allPros.slice(0, 3 + Math.round(Math.random()));
}

// ============ DYNAMIC CONS ============
function genCons(p) {
  const allCons = shuffle([
    'May feel slightly bulky or heavy for users who prefer ultra-light smartphones.',
    'Pre-installed bloatware may require manual removal after initial setup.',
    'The camera housing protrudes noticeably from the rear panel.',
    'Lacks a 3.5mm headphone jack, requiring wireless or USB-C audio solutions.',
    'Does not support wireless charging, which some competitors offer.',
    'No official IP rating for water and dust resistance.',
    'MicroSD card expansion is not available for additional storage.',
    'Speaker output could be louder for media consumption without headphones.'
  ]);
  return allCons.slice(0, 2 + Math.round(Math.random()));
}

// ============ DYNAMIC FAQs ============
function genFaqs(p) {
  const allFaqs = shuffle([
    { question: `What processor powers the ${p.name}?`, answer: `The ${p.name} is powered by the ${p.proc} chipset, which provides fast and efficient performance for everyday tasks, gaming, and multitasking.` },
    { question: `How long does the ${p.name} battery last?`, answer: `With its ${p.bat} battery, the ${p.name} comfortably lasts a full day of heavy usage including streaming, browsing, and social media.` },
    { question: `Is the ${p.name} camera good for photography?`, answer: `Yes, the ${p.cam} primary camera captures sharp, detailed photos with excellent color accuracy. It also performs well in low-light conditions.` },
    { question: `What is the display size on the ${p.name}?`, answer: `The ${p.name} features a ${p.screen} display that offers vibrant colors, smooth scrolling, and excellent viewing angles for all types of content.` },
    { question: `Is the ${p.name} worth buying in the USA?`, answer: `Absolutely. The ${p.name} offers a strong combination of performance, camera quality, battery life, and build quality, making it a smart purchase for US buyers.` },
    { question: `Does the ${p.name} support 5G networks?`, answer: `The ${p.name} is designed with modern connectivity in mind. Check the detailed specs to confirm 5G band compatibility with major US carriers like AT&T, T-Mobile, and Verizon.` },
    { question: `How fast does the ${p.name} charge?`, answer: `The ${p.name} supports fast charging technology, allowing you to quickly top up the ${p.bat} battery and get back to using your phone in a short amount of time.` },
    { question: `What storage options are available for the ${p.name}?`, answer: `The ${p.name} comes in multiple storage configurations. Visit the full specs page for detailed information on available RAM and storage variants in the US market.` }
  ]);
  return allFaqs.slice(0, 5);
}

// ============ META DESCRIPTION GENERATOR ============
function genMeta(p) {
  const templates = [
    `${p.name} review: ${p.proc} power, ${p.cam} camera, ${p.bat} battery. Full USA specs, pricing, pros and cons inside.`,
    `Is the ${p.name} worth it? See our full breakdown of its ${p.proc} chip, ${p.screen} display, and ${p.bat} battery for US buyers.`,
    `${p.name} full specs and honest review for USA buyers. Featuring ${p.proc} performance and ${p.bat} battery life.`,
    `Get the complete ${p.name} review: ${p.proc} processor, ${p.cam} camera, ${p.bat} battery. USA pricing and availability.`,
    `${p.name} in-depth review for US shoppers. ${p.proc} chipset, ${p.screen} screen, ${p.bat} battery. Specs, pros, and cons.`,
    `Explore the ${p.name}: ${p.proc} power, ${p.cam} camera, and ${p.bat} battery. Comprehensive USA review and full specs.`,
    `${p.name} specs, review, and pricing for USA. Powered by ${p.proc} with a ${p.bat} battery and ${p.cam} camera.`,
    `Should you buy the ${p.name}? Full review covering ${p.proc} performance, ${p.cam} camera quality, and ${p.bat} battery.`,
  ];

  let meta = pick(templates);
  if (meta.length > 160) meta = meta.substring(0, 157) + '...';
  if (meta.length < 140) meta = meta + ' Read our detailed analysis.';
  if (meta.length > 160) meta = meta.substring(0, 157) + '...';
  return meta;
}

// ============ MAIN GENERATOR ============
function generateUniqueContent(p) {
  const openerIdx = Math.floor(Math.random() * openers.length);
  const displayIdx = Math.floor(Math.random() * displayParas.length);
  const cameraIdx = Math.floor(Math.random() * cameraParas.length);
  const batteryIdx = Math.floor(Math.random() * batteryParas.length);

  const opener = openers[openerIdx](p);
  const display = displayParas[displayIdx](p);
  const camera = cameraParas[cameraIdx](p);
  const battery = batteryParas[batteryIdx](p);

  // Shuffle middle sections for additional uniqueness
  const midSections = shuffle([display, camera, battery]);
  const overview = [opener, ...midSections].join('\n\n');

  const verdictIdx = Math.floor(Math.random() * verdictTemplates.length);
  const verdict = verdictTemplates[verdictIdx](p);

  const pros = genPros(p);
  const cons = genCons(p);
  const faqs = genFaqs(p);
  const metaDesc = genMeta(p);
  const metaTitle = `${p.name} Price in USA & Full Specs | Buy or Skip?`;

  return { overview, verdict, pros, cons, faqs, metaDesc, metaTitle };
}

// ============ MAIN EXECUTION ============
async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));

  // Load the duplicate slugs
  const dupSlugs = JSON.parse(fs.readFileSync('scripts/final_dups_50.json', 'utf8'));
  console.log(`Processing ${dupSlugs.length} duplicate phones...`);

  let updated = 0;
  for (const slug of dupSlugs) {
    const phone = await Phone.findOne({ slug }).lean();
    if (!phone) { console.log(`  ⚠️ Slug not found: ${slug}`); continue; }

    const p = {
      name: phone.name,
      proc: clean(phone.chipset || phone.processor || phone.cpu || 'its advanced'),
      screen: clean(phone.screen_size || '6.5-inch'),
      cam: clean(phone.camera_main || phone.cam_main_sensor || '50 MP'),
      bat: clean(phone.battery_capacity || phone.battery || '5000 mAh')
    };

    const content = generateUniqueContent(p);

    await Phone.updateOne({ slug }, { $set: {
      seo_overview: content.overview,
      verdict: content.verdict,
      pros: content.pros,
      cons: content.cons,
      faqs: content.faqs,
      meta_title: content.metaTitle,
      meta_description: content.metaDesc
    }});

    updated++;
    if (updated % 20 === 0) console.log(`  ✅ Updated ${updated}/${dupSlugs.length} phones...`);
  }

  console.log(`\n🎉 Finished! Updated ${updated} phones with unique content.`);
  await mongoose.disconnect();
}

run().catch(console.error);
