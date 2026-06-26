// Server Component wrapper – exports metadata for SEO
// The actual interactive component is in AboutClient.js

import AboutClient from "./AboutClient";

export const metadata = {
  title: "About Us – Pizza Logist Story & Mission",
  description:
    "Learn about Pizza Logist, founded in 2015 by Muzamal Farooq. With 34+ branches across Lahore, Karachi, Islamabad & Multan, we deliver authentic quality pizza across Pakistan.",
  keywords: [
    "about pizza logist",
    "pizza logist founder",
    "Muzamal Farooq pizza",
    "pizza restaurant Pakistan history",
    "pizza company Pakistan",
    "34 branches pizza Pakistan",
    "authentic pizza Pakistan since 2015",
    "best pizza restaurant Lahore",
  ],
  alternates: {
    canonical: "https://www.pizzalogist.com/About",
  },
  openGraph: {
    type: "website",
    url: "https://www.pizzalogist.com/About",
    siteName: "Pizza Logist",
    title: "About Pizza Logist – Crafting Quality Pizza Since 2015",
    description:
      "Discover the Pizza Logist story. Founded in 2015, we operate 34+ branches serving millions of pizza lovers across Pakistan.",
    images: [
      {
        url: "/founder.jpeg",
        width: 500,
        height: 500,
        alt: "Muzamal Farooq – Founder of Pizza Logist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Pizza Logist – Crafting Quality Pizza Since 2015",
    description:
      "Learn about Pizza Logist – 34+ branches, authentic pizza, and a passion for quality since 2015.",
    images: ["/founder.jpeg"],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
