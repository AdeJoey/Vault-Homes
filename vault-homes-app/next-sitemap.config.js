/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://vaulthomes.com",
  generateRobotsTxt: true,
  exclude: ["/api/*"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: "/api/" },
    ],
  },
  additionalPaths: async (config) => [
    await config.transform(config, "/"),
    await config.transform(config, "/sell-privately"),
    await config.transform(config, "/find-deals"),
    await config.transform(config, "/about"),
    await config.transform(config, "/insights"),
    await config.transform(config, "/faq"),
    await config.transform(config, "/contact"),
    await config.transform(config, "/privacy-policy"),
    await config.transform(config, "/terms-of-use"),
  ],
};
