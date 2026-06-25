import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL || "admin@pizzalogist.com";
        const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

        if (
          credentials?.email === adminEmail &&
          credentials?.password === adminPassword
        ) {
          return { id: "admin-id", name: "Admin", email: adminEmail, role: "admin" };
        }
        return null;
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        // Credentials provider sets role directly
        token.role = user.role || "user";
      }
      // Admin email check for OAuth providers (Google / GitHub)
      if (account && account.provider !== "credentials") {
        const adminEmail = process.env.ADMIN_EMAIL || "admin@pizzalogist.com";
        if (token.email === adminEmail) {
          token.role = "admin";
        } else {
          token.role = token.role || "user";
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }