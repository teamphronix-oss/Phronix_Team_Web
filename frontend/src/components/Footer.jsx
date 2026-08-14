import { Link } from "react-router-dom";
import { Github, Instagram, Youtube, Mail, MapPin, Linkedin } from "lucide-react";
import siteConfig from "../data/siteConfig";
import phronixLogo from "../assets/phronix-logo.png";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <div className="navbar__logo" style={{ color: "#f7f5ee" }}>
            <img src={phronixLogo} alt="" className="navbar__mark navbar__mark--img" />
            <span>{siteConfig.companyName}</span>
          </div>
          <p>{siteConfig.shortDescription}</p>
          <div className="footer__social">
            <a
              href={siteConfig.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-icon footer__social-icon--instagram"
              aria-label="Instagram"
            >
              <Instagram size={22} />
            </a>
            <a
              href={siteConfig.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-icon footer__social-icon--github"
              aria-label="GitHub"
            >
              <Github size={22} />
            </a>
            <a
              href={siteConfig.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-icon footer__social-icon--youtube"
              aria-label="YouTube"
            >
              <Youtube size={22} />
            </a>
            <a
              href={siteConfig.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-icon footer__social-icon--linkedin"
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
            </a>
          </div>
        </div>

        <div className="footer__col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/team">Our Team</Link></li>
            <li><Link to="/ongoing-projects">Ongoing Projects</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/careers">Careers</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Services</h4>
          <ul>
            <li><Link to="/services">Web Development</Link></li>
            <li><Link to="/services">Mobile Apps</Link></li>
            <li><Link to="/services">Cloud & DevOps</Link></li>
            <li><Link to="/services">UI/UX Design</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Get in Touch</h4>
          <ul className="footer__contact">
            <li>
              <Mail size={16} />
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </li>
            <li>
              <MapPin size={16} />
              <span>{siteConfig.address.line1}, {siteConfig.address.line2}</span>
            </li>
            <li>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappDefaultMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__whatsapp"
              >
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>&copy; {year} {siteConfig.companyName}. All rights reserved.</p>
        <p className="footer__gst">GSTIN: {siteConfig.gstNumber}</p>
      </div>
    </footer>
  );
}