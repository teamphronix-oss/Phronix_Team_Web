import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import siteConfig from "../data/siteConfig";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/downloads", label: "Downloads" },
  { to: "/clients", label: "Clients" },
  { to: "/team", label: "Team" },
  { to: "/ongoing-projects", label: "Ongoing" },
  { to: "/contact", label: "Contact" },
  { to: "/careers", label: "Careers" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__logo" aria-label="Phronix home">
          <span className="navbar__mark">P</span>
          <span>{siteConfig.companyName}</span>
        </NavLink>

        <nav className="navbar__links" aria-label="Primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `navbar__link ${isActive ? "navbar__link--active" : ""}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <NavLink to="/login" className="btn btn--gold btn--sm">
            {user ? user.name.split(" ")[0] : "Login"}
          </NavLink>
          <button
            className="navbar__toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="navbar__mobile" aria-label="Mobile">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `navbar__mobile-link ${isActive ? "navbar__link--active" : ""}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink to="/login" className="btn btn--gold btn--block">
            {user ? user.name.split(" ")[0] : "Login"}
          </NavLink>
        </nav>
      )}
    </header>
  );
}
