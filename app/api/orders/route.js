import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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
    const db = client.db(process.env.MONGODB_DB_NAME || "PizzaLogistics");
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

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME || "PizzaLogistics");
    const collection = db.collection("orders");

    if (orderId) {
      if (!ObjectId.isValid(orderId)) {
        return Response.json({ error: "Invalid order ID format" }, { status: 400 });
      }
      const order = await collection.findOne({ _id: new ObjectId(orderId) });
      if (!order) {
        return Response.json({ error: "Order not found" }, { status: 404 });
      }
      return Response.json({
        order: {
          ...order,
          _id: order._id.toString()
        }
      }, { status: 200 });
    }

    // Require admin session to fetch all orders
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

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
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { orderId, status } = body;

    const validStatuses = ["pending", "preparing", "out for delivery", "delivered", "cancelled"];
    if (!orderId || !validStatuses.includes(status)) {
      return Response.json({ error: "Invalid orderId or status." }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME || "PizzaLogistics");
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
