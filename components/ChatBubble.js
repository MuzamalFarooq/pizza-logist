"use client";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { IoChatbubbleEllipses, IoClose, IoSend } from "react-icons/io5";
import { useSession } from "next-auth/react";

export default function ChatBubble() {
    const { data: session } = useSession();
    const [activeOrder, setActiveOrder] = useState(null);

    // Hide chat bubble if logged in as admin
    if (session?.user?.role === "admin") return null;
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef(null);
    const chatEndRef = useRef(null);

    // Load active order details
    const loadActiveOrder = () => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("pizza_logist_active_order");
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    setActiveOrder(parsed);
                    // Load chat history
                    const history = localStorage.getItem(`chat_history_${parsed.orderId}`);
                    if (history) {
                        setMessages(JSON.parse(history));
                    } else {
                        // Default welcome message
                        const welcomeMsg = {
                            sender: "restaurant",
                            text: `Hi ${parsed.customerName || 'there'}! Thanks for your order. We are preparing your delicious pizza. Let us know if you have any questions!`,
                            createdAt: new Date().toISOString()
                        };
                        setMessages([welcomeMsg]);
                        localStorage.setItem(`chat_history_${parsed.orderId}`, JSON.stringify([welcomeMsg]));
                    }
                } catch (e) {
                    console.error("Error parsing active order:", e);
                }
            } else {
                setActiveOrder(null);
            }
        }
    };

    useEffect(() => {
        loadActiveOrder();

        const handleOrderChange = () => {
            loadActiveOrder();
        };

        window.addEventListener("activeOrderChanged", handleOrderChange);
        return () => {
            window.removeEventListener("activeOrderChanged", handleOrderChange);
        };
    }, []);

    // Verify order status on mount or when orderId changes
    useEffect(() => {
        if (!activeOrder?.orderId) return;

        const checkOrderStatus = async () => {
            try {
                const res = await fetch(`/api/orders?orderId=${activeOrder.orderId}`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.order?.status === "delivered" || data.order?.status === "cancelled") {
                        console.log(`Order already ${data.order.status}. Clearing active chat.`);
                        localStorage.removeItem("pizza_logist_active_order");
                        setActiveOrder(null);
                        setIsOpen(false);
                    }
                }
            } catch (err) {
                console.error("Error checking order status:", err);
            }
        };

        checkOrderStatus();
    }, [activeOrder?.orderId]);

    // Set up Socket.io connection when activeOrder is present
    useEffect(() => {
        if (!activeOrder?.orderId) {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
            return;
        }

        // Connect to Socket.io server
        const socket = io();
        socketRef.current = socket;

        socket.on("connect", () => {
            setIsConnected(true);
            socket.emit("join_room", activeOrder.orderId);
        });

        socket.on("disconnect", () => {
            setIsConnected(false);
        });

        socket.on("receive_message", (message) => {
            setMessages((prev) => {
                const updated = [...prev, message];
                localStorage.setItem(`chat_history_${activeOrder.orderId}`, JSON.stringify(updated));
                return updated;
            });
        });

        socket.on("order_status_updated", ({ status }) => {
            if (status === "delivered" || status === "cancelled") {
                alert(`Your order has been ${status}. The support chat has ended.`);
                localStorage.removeItem("pizza_logist_active_order");
                setActiveOrder(null);
                setIsOpen(false);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [activeOrder?.orderId]);

    // Scroll to bottom when messages change or window opens
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputText.trim() || !socketRef.current || !activeOrder?.orderId) return;

        const messageData = {
            orderId: activeOrder.orderId,
            sender: "customer",
            text: inputText.trim()
        };

        // Send to socket server
        socketRef.current.emit("send_message", messageData);
        setInputText("");
    };

    // Clear active order / close chat session
    const handleEndChat = () => {
        if (confirm("Are you sure you want to close this chat session? This will hide the chat bubble.")) {
            if (activeOrder?.orderId) {
                localStorage.removeItem("pizza_logist_active_order");
            }
            setActiveOrder(null);
            setIsOpen(false);
            setMessages([]);
        }
    };

    if (!activeOrder) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-80 sm:w-96 h-112.5 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
                    {/* Header */}
                    <div className="bg-linear-to-r from-red-600 to-orange-500 p-4 text-white flex justify-between items-center shrink-0">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg">
                                🍕
                            </div>
                            <div>
                                <h3 className="font-bold text-sm leading-tight text-white">Pizza Logist Support</h3>
                                <p className="text-[10px] opacity-80 flex items-center gap-1 text-white">
                                    <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? "bg-green-400" : "bg-red-400"}`}></span>
                                    {isConnected ? "Connected (Order Chat)" : "Connecting..."}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <button 
                                onClick={handleEndChat} 
                                className="text-white/80 hover:text-white text-xs font-semibold px-2 py-1 bg-black/10 rounded hover:bg-black/20"
                                title="End Chat Session"
                            >
                                End Session
                            </button>
                            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200 p-1">
                                <IoClose size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Order Info Bar */}
                    <div className="bg-orange-50/80 px-4 py-2 border-b border-orange-100 text-[11px] text-orange-800 shrink-0 flex justify-between">
                        <span>Order: <strong className="font-mono">#{activeOrder.orderId.slice(-6).toUpperCase()}</strong></span>
                        <span>Customer: <strong>{activeOrder.customerName}</strong></span>
                    </div>

                    {/* Messages Body */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50/50 space-y-3 flex flex-col">
                        {messages.map((msg, index) => {
                            const isMe = msg.sender === "customer";
                            return (
                                <div
                                    key={index}
                                    className={`flex flex-col max-w-[75%] ${isMe ? "self-end items-end" : "self-start items-start"}`}
                                >
                                    <div className={`rounded-2xl px-4 py-2 text-sm ${
                                        isMe 
                                            ? "bg-red-600 text-white rounded-br-none" 
                                            : "bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm"
                                    }`}>
                                        <p className="wrap-break-words">{msg.text}</p>
                                    </div>
                                    <span className="text-[9px] text-gray-400 mt-1 px-1">
                                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            );
                        })}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Input Footer */}
                    <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-100 bg-white flex gap-2 shrink-0">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Ask restaurant about your order..."
                            className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 text-black placeholder-gray-400 bg-white"
                        />
                        <button
                            type="submit"
                            disabled={!inputText.trim()}
                            className="bg-red-600 text-white p-2 rounded-xl hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                        >
                            <IoSend size={18} />
                        </button>
                    </form>
                </div>
            )}

            {/* Chat Bubble Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-14 h-14 bg-linear-to-r from-red-600 to-orange-500 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 relative group animate-bounce cursor-pointer border-none"
                    style={{ animationDuration: '3s' }}
                >
                    <IoChatbubbleEllipses size={26} />
                    {/* Pulsing indicator */}
                    <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500"></span>
                    </span>
                    {/* Tooltip */}
                    <span className="absolute right-16 bg-gray-950 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md">
                        Chat with Restaurant 🍕
                    </span>
                </button>
            )}
        </div>
    );
}
