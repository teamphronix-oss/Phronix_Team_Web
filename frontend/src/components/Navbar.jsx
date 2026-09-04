import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  Instagram,
  Github,
  Youtube,
  Linkedin,
} from "lucide-react";
import siteConfig from "../data/siteConfig";
import useSiteLogo from "../hooks/useSiteLogo";
import phronixLogo from "../assets/Gemini_Generated_Image_mflsmnmflsmnmfls.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  {
    to: "/clients",
    label: "Clients",
    children: [
      {
        label: "Project",
        children: [
          { to: "/downloads", label: "Client Project" },
          { to: "/projects", label: "Student Project" },
        ],
      },
      { to: "/ongoing-projects", label: "Ongoing" },
    ],
  },
  { to: "/contact", label: "Contact" },
  {
    to: "/careers",
    label: "Careers",
    children: [{ to: "/team", label: "Team" }],
  },
];

export default function Navbar() {
  const logoUrl = useSiteLogo();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [desktopSubmenu, setDesktopSubmenu] = useState(null);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);
  const [pendingNav, setPendingNav] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const closeTimer = useRef(null);
  const subCloseTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
    setDesktopDropdown(null);
    setMobileDropdown(null);
    setDesktopSubmenu(null);
    setMobileSubmenu(null);
  }, [location.pathname]);

  const openDropdown = (label) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDesktopDropdown(label);
  };

  const scheduleCloseDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setDesktopDropdown(null);
      setDesktopSubmenu(null);
    }, 150);
  };

  const openSubmenu = (label) => {
    if (subCloseTimer.current) clearTimeout(subCloseTimer.current);
    setDesktopSubmenu(label);
  };

  const scheduleCloseSubmenu = () => {
    if (subCloseTimer.current) clearTimeout(subCloseTimer.current);
    subCloseTimer.current = setTimeout(() => setDesktopSubmenu(null), 150);
  };

  // Clicking a nav link should always land you at the top of that page.
  // React Router only fires a navigation (and our ScrollToTop effect) when the
  // pathname actually changes, so a click on the link for the page you're
  // ALREADY on (e.g. clicking "Home" while deep-scrolled on Home) needs to be
  // handled manually here.
  const handleNavClick = (to) => {
    if (location.pathname === to) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setOpen(false);
  };

  // Recursively checks if any descendant link matches the current path,
  // so parent dropdown triggers (which may have grandchildren, not just
  // direct children) still highlight as active.
  const hasActiveDescendant = (item) => {
    if (item.to === location.pathname) return true;
    if (!item.children) return false;
    return item.children.some((c) => hasActiveDescendant(c));
  };

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
            src={logoUrl || phronixLogo}
            alt="Phronix"
            className="navbar__mark navbar__mark--img"
          />

          <span>{siteConfig.companyName}</span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="navbar__links" aria-label="Primary">
          {links.map((l) =>
            l.children ? (
              <div
                key={l.to}
                className="navbar__dropdown"
                onMouseEnter={() => openDropdown(l.label)}
                onMouseLeave={scheduleCloseDropdown}
              >
                <button
                  type="button"
                  className={`navbar__link navbar__link--dropdown ${
                    hasActiveDescendant(l) ? "navbar__link--active" : ""
                  }`}
                  aria-haspopup="true"
                  aria-expanded={desktopDropdown === l.label}
                  onClick={() => {
                    navigate(l.to);
                    handleNavClick(l.to);
                    setDesktopDropdown((cur) =>
                      cur === l.label ? null : l.label
                    );
                  }}
                >
                  {l.label}
                  <ChevronDown
                    size={14}
                    className={`navbar__dropdown-caret ${
                      desktopDropdown === l.label
                        ? "navbar__dropdown-caret--open"
                        : ""
                    }`}
                  />
                </button>

                {desktopDropdown === l.label && (
                  <div className="navbar__dropdown-menu" role="menu">
                    {l.children.map((c) =>
                      c.children ? (
                        <div
                          key={c.label}
                          className="navbar__submenu"
                          onMouseEnter={() => openSubmenu(c.label)}
                        >
                          <button
                            type="button"
                            className={`navbar__dropdown-item navbar__dropdown-item--submenu ${
                              hasActiveDescendant(c)
                                ? "navbar__dropdown-item--active"
                                : ""
                            }`}
                            aria-haspopup="true"
                            aria-expanded={desktopSubmenu === c.label}
                            onClick={() =>
                              setDesktopSubmenu((cur) =>
                                cur === c.label ? null : c.label
                              )
                            }
                          >
                            {c.label}
                            <ChevronDown
                              size={13}
                              className={`navbar__dropdown-caret navbar__dropdown-caret--side ${
                                desktopSubmenu === c.label
                                  ? "navbar__dropdown-caret--open"
                                  : ""
                              }`}
                            />
                          </button>

                          {desktopSubmenu === c.label && (
                            <div
                              className="navbar__dropdown-menu navbar__dropdown-menu--submenu"
                              role="menu"
                            >
                              {c.children.map((g) => (
                                <NavLink
                                  key={g.to}
                                  to={g.to}
                                  className={({ isActive }) =>
                                    `navbar__dropdown-item ${
                                      isActive
                                        ? "navbar__dropdown-item--active"
                                        : ""
                                    }`
                                  }
                                  role="menuitem"
                                  onClick={() => handleNavClick(g.to)}
                                >
                                  {g.label}
                                </NavLink>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                      <NavLink
  key={c.to}
  to={c.to}
  className={({ isActive }) =>
    `navbar__dropdown-item ${
      isActive ? "navbar__dropdown-item--active" : ""
    }`
  }
  role="menuitem"
  onClick={() => handleNavClick(c.to)}
>
  {c.label}
</NavLink>
                      )
                    )}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `navbar__link ${
                    isActive ? "navbar__link--active" : ""
                  }`
                }
                onClick={() => handleNavClick(l.to)}
              >
                {l.label}
              </NavLink>
            )
          )}
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

          {links.map((l) =>
            l.children ? (
              <div key={l.to} className="navbar__mobile-group">
                <div
                  className="navbar__mobile-link navbar__mobile-link--dropdown"
                  aria-expanded={mobileDropdown === l.label}
                >
                  <NavLink
                    to={l.to}
                    end={l.to === "/"}
                    className="navbar__mobile-link-text"
                    onClick={() => handleNavClick(l.to)}
                  >
                    {l.label}
                  </NavLink>
                  <button
                    type="button"
                    className="navbar__mobile-dropdown-toggle"
                    aria-label={`Toggle ${l.label} submenu`}
                    aria-expanded={mobileDropdown === l.label}
                    onClick={(e) => {
                      e.stopPropagation();
                      setMobileDropdown((cur) =>
                        cur === l.label ? null : l.label
                      );
                    }}
                  >
                    <ChevronDown
                      size={16}
                      className={`navbar__dropdown-caret ${
                        mobileDropdown === l.label
                          ? "navbar__dropdown-caret--open"
                          : ""
                      }`}
                    />
                  </button>
                </div>

                {mobileDropdown === l.label && (
                  <div className="navbar__mobile-submenu">
                    {l.children.map((c) =>
                      c.children ? (
                        <div key={c.label} className="navbar__mobile-subgroup">
                          <button
                            type="button"
                            className="navbar__mobile-sublink navbar__mobile-sublink--dropdown"
                            aria-expanded={mobileSubmenu === c.label}
                            onClick={() =>
                              setMobileSubmenu((cur) =>
                                cur === c.label ? null : c.label
                              )
                            }
                          >
                            {c.label}
                            <ChevronDown
                              size={14}
                              className={`navbar__dropdown-caret ${
                                mobileSubmenu === c.label
                                  ? "navbar__dropdown-caret--open"
                                  : ""
                              }`}
                            />
                          </button>

                          {mobileSubmenu === c.label && (
                            <div className="navbar__mobile-subsubmenu">
                              {c.children.map((g) => (
                                <NavLink
                                  key={g.to}
                                  to={g.to}
                                  className={({ isActive }) =>
                                    `navbar__mobile-subsublink ${
                                      isActive ? "navbar__link--active" : ""
                                    }`
                                  }
                                  onClick={() => handleNavClick(g.to)}
                                >
                                  {g.label}
                                </NavLink>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <NavLink
                          key={c.to}
                          to={c.to}
                          className={({ isActive }) =>
                            `navbar__mobile-sublink ${
                              isActive ? "navbar__link--active" : ""
                            }`
                          }
                          onClick={() => handleNavClick(c.to)}
                        >
                          {c.label}
                        </NavLink>
                      )
                    )}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `navbar__mobile-link ${
                    isActive ? "navbar__link--active" : ""
                  }`
                }
                onClick={() => handleNavClick(l.to)}
              >
                {l.label}
              </NavLink>
            )
          )}

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