import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import webpush from "web-push";

if (process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || "mailto:admin@pizzalogist.com",
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
}

export async function POST(request) {
  try {
    const { orderId, text } = await request.json();
    if (!orderId || !text) {
      return Response.json({ error: "Missing orderId or text" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME || "PizzaLogistics");
    
    // Find order to get customer details
    if (!ObjectId.isValid(orderId)) {
      return Response.json({ error: "Invalid order ID" }, { status: 400 });
    }
    const order = await db.collection("orders").findOne({ _id: new ObjectId(orderId) });
    if (!order) {
      return Response.json({ error: "Order not found" }, { status: 404 });
    }

    const customerName = order.customerName || "Customer";

    // Find all admin subscriptions
    const subscriptions = await db.collection("push_subscriptions").find({ role: "admin" }).toArray();
    
    if (subscriptions.length > 0) {
      const payload = JSON.stringify({
        title: `🍕 Message from ${customerName}`,
        body: text,
        url: "/Dashboard", // Click takes admin to the dashboard
      });

      const notifications = subscriptions.map((subDoc) => {
        return webpush.sendNotification(subDoc.subscription, payload)
          .catch(async (err) => {
            if (err.statusCode === 404 || err.statusCode === 410) {
              console.log(`Pruning expired subscription: ${subDoc.endpoint}`);
              await db.collection("push_subscriptions").deleteOne({ _id: subDoc._id });
            } else {
              console.error("Web Push sending error in chat:", err);
            }
          });
      });

      await Promise.all(notifications);
    }

    return Response.json({ message: "Notification sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Send chat notification error:", error);
    return Response.json({ error: "Failed to send notification" }, { status: 500 });
  }
}
