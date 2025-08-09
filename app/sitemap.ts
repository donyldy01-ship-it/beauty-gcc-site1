export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com';
  return [
    { url: base, lastModified: new Date() },
    { url: base + '/thank-you', lastModified: new Date() },
  ];
}
