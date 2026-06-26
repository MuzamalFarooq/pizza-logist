// Server Component wrapper – exports metadata for SEO
import ContactClient from "./ContactClient";

export const metadata = {
  title: "Contact Us – Pizza Logist Customer Support",
  description:
    "Get in touch with Pizza Logist. Contact us for order support, feedback, or queries about our pizza delivery service in Lahore, Karachi, Islamabad & Multan, Pakistan.",
  keywords: [
    "contact pizza logist",
    "pizza logist customer support",
    "pizza delivery complaint Pakistan",
    "pizza feedback Pakistan",
    "pizza store Lahore contact",
    "pizza delivery Karachi contact",
    "pizza order support Pakistan",
    "pizza restaurant contact number",
  ],
  alternates: {
    canonical: "https://www.pizzalogist.com/Contact",
  },
  openGraph: {
    type: "website",
    url: "https://www.pizzalogist.com/Contact",
    siteName: "Pizza Logist",
    title: "Contact Pizza Logist – We're Here to Help",
    description:
      "Reach out to Pizza Logist for order support, feedback, or queries. Serving Lahore, Karachi, Islamabad & Multan.",
    images: [
      {
        url: "/welcomepizza.webp",
        width: 1200,
        height: 630,
        alt: "Contact Pizza Logist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Pizza Logist – We're Here to Help",
    description:
      "Reach out to Pizza Logist for order support, feedback, or queries.",
    images: ["/welcomepizza.webp"],
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
