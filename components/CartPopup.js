"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CartPopup() {
    const { cart, isOpen, toggleCart, removeFromCart, clearCart } = useCart();
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [customerName, setCustomerName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");

    if (!isOpen) return null;

    const totalprice = cart.reduce((total, item) => total + item.price, 0);

    const OrderNow = () => {
        if (cart.length === 0) return;
        setShowForm(true);
    };

    const handleConfirmOrder = async (e) => {
        e.preventDefault();

        if (!customerName.trim() || !phoneNumber.trim() || !address.trim()) {
            toast.error('Please fill in all fields!', {
                position: "top-right",
                autoClose: 3000,
                theme: "light",
                transition: Bounce,
            });
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customerName: customerName.trim(),
                    phoneNumber: phoneNumber.trim(),
                    address: address.trim(),
                    items: cart.map((item) => ({
                        name: item.name,
                        price: item.price,
                    })),
                    totalPrice: totalprice,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('🍕 Order placed successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    transition: Bounce,
                });

                // Save active order details to localStorage for chat
                if (data.orderId) {
                    localStorage.setItem("pizza_logist_active_order", JSON.stringify({
                        orderId: data.orderId,
                        customerName: customerName.trim(),
                        phoneNumber: phoneNumber.trim()
                    }));
                    window.dispatchEvent(new Event("activeOrderChanged"));
                }

                // Reset form
                setCustomerName("");
                setPhoneNumber("");
                setAddress("");
                setShowForm(false);
                clearCart();
                toggleCart(); // Close the cart modal
            } else {
                toast.error(data.error || 'Failed to place order!', {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "light",
                    transition: Bounce,
                });
            }
        } catch (error) {
            toast.error('Network error. Please try again!', {
                position: "top-right",
                autoClose: 3000,
                theme: "light",
                transition: Bounce,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="cart-container fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-2 sm:p-4">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />

            <div className="cart-modal w-full max-w-sm sm:max-w-md md:max-w-lg max-h-[85vh] overflow-y-auto bg-white rounded-lg sm:rounded-xl shadow-2xl p-3 sm:p-5">
                <button onClick={() => { toggleCart(); setShowForm(false); }} className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-200 rounded text-sm">
                    <img src="/close.svg" alt="Close" className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <h1 className='font-bold text-2xl sm:text-3xl md:text-4xl text-center mt-2 sm:mt-3'>Cart</h1>

                {cart.length === 0 ? (
                    <div className="text-center py-6">
                        <img className="w-24 sm:w-32 md:w-40 mx-auto mb-4" src="/pizza box.svg" alt="Empty Cart" />
                        <span className="font-bold text-sm sm:text-lg md:text-xl text-center block">"Oops! Your cart is empty. 😞 Hungry yet? Choose from our mouthwatering pizzas and start filling up your cart!"</span>
                    </div>
                ) : (
                    <>
                        <table className="table-auto w-full rounded-md overflow-hidden mb-3 sm:mb-4 text-xs sm:text-sm">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-1.5 sm:py-2 px-1 sm:px-2'>Pizza</th>
                                    <th className='py-1.5 sm:py-2 px-1 sm:px-2'>Price</th>
                                    <th className='py-1.5 sm:py-2 px-1 sm:px-2'>Delete</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {cart.map((item, index) => (
                                    <tr key={index}>
                                        <td className='text-center py-1.5 sm:py-2 px-1 sm:px-2 text-xs sm:text-sm'>
                                            {item.name}
                                        </td>
                                        <td className='text-center py-1.5 sm:py-2 px-1 sm:px-2 text-xs sm:text-sm'>
                                            PKR {item.price}
                                        </td>
                                        <td className='text-center py-1.5 sm:py-2 px-1 sm:px-2'>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/jzinekkv.json"
                                                    trigger="hover"
                                                    stroke="bold"
                                                >
                                                </lord-icon>

                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <h2 className='bg-green-800 text-white text-right p-2 font-bold'>
                            Total Price: PKR {totalprice}
                        </h2>

                        {!showForm ? (
                            <button onClick={OrderNow} className='w-full mt-4 bg-green-500 text-white py-2 rounded hover:bg-green-600'>
                                Order Now
                            </button>
                        ) : (
                            <form onSubmit={handleConfirmOrder} className="mt-4 space-y-3">
                                <h3 className="font-bold text-xl text-center text-green-800">📋 Delivery Details</h3>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        placeholder="Enter your name"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="03XX-XXXXXXX"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Delivery Address</label>
                                    <textarea
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Enter your full delivery address"
                                        rows={2}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                                        required
                                    />
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="w-1/3 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-semibold"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-2/3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? "Placing Order..." : "✅ Confirm Order"}
                                    </button>
                                </div>
                            </form>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}