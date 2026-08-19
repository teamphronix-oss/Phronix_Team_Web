import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Instagram,
  Github,
  Youtube,
  Linkedin,
} from "lucide-react";
import siteConfig from "../data/siteConfig";
import phronixLogo from "../assets/Gemini_Generated_Image_mflsmnmflsmnmfls.png";

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
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">

        {/* Logo */}
        <NavLink
          to="/"
          className="navbar__logo"
          aria-label="Phronix home"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          <img
            src={phronixLogo}
            alt="Phronix"
            className="navbar__mark navbar__mark--img"
          />

          <span>{siteConfig.companyName}</span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="navbar__links" aria-label="Primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `navbar__link ${
                  isActive ? "navbar__link--active" : ""
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="navbar__actions">

          {/* Social Links */}
          <div className="navbar__socials">

            <a
              href={siteConfig.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__social-icon navbar__social-icon--instagram"
              aria-label="Instagram"
            >
              <Instagram size={19} />
            </a>

            <a
              href={siteConfig.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__social-icon navbar__social-icon--github"
              aria-label="GitHub"
            >
              <Github size={19} />
            </a>

            <a
              href={siteConfig.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__social-icon navbar__social-icon--youtube"
              aria-label="YouTube"
            >
              <Youtube size={19} />
            </a>

            <a
              href={siteConfig.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__social-icon navbar__social-icon--linkedin"
              aria-label="LinkedIn"
            >
              <Linkedin size={19} />
            </a>

          </div>

          {/* Mobile Menu Button */}
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

      {/* Mobile Navigation */}
      {open && (
        <nav className="navbar__mobile" aria-label="Mobile">

          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `navbar__mobile-link ${
                  isActive ? "navbar__link--active" : ""
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}

          {/* Mobile Social Links */}
          <div className="navbar__socials navbar__socials--mobile">

            <a
              href={siteConfig.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__social-icon navbar__social-icon--instagram"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>

            <a
              href={siteConfig.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__social-icon navbar__social-icon--github"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>

            <a
              href={siteConfig.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__social-icon navbar__social-icon--youtube"
              aria-label="YouTube"
            >
              <Youtube size={20} />
            </a>

            <a
              href={siteConfig.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__social-icon navbar__social-icon--linkedin"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>

          </div>
        </nav>
      )}
    </header>
  );
}