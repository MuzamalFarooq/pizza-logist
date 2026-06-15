import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const DB = "pizzalogist";
const COL = "menu";

/* ── Seed helper: copy static data if collection is empty ── */

async function seedIfEmpty(collection) {
  const count = await collection.countDocuments();
  if (count > 0) return;

  const pizzaData = [
    { name: "DEAL FOR 2", price: 2599, category: "Best Deals", description: "1 Medium Pizza (Classic) 2pcs Garlic Bread + 2 Small Drink", image: null },
    { name: "DEAL FOR 3", price: 1899, category: "Best Deals", description: "1 Lrg Pizza (Classic) + 8pcs Wings + 1 Lrg Drink", image: null },
    { name: "Family Deal", price: 3999, category: "Best Deals", description: "2 Medium Pizza (Classic) + 4 pcs Garlic Bread + 1 Lrg Drink", image: null },
    { name: "FAMILY DEAL LARGE", price: 4999, category: "Best Deals", description: "2 Lrg Pizza (Classic) + 6pcs Garlic Bread + 1 Lrg Drink", image: null },
    { name: "Ramdan Deal", price: 3900, category: "Explore Deals", description: "Special Ramdan combo deal", image: null },
    { name: "Jazz Deal", price: 2299, category: "Jazz Deals", description: "Jazz special combo deal", image: null },
    { name: "Midnight Deal", price: 4999, category: "Midnight Deals", description: "Late night special combo", image: null },
    { name: "Hut Deal", price: 2999, category: "Explore Deals", description: "Hut special combo deal", image: null },
    { name: "Chicken Fagita", price: 2299, category: "Best Seller", description: "Classic Chicken Fagita pizza with spicy chicken and green peppers", image: null },
    { name: "Spicy Chicken Ranch", price: 2199, category: "Best Seller", description: "Tender spicy chicken fajita paired with ranch sauce", image: null },
    { name: "Very Veggie", price: 1999, category: "Best Seller", description: "Fresh veggie pizza with assorted vegetables", image: null },
    { name: "Appetizer Platter", price: 1999, category: "Appetizers", description: "12 Wedges, 6 Chicken Wings, 4 Bihari Spin Rolls, 1 Dip", image: null },
    { name: "Bihari Chicken Spin Roll", price: 1999, category: "Appetizers", description: "Bihari Chicken Spin Rolls 2pcs", image: null },
    { name: "Dynamite Wings", price: 1999, category: "Appetizers", description: "Zesty dynamite sauce at the bottom and top", image: null },
    { name: "Potato Wedges", price: 999, category: "Appetizers", description: "Crispy potato wedges", image: null },
    { name: "AquaFina", price: 99, category: "Drinks", description: "AquaFina water bottle", image: null },
    { name: "Pepsi", price: 99, category: "Drinks", description: "Pepsi bottle", image: null },
    { name: "7 UP", price: 99, category: "Drinks", description: "7 UP bottle", image: null },
    { name: "Mirinda", price: 99, category: "Drinks", description: "Mirinda bottle", image: null },
  ].map((item) => ({ ...item, createdAt: new Date() }));

  await collection.insertMany(pizzaData);
}

/* ── GET: fetch all menu items ── */
export async function GET() {
  try {
    const client = await clientPromise;
    const col = client.db(DB).collection(COL);
    await seedIfEmpty(col);
    const items = await col.find({}).sort({ category: 1, name: 1 }).toArray();
    const data = items.map((i) => ({ ...i, _id: i._id.toString() }));
    return Response.json({ items: data }, { status: 200 });
  } catch (err) {
    console.error("GET /api/menu error:", err);
    return Response.json({ error: "Failed to fetch menu." }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb', // Set limit up to 4mb to allow base64 image strings
    },
  },
}

/* ── POST: create a new menu item ── */
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, price, category, description, image } = await request.json();
    if (!name || !price || !category) {
      return Response.json({ error: "name, price and category are required." }, { status: 400 });
    }
    const client = await clientPromise;
    const col = client.db(DB).collection(COL);
    const result = await col.insertOne({
      name: name.trim(),
      price: Number(price),
      category: category.trim(),
      description: description?.trim() || "",
      image: image || null,
      createdAt: new Date(),
    });
    return Response.json({ message: "Item added.", id: result.insertedId.toString() }, { status: 201 });
  } catch (err) {
    console.error("POST /api/menu error:", err);
    return Response.json({ error: "Failed to add item." }, { status: 500 });
  }
}

/* ── PUT: update an existing menu item ── */
export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, name, price, category, description, image } = await request.json();
    if (!id || !name || !price || !category) {
      return Response.json({ error: "id, name, price and category are required." }, { status: 400 });
    }
    const client = await clientPromise;
    const col = client.db(DB).collection(COL);

    const updateData = {
      name: name.trim(),
      price: Number(price),
      category: category.trim(),
      description: description?.trim() || "",
      updatedAt: new Date()
    };

    // Only update image if it's explicitly provided (including null for removal)
    // If undefined, don't update it to prevent accidentally overwriting with nothing
    if (image !== undefined) {
      updateData.image = image;
    }

    await col.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    return Response.json({ message: "Item updated." }, { status: 200 });
  } catch (err) {
    console.error("PUT /api/menu error:", err);
    return Response.json({ error: "Failed to update item." }, { status: 500 });
  }
}

/* ── DELETE: remove a menu item by id ── */
export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();
    if (!id) return Response.json({ error: "id is required." }, { status: 400 });
    const client = await clientPromise;
    const col = client.db(DB).collection(COL);
    await col.deleteOne({ _id: new ObjectId(id) });
    return Response.json({ message: "Item deleted." }, { status: 200 });
  } catch (err) {
    console.error("DELETE /api/menu error:", err);
    return Response.json({ error: "Failed to delete item." }, { status: 500 });
  }
}
