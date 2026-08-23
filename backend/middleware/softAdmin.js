import jwt from "jsonwebtoken";

// Like requireAdmin, but never blocks the request — just attaches req.admin
// when a valid admin session cookie is present. Used on public GET routes so
// the admin panel can request unpublished/draft rows (?all=true) while the
// public site keeps hitting the exact same endpoint and only sees published
// ones.
export default function softAdmin(req, res, next) {
  const token = req.cookies?.["phronix.admin"];
  if (!token) return next();
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.role === "admin") req.admin = payload;
  } catch {
    // Invalid/expired token on a public route — just proceed as anonymous.
  }
  next();
}
