"use client"
import { useState, useRef, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
    const { data: session } = useSession();
    const { cart, toggleCart, addToCart } = useCart();
    const [searchQuery, setSearchQuery] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const searchRef = useRef(null);

    const fetchMenu = async () => {
        try {
            console.log("Navbar: Fetching menu from /api/menu...");
            const res = await fetch("/api/menu", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("Navbar: Response status:", res.status);
            
            if (res.ok) {
                const data = await res.json();
                console.log("Navbar: Menu data received:", data);
                setMenuItems(data.items || []);
            } else {
                const errorData = await res.json();
                console.error("Navbar: API Error:", errorData);
            }
        } catch (err) {
            console.error("Navbar: Error fetching menu:", err);
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        
        fetchMenu();

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Filter pizzas by name or price
    const filteredResults = searchQuery.trim().length > 0
        ? menuItems.filter((item) => {
            const q = searchQuery.toLowerCase();
            return (
                item.name?.toLowerCase().includes(q) ||
                item.price?.toString().includes(q) ||
                item.category?.toLowerCase().includes(q)
            );
        })
        : [];

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setShowDropdown(true);
    };

    const handleAddFromSearch = (item) => {
        addToCart({ id: Date.now(), name: item.name, price: item.price });
        setSearchQuery("");
        setShowDropdown(false);
    };

    // Highlight matching text
    const highlightMatch = (text, query) => {
        if (!query.trim()) return text;
        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        const parts = text.split(regex);
        return parts.map((part, i) =>
            regex.test(part)
                ? <mark key={i} className="bg-yellow-300 text-black rounded-sm px-0.5">{part}</mark>
                : part
        );
    };

  

    return (
        <>
            <div className='navbar sticky top-0 z-50 flex h-12 sm:h-14 md:h-16 m-1 sm:m-2 rounded-lg sm:rounded-2xl justify-between items-center px-2 sm:px-3 md:px-4 gap-2 sm:gap-3'
                style={{ backgroundImage: "url('/welcomepizza.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }}>

                {/* Animated Logo */}
                <Link href="/" className="flex items-center gap-1 sm:gap-2 group cursor-pointer">
                    <div className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-linear-to-br from-yellow-400 to-red-600 shadow-lg group-hover:shadow-red-500/50 transition-all duration-300 transform group-hover:rotate-12 group-hover:scale-110 shrink-0">
                        <span className="text-lg sm:text-xl animate-[spin_6s_linear_infinite] inline-block origin-center">🍕</span>
                    </div>
                    <div className=" flex-col hidden sm:flex">
                        <span className="text-white font-black text-sm sm:text-lg tracking-wider uppercase leading-none" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}>Pizza</span>
                        <span className="text-yellow-400 font-extrabold text-[9px] sm:text-[11px] tracking-widest uppercase leading-none mt-0.5" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.6)' }}>Logist</span>
                    </div>
                </Link>

                {/* Search Bar */}
                <div className="relative flex-1 max-w-xs sm:max-w-md mx-1 sm:mx-3" ref={searchRef}>
                    <div className="relative w-full">
                        <svg className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            id="navbar-search"
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onFocus={() => {
                                if (searchQuery.trim()) setShowDropdown(true);
                                fetchMenu();
                            }}
                            placeholder="Search pizza, deals, price..."
                            className="w-full pl-10 pr-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-sm text-black placeholder-gray-500 border-2 border-transparent focus:border-red-500 focus:outline-none transition-all duration-200"
                        />
                    </div>

                    {/* Dropdown Results */}
                    {showDropdown && searchQuery.trim().length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-80 overflow-y-auto z-50"
                            style={{ animation: 'fadeSlideDown 0.2s ease-out' }}>

                            {filteredResults.length === 0 ? (
                                <div className="p-4 text-center text-gray-500 text-sm">
                                    <span className="text-2xl block mb-1">🍕</span>
                                    No items found for &quot;{searchQuery}&quot;
                                </div>
                            ) : (
                                <>
                                    <div className="px-3 py-2 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                                        {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} found
                                    </div>
                                    {filteredResults.map((item, index) => (
                                        <div key={index}
                                            className="flex items-center justify-between px-3 py-2.5 hover:bg-red-50 cursor-pointer transition-colors duration-150 border-b border-gray-50 last:border-b-0 group"
                                            onClick={() => handleAddFromSearch(item)}>

                                            <div className="flex-1 min-w-0">
                                                <div className="font-semibold text-sm text-gray-900 truncate">
                                                    {highlightMatch(item.name, searchQuery)}
                                                </div>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-xs font-medium text-red-600">
                                                        PKR {highlightMatch(item.price.toFixed(2), searchQuery)}
                                                    </span>
                                                    <span className="text-xs text-gray-400">•</span>
                                                    <span className="text-xs text-gray-500">{item.category}</span>
                                                </div>
                                                <p className="text-xs text-gray-400 truncate mt-0.5">{item.description}</p>
                                            </div>

                                            <button
                                                className="ml-2 shrink-0 bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleAddFromSearch(item);
                                                }}>
                                                + Add
                                            </button>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    )}
                </div>

                {/* Cart */}
                <div className="shoping cart text-white">
                    <button onClick={toggleCart} type="button" className="relative flex items-center justify-center rounded-full bg-white/80 p-2">
                        <img className="h-6 w-6 object-contain" src="shopping-cart.png" alt="cart"></img>
                        <span className="absolute -right-2 -top-2 rounded-full bg-red-600 px-2 py-0.5 text-xs font-semibold text-white">{cart.length}</span>
                    </button>
                </div>

                {/* Nav Links - Desktop */}
                <div className='hidden md:flex gap-1 items-center'>
                    <Link href="/">
                        <button className='hover:text-red-500 text-white px-2 py-1 text-xs lg:text-sm font-extrabold transition-colors'>Home</button>
                    </Link>
                    <Link href="/Menu">
                        <button className='hover:text-red-500 text-white px-2 py-1 text-xs lg:text-sm font-extrabold transition-colors'>Menu</button>
                    </Link>
                    <Link href="/About">
                        <button className='hover:text-red-500 text-white px-2 py-1 text-xs lg:text-sm font-extrabold transition-colors'>About</button>
                    </Link>
                    <Link href="/Contact">
                        <button className='hover:text-red-500 text-white px-2 py-1 text-xs lg:text-sm font-extrabold transition-colors'>Contact</button>
                    </Link>
                    <Link href="/Dashboard">
                        <button className='hover:text-red-500 text-white px-2 py-1 text-xs lg:text-sm font-extrabold transition-colors'>Dashboard</button>
                    </Link>
                </div>

                {/* Auth Section - Desktop */}
                <div className='hidden md:flex items-center gap-2'>
                    {session ? (
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/30 transition-all duration-300 hover:bg-white/30 group">
                            {session.user.image ? (
                                <img 
                                    src={session.user.image} 
                                    alt={session.user.name} 
                                    className="w-6 h-6 rounded-full border-2 border-red-500 shadow-lg transition-transform duration-300 group-hover:scale-110"
                                />
                            ) : (
                                <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                                    {session.user.name?.[0] || 'U'}
                                </div>
                            )}
                            <button 
                                onClick={() => signOut()}
                                className="text-white text-xs font-bold hover:text-red-300 transition-colors duration-200"
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <button 
                            onClick={() => signIn()}
                            className="relative overflow-hidden group px-3 md:px-4 lg:px-6 py-1.5 md:py-2 rounded-full bg-red-600 text-white text-xs md:text-sm font-extrabold shadow-lg transition-all duration-300 hover:bg-red-700 hover:shadow-red-500/50 active:scale-95"
                        >
                            <span className="relative z-10">Sign In</span>
                        </button>
                    )}
                </div>

                {/* Hamburger Menu - Mobile/Tablet */}
                <button 
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                    className='md:hidden flex items-center justify-center w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 transition-all'
                >
                    {showMobileMenu ? (
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu Drawer */}
            {showMobileMenu && (
                <div className='md:hidden bg-red-600 border-t-2 border-red-700 animate-in slide-in-from-top-2'>
                    <div className='flex flex-col gap-0 p-2'>
                        <Link href="/">
                            <button onClick={() => setShowMobileMenu(false)} className='hover:bg-red-700 text-white w-full text-left px-4 py-2 rounded text-sm font-semibold transition-colors'>Home</button>
                        </Link>
                        <Link href="/Menu">
                            <button onClick={() => setShowMobileMenu(false)} className='hover:bg-red-700 text-white w-full text-left px-4 py-2 rounded text-sm font-semibold transition-colors'>Menu</button>
                        </Link>
                        <Link href="/About">
                            <button onClick={() => setShowMobileMenu(false)} className='hover:bg-red-700 text-white w-full text-left px-4 py-2 rounded text-sm font-semibold transition-colors'>About</button>
                        </Link>
                        <Link href="/Contact">
                            <button onClick={() => setShowMobileMenu(false)} className='hover:bg-red-700 text-white w-full text-left px-4 py-2 rounded text-sm font-semibold transition-colors'>Contact</button>
                        </Link>
                        <Link href="/Dashboard">
                            <button onClick={() => setShowMobileMenu(false)} className='hover:bg-red-700 text-white w-full text-left px-4 py-2 rounded text-sm font-semibold transition-colors'>Dashboard</button>
                        </Link>
                        
                        <div className='border-t border-red-500 my-2'></div>
                        
                        {session ? (
                            <div className="flex items-center gap-2 px-4 py-2">
                                {session.user.image ? (
                                    <img 
                                        src={session.user.image} 
                                        alt={session.user.name} 
                                        className="w-6 h-6 rounded-full border-2 border-white shadow-lg"
                                    />
                                ) : (
                                    <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-red-600 text-xs font-bold border-2 border-white shadow-lg">
                                        {session.user.name?.[0] || 'U'}
                                    </div>
                                )}
                                <span className='text-white text-sm font-semibold flex-1'>{session.user.name}</span>
                                <button 
                                    onClick={() => { signOut(); setShowMobileMenu(false); }}
                                    className="text-white text-xs font-bold px-3 py-1 bg-red-700 rounded hover:bg-red-800 transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button 
                                onClick={() => { signIn(); setShowMobileMenu(false); }}
                                className="w-full mx-4 px-4 py-2 bg-yellow-400 text-red-600 rounded-lg text-sm font-bold hover:bg-yellow-300 transition-colors"
                            >
                                Sign In
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Dropdown animation keyframes */}
            <style jsx>{`
                @keyframes fadeSlideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-8px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </>
    )
}

export default Navbar
