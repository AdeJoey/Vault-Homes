/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://vaulthomes.com",
  generateRobotsTxt: false, // robots.ts in app/ handles this dynamically
  exclude: [
    "/api/*",
    "/admin",
    "/admin/*",
    "/server-sitemap.xml",
  ],
};
