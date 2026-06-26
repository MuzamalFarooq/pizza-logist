import { NextResponse } from "next/server";
import crypto from "crypto";
import clientPromise from "@/lib/mongodb";

// ── helpers ──────────────────────────────────────────────────────────────────

/** Generate a random 6-digit numeric OTP string */
function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

/** SHA-256 hash of the raw OTP (avoids storing plain-text codes) */
function hashOtp(otp) {
  return crypto.createHash("sha256").update(otp).digest("hex");
}

/**
 * Ensure a TTL index exists on otp_codes.expiresAt so MongoDB auto-purges
 * expired documents. Safe to call repeatedly — MongoDB ignores duplicate
 * index creation.
 */
async function ensureTtlIndex(collection) {
  try {
    await collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
  } catch {
    // Index already exists — harmless
  }
}

// ── POST /api/auth/send-otp ───────────────────────────────────────────────────

export async function POST(request) {
  try {
    const body = await request.json();
    const { phone } = body;

    // ── Validate phone number ─────────────────────────────────────────────
    if (!phone || typeof phone !== "string") {
      return NextResponse.json(
        { error: "Phone number is required." },
        { status: 400 }
      );
    }

    // Accept E.164 format: +<country_code><number>, 7–15 digits after '+'
    const phoneRegex = /^\+\d{7,15}$/;
    if (!phoneRegex.test(phone.trim())) {
      return NextResponse.json(
        { error: "Invalid phone number. Use international format e.g. +923001234567" },
        { status: 400 }
      );
    }

    const normalizedPhone = phone.trim();

    // ── Generate & hash OTP ───────────────────────────────────────────────
    const otp = generateOtp();
    const hashedOtp = hashOtp(otp);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // ── Persist in MongoDB ────────────────────────────────────────────────
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME || "PizzaLogistics");
    const collection = db.collection("otp_codes");

    await ensureTtlIndex(collection);

    // Upsert: replace any existing OTP for this phone (e.g. resend scenario)
    await collection.updateOne(
      { phone: normalizedPhone },
      {
        $set: {
          phone: normalizedPhone,
          hashedOtp,
          expiresAt,
          attempts: 0,
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );

    // ── Send SMS via Twilio ───────────────────────────────────────────────
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_PHONE_NUMBER;

    if (!accountSid || !authToken || !fromNumber ||
        accountSid === "your_twilio_account_sid_here") {
      // Twilio not configured — log OTP to server console for local testing
      console.log(`\n[Pizza Logist OTP] Phone: ${normalizedPhone} | OTP: ${otp}\n`);
      return NextResponse.json(
        {
          success: true,
          dev: true,
          message: "OTP logged to server console (Twilio not configured).",
        },
        { status: 200 }
      );
    }

    // Dynamically import twilio to avoid build errors when not configured
    const twilio = (await import("twilio")).default;
    const twilioClient = twilio(accountSid, authToken);

    await twilioClient.messages.create({
      body: `Your Pizza Logist verification code is: ${otp}\n\nValid for 5 minutes. Do not share this code.`,
      from: fromNumber,
      to: normalizedPhone,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[send-otp] Error:", error);

    // Surface Twilio-specific errors helpfully
    if (error.code) {
      return NextResponse.json(
        { error: `SMS failed (Twilio ${error.code}): ${error.message}` },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { error: "Failed to send OTP. Please try again." },
      { status: 500 }
    );
  }
}
