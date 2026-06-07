"use client";
import { useState, useEffect, useCallback } from "react";

const STATUS_COLORS = {
  pending:           { bg: "bg-yellow-100", text: "text-yellow-700", dot: "bg-yellow-400", ring: "ring-yellow-300" },
  preparing:         { bg: "bg-blue-100",   text: "text-blue-700",   dot: "bg-blue-400",   ring: "ring-blue-300"   },
  "out for delivery":{ bg: "bg-purple-100", text: "text-purple-700", dot: "bg-purple-400", ring: "ring-purple-300" },
  delivered:         { bg: "bg-green-100",  text: "text-green-700",  dot: "bg-green-500",  ring: "ring-green-300"  },
  cancelled:         { bg: "bg-red-100",    text: "text-red-700",    dot: "bg-red-400",    ring: "ring-red-300"    },
};

const STATUSES = ["pending", "preparing", "out for delivery", "delivered", "cancelled"];

/* ─── Stat Card ──────────────────────────────────────────────────── */
function StatCard({ icon, label, value, sub, gradient }) {
  return (
    <div className={`rounded-2xl p-5 text-white shadow-lg ${gradient} flex flex-col gap-1 hover:scale-[1.02] transition-transform duration-200`}>
      <div className="text-3xl">{icon}</div>
      <p className="text-sm font-medium opacity-80">{label}</p>
      <p className="text-3xl font-extrabold">{value}</p>
      {sub && <p className="text-xs opacity-70">{sub}</p>}
    </div>
  );
}

/* ─── Order Row ───────────────────────────────────────── */
function OrderRow({ order, onStatusChange, updating }) {
  const sc = STATUS_COLORS[order.status] || STATUS_COLORS.pending;
  const dateStr = new Date(order.createdAt).toLocaleString("en-PK", {
    month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  return (
    <tr className="border-b border-gray-100 hover:bg-red-50/40 transition-colors duration-150 group">
      <td className="px-4 py-3 text-xs text-gray-400 font-mono">#{order._id.slice(-6).toUpperCase()}</td>
      <td className="px-4 py-3">
        <p className="font-semibold text-gray-900 text-sm">{order.customerName}</p>
        <p className="text-xs text-gray-400">{order.phoneNumber}</p>
      </td>
      <td className="px-4 py-3 text-xs text-gray-500 max-w-35 truncate">{order.address}</td>
      <td className="px-4 py-3">
        <ul className="space-y-0.5">
          {order.items.map((it, i) => (
            <li key={i} className="text-xs text-gray-600">
              {it.name} <span className="text-gray-400">— PKR {it.price.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </td>
      <td className="px-4 py-3 font-bold text-sm text-red-700">PKR {order.totalPrice?.toLocaleString()}</td>
      <td className="px-4 py-3">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${sc.bg} ${sc.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
          {order.status}
        </span>
      </td>
      <td className="px-4 py-3 text-xs text-gray-400">{dateStr}</td>
      <td className="px-4 py-3">
        <select
          disabled={updating === order._id}
          value={order.status}
          onChange={(e) => onStatusChange(order._id, e.target.value)}
          className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer disabled:opacity-50"
        >
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </td>
    </tr>
  );
}

/* ─── Pizza Row ──────────────────────────────────────────────────── */
function PizzaRow({ pizza, onEdit, onDelete }) {
  return (
    <tr className="border-b border-gray-100 hover:bg-red-50/40 transition-colors duration-150 group">
      <td className="px-4 py-3 flex items-center gap-3">
        {pizza.image ? (
          <img src={pizza.image} alt={pizza.name} className="w-10 h-10 rounded-lg object-cover bg-gray-100 border border-gray-200 shrink-0" />
        ) : (
          <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-lg shrink-0">🍕</div>
        )}
        <div>
          <p className="font-semibold text-gray-900 text-sm">{pizza.name}</p>
          <p className="text-xs text-gray-500 line-clamp-1 max-w-50">{pizza.description}</p>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">
        <span className="bg-gray-100 px-2 py-1 rounded-md text-xs font-medium">{pizza.category}</span>
      </td>
      <td className="px-4 py-3 font-bold text-sm text-red-700">PKR {pizza.price?.toLocaleString()}</td>
      <td className="px-4 py-3 text-right">
        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(pizza)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">✏️</button>
          <button onClick={() => onDelete(pizza._id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">🗑️</button>
        </div>
      </td>
    </tr>
  );
}

/* ─── Pizza Modal ────────────────────────────────────────────────── */
function PizzaModal({ isOpen, onClose, pizza, onSave }) {
  const [formData, setFormData] = useState({ name: "", price: "", category: "Best Deals", description: "", image: null });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(pizza || { name: "", price: "", category: "Best Deals", description: "", image: null });
    }
  }, [pizza, isOpen]);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        alert("Image must be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, image: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await onSave(formData);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-lg text-gray-900">{pizza ? "Edit Item" : "Add New Item"}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Name</label>
            <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-red-400 outline-none" placeholder="e.g. Chicken Fajita" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Price (PKR)</label>
              <input required type="number" min="0" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-red-400 outline-none" placeholder="e.g. 1999" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Category</label>
              <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-red-400 outline-none">
                <option value="Best Deals">Best Deals</option>
                <option value="Explore Deals">Explore Deals</option>
                <option value="Jazz Deals">Jazz Deals</option>
                <option value="Midnight Deals">Midnight Deals</option>
                <option value="Best Seller">Best Seller</option>
                <option value="Appetizers">Appetizers</option>
                <option value="Drinks">Drinks</option>
                <option value="Dips">Dips</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
              <textarea rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-red-400 outline-none" placeholder="Short description..." />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Pizza Image</label>
              {formData.image ? (
                <div className="relative w-full h-20 rounded-xl border border-gray-200 overflow-hidden group">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button type="button" onClick={removeImage} className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-lg">Remove</button>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center">
                    <svg className="w-6 h-6 text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <p className="text-[10px] text-gray-500 font-semibold">Upload Image</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
              )}
            </div>
          </div>
          <div className="pt-2 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">Cancel</button>
            <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors disabled:opacity-50">
              {saving ? "Saving..." : "Save Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── Sidebar Nav Item ───────────────────────────────────────────── */
function NavItem({ icon, label, active, onClick, badge }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-semibold text-sm transition-all duration-200 group relative ${
        active
          ? "bg-linear-to-r from-red-600 to-orange-500 text-black shadow-lg shadow-red-500/30"
          : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
      {badge != null && (
        <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${
          active ? "bg-white/20 text-white" : "bg-red-100 text-red-600"
        }`}>
          {badge}
        </span>
      )}
      {active && (
        <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white/40 rounded-l-full" />
      )}
    </button>
  );
}

/* ─── Main Dashboard ─────────────────────────────────────────────── */
export default function RestaurantDashboard() {
  const [orders, setOrders]       = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [updating, setUpdating]   = useState(null);
  const [tab, setTab]             = useState("all");
  const [search, setSearch]       = useState("");
  const [lastRefresh, setLastRefresh] = useState(null);
  const [activeSection, setActiveSection] = useState("orders"); // "orders" | "analytics" | "pizzas"

  // Menu State
  const [menuItems, setMenuItems] = useState([]);
  const [loadingMenu, setLoadingMenu] = useState(true);
  const [menuSearch, setMenuSearch] = useState("");
  const [showPizzaModal, setShowPizzaModal] = useState(false);
  const [editingPizza, setEditingPizza] = useState(null);

  /* fetch */
  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/orders");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setOrders(data.orders || []);
      setLastRefresh(new Date());
      setError(null);
    } catch {
      setError("Could not load orders. Check your connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMenu = useCallback(async () => {
    try {
      const res = await fetch("/api/menu");
      if (!res.ok) throw new Error("Failed to fetch menu");
      const data = await res.json();
      setMenuItems(data.items || []);
    } catch {
      console.error("Could not load menu");
    } finally {
      setLoadingMenu(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    fetchMenu();
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, [fetchOrders, fetchMenu]);

  /* status update */
  const handleStatusChange = async (orderId, newStatus) => {
    setUpdating(orderId);
    try {
      const res = await fetch("/api/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      if (!res.ok) throw new Error();
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch {
      alert("Failed to update status. Try again.");
    } finally {
      setUpdating(null);
    }
  };

  /* menu handlers */
  const handleSavePizza = async (pizzaData) => {
    try {
      const isEdit = !!pizzaData._id;
      const res = await fetch("/api/menu", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isEdit ? { id: pizzaData._id, ...pizzaData } : pizzaData),
      });
      if (!res.ok) throw new Error();
      await fetchMenu();
      setShowPizzaModal(false);
      setEditingPizza(null);
    } catch {
      alert("Failed to save pizza.");
    }
  };

  const handleDeletePizza = async (id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const res = await fetch("/api/menu", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error();
      await fetchMenu();
    } catch {
      alert("Failed to delete pizza.");
    }
  };

  /* analytics helpers */
  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + (o.totalPrice || 0), 0);

  const todayOrders = orders.filter((o) => {
    const d = new Date(o.createdAt);
    return d.toDateString() === new Date().toDateString();
  });

  const todayRevenue = todayOrders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + (o.totalPrice || 0), 0);

  const countByStatus = (s) => orders.filter((o) => o.status === s).length;
  const pendingCount  = countByStatus("pending");
  const activeCount   = countByStatus("preparing") + countByStatus("out for delivery");

  /* filtered orders */
  const filtered = orders.filter((o) => {
    const matchTab    = tab === "all" || o.status === tab;
    const q           = search.toLowerCase();
    const matchSearch = !q ||
      o.customerName?.toLowerCase().includes(q) ||
      o.phoneNumber?.includes(q) ||
      o._id.includes(q);
    return matchTab && matchSearch;
  });

  const filteredMenu = menuItems.filter((m) =>
    m.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
    m.category.toLowerCase().includes(menuSearch.toLowerCase())
  );

  /* ── Render ── */
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">

      {/* Modals */}
      <PizzaModal
        isOpen={showPizzaModal}
        pizza={editingPizza}
        onClose={() => { setShowPizzaModal(false); setEditingPizza(null); }}
        onSave={handleSavePizza}
      />

      {/* Content wrapper */}
      <div className="flex flex-1">
        {/* ── Sidebar ── */}
        <aside className="fixed left-0 top-0 w-64 h-screen bg-white border-r border-gray-100 shadow-sm flex flex-col overflow-y-auto z-40">
        {/* Brand */}
        <div className="px-5 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-0-to-br from-red-600 to-orange-500 flex items-center justify-center text-xl shadow-lg shadow-red-500/30">
              🍕
            </div>
            <div>
              <p className="font-extrabold text-gray-900 text-base leading-tight">Pizza Logist</p>
              <p className="text-[11px] text-gray-400">Restaurant Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-2 mb-2">Main Menu</p>
          <NavItem
            icon="📦"
            label="Orders"
            active={activeSection === "orders"}
            onClick={() => setActiveSection("orders")}
            badge={pendingCount > 0 ? pendingCount : null}
          />
          <NavItem
            icon="🍕"
            label="Manage Pizzas"
            active={activeSection === "pizzas"}
            onClick={() => setActiveSection("pizzas")}
          />
          <NavItem
            icon="📊"
            label="Analytics"
            active={activeSection === "analytics"}
            onClick={() => setActiveSection("analytics")}
          />
        </nav>

        {/* Footer info */}
        <div className="p-4 border-t border-gray-100">
          <div className="bg-red-50 rounded-xl p-3">
            <p className="text-xs font-semibold text-red-700">Last refreshed</p>
            <p className="text-xs text-red-500 mt-0.5">
              {lastRefresh ? lastRefresh.toLocaleTimeString() : "—"}
            </p>
          </div>
          <button
            onClick={fetchOrders}
            className="mt-3 w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-red-100 hover:text-red-700 text-gray-600 text-xs font-semibold py-2 px-3 rounded-xl transition-all duration-200"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582M20 20v-5h-.581M5.404 9A8 8 0 0119.938 13M18.596 15A8 8 0 015.062 11" />
            </svg>
            Refresh Data
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="ml-64 flex-1 overflow-y-auto">

        {/* Top header bar */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-gray-900">
              {activeSection === "orders" ? "Orders Management" : activeSection === "analytics" ? "Analytics Overview" : "Menu Management"}
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              {activeSection === "orders"
                ? `${filtered.length} orders shown`
                : activeSection === "analytics"
                ? `Insights based on ${orders.length} total orders`
                : `${filteredMenu.length} items available`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
              pendingCount > 0 ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${pendingCount > 0 ? "bg-yellow-400 animate-pulse" : "bg-green-500"}`} />
              {pendingCount > 0 ? `${pendingCount} pending` : "All clear"}
            </span>
          </div>
        </div>

        <div className="px-8 py-6 space-y-6">

          {/* ══════════ ORDERS SECTION ══════════ */}
          {activeSection === "orders" && (
            <>
              {/* Status filter pills */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {STATUSES.map((s) => {
                  const sc = STATUS_COLORS[s];
                  return (
                    <button
                      key={s}
                      onClick={() => setTab(s === tab ? "all" : s)}
                      className={`rounded-2xl border-2 px-3 py-3 text-center transition-all duration-200 ${
                        tab === s ? "border-red-500 shadow-md scale-105" : "border-transparent hover:border-gray-200"
                      } ${sc.bg}`}
                    >
                      <p className={`text-2xl font-extrabold ${sc.text}`}>{countByStatus(s)}</p>
                      <p className={`text-xs capitalize font-semibold mt-0.5 ${sc.text}`}>{s}</p>
                    </button>
                  );
                })}
              </div>

              {/* Orders table */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Toolbar */}
                <div className="px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                  <h2 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                    <span>Orders</span>
                    <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">
                      {filtered.length}
                    </span>
                  </h2>
                  <div className="flex gap-2 flex-wrap">
                    {/* Status tabs */}
                    <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                      {["all", ...STATUSES].map((s) => (
                        <button
                          key={s}
                          onClick={() => setTab(s)}
                          className={`px-3 py-1 rounded-md text-xs font-semibold capitalize transition-all duration-150 ${
                            tab === s
                              ? "bg-red-600 text-white shadow"
                              : "text-gray-500 hover:text-gray-800"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    {/* Search */}
                    <input
                      type="text"
                      placeholder="Search name, phone…"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 w-44"
                    />
                  </div>
                </div>

                {/* Table body */}
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-24 gap-3">
                    <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-400 text-sm">Loading orders…</p>
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-2">
                    <span className="text-4xl">⚠️</span>
                    <p className="text-gray-500">{error}</p>
                    <button onClick={fetchOrders} className="text-red-600 underline text-sm">Try again</button>
                  </div>
                ) : filtered.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-2">
                    <span className="text-5xl">🍕</span>
                    <p className="text-gray-500 font-semibold">No orders found</p>
                    <p className="text-gray-400 text-sm">Try a different filter or search term</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                        <tr>
                          {["ID", "Customer", "Address", "Items", "Total", "Status", "Time", "Update"].map((h) => (
                            <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map((order) => (
                          <OrderRow
                            key={order._id}
                            order={order}
                            onStatusChange={handleStatusChange}
                            updating={updating}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ══════════ ANALYTICS SECTION ══════════ */}
          {activeSection === "analytics" && (
            <>
              {/* Stat Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                  icon="📦" label="Total Orders" value={orders.length} sub="All time"
                  gradient="bg-gradient-to-br from-gray-700 to-gray-900"
                />
                <StatCard
                  icon="💰" label="Total Revenue" value={`PKR ${totalRevenue.toLocaleString()}`} sub="Excl. cancelled"
                  gradient="bg-gradient-to-br from-red-600 to-orange-500"
                />
                <StatCard
                  icon="🕐" label="Today's Orders" value={todayOrders.length} sub={`PKR ${todayRevenue.toLocaleString()} today`}
                  gradient="bg-gradient-to-br from-blue-600 to-indigo-600"
                />
                <StatCard
                  icon="🚴" label="Active Orders" value={activeCount} sub={`${pendingCount} pending`}
                  gradient="bg-gradient-to-br from-purple-600 to-pink-600"
                />
              </div>

              {/* Status breakdown */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-bold text-gray-800 text-lg mb-4">Order Status Breakdown</h2>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {STATUSES.map((s) => {
                    const sc = STATUS_COLORS[s];
                    const pct = orders.length ? Math.round((countByStatus(s) / orders.length) * 100) : 0;
                    return (
                      <div key={s} className={`rounded-xl p-4 ${sc.bg} flex flex-col gap-1`}>
                        <p className={`text-2xl font-extrabold ${sc.text}`}>{countByStatus(s)}</p>
                        <p className={`text-xs capitalize font-semibold ${sc.text}`}>{s}</p>
                        <div className="w-full h-1.5 bg-black/10 rounded-full mt-1">
                          <div
                            className={`h-1.5 rounded-full ${sc.dot}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <p className={`text-xs ${sc.text} opacity-70`}>{pct}%</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* KPI metric cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    label: "Avg. Order Value",
                    value: orders.length
                      ? `PKR ${Math.round(
                          totalRevenue / (orders.filter((o) => o.status !== "cancelled").length || 1)
                        ).toLocaleString()}`
                      : "—",
                    icon: "📊",
                    sub: "Per successful order",
                  },
                  {
                    label: "Delivery Success Rate",
                    value: orders.length
                      ? `${Math.round((countByStatus("delivered") / orders.length) * 100)}%`
                      : "—",
                    icon: "✅",
                    sub: `${countByStatus("delivered")} delivered`,
                  },
                  {
                    label: "Cancellation Rate",
                    value: orders.length
                      ? `${Math.round((countByStatus("cancelled") / orders.length) * 100)}%`
                      : "—",
                    icon: "❌",
                    sub: `${countByStatus("cancelled")} cancelled`,
                  },
                ].map((card) => (
                  <div key={card.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow duration-200">
                    <span className="text-4xl">{card.icon}</span>
                    <div>
                      <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">{card.label}</p>
                      <p className="text-2xl font-extrabold text-gray-900">{card.value}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Revenue bar chart (CSS-based) */}
              {orders.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h2 className="font-bold text-gray-800 text-lg mb-1">Revenue by Status</h2>
                  <p className="text-xs text-gray-400 mb-5">Visual breakdown of revenue contribution per order status</p>
                  <div className="space-y-3">
                    {STATUSES.filter((s) => s !== "cancelled").map((s) => {
                      const sc = STATUS_COLORS[s];
                      const rev = orders
                        .filter((o) => o.status === s)
                        .reduce((sum, o) => sum + (o.totalPrice || 0), 0);
                      const pct = totalRevenue ? Math.round((rev / totalRevenue) * 100) : 0;
                      return (
                        <div key={s} className="flex items-center gap-4">
                          <p className={`capitalize text-xs font-semibold w-28 shrink-0 ${sc.text}`}>{s}</p>
                          <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${sc.dot} transition-all duration-700`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <p className="text-xs font-bold text-gray-700 w-24 text-right">
                            PKR {rev.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-400 w-10 text-right">{pct}%</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ══════════ PIZZAS SECTION ══════════ */}
          {activeSection === "pizzas" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Toolbar */}
              <div className="px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="font-bold text-gray-800 text-lg">Menu Items</h2>
                  <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">
                    {filteredMenu.length}
                  </span>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Search menu..."
                    value={menuSearch}
                    onChange={(e) => setMenuSearch(e.target.value)}
                    className="flex-1 sm:flex-none border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 w-full sm:w-64"
                  />
                  <button
                    onClick={() => { setEditingPizza(null); setShowPizzaModal(true); }}
                    className="shrink-0 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl text-sm shadow-md transition-colors flex items-center gap-2"
                  >
                    <span>➕</span> Add Item
                  </button>
                </div>
              </div>

              {/* Menu Table */}
              {loadingMenu ? (
                <div className="flex flex-col items-center justify-center py-24 gap-3">
                  <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-gray-400 text-sm">Loading menu…</p>
                </div>
              ) : filteredMenu.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-2">
                  <span className="text-5xl">🍕</span>
                  <p className="text-gray-500 font-semibold">No menu items found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">Item</th>
                        <th className="px-4 py-3 text-left font-semibold">Category</th>
                        <th className="px-4 py-3 text-left font-semibold">Price</th>
                        <th className="px-4 py-3 text-right font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMenu.map((pizza) => (
                        <PizzaRow
                          key={pizza._id}
                          pizza={pizza}
                          onEdit={(p) => { setEditingPizza(p); setShowPizzaModal(true); }}
                          onDelete={handleDeletePizza}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </div>
      </main>
      </div>

      {/* ── Footer ── */}
      <footer className="ml-64 bg-white border-t border-gray-100 px-8 py-4 text-center text-xs text-gray-400">
        <p>&copy; 2024 Pizza Logist. All rights reserved.</p>
      </footer>
    </div>
  );
}
