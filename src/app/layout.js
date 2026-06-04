import './globals.css';

export const metadata = {
  title: {
    default: 'NexusFlow — Full-Service Digital Growth Agency',
    template: '%s — NexusFlow',
  },
  description:
    'We build Shopify stores and GHL funnels that convert. 15+ live projects, real results, transparent pricing.',
  metadataBase: new URL('https://nexusflow.io'),
  openGraph: {
    siteName: 'NexusFlow',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
