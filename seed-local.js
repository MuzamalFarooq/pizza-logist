const { MongoClient } = require('mongodb');

const uri = "mongodb://127.0.0.1:27017/PizzaLogistics";

const pizzaData = [
  { name: "DEAL FOR 2", price: 2599, category: "Best Deals", description: "1 Medium Pizza (Classic) 2pcs Garlic Bread + 2 Small Drink", image: null, createdAt: new Date() },
  { name: "DEAL FOR 3", price: 1899, category: "Best Deals", description: "1 Lrg Pizza (Classic) + 8pcs Wings + 1 Lrg Drink", image: null, createdAt: new Date() },
  { name: "Family Deal", price: 3999, category: "Best Deals", description: "2 Medium Pizza (Classic) + 4 pcs Garlic Bread + 1 Lrg Drink", image: null, createdAt: new Date() },
  { name: "FAMILY DEAL LARGE", price: 4999, category: "Best Deals", description: "2 Lrg Pizza (Classic) + 6pcs Garlic Bread + 1 Lrg Drink", image: null, createdAt: new Date() },
  { name: "Chicken Fajita", price: 2299, category: "Best Seller", description: "Classic Chicken Fajita pizza with spicy chicken and green peppers", image: null, createdAt: new Date() },
  { name: "Spicy Chicken Ranch", price: 2199, category: "Best Seller", description: "Tender spicy chicken fajita paired with ranch sauce", image: null, createdAt: new Date() },
  { name: "Very Veggie", price: 1999, category: "Best Seller", description: "Fresh veggie pizza with assorted vegetables", image: null, createdAt: new Date() },
  { name: "Potato Wedges", price: 999, category: "Appetizers", description: "Crispy potato wedges", image: null, createdAt: new Date() },
  { name: "Pepsi", price: 99, category: "Drinks", description: "Pepsi bottle", image: null, createdAt: new Date() },
];

const dummyOrders = [
  {
    customerName: "Muzamal Farooq",
    phoneNumber: "0300-1234567",
    address: "House 12, Street 3, G-11, Islamabad",
    items: [
      { name: "Chicken Fajita", price: 2299 },
      { name: "Pepsi", price: 99 }
    ],
    totalPrice: 2398,
    status: "pending",
    createdAt: new Date(Date.now() - 3600000) // 1 hour ago
  },
  {
    customerName: "Ali Khan",
    phoneNumber: "0312-7654321",
    address: "Apartment 4B, Beverly Heights, Lahore",
    items: [
      { name: "Family Deal", price: 3999 }
    ],
    totalPrice: 3999,
    status: "preparing",
    createdAt: new Date(Date.now() - 7200000) // 2 hours ago
  },
  {
    customerName: "Sana Ahmed",
    phoneNumber: "0321-9988776",
    address: "Defense Phase 6, Karachi",
    items: [
      { name: "DEAL FOR 2", price: 2599 },
      { name: "Potato Wedges", price: 999 }
    ],
    totalPrice: 3598,
    status: "delivered",
    createdAt: new Date(Date.now() - 86400000) // 1 day ago
  }
];

const dummyMessages = [
  {
    name: "John Doe",
    phone: "0333-5554433",
    email: "john@example.com",
    store: "Islamabad Main",
    subject: "Franchise Inquiry",
    orderMethod: "Delivery",
    date: "2026-06-17",
    description: "I am interested in opening a franchise of Pizza Logist in Rawalpindi. Please provide details.",
    createdAt: new Date()
  }
];

async function seed() {
  const client = new MongoClient(uri);
  try {
    console.log("Connecting to local MongoDB...");
    await client.connect();
    console.log("Connected successfully!");

    const db = client.db("PizzaLogistics");

    // 1. Seed Menu
    const menuCol = db.collection("menu");
    console.log("Seeding menu...");
    await menuCol.deleteMany({}); // clear existing
    await menuCol.insertMany(pizzaData);
    console.log(`Seeded ${pizzaData.length} menu items.`);

    // 2. Seed Orders
    const ordersCol = db.collection("orders");
    console.log("Seeding orders...");
    await ordersCol.deleteMany({}); // clear existing
    await ordersCol.insertMany(dummyOrders);
    console.log(`Seeded ${dummyOrders.length} dummy orders.`);

    // 3. Seed Messages
    const contactCol = db.collection("pizza customers");
    console.log("Seeding contact messages...");
    await contactCol.deleteMany({}); // clear existing
    await contactCol.insertMany(dummyMessages);
    console.log(`Seeded ${dummyMessages.length} contact messages.`);

    console.log("Seeding completed successfully! 🎉");
  } catch (err) {
    console.error("Error seeding local database:", err);
  } finally {
    await client.close();
  }
}

seed();
