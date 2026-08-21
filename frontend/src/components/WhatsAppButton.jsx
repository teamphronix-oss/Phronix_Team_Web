import siteConfig from "../data/siteConfig";

// Floating WhatsApp CTA — matching Phronix dark glassmorphism theme
export default function WhatsAppButton() {
  const href = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    siteConfig.whatsappDefaultMessage
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab"
      aria-label="Chat with Phronix on WhatsApp"
      data-cursor-label="WhatsApp"
    >
      <span className="whatsapp-fab__label">Chat on WhatsApp</span>
      {/* Official WhatsApp insignia */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="whatsapp-fab__icon"
        aria-hidden="true"
      >
        <path d="M17.5 6.5C16.03 5.03 14.07 4.22 12 4.22C7.7 4.22 4.22 7.7 4.22 12C4.22 13.38 4.58 14.72 5.26 15.91L4.17 19.89L8.25 18.82C9.4 19.45 10.69 19.78 12 19.78C16.3 19.78 19.78 16.3 19.78 12C19.78 9.93 18.97 7.97 17.5 6.5ZM12 18.47C10.82 18.47 9.68 18.15 8.68 17.56L8.44 17.42L5.99 18.06L6.64 15.68L6.49 15.44C5.84 14.41 5.5 13.22 5.5 12C5.5 8.42 8.42 5.5 12 5.5C13.73 5.5 15.36 6.18 16.59 7.41C17.82 8.64 18.5 10.27 18.5 12C18.5 15.58 15.58 18.47 12 18.47ZM15.56 13.91C15.36 13.81 14.41 13.34 14.23 13.27C14.06 13.21 13.93 13.18 13.8 13.38C13.67 13.58 13.3 14.04 13.18 14.17C13.07 14.31 12.96 14.33 12.76 14.23C12.56 14.13 11.72 13.85 10.72 12.96C9.94 12.27 9.42 11.41 9.27 11.16C9.12 10.91 9.25 10.77 9.35 10.67C9.44 10.58 9.56 10.42 9.66 10.3C9.76 10.18 9.8 10.1 9.87 9.95C9.93 9.8 9.9 9.67 9.85 9.57C9.8 9.47 9.42 8.54 9.27 8.16C9.11 7.79 8.96 7.84 8.84 7.83C8.73 7.82 8.6 7.82 8.47 7.82C8.34 7.82 8.13 7.87 7.95 8.07C7.77 8.27 7.27 8.74 7.27 9.7C7.27 10.66 7.97 11.58 8.07 11.71C8.17 11.84 9.45 13.82 11.41 14.67C11.88 14.87 12.24 14.99 12.53 15.08C13 15.23 13.43 15.21 13.77 15.16C14.15 15.1 14.94 14.68 15.1 14.23C15.27 13.77 15.27 13.38 15.22 13.3C15.17 13.21 15.04 13.16 14.84 13.06L15.56 13.91Z" />
      </svg>
    </a>
  );
}
