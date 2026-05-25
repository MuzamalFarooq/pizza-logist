"use client"
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';

export default function Home() {
  const { addToCart } = useCart();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAddToCart = (name, price) => {
    const item = { id: Date.now(), name, price };
    addToCart(item);
  };

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        console.log("Fetching menu from /api/menu...");
        const res = await fetch("/api/menu", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        console.log("Response status:", res.status);
        
        if (res.ok) {
          const data = await res.json();
          console.log("Menu data received:", data);
          setMenuItems(data.items || []);
          setError(null);
        } else {
          const errorData = await res.json();
          console.error("API Error:", errorData);
          setMenuItems([]);
          setError(errorData.error || "Failed to fetch menu");
        }
      } catch (err) {
        console.error("Error fetching menu:", err);
        setMenuItems([]);
        setError(err.message || "Connection error. Make sure MongoDB is running on localhost:27017");
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  // Define the order of categories we want to display
  const categoryOrder = [
    { id: "bestdeals", title: "Best Deals", key: "Best Deals" },
    { id: "Exploredeals", title: "Explore Deals", key: "Explore Deals" },
    { id: "jazzdeals", title: "Jazz Deals", key: "Jazz Deals" },
    { id: "midnightdeals", title: "Midnight Deals", key: "Midnight Deals" },
    { id: "bestseller", title: "Best Seller", key: "Best Seller" },
    { id: "discountdeals", title: "Appetizers", key: "Appetizers" },
    { id: "drinks", title: "Drinks", key: "Drinks" },
    { id: "dips", title: "Dips", key: "Dips" }
  ];

  // Helper to assign a default image based on category if none is uploaded
  const getDefaultImage = (category) => {
    switch (category) {
      case "Best Deals": return "/Deal 2 image.webp";
      case "Explore Deals": return "/hut deal.webp";
      case "Jazz Deals": return "/jazz deal.webp";
      case "Midnight Deals": return "/midnight deal.webp";
      case "Best Seller": return "/Chicken Fagita.webp";
      case "Appetizers": return "/appetizer platter.webp";
      case "Drinks": return "/pepsi bottle.webp";
      case "Dips": return "/deal 2 image.webp";
      default: return "/Deal 2 image.webp";
    }
  };

  const scrollLeft = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollBy({ left: -320, behavior: 'smooth' });
  };

  const scrollRight = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollBy({ left: 320, behavior: 'smooth' });
  };

  return (
    <>
      <div className='welcome flex flex-row overflow-x-auto snap-x snap-mandatory no-scrollbar relative border rounded-lg sm:rounded-xl border-black w-[calc(100%-0.5rem)] sm:w-[calc(100%-1rem)] h-40 sm:h-52 md:h-64 m-1 sm:m-2 mx-auto overflow-hidden'>
        <img className='w-full h-full object-cover shrink-0 snap-center' src="/welcomepizza.webp" alt="welcome pizza 1" />
        <img className='w-full h-full object-cover shrink-0 snap-center' src="/welcomepizza.webp" alt="welcome pizza 2" />
      </div>

      <div className="flex bg-white justify-center py-2 sm:py-3 md:py-4">
        <a href="#bestdeals" className='flex border border-black rounded-lg sm:rounded-xl px-6 sm:px-9 py-1.5 sm:py-2 text-sm sm:text-base hover:px-10 sm:hover:px-24 hover:text-white hover:font-bold transition-all bg-red-500 font-bold'>Order Now</a>
      </div>

      <div className='p-2 sm:p-4 m-1 sm:m-3'>
        <div className="flex p-2 sm:p-3 m-1 sm:m-3 justify-center w-full bg-white ">
          <div className="text-bold bg-black-600">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center"> Our Signature pizza </h2>
          </div>
        </div>
        {/* list of categories buttons  bellow our signature pizza  */}
        <div className="flex flex-row flex-wrap p-2 sm:p-3 m-1 sm:m-3 justify-center w-full gap-1 sm:gap-2 bg-white ">
          {categoryOrder.map(card => (
            <a key={card.id} className="buttoner border border-black rounded-lg sm:rounded-xl bg-red-500 hover:bg-gray-200 hover:scale-105 sm:hover:scale-110 duration-300 px-2 sm:px-3 py-1 sm:py-1.5 m-0.5 sm:m-1 text-xs sm:text-sm md:text-base text-black font-semibold transition-colors" href={`#${card.id}`}>
              {card.title}
            </a>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="flex justify-center py-20">
            <div className="max-w-md bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <h3 className="text-red-800 font-bold mb-2">⚠️ Error Loading Menu</h3>
              <p className="text-red-700 text-sm mb-3">{error}</p>
              <div className="text-red-700 text-xs mb-3">
                <p className="font-semibold mb-1">Troubleshooting steps:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Ensure MongoDB is running on localhost:27017</li>
                  <li>Check MONGODB_URI in .env.local</li>
                  <li>Check browser console (F12) for detailed errors</li>
                </ul>
              </div>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-semibold"
              >
                Retry
              </button>
            </div>
          </div>
        ) : (
          categoryOrder.map(card => {
            const items = menuItems.filter(item => item.category === card.key);
            if (items.length === 0) return null; // Don't render empty categories

            return (
              <div key={card.id} className="mb-6 sm:mb-10 w-full">
                <div className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-black mb-3 sm:mb-4 px-2 sm:px-3">{card.title}</div>

                <div className="relative group">
                  <button
                    onClick={() => scrollLeft(card.id)}
                    className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-red-600 rounded-full p-2 shadow-md border border-gray-100 opacity-0 group-hover:opacity-100 transition-all focus:outline-none"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                  </button>

                  <section id={card.id} className="flex flex-nowrap overflow-x-auto overflow-y-hidden pb-2 sm:pb-4 gap-2 sm:gap-4 px-1 sm:px-2 justify-start  snap-x no-scrollbar">
                    {items.map(item => (
                      <div key={item._id} className="box rounded-lg border bg-gray-100 border-black w-56 sm:w-64 md:w-72 shrink-0 snap-start flex flex-col overflow-hidden" style={{ height: 'auto', minHeight: '24rem' }}>
                        <div className="h-32 sm:h-40 md:h-44 w-full overflow-hidden shrink-0">
                          <img
                            className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                            src={item.image || getDefaultImage(item.category)}
                            alt={item.name}
                          />
                        </div>
                        <div className="flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-4 text-center flex-1 bg-white">
                          <h1 className="w-full font-bold text-sm sm:text-base md:text-lg leading-tight text-black line-clamp-2">{item.name}</h1>
                          <span className='font-semibold text-xs sm:text-sm md:text-base text-black'>PKR {item.price?.toLocaleString()}</span>
                          <p className="text-black text-xs sm:text-sm leading-snug line-clamp-3 overflow-hidden flex-1 w-full">{item.description}</p>

                          <button onClick={() => handleAddToCart(item.name, item.price)}
                            className="add-to-cart w-full mt-1 sm:mt-2 font-bold text-sm sm:text-base md:text-lg bg-[rgb(199,16,46)] hover:bg-red-700 text-white py-1.5 sm:py-2 transition duration-105 ease-in-out rounded-lg shadow-md">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </section>

                  <button
                    onClick={() => scrollRight(card.id)}
                    className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-red-600 rounded-full p-2 shadow-md border border-gray-100 opacity-0 group-hover:opacity-100 transition-all focus:outline-none"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
