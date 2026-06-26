"use client"
import React, { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext';
import PizzaLogisticsLoading from '@/components/PizzaLogisticsLoading';

const MenuClient = () => {
    const { addToCart } = useCart();
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleAddToCart = (name, price) => {
        const item = { id: Date.now(), name, price };
        addToCart(item);
    };

    const scrollLeft = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollBy({ left: -320, behavior: 'smooth' });
    };

    const scrollRight = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollBy({ left: 320, behavior: 'smooth' });
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
                
                if (res.ok) {
                    const data = await res.json();
                    setMenuItems(data.items || []);
                    setError(null);
                } else {
                    const errorData = await res.json();
                    setError(errorData.error || "Failed to fetch menu");
                }
            } catch (err) {
                console.error("Error fetching menu:", err);
                setError(err.message || "Connection error. Make sure MongoDB is running.");
            } finally {
                setLoading(false);
            }
        };
        fetchMenu();
    }, []);

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

    const getDefaultImage = (itemName, category) => {
        const name = itemName.toLowerCase();
        if (name.includes("pepperoni")) return "/Deal 2 image.webp";
        if (name.includes("fagita") || name.includes("fajita")) return "/Chicken Fagita.webp";
        if (name.includes("ranch")) return "/Spicy Chicken Ranch.webp";
        if (name.includes("veggie")) return "/very veggie.webp";
        if (name.includes("ramdan")) return "/ramdan deal 1.webp";
        if (name.includes("jazz")) return "/jazz deal.webp";
        if (name.includes("midnight")) return "/midnight deal.webp";
        if (name.includes("hut")) return "/hut deal.webp";
        if (name.includes("appetizer")) return "/appetizer platter.webp";
        if (name.includes("spin roll") || name.includes("spin rool")) return "/bihari chicken spin rool.webp";
        if (name.includes("wings")) return "/wings.webp";
        if (name.includes("wedges")) return "/patato wedges.webp";
        if (name.includes("aquafina") || name.includes("water")) return "/water bottel.webp";
        if (name.includes("pepsi")) return "/pepsi bottle.webp";
        if (name.includes("7 up") || name.includes("7up")) return "/7up bottle.webp";
        if (name.includes("mirinda") || name.includes("marinda")) return "/Mirinda bottle.webp";
        
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

    if (loading) {
        return <PizzaLogisticsLoading />;
    }

    if (error) {
        return (
            <div className="flex justify-center py-20 bg-gray-50 min-h-screen">
                <div className="max-w-md w-full bg-white border border-red-200 p-6 rounded-xl shadow-md">
                    <h3 className="text-red-700 font-bold text-lg mb-2 flex items-center gap-2">
                        <span>⚠️</span> Error Loading Menu
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition duration-150"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white py-6 sm:py-8 min-h-screen p-2 sm:p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-2">Our Full Menu</h1>
                <p className="text-center text-gray-500 mb-8">Fresh pizzas, deals, and more – delivered to your door</p>
                {categoryOrder.map(card => {
                    const items = menuItems.filter(item => item.category === card.key);
                    if (items.length === 0) return null;

                    return (
                        <div key={card.id} className="mb-8 sm:mb-12 w-full">
                            <h2 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-black mb-4 px-2">
                                {card.title}
                            </h2>

                            <div className="relative group">
                                <button
                                    onClick={() => scrollLeft(card.id)}
                                    className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white text-red-600 rounded-full p-2 shadow-md border border-gray-200 opacity-0 group-hover:opacity-100 transition-all focus:outline-none duration-200"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                <section 
                                    id={card.id} 
                                    aria-label={`${card.title} pizza category`}
                                    className="flex flex-nowrap overflow-x-auto overflow-y-hidden pb-4 gap-3 sm:gap-4 px-2 justify-start snap-x no-scrollbar"
                                >
                                    {items.map(item => (
                                        <article 
                                            key={item._id} 
                                            className="box rounded-xl border bg-gray-100 border-black w-56 sm:w-64 md:w-72 shrink-0 snap-start flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                                            style={{ height: 'auto', minHeight: '24rem' }}
                                        >
                                            <div className="h-32 sm:h-40 md:h-44 w-full overflow-hidden shrink-0">
                                                <img
                                                    className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                                                    src={item.image || getDefaultImage(item.name, item.category)}
                                                    alt={`${item.name} – Pizza Logist`}
                                                    loading="lazy"
                                                    width="288"
                                                    height="176"
                                                />
                                            </div>
                                            <div className="flex flex-col items-center gap-1 sm:gap-2 p-3 sm:p-4 text-center flex-1 bg-white">
                                                <h3 className="w-full font-bold text-sm sm:text-base md:text-lg leading-tight text-black line-clamp-2">{item.name}</h3>
                                                <span className='font-semibold text-xs sm:text-sm md:text-base text-black'>PKR {item.price?.toLocaleString()}</span>
                                                <p className="text-black text-xs sm:text-sm leading-snug line-clamp-3 overflow-hidden w-full">{item.description}</p>
                                                <button 
                                                    onClick={() => handleAddToCart(item.name, item.price)}
                                                    className="add-to-cart w-full mt-auto font-bold text-xs sm:text-sm md:text-base bg-[rgb(199,16,46)] hover:bg-red-700 text-white py-1.5 sm:py-2 transition duration-105 ease-in-out rounded-lg shadow-md"
                                                    aria-label={`Add ${item.name} to cart – PKR ${item.price}`}
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </article>
                                    ))}
                                </section>

                                <button
                                    onClick={() => scrollRight(card.id)}
                                    className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white text-red-600 rounded-full p-2 shadow-md border border-gray-200 opacity-0 group-hover:opacity-100 transition-all focus:outline-none duration-200"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MenuClient;
