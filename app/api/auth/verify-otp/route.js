import { NextResponse } from "next/server";
import crypto from "crypto";
import clientPromise from "@/lib/mongodb";

/** SHA-256 hash — must match the function in send-otp/route.js */
function hashOtp(otp) {
  return crypto.createHash("sha256").update(otp).digest("hex");
}

const MAX_ATTEMPTS = 5; // lock out after 5 wrong guesses

// ── POST /api/auth/verify-otp ─────────────────────────────────────────────────
// Body: { phone: string, otp: string }
// Returns: { verified: true } | { verified: false, error: string }

export async function POST(request) {
  try {
    const body = await request.json();
    const { phone, otp } = body;

    if (!phone || !otp) {
      return NextResponse.json(
        { verified: false, error: "Phone and OTP are required." },
        { status: 400 }
      );
    }

    const normalizedPhone = phone.trim();
    const normalizedOtp = String(otp).trim();

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME || "PizzaLogistics");
    const collection = db.collection("otp_codes");

    const record = await collection.findOne({ phone: normalizedPhone });

    // ── Not found ─────────────────────────────────────────────────────────
    if (!record) {
      return NextResponse.json(
        { verified: false, error: "No OTP found for this number. Please request a new one." },
        { status: 400 }
      );
    }

    // ── Expired ───────────────────────────────────────────────────────────
    if (new Date() > new Date(record.expiresAt)) {
      await collection.deleteOne({ phone: normalizedPhone });
      return NextResponse.json(
        { verified: false, error: "OTP has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // ── Too many attempts ─────────────────────────────────────────────────
    if (record.attempts >= MAX_ATTEMPTS) {
      await collection.deleteOne({ phone: normalizedPhone });
      return NextResponse.json(
        { verified: false, error: "Too many failed attempts. Please request a new OTP." },
        { status: 429 }
      );
    }

    // ── Check OTP ─────────────────────────────────────────────────────────
    const inputHash = hashOtp(normalizedOtp);
    if (inputHash !== record.hashedOtp) {
      // Increment attempts counter
      await collection.updateOne(
        { phone: normalizedPhone },
        { $inc: { attempts: 1 } }
      );
      const remaining = MAX_ATTEMPTS - (record.attempts + 1);
      return NextResponse.json(
        {
          verified: false,
          error: remaining > 0
            ? `Incorrect OTP. ${remaining} attempt${remaining !== 1 ? "s" : ""} remaining.`
            : "Incorrect OTP. This code has now been invalidated.",
        },
        { status: 400 }
      );
    }

    // ── Success — delete OTP record immediately (single-use) ─────────────
    await collection.deleteOne({ phone: normalizedPhone });

    return NextResponse.json({ verified: true, phone: normalizedPhone }, { status: 200 });
  } catch (error) {
    console.error("[verify-otp] Error:", error);
    return NextResponse.json(
      { verified: false, error: "Verification failed. Please try again." },
      { status: 500 }
    );
  }
}
