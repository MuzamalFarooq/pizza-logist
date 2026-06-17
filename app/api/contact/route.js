import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const body = await request.json();

    const { name, phone, email, store, subject, orderMethod, date, description } = body;

    // Validate required fields
    if (!name || !phone || !email || !subject || !description) {
      return Response.json(
        { error: "Please fill in all required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME || "PizzaLogistics");
    const collection = db.collection("pizza customers");

    const message = {
      name,
      phone,
      email,
      store,
      subject,
      orderMethod,
      date,
      description,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(message);

    return Response.json(
      {
        message: "Message sent successfully!",
        id: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return Response.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
