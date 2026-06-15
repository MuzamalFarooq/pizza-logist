"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: email.trim(),
        password: password,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
        setLoading(false);
      } else {
        router.push("/Dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen relative overflow-hidden flex items-center justify-center px-4 font-sans text-white">
      {/* Background Decorative Glow Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-red-900/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-orange-600/15 blur-[120px] pointer-events-none" />

      {/* Login Card */}
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 w-full max-w-md shadow-2xl relative z-10 hover:border-red-500/20 transition-all duration-500">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-yellow-400 to-red-600 shadow-xl shadow-red-600/20 mb-4 animate-[pulse_3s_infinite] rotate-3 hover:rotate-12 transition-transform duration-300">
            <span className="text-3xl">🍕</span>
          </div>
          <h1 className="text-2xl font-black tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-white via-orange-100 to-amber-200">
            Pizza Logist
          </h1>
          <p className="text-xs text-orange-400 font-semibold uppercase tracking-widest mt-1">
            Secure Portal
          </p>
        </div>

        {/* Error Alert Panel */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <span className="text-base">⚠️</span>
            <p>{error}</p>
          </div>
        )}

        <div className="space-y-6">
          {/* Customer / Client Sign In */}
          <div>
            <p className="text-xs text-gray-400 text-center mb-3 font-medium">Customer Sign In</p>
            <button
              onClick={() => signIn("github", { callbackUrl: "/" })}
              className="w-full bg-white hover:bg-gray-100 text-slate-900 font-bold py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-white/5 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer border-none"
            >
              <FaGithub size={20} className="text-black" />
              <span className="text-black">Sign In with GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center text-xs text-gray-500 uppercase tracking-widest before:flex-1 before:border-t before:border-white/10 before:mr-3 after:flex-1 after:border-t after:border-white/10 after:ml-3">
            or
          </div>

          {/* Administrator Login Button / Form */}
          {!showAdminForm ? (
            <button
              onClick={() => setShowAdminForm(true)}
              className="w-full bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 text-white font-bold py-3.5 px-4 rounded-xl text-sm hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer text-center flex items-center justify-center gap-2"
            >
              <span>🛡️</span> Login as Administrator
            </button>
          ) : (
            <div className="animate-in fade-in zoom-in-95 duration-200 space-y-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-orange-400 font-bold uppercase tracking-wider ml-1">Administrator Sign In</span>
                <button 
                  onClick={() => setShowAdminForm(false)} 
                  className="text-[10px] text-gray-400 hover:text-white underline cursor-pointer bg-transparent border-none"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email input */}
                <div className="flex flex-col">
                  <label htmlFor="admin-email" className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 ml-1">
                    Admin Email
                  </label>
                  <input
                    id="admin-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@pizzalogist.com"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/40 transition-all duration-200 placeholder-gray-600"
                  />
                </div>

                {/* Password input */}
                <div className="flex flex-col">
                  <label htmlFor="admin-password" className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5 ml-1">
                    Password
                  </label>
                  <input
                    id="admin-password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/40 transition-all duration-200 placeholder-gray-600"
                  />
                </div>

                {/* Submit button */}
                <button
                  id="admin-login-submit"
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white font-bold py-3.5 px-4 rounded-xl text-sm shadow-lg shadow-red-600/20 hover:shadow-red-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer border-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <span>Sign In as Admin</span>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Back navigation link */}
        <Link 
          href="/" 
          className="text-xs text-gray-500 hover:text-orange-400 transition-colors duration-200 flex items-center gap-1.5 justify-center mt-8 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span> 
          Back to storefront
        </Link>

      </div>
    </div>
  );
}
