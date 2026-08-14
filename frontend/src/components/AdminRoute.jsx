import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

// Wrap any admin-only page with this. Redirects to /admin/login if not
// signed in as admin.
export default function AdminRoute({ children }) {
  const { admin, loading } = useAdminAuth();

  if (loading) return <div className="container section">Checking admin session…</div>;
  if (!admin) return <Navigate to="/admin/login" replace />;
  return children;
}