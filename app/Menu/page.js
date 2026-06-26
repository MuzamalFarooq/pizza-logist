// Server Component wrapper – exports metadata for SEO
import MenuClient from "./MenuClient";

export const metadata = {
  title: "Full Menu – Best Pizza Deals, Midnight Deals & More",
  description:
    "Explore the full Pizza Logist menu. Order Best Deals, Jazz Deals, Midnight Deals, Best Seller pizzas, Appetizers, Drinks & Dips online. Fresh pizza delivery in Pakistan.",
  keywords: [
    "pizza menu Pakistan",
    "pizza deals Pakistan",
    "best pizza deals Lahore",
    "midnight pizza deals",
    "jazz pizza deals",
    "explore pizza deals",
    "best seller pizza",
    "chicken fajita pizza",
    "stuffed cheese crust pizza",
    "pizza appetizers",
    "pizza drinks Pakistan",
    "pizza dips",
    "online pizza order menu",
    "pizza price Pakistan PKR",
    "pizza delivery menu Lahore",
    "pizza delivery menu Karachi",
  ],
  alternates: {
    canonical: "https://www.pizzalogist.com/Menu",
  },
  openGraph: {
    type: "website",
    url: "https://www.pizzalogist.com/Menu",
    siteName: "Pizza Logist",
    title: "Pizza Logist Menu – Best Deals, Midnight Deals & More",
    description:
      "Browse our full menu of signature pizzas, deals, appetizers, drinks & dips. Order online for fast delivery across Pakistan.",
    images: [
      {
        url: "/stuffed cheese crust.webp",
        width: 1200,
        height: 630,
        alt: "Pizza Logist Menu – Stuffed Cheese Crust Pizza",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pizza Logist Menu – Best Deals, Midnight Deals & More",
    description:
      "Browse our full menu of signature pizzas, deals, appetizers, drinks & dips.",
    images: ["/stuffed cheese crust.webp"],
  },
};

export default function MenuPage() {
  return <MenuClient />;
}