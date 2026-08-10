// Blocks a route unless a valid session user is attached by passport.
export default function requireAuth(req, res, next) {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ message: "Please sign in to continue." });
  }
  next();
}
