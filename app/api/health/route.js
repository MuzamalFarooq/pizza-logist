import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    console.log("Health check: Testing MongoDB connection...");
    const client = await clientPromise;
    
    // Test connection
    await client.db("admin").command({ ping: 1 });
    console.log("✅ MongoDB connection successful!");
    
    // Check if menu collection exists
    const db = client.db("pizzalogist");
    const collections = await db.listCollections().toArray();
    const hasMenuCollection = collections.some(c => c.name === "menu");
    
    // Get menu items count
    let menuCount = 0;
    if (hasMenuCollection) {
      menuCount = await db.collection("menu").countDocuments();
    }
    
    return new Response(
      JSON.stringify({
        status: "✅ OK",
        mongodb: "Connected",
        database: "pizzalogist",
        hasMenuCollection: hasMenuCollection,
        menuItemsCount: menuCount,
        timestamp: new Date().toISOString(),
        message: hasMenuCollection 
          ? `${menuCount} menu items found` 
          : "Menu collection not found. Items will be seeded on next menu request."
      }),
      { 
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    return new Response(
      JSON.stringify({
        status: "❌ ERROR",
        error: err.message,
        hint: "Make sure MongoDB is running on localhost:27017 or update MONGODB_URI in .env.local",
        timestamp: new Date().toISOString()
      }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
