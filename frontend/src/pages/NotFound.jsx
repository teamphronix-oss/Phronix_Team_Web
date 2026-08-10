import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="section not-found">
      <div className="container">
        <span className="eyebrow">404</span>
        <h1>This page doesn't exist</h1>
        <p>The page you're looking for may have moved or never existed.</p>
        <Link to="/" className="btn btn--gold">Back to home</Link>
      </div>
    </div>
  );
}
