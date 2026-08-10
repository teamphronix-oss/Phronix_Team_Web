import { MessageCircle } from "lucide-react";
import siteConfig from "../data/siteConfig";

// Floating WhatsApp CTA — mounted once in App.jsx so it appears on every page.
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
    >
      <MessageCircle size={26} strokeWidth={2} />
    </a>
  );
}
