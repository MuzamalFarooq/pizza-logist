"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingGithub, setLoadingGithub] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleGoogleSignIn = async () => {
    setLoadingGoogle(true);
    await signIn("google", { callbackUrl: "/" });
  };

  const handleGithubSignIn = async () => {
    setLoadingGithub(true);
    await signIn("github", { callbackUrl: "/" });
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1a0000 0%, #3d0000 40%, #cc2027 100%)" }}>
        <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        .login-page {
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1a0000 0%, #3d0000 40%, #cc2027 100%);
          padding: 2rem 1rem;
          position: relative;
          overflow: hidden;
        }

        .login-page::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 20% 20%, rgba(255,255,255,0.05) 0%, transparent 50%),
                            radial-gradient(circle at 80% 80%, rgba(255,200,0,0.08) 0%, transparent 50%);
          pointer-events: none;
        }

        .floating-pizza {
          position: absolute;
          font-size: 5rem;
          opacity: 0.06;
          pointer-events: none;
          animation: floatPizza 8s ease-in-out infinite;
        }

        .floating-pizza:nth-child(1) { top: 5%; left: 5%; animation-delay: 0s; font-size: 4rem; }
        .floating-pizza:nth-child(2) { top: 15%; right: 8%; animation-delay: 2s; font-size: 6rem; }
        .floating-pizza:nth-child(3) { bottom: 10%; left: 10%; animation-delay: 4s; font-size: 3.5rem; }
        .floating-pizza:nth-child(4) { bottom: 20%; right: 5%; animation-delay: 1s; font-size: 5rem; }
        .floating-pizza:nth-child(5) { top: 50%; left: 2%; animation-delay: 3s; font-size: 3rem; }

        @keyframes floatPizza {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(8deg); }
          66% { transform: translateY(10px) rotate(-5deg); }
        }

        .login-card {
          position: relative;
          width: 100%;
          max-width: 420px;
          background: rgba(255, 255, 255, 0.07);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 24px;
          padding: 2.5rem 2rem;
          box-shadow: 0 32px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05) inset;
          animation: cardEntrance 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes cardEntrance {
          from { opacity: 0; transform: translateY(32px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .brand-logo {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .brand-logo img {
          height: 64px;
          width: auto;
          filter: drop-shadow(0 4px 12px rgba(0,0,0,0.4));
          animation: logoPop 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
        }

        @keyframes logoPop {
          from { opacity: 0; transform: scale(0.7); }
          to { opacity: 1; transform: scale(1); }
        }

        .brand-tagline {
          font-size: 0.8rem;
          font-weight: 500;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .login-title {
          font-size: 1.75rem;
          font-weight: 800;
          color: #ffffff;
          text-align: center;
          margin-bottom: 0.4rem;
          letter-spacing: -0.02em;
        }

        .login-subtitle {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.55);
          text-align: center;
          margin-bottom: 2rem;
          font-weight: 400;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin: 1.5rem 0;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.12);
        }

        .divider-text {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.35);
          font-weight: 500;
          letter-spacing: 0.05em;
          white-space: nowrap;
        }

        /* Google Button */
        .btn-google {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.875rem;
          padding: 0.875rem 1.5rem;
          border-radius: 14px;
          border: 1.5px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.95);
          color: #1f1f1f;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          box-shadow: 0 4px 16px rgba(0,0,0,0.25), 0 1px 3px rgba(0,0,0,0.15);
        }

        .btn-google:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(0,0,0,0.35), 0 2px 6px rgba(0,0,0,0.2);
          background: #ffffff;
        }

        .btn-google:active:not(:disabled) {
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        .btn-google:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-google::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent);
          transform: translateX(-100%);
          transition: transform 0.5s ease;
        }

        .btn-google:hover::after {
          transform: translateX(100%);
        }

        .google-icon {
          width: 22px;
          height: 22px;
          flex-shrink: 0;
        }

        /* GitHub Button */
        .btn-github {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.875rem;
          padding: 0.875rem 1.5rem;
          border-radius: 14px;
          border: 1.5px solid rgba(255,255,255,0.12);
          background: rgba(30, 30, 30, 0.7);
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          box-shadow: 0 4px 16px rgba(0,0,0,0.25);
          margin-top: 0.875rem;
        }

        .btn-github:hover:not(:disabled) {
          transform: translateY(-2px);
          background: rgba(40, 40, 40, 0.9);
          box-shadow: 0 8px 28px rgba(0,0,0,0.35);
          border-color: rgba(255,255,255,0.25);
        }

        .btn-github:active:not(:disabled) {
          transform: translateY(0);
        }

        .btn-github:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2.5px solid rgba(0,0,0,0.15);
          border-top-color: #cc2027;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }

        .spinner-white {
          border-color: rgba(255,255,255,0.2);
          border-top-color: #ffffff;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .admin-link-section {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.08);
          text-align: center;
        }

        .admin-link-text {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.35);
          font-weight: 500;
        }

        .admin-link {
          color: rgba(255,200,100,0.8);
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s;
        }

        .admin-link:hover {
          color: rgb(255,200,100);
          text-decoration: underline;
        }

        .privacy-note {
          text-align: center;
          margin-top: 1.25rem;
          font-size: 0.72rem;
          color: rgba(255,255,255,0.25);
          line-height: 1.5;
        }

        .badge-secure {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.7rem;
          color: rgba(255,255,255,0.35);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 999px;
          padding: 0.25rem 0.6rem;
          margin-top: 0.5rem;
        }
      `}</style>

      <div className="login-page">
        {/* Floating pizza background decorations */}
        <div className="floating-pizza">🍕</div>
        <div className="floating-pizza">🍕</div>
        <div className="floating-pizza">🍕</div>
        <div className="floating-pizza">🍕</div>
        <div className="floating-pizza">🍕</div>

        <div className="login-card">
          {/* Brand */}
          <div className="brand-logo">
            <img src="/logo.png" alt="Pizza Logist Logo" />
            <span className="brand-tagline">Pizza Logist</span>
          </div>

          <h1 className="login-title">Welcome back!</h1>
          <p className="login-subtitle">Sign in to track orders, save favourites &amp; more</p>

          {/* Google Sign In */}
          <button
            id="btn-google-signin"
            className="btn-google"
            onClick={handleGoogleSignIn}
            disabled={loadingGoogle || loadingGithub}
          >
            {loadingGoogle ? (
              <div className="spinner" />
            ) : (
              <svg className="google-icon" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
            )}
            {loadingGoogle ? "Signing in…" : "Continue with Google"}
          </button>

          <div className="divider">
            <div className="divider-line" />
            <span className="divider-text">or</span>
            <div className="divider-line" />
          </div>

          {/* GitHub Sign In */}
          <button
            id="btn-github-signin"
            className="btn-github"
            onClick={handleGithubSignIn}
            disabled={loadingGoogle || loadingGithub}
          >
            {loadingGithub ? (
              <div className="spinner spinner-white" />
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            )}
            {loadingGithub ? "Signing in…" : "Continue with GitHub"}
          </button>

          {/* Admin login link */}
          <div className="admin-link-section">
            <p className="admin-link-text">
              Are you an admin?{" "}
              <Link href="/admin/login" className="admin-link">
                Admin Login →
              </Link>
            </p>
          </div>

          <div className="privacy-note">
            By signing in you agree to our Terms of Service &amp; Privacy Policy.
            <br />
            <span className="badge-secure">
              🔒 Secured by NextAuth.js
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
