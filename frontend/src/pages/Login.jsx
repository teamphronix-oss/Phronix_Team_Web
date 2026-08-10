import { LogIn, LogOut, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import SectionHeading from "../components/SectionHeading";

export default function Login() {
  const { user, loading, loginWithGoogle, logout } = useAuth();

  return (
    <div className="page-head-section section login-page">
      <div className="container login-page__inner">
        <SectionHeading
          center
          eyebrow="Account"
          title={user ? `Welcome, ${user.name.split(" ")[0]}` : "Sign in to Phronix"}
          description={
            user
              ? "You're signed in. Protected downloads and account features are now unlocked."
              : "Sign in with your Google account to access protected project downloads and manage your requests."
          }
        />

        <div className="card login-card">
          {loading ? (
            <p>Checking your session…</p>
          ) : user ? (
            <>
              <img src={user.avatar} alt={user.name} className="login-card__avatar" />
              <p className="login-card__email">{user.email}</p>
              <button className="btn btn--outline btn--block" onClick={logout}>
                <LogOut size={16} /> Sign out
              </button>
            </>
          ) : (
            <>
              <div className="login-card__icon"><ShieldCheck size={26} /></div>
              <button className="btn btn--gold btn--block" onClick={loginWithGoogle}>
                <LogIn size={16} /> Sign in with Google
              </button>
              <p className="login-card__note">
                We only use your Google account to verify who you are — never to post on your behalf.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
