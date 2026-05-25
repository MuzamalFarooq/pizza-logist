import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(request) {
  try {
    const body = await request.json();
    const { customerName, phoneNumber, address, items, totalPrice } = body;

    if (!customerName || !phoneNumber || !address || !items || items.length === 0) {
      return Response.json(
        { error: "All fields are required and cart must not be empty" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("pizzalogist");
    const collection = db.collection("orders");

    const order = {
      customerName,
      phoneNumber,
      address,
      items: items.map((item) => ({
        name: item.name,
        price: item.price,
      })),
      totalPrice,
      status: "pending",
      createdAt: new Date(),
    };

    const result = await collection.insertOne(order);

    return Response.json(
      { message: "Order placed successfully!", orderId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order error:", error);
    return Response.json(
      { error: "Failed to place order. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("pizzalogist");
    const collection = db.collection("orders");

    const orders = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // Convert ObjectId to string for JSON serialization
    const serialized = orders.map((o) => ({
      ...o,
      _id: o._id.toString(),
    }));

    return Response.json({ orders: serialized }, { status: 200 });
  } catch (error) {
    console.error("Fetch orders error:", error);
    return Response.json({ error: "Failed to fetch orders." }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { orderId, status } = body;

    const validStatuses = ["pending", "preparing", "out for delivery", "delivered", "cancelled"];
    if (!orderId || !validStatuses.includes(status)) {
      return Response.json({ error: "Invalid orderId or status." }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("pizzalogist");
    const collection = db.collection("orders");

    await collection.updateOne(
      { _id: new ObjectId(orderId) },
      { $set: { status, updatedAt: new Date() } }
    );

    return Response.json({ message: "Order status updated." }, { status: 200 });
  } catch (error) {
    console.error("Update order error:", error);
    return Response.json({ error: "Failed to update order." }, { status: 500 });
  }
}
