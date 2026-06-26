import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionWrapper from "@/app/component/SessionWrapper";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import CartPopup from "@/components/CartPopup";
import ChatBubble from "@/components/ChatBubble";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://www.pizzalogist.com";

export const metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Pizza Logist | Best Pizza Delivery in Pakistan",
    template: "%s | Pizza Logist",
  },
  description:
    "Order the freshest, most delicious pizzas online from Pizza Logist. Best pizza deals, midnight deals, jazz deals & more. Fast delivery across Lahore, Karachi, Islamabad & Multan, Pakistan.",
  keywords: [
    "pizza",
    "pizza delivery",
    "pizza Pakistan",
    "best pizza Lahore",
    "best pizza Karachi",
    "best pizza Islamabad",
    "pizza deals",
    "pizza online order",
    "pizza near me",
    "midnight pizza deals",
    "jazz pizza deals",
    "pizza best seller",
    "chicken fajita pizza",
    "stuffed cheese crust pizza",
    "pizza logist",
    "pizza restaurant Pakistan",
    "order pizza online Pakistan",
    "pizza delivery Lahore",
    "pizza delivery Karachi",
    "pizza delivery Islamabad",
    "pizza delivery Multan",
    "appetizers",
    "pizza dips",
    "pizza drinks",
    "discount pizza deals",
    "explore pizza deals",
  ],

  authors: [{ name: "Muzamal Farooq", url: siteUrl }],
  creator: "Muzamal Farooq",
  publisher: "Pizza Logist",
  category: "Food & Restaurant",

  icons: {
    icon: "/pizza-favicon.png",
    shortcut: "/pizza-favicon.png",
    apple: "/pizza-favicon.png",
  },

  manifest: "/manifest.json",

  alternates: {
    canonical: siteUrl,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_PK",
    url: siteUrl,
    siteName: "Pizza Logist",
    title: "Pizza Logist | Best Pizza Delivery in Pakistan",
    description:
      "Order the freshest, most delicious pizzas online from Pizza Logist. Best pizza deals, midnight deals, jazz deals & more. Fast delivery across Lahore, Karachi, Islamabad & Multan.",
    images: [
      {
        url: "/welcomepizza.webp",
        width: 1200,
        height: 630,
        alt: "Pizza Logist – Delicious Pizza Delivered to Your Door",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Pizza Logist | Best Pizza Delivery in Pakistan",
    description:
      "Order fresh, hot pizzas online. Best deals, fast delivery across Pakistan.",
    images: ["/welcomepizza.webp"],
    creator: "@PizzaLogist",
  },

  verification: {
    // google: "YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE",  // ← Add your code here after verifying in Google Search Console
    // bing: "YOUR_BING_WEBMASTER_VERIFICATION_CODE",
  },
};

// JSON-LD Structured Data – Restaurant + LocalBusiness
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Restaurant", "LocalBusiness"],
      "@id": `${siteUrl}/#restaurant`,
      name: "Pizza Logist",
      description:
        "Pizza Logist serves the finest quality pizzas with authentic flavors and innovative recipes. Operating 34+ branches across Pakistan since 2015.",
      url: siteUrl,
      telephone: "+923067774327",
      email: "muzamalfarooq111@gmail.com",
      foundingDate: "2015",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
      image: `${siteUrl}/welcomepizza.webp`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Johar Town",
        addressLocality: "Lahore",
        addressRegion: "Punjab",
        addressCountry: "PK",
        postalCode: "54782",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 31.469693,
        longitude: 74.2728461,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "09:00",
          closes: "24:00",
        },
      ],
      servesCuisine: ["Pizza", "Italian", "Fast Food"],
      priceRange: "PKR 500 – PKR 3000",
      currenciesAccepted: "PKR",
      paymentAccepted: "Cash, Online Payment",
      hasMap: "https://maps.app.goo.gl/TDyKsStkjndEJqHC7",
      sameAs: [
        "https://www.instagram.com/pizzalogist",
        "https://www.facebook.com/pizzalogist",
      ],
      areaServed: [
        { "@type": "City", name: "Lahore" },
        { "@type": "City", name: "Karachi" },
        { "@type": "City", name: "Islamabad" },
        { "@type": "City", name: "Multan" },
      ],
      numberOfLocations: 34,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.7",
        reviewCount: "1250",
        bestRating: "5",
        worstRating: "1",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Pizza Logist Menu",
        itemListElement: [
          { "@type": "Offer", name: "Best Deals" },
          { "@type": "Offer", name: "Midnight Deals" },
          { "@type": "Offer", name: "Jazz Deals" },
          { "@type": "Offer", name: "Explore Deals" },
          { "@type": "Offer", name: "Best Seller Pizzas" },
          { "@type": "Offer", name: "Appetizers" },
          { "@type": "Offer", name: "Drinks" },
          { "@type": "Offer", name: "Dips" },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Pizza Logist",
      description: "Best Pizza Delivery in Pakistan",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/Menu?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#c7102e" />
        <meta name="msapplication-TileColor" content="#c7102e" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} bg-white`}>
        <SessionWrapper>
          <CartProvider>
            <Navbar />
            <CartPopup />
            <ChatBubble />
            <div>
              {children}
              <script src="https://cdn.lordicon.com/lordicon.js"></script>
              <Footer />
            </div>
          </CartProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
