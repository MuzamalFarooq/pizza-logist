// app/robots.js – Robots.txt via Next.js Metadata API
// This will be served at /robots.txt

const siteUrl = "https://pizzalogistics.muzamal.site/";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/Menu", "/About", "/Contact"],
        disallow: ["/admin/", "/Dashboard/", "/api/", "/login/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
