const fs = require('fs');
const path = require('path');

const routes = [
  'phones', 'phones/[brand]', 'phones/[brand]/[model]', 'compare', 'upcoming-phones', 'news', 'articles', 'reviews', 'best', 'categories', 'search', 'about', 'contact', 'privacy-policy', 'terms-and-conditions', 'admin', 'admin/phones', 'admin/blogs', 'admin/brands', 'admin/media', 'admin/categories', 'admin/settings'
];

routes.forEach(route => {
  const dir = path.join('src/app', route);
  fs.mkdirSync(dir, { recursive: true });
  
  const title = route.split('/').pop().replace(/-/g, ' ');
  const pageContent = `export const metadata = {
  title: '${title.charAt(0).toUpperCase() + title.slice(1)} | TechTweak',
  description: 'Explore the latest on TechTweak.',
};

export default function Page() {
  return (
    <div className="min-h-screen py-24 px-4 container mx-auto">
      <h1 className="text-4xl font-bold capitalize">${title}</h1>
      <p className="mt-4 text-slate-600">This page is under construction.</p>
    </div>
  );
}
`;
  fs.writeFileSync(path.join(dir, 'page.tsx'), pageContent);
});

console.log('Routes created successfully.');
