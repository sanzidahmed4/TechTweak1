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
    <div className="min-h-screen py-24 px-4 container mx-auto">
      <h1 className="text-4xl font-bold capitalize">about</h1>
      <p className="mt-4 text-slate-600">This page is under construction.</p>
    </div>
  );
}
