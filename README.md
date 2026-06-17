# 🍕 Pizza-Logist: Premium Pizza Ordering Experience

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-Latest-white?style=for-the-badge&logo=next-auth)](https://next-auth.js.org/)

**Pizza-Logist** is a state-of-the-art web application designed to provide a seamless and visually stunning pizza ordering experience. Built with the latest web technologies, it offers a robust platform for browsing delicious pizza deals, managing a shopping cart, and securing orders with social authentication.

---

## 🚀 Key Features

- 🍕 **Dynamic Menu Exploration**: Browse through categorized deals including _Best Deals_, _Explore Deals_, _Best Sellers_, and _Discount Deals_.
- 🛒 **Persistent Shopping Cart**: A smooth, slide-in cart experience powered by React Context that keeps track of your items across sessions.
- 🔐 **GitHub Social Authentication**: Secure, one-click login using **NextAuth.js** and GitHub OAuth.
- 📦 **Order Management**: Robust API system for placing and processing pizza orders.
- ✉️ **Contact System**: Integrated contact form with MongoDB backend for customer inquiries.
- 📱 **Premium UI/UX**: A fully responsive design built with **Tailwind CSS 4**, featuring glassmorphism, smooth transitions, and a custom image carousel.
- 🔔 **Instant Feedback**: User actions are acknowledged with beautiful toast notifications via **React Toastify**.

---

## 🔐 Authentication Flow (NextAuth.js)

Pizza-Logist implements a secure authentication layer using **NextAuth.js**, providing a frictionless user experience:

1.  **Provider Integration**: Currently supports **GitHub OAuth** for secure identity verification.
2.  **Session Management**: Uses JWT-based session handling to maintain user state.
3.  **Dynamic UI**:
    - **Guest View**: Displays a "Sign In" button with a gradient hover effect.
    - **Authenticated View**: Shows the user's GitHub profile picture and a "Sign Out" option in the Navbar.
4.  **Secure Config**: All authentication secrets and provider IDs are managed via environment variables for maximum security.

---

## 🛠️ Tech Stack

### Core Technologies

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & Vanilla CSS
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)

### Key Dependencies

- `react-toastify`: Elegant notification system.
- `mongodb`: Database connectivity and ODM.
- `next-auth`: Secure session and OAuth management.
- `lucide-react`: Modern icon library (if used).

---

## 🏗️ Getting Started

### Prerequisites

- Node.js (Latest version recommended)
- MongoDB Atlas account or local MongoDB instance
- GitHub Developer account (for OAuth setup)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/MuzamalFarooq/pizza-logist.git
   cd pizza-logist
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory:

   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string

   # NextAuth Config
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_any_random_string

   # GitHub OAuth Provider
   GITHUB_ID=your_github_client_id
   GITHUB_SECRET=your_github_client_secret
   ```

4. **GitHub OAuth Setup:**

   - Go to [GitHub Settings > Developer Settings > OAuth Apps](https://github.com/settings/developers).
   - Create a "New OAuth App".
   - Set **Homepage URL** to `http://localhost:3000`.
   - Set **Authorization callback URL** to `http://localhost:3000/api/auth/callback/github`.
   - Copy the Client ID and Client Secret to your `.env.local`.

5. **Run the development server:**
   ```bash
   npm run dev
   ```

---

## 🚀 API Endpoints

- `GET/POST /api/auth/[...nextauth]`: Handles authentication flows.
- `POST /api/contact`: Submits customer inquiries to MongoDB.
- `POST /api/orders`: Processes new pizza orders.

---

## 📂 Project Structure

- `/app`: Next.js App Router pages and API routes.
- `/components`: Reusable UI components (Navbar, CartPopup, ImageCarousel).
- `/context`: React Context for global state (CartContext).
- `/lib`: Database configurations and backend utilities.
- `/data`: Local JSON data for menu items.
- `/public`: Static assets (Images, Icons).

---

## 👨‍💻 Developer

**Muzamal Farooq**  
_Full Stack Developer_

Passionate about building scalable, high-performance web applications with a focus on user experience and modern design.

---

**Email** [muzamalfarooq111@gmail.com]
**Contact** [+92 3067774327]
**LinkdIn** [https://www.linkedin.com/in/muzamal-farooq-1232693/]
