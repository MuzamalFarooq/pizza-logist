import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import crypto from 'crypto'
import clientPromise from '@/lib/mongodb'

// ── OTP helper (duplicated here to keep Next.js edge-compatible) ──────────────
function hashOtp(otp) {
  return crypto.createHash('sha256').update(otp).digest('hex')
}

async function verifyOtpInternal(phone, otp) {
  if (!phone || !otp) return null

  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB_NAME || 'PizzaLogistics')
  const collection = db.collection('otp_codes')

  const record = await collection.findOne({ phone: phone.trim() })
  if (!record) return null
  if (new Date() > new Date(record.expiresAt)) {
    await collection.deleteOne({ phone: phone.trim() })
    return null
  }
  if (record.attempts >= 5) {
    await collection.deleteOne({ phone: phone.trim() })
    return null
  }

  const inputHash = hashOtp(String(otp).trim())
  if (inputHash !== record.hashedOtp) {
    await collection.updateOne({ phone: phone.trim() }, { $inc: { attempts: 1 } })
    return null
  }

  // Valid — delete the single-use code
  await collection.deleteOne({ phone: phone.trim() })
  return true
}

// ── NextAuth configuration ────────────────────────────────────────────────────

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    // ── Admin email + password ──────────────────────────────────────────
    CredentialsProvider({
      id: 'admin-credentials',
      name: 'Admin Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@pizzalogist.com'
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

        if (
          credentials?.email === adminEmail &&
          credentials?.password === adminPassword
        ) {
          return { id: 'admin-id', name: 'Admin', email: adminEmail, role: 'admin' }
        }
        return null
      },
    }),

    // ── Phone OTP ───────────────────────────────────────────────────────
    CredentialsProvider({
      id: 'phone-otp',
      name: 'Phone OTP',
      credentials: {
        phone: { label: 'Phone', type: 'tel' },
        otp: { label: 'OTP', type: 'text' },
      },
      async authorize(credentials) {
        const { phone, otp } = credentials || {}
        if (!phone || !otp) return null

        const ok = await verifyOtpInternal(phone, otp)
        if (!ok) return null

        // Return a user object — phone number doubles as the unique identifier
        const normalizedPhone = phone.trim()
        return {
          id: normalizedPhone,
          name: normalizedPhone,
          phone: normalizedPhone,
          role: 'user',
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role || 'user'
        if (user.phone) token.phone = user.phone
      }
      // Admin email check for OAuth providers (Google / GitHub)
      if (account && account.provider !== 'admin-credentials' && account.provider !== 'phone-otp') {
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@pizzalogist.com'
        if (token.email === adminEmail) {
          token.role = 'admin'
        } else {
          token.role = token.role || 'user'
        }
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role
        if (token.phone) session.user.phone = token.phone
      }
      return session
    },
  },

  pages: {
    signIn: '/login',
  },

  secret: process.env.NEXTAUTH_SECRET,
  // Required for Next.js 15 with custom server (server.js)
  trustHost: true,
  debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }