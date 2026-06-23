import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const subscription = await request.json();
    if (!subscription || !subscription.endpoint) {
      return Response.json({ error: "Invalid subscription" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME || "PizzaLogistics");
    const collection = db.collection("push_subscriptions");

    // Upsert subscription based on endpoint to avoid duplicates
    await collection.updateOne(
      { endpoint: subscription.endpoint },
      {
        $set: {
          subscription,
          role: "admin",
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    return Response.json({ message: "Subscription saved successfully" }, { status: 200 });
  } catch (error) {
    console.error("Save subscription error:", error);
    return Response.json({ error: "Failed to save subscription" }, { status: 500 });
  }
}
