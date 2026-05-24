export const metadata = {
  title: 'Privacy Policy | TechTweak',
  description: 'Learn how TechTweak collects, uses, protects, and handles your information when you use our website.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-24">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="mb-12 border-b border-slate-200 pb-8 text-left">
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-slate-500 font-medium text-lg">Last Updated: May 2026</p>
        </div>

        <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-primary hover:prose-a:text-blue-700">
            <p>
              Welcome to <strong>TechTweak</strong> ("we", "our", or "us"). Your privacy is important to us. This Privacy Policy explains how TechTweak collects, uses, protects, and handles your information when you use our website.
            </p>
            <p>
              By using <a href="https://www.techtweak.tech">https://www.techtweak.tech</a>, you agree to the practices described in this Privacy Policy.
            </p>

            <h2>1. Information We Collect</h2>
            <h3>Automatically Collected Information</h3>
            <p>When you visit TechTweak, we may automatically collect certain information including:</p>
            <ul>
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device information</li>
              <li>Operating system</li>
              <li>Visited pages</li>
              <li>Time spent on pages</li>
              <li>Referral sources</li>
              <li>Country/region information</li>
            </ul>
            <p>This information helps us improve user experience, website performance, and analytics.</p>

            <h2>2. Cookies & Tracking Technologies</h2>
            <p>TechTweak uses cookies and similar technologies to improve website functionality and analyze traffic. Cookies may be used for:</p>
            <ul>
              <li>Analytics</li>
              <li>Performance monitoring</li>
              <li>User preferences</li>
              <li>Security</li>
              <li>Session management</li>
            </ul>
            <p>You can disable cookies through your browser settings if you prefer.</p>

            <h2>3. Google Analytics</h2>
            <p>We use Google Analytics to understand how visitors interact with our website. Google Analytics may collect:</p>
            <ul>
              <li>Page views</li>
              <li>Device information</li>
              <li>Traffic sources</li>
              <li>Session duration</li>
              <li>User behavior statistics</li>
            </ul>
            <p>
              This data is anonymized and used only for website improvement and analytics purposes.<br/>
              Learn more: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>
            </p>

            <h2>4. External Links</h2>
            <p>Our website may contain links to third-party websites, including manufacturers, retailers, social media platforms, and external resources. We are not responsible for the privacy practices or content of external websites.</p>

            <h2>5. Advertising & Third-Party Services</h2>
            <p>TechTweak may partner with third-party services, including Google AdSense, affiliate networks, and sponsored content providers. Some links on our website may be affiliate links. These third-party services and embedded content may use cookies or tracking technologies according to their own privacy policies.</p>

            <h2>6. Data Security</h2>
            <p>We implement reasonable technical and organizational measures to help protect your information. Our platform uses secure technologies and trusted infrastructure providers including:</p>
            <ul>
              <li>Vercel</li>
              <li>MongoDB</li>
              <li>Cloudinary</li>
              <li>Google services</li>
            </ul>
            <p>However, please be aware that no online system or data transmission over the internet can guarantee absolute security.</p>

            <h2>7. Children's Privacy</h2>
            <p>TechTweak is not intended for children under the age of 13. We do not knowingly collect personal information from children.</p>

            <h2>8. User Rights</h2>
            <p>Users may request:</p>
            <ul>
              <li>Correction of inaccurate information</li>
              <li>Removal of submitted information</li>
              <li>General privacy-related inquiries</li>
            </ul>
            <p>You may contact us for any privacy concerns regarding your data.</p>

            <h2>9. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy periodically to reflect:</p>
            <ul>
              <li>Legal changes</li>
              <li>Platform updates</li>
              <li>New features</li>
              <li>Security improvements</li>
            </ul>
            <p>Any changes will be posted on this page with an updated revision date.</p>

            <h2>10. Contact Us</h2>
            <p>If you have questions regarding this Privacy Policy, you may contact us at:</p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:support@techtweak.tech">support@techtweak.tech</a></li>
              <li><strong>Website:</strong> <a href="https://www.techtweak.tech">https://www.techtweak.tech</a></li>
            </ul>

            <h2>11. Consent</h2>
            <p>By using TechTweak, you consent to this Privacy Policy and agree to its terms.</p>
          </div>
      </div>
    </div>
  );
}
