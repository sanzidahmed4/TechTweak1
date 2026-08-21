export const metadata = {
  title: 'About | TechTweak',
  description: 'Learn more about TechTweak, your trusted source for premium smartphone reviews, specifications, and side-by-side comparisons.',
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | TechTweak",
    description: "Learn more about TechTweak, your trusted source for premium smartphone reviews, specifications, and side-by-side comparisons.",
    url: "/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | TechTweak",
    description: "Learn more about TechTweak, your trusted source for premium smartphone reviews, specifications, and side-by-side comparisons.",
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            About Us
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Your Ultimate Smartphone <span className="text-blue-600">Companion</span>.
          </h1>
          
          <div className="prose prose-lg prose-slate max-w-none text-slate-600">
            <p className="text-xl leading-relaxed mb-8">
              Welcome to <strong>TechTweak</strong>, the most comprehensive and trusted destination for smartphone enthusiasts, buyers, and tech geeks. We believe that choosing a smartphone shouldn't be a guessing game.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Our Mission</h2>
            <p className="mb-6">
              Our mission is simple: to empower consumers with accurate, unbiased, and data-driven insights. With thousands of smartphones in the market, finding the perfect device can be overwhelming. We cut through the marketing noise to bring you the cold, hard facts—combined with real-world testing and expert editorial reviews.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">What We Do</h2>
            <div className="grid sm:grid-cols-2 gap-6 my-8">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-900 text-lg mb-2">Detailed Specifications</h3>
                <p className="text-sm">We maintain a massive, up-to-date database of smartphone specifications, ensuring you have access to every technical detail.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-900 text-lg mb-2">Head-to-Head Comparisons</h3>
                <p className="text-sm">Our advanced comparison tool lets you pit up to 4 devices against each other to see exactly which one comes out on top.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-900 text-lg mb-2">Unbiased Reviews</h3>
                <p className="text-sm">We test devices rigorously in real-world scenarios to provide reviews you can actually trust.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-900 text-lg mb-2">Tech News & Updates</h3>
                <p className="text-sm">Stay ahead of the curve with our coverage of upcoming releases, leaks, and industry trends.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Why Trust Us?</h2>
            <p className="mb-6">
              At TechTweak, we operate with complete editorial independence. Our recommendations are based entirely on technical merit, performance testing, and value for money. Whether you are looking for a budget-friendly reliable phone or the ultimate premium flagship, we are here to guide you every step of the way.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
