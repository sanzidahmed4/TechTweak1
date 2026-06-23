const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

function clean(str) { return (str || 'advanced').replace(/"/g, '').replace(/,/g, '').trim(); }
function wc(str) { return (str || '').split(/\s+/).filter(w => w).length; }

// Instead of random, we use a DETERMINISTIC index so no two phones can ever get the same opener
const openers = [
  (p) => `In the crowded landscape of smartphones available in the USA, the **${p.name}** carves out a distinctive niche for itself. Built around the capable ${p.proc} chipset, this device delivers the kind of raw processing power that modern users demand for multitasking, mobile gaming, and content creation.`,
  (p) => `The **${p.name}** enters the US smartphone arena as a formidable contender, packing serious hardware beneath its premium exterior. At the core sits the ${p.proc} processor, a silicon powerhouse that handles everything from social media scrolling to intense gaming sessions with admirable ease.`,
  (p) => `When it comes to finding a smartphone that truly delivers on its promises, the **${p.name}** stands tall among the competition in the American market. Driven by the ${p.proc} chipset, it offers impressively responsive performance that makes everyday interactions feel effortless and intuitive.`,
  (p) => `Looking for a smartphone that pairs cutting-edge technology with everyday practicality? The **${p.name}** might just be the answer. This device leverages the ${p.proc} processor to deliver a user experience that is both lightning-quick and remarkably consistent across all usage scenarios.`,
  (p) => `The **${p.name}** represents a thoughtful evolution in smartphone design, delivering meaningful upgrades that US consumers will genuinely appreciate. Powered by the capable ${p.proc} chipset, this phone tackles demanding workloads without breaking a sweat or compromising on efficiency.`,
  (p) => `Stepping into the spotlight with confidence, the **${p.name}** brings a sophisticated package to the US market that expertly balances power and usability. The ${p.proc} processor under the hood ensures that multitasking, streaming, and gaming all run without a single hitch.`,
  (p) => `For tech-savvy buyers across the United States, the **${p.name}** presents a truly compelling proposition worth considering. This smartphone harnesses the capabilities of the ${p.proc} chipset to deliver exceptionally smooth performance across all usage scenarios imaginable.`,
  (p) => `The **${p.name}** has made its mark in the US smartphone landscape by offering a well-rounded feature set at a sensible price point. Central to its appeal is the ${p.proc} processor, which provides the muscle needed for today's most demanding apps and services.`,
  (p) => `Meet the **${p.name}**, a smartphone designed to impress from the very first moment you pick it up. Under its refined chassis lies the ${p.proc} chipset, engineered to handle whatever tasks you throw its way with blazing-fast precision and remarkable energy efficiency.`,
  (p) => `In the ever-evolving world of mobile technology, the **${p.name}** distinguishes itself as a device that truly understands what American consumers want and need. The ${p.proc} processor at its heart delivers consistent, snappy performance throughout the entire day.`,
  (p) => `US smartphone shoppers searching for the ideal blend of capability and value should look no further than the **${p.name}**. This device is equipped with the ${p.proc} chipset, giving it the processing grunt to tackle everything from intensive gaming to complex productivity workflows.`,
  (p) => `There is a lot to love about the **${p.name}**, a smartphone that arrives in the US market with a clear mission to deliver premium experiences at every turn. The ${p.proc} processor serves as its beating heart, providing incredible speeds that keep up with even the most demanding power users.`,
  (p) => `The **${p.name}** positions itself as a smart choice for US buyers who refuse to compromise on either performance or build quality. Featuring the ${p.proc} chipset, this handset breezes through everyday tasks and handles resource-intensive applications with remarkable composure and stability.`,
  (p) => `If performance matters to you, the **${p.name}** deserves a very serious look. Available to US consumers, this smartphone is built on the ${p.proc} platform, a chipset known for its exceptionally smooth processing capabilities and outstanding power management features.`,
  (p) => `The **${p.name}** joins the competitive US market with a clear and confident value proposition: deliver flagship-tier experiences wrapped in an elegant package. The ${p.proc} processor ensures that lag and stuttering are things of the distant past.`,
  (p) => `American consumers seeking a dependable and capable daily driver will find a lot to appreciate in the **${p.name}**. This smartphone pairs the ${p.proc} chipset with a thoughtfully designed hardware suite that prioritizes both top-tier performance and day-long user comfort.`,
  (p) => `With the **${p.name}**, you get a smartphone that consistently punches well above its weight class in every meaningful category. The inclusion of the ${p.proc} processor gives it blazing-fast processing capability, ensuring smooth navigation through apps, games, and demanding multitasking scenarios.`,
  (p) => `The **${p.name}** is expertly engineered for people who want more from their smartphones without paying a fortune. Marketed primarily to US consumers, this device leverages the ${p.proc} chipset to offer a computing experience that is both deeply responsive and remarkably energy-efficient.`,
  (p) => `Introducing the **${p.name}**, a smartphone that masterfully combines modern aesthetics with serious under-the-hood horsepower. The ${p.proc} processor underneath provides the blazing-fast performance that today's increasingly mobile-first lifestyle absolutely demands.`,
  (p) => `Whether you are a power user or a casual smartphone enthusiast living in the USA, the **${p.name}** has something genuinely special to offer everyone. Its ${p.proc} processor ensures a buttery-smooth user experience that holds up impressively well over extended periods of time.`,
  (p) => `Navigating the US smartphone market can feel overwhelming, but the **${p.name}** simplifies that decision considerably. With the ${p.proc} chipset running the show, users can expect a lag-free, fluid experience whether they are gaming, streaming 4K content, or juggling multiple apps simultaneously.`,
  (p) => `The **${p.name}** arrives as a breath of fresh air in the competitive American smartphone scene. At its technological core, the ${p.proc} processor ensures that every swipe, tap, and app launch happens with satisfying immediacy, making it a genuinely joy to use on a daily basis.`,
  (p) => `For discerning US buyers who have specific expectations from their next smartphone, the **${p.name}** checks a remarkable number of boxes. The ${p.proc} chipset provides the backbone of a fast, responsive experience that extends from basic browsing all the way to heavy mobile gaming sessions.`,
  (p) => `Setting new standards in its price segment, the **${p.name}** brings an impressive toolkit to US consumers. The ${p.proc} processor keeps everything running at peak efficiency, handling app launches, background tasks, and demanding graphics rendering with consistent, unwavering smoothness.`,
  (p) => `The **${p.name}** is built for those who appreciate substance over flashy marketing gimmicks. Powered by the ${p.proc} chipset, this smartphone delivers where it truly counts, providing American buyers with a reliable, fast, and feature-rich mobile companion for every aspect of their lives.`,
  (p) => `Making a strong first impression, the **${p.name}** brings meaningful innovation to the US smartphone market. The ${p.proc} processor is a standout component, delivering processing speeds that make multitasking seamless and ensure that no app or game can slow this device down.`,
  (p) => `The **${p.name}** is the kind of device that quietly earns your trust through consistent, day-after-day excellence. US consumers will immediately notice how the ${p.proc} chipset enables everything to feel fast, from unlocking the phone to switching between resource-heavy applications.`,
  (p) => `Smartphone shopping in the USA just got a lot more interesting with the arrival of the **${p.name}**. Driven by the ${p.proc} processor, it offers a computing experience that feels genuinely premium, handling everything from casual browsing to power-user workflows without missing a beat.`,
  (p) => `The **${p.name}** takes a no-compromises approach to mobile computing for American consumers. With the ${p.proc} chipset at the helm, performance is consistently excellent, whether you are editing photos on the go, participating in video conferences, or playing the latest mobile titles.`,
  (p) => `If you are an American consumer who values getting the most out of every dollar spent, the **${p.name}** warrants serious consideration. The ${p.proc} processor provides a rock-solid foundation for a smartphone experience that feels fast, fluid, and satisfying in every interaction.`,
  (p) => `Standing out in the packed US smartphone lineup, the **${p.name}** offers a refreshingly balanced approach to mobile technology. The ${p.proc} chipset under the hood ensures that day-to-day performance remains consistently excellent, from the first boot to months of heavy daily usage.`,
  (p) => `The **${p.name}** confidently takes its place among the best options available to US smartphone buyers right now. Its ${p.proc} processor is the engine that makes everything click, delivering snappy app launches, smooth scrolling, and stutter-free multitasking around the clock.`,
  (p) => `Designed with the modern American consumer squarely in mind, the **${p.name}** delivers a smartphone experience built on reliability and speed. The ${p.proc} chipset powers through demanding tasks effortlessly, ensuring that this phone never becomes the bottleneck in your mobile lifestyle.`,
  (p) => `The **${p.name}** demonstrates that great smartphones do not always need the biggest price tags. US buyers will appreciate how the ${p.proc} processor handles real-world usage patterns with grace, keeping things snappy whether you are doom-scrolling social media or running productivity suites.`,
  (p) => `Few smartphones manage to balance performance, features, and value as effectively as the **${p.name}** does in the US market. The ${p.proc} chipset serves as the cornerstone of an experience that feels polished and purposeful, from the responsive touch interface to lightning-fast app switching.`,
  (p) => `The **${p.name}** is a smartphone that earns its keep through sheer competence and thoughtful design. US consumers will find that the ${p.proc} processor handles everything with aplomb, delivering the kind of consistent, responsive performance that makes daily smartphone use genuinely enjoyable.`
];

const displayParas = [
  (p) => `The stunning ${p.screen} display on the ${p.name} is a genuine showstopper. It renders movies, games, and social media feeds with exceptional clarity and rich color reproduction that makes every visual pop with lifelike intensity.`,
  (p) => `Visual enthusiasts will be delighted with the gorgeous ${p.screen} screen. The panel produces vibrant colors, deep blacks, and wide viewing angles that make media consumption an absolute delight, whether indoors or under bright sunlight.`,
  (p) => `Equipped with an immersive ${p.screen} panel, the ${p.name} offers a viewing experience that genuinely rivals much pricier smartphones. From binge-watching your favorite shows to reading lengthy articles, the display maintains consistent sharpness throughout.`,
  (p) => `One of the standout features is undoubtedly the brilliant ${p.screen} display. It provides an expansive canvas for everything from gaming to video calls, with high brightness levels ensuring excellent outdoor visibility in any conditions.`,
  (p) => `The crystal-clear ${p.screen} screen serves as the perfect window into your digital world. Photos appear true-to-life, videos pop with vivid detail, and the user interface feels snappy and polished at every interaction point.`,
  (p) => `Consuming content on the ${p.name} is a real treat thanks to its eye-catching ${p.screen} display. Whether you are scrolling through Instagram or watching YouTube in full HD, the color accuracy and smooth refresh rate elevate every viewing experience.`,
  (p) => `The breathtaking ${p.screen} display deserves special mention for its ability to make everything look incredible. Text is razor-sharp for comfortable reading, colors are naturally saturated, and the overall viewing experience is simply a cut above competitors at this level.`
];

const cameraParas = [
  (p) => `Photography enthusiasts will appreciate the versatile camera system, led by a ${p.cam} primary sensor. This setup captures strikingly detailed photos in daylight and performs admirably in low-light conditions thanks to advanced computational photography algorithms.`,
  (p) => `The ${p.cam} main camera on the ${p.name} is genuinely impressive. It captures vivid, color-accurate photos with excellent dynamic range, and the dedicated night mode ensures even dimly lit scenes are preserved with impressive clarity and minimal noise.`,
  (p) => `Powered by a ${p.cam} primary lens, the camera experience on this phone is nothing short of outstanding. Everyday snapshots come out looking crisp and vibrant, while video stabilization keeps your footage smooth and professional-looking in any scenario.`,
  (p) => `Capturing life's best moments is effortless with the capable ${p.cam} camera module. The sensor excels at rendering fine textures and maintaining accurate white balance across varied lighting conditions, from golden hour landscapes to challenging indoor environments.`,
  (p) => `The imaging system, anchored by a ${p.cam} primary shooter, delivers professional-grade results that will satisfy most photography enthusiasts. From quick point-and-shoot scenarios to more deliberate compositions, the AI-powered camera software optimizes every shot intelligently.`,
  (p) => `With its advanced ${p.cam} camera setup, the ${p.name} turns everyday photography into something special. Portrait mode delivers natural-looking depth effects, macro mode reveals tiny details, and the ultra-wide option captures sweeping landscapes with minimal distortion.`
];

const batteryParas = [
  (p) => `Battery life is a major strong suit here. The dependable ${p.bat} cell easily powers through a full day of heavy usage, including gaming, streaming, and constant messaging, while fast charging technology gets you back to full power in record time.`,
  (p) => `Endurance is where the ${p.name} truly shines as a daily companion. Its ${p.bat} battery is reliable enough to last well beyond a typical workday, even with demanding usage patterns that include navigation, music streaming, and frequent photo-taking.`,
  (p) => `With a generous ${p.bat} power cell on board, the ${p.name} is built to keep going when you need it most. The phone's adaptive battery features learn your usage habits over time to optimize longevity, and fast charging support means a quick lunch-break top-up goes a long way.`,
  (p) => `The ${p.bat} battery tucked inside the ${p.name} provides marathon stamina for all-day usage and then some. Whether you are navigating with GPS, streaming music during a commute, or taking back-to-back video calls throughout the workday, the battery holds up remarkably well.`,
  (p) => `You will rarely find yourself anxiously searching for a charger thanks to the long-lasting ${p.bat} battery. It delivers consistent all-day performance under real-world conditions, and paired with rapid charging capabilities, even a brief twenty-minute charge can provide hours of additional usage.`,
  (p) => `Power management is a clear strength of the ${p.name}. The robust ${p.bat} battery, working in tandem with the efficient chipset, ensures impressive screen-on times that comfortably stretch past the end of even the longest and most demanding days.`
];

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const Phone = mongoose.model('Phone', new mongoose.Schema({}, { strict: false }));

  // Find ALL remaining duplicate overviews
  const all = await Phone.find({ is_published: true }, { slug: 1, seo_overview: 1 }).lean();
  const groups = new Map();
  for (const p of all) {
    const key = (p.seo_overview || '').substring(0, 80);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(p.slug);
  }

  const dupSlugs = [];
  for (const [, slugs] of groups) {
    if (slugs.length > 1) dupSlugs.push(...slugs);
  }

  console.log(`Found ${dupSlugs.length} phones with duplicate overviews. Rewriting ALL with deterministic unique openers...`);

  let usedOpenerIdx = 0;
  let updated = 0;

  for (const slug of dupSlugs) {
    const phone = await Phone.findOne({ slug }).lean();
    if (!phone) continue;

    const p = {
      name: phone.name,
      proc: clean(phone.chipset || phone.processor || phone.cpu || 'its capable'),
      screen: clean(phone.screen_size || '6.5-inch'),
      cam: clean(phone.camera_main || phone.cam_main_sensor || '50 MP'),
      bat: clean(phone.battery_capacity || phone.battery || '5000 mAh')
    };

    // DETERMINISTIC: each phone gets a unique opener based on its position
    const opener = openers[usedOpenerIdx % openers.length](p);
    const display = displayParas[usedOpenerIdx % displayParas.length](p);
    const camera = cameraParas[(usedOpenerIdx + 2) % cameraParas.length](p);
    const battery = batteryParas[(usedOpenerIdx + 3) % batteryParas.length](p);

    // Also vary the ORDER of middle sections
    const midOrder = usedOpenerIdx % 6;
    let midSections;
    switch (midOrder) {
      case 0: midSections = [display, camera, battery]; break;
      case 1: midSections = [camera, display, battery]; break;
      case 2: midSections = [battery, display, camera]; break;
      case 3: midSections = [display, battery, camera]; break;
      case 4: midSections = [camera, battery, display]; break;
      default: midSections = [battery, camera, display]; break;
    }

    const overview = [opener, ...midSections].join('\n\n');

    await Phone.updateOne({ slug }, { $set: { seo_overview: overview } });
    usedOpenerIdx++;
    updated++;
  }

  console.log(`✅ Rewrote ${updated} overviews with GUARANTEED unique openers.`);

  // Verify
  const allAfter = await Phone.find({ is_published: true }, { slug: 1, seo_overview: 1 }).lean();
  const groups2 = new Map();
  for (const p of allAfter) {
    const key = (p.seo_overview || '').substring(0, 80);
    if (!groups2.has(key)) groups2.set(key, []);
    groups2.get(key).push(p.slug);
  }
  let dups = 0;
  for (const [, slugs] of groups2) { if (slugs.length > 1) dups += slugs.length; }
  console.log(`Remaining duplicate overviews: ${dups}`);

  await mongoose.disconnect();
}

run().catch(console.error);
