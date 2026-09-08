import { useEffect, useRef, useState } from "react";
import { Bot, X, Send, Sparkles } from "lucide-react";
import "../styles/home/chatbot.css";

const GREETING =
  "Hi, I'm the Phronix assistant — a small demo of the kind of chatbot we build into client products. Ask me about services, pricing, AI, or how to get in touch.";

// Lightweight rule-based reply engine — this widget is a live demo of the
// "AI Chatbots & Support Copilots" service, running on Phronix's own site.
function getBotReply(input) {
  const text = input.toLowerCase();

  if (/\b(hi|hello|hey|greetings|howdy)\b/.test(text)) {
    return "Hey there! What can I help you with — services, pricing, or getting in touch?";
  }
  if (/(price|cost|budget|pricing|rate|quote)/.test(text)) {
    return "Most engagements start in the ₹5,999–₹9,999 range depending on scope. Head to /services for the full breakdown, or /contact to get an exact quote.";
  }
  if (/(ai|chatbot|automat|copilot|rag|gpt|claude|llm)/.test(text)) {
    return "We build AI chatbots like this one, plus we retrofit AI into software you already have — search, summarization, internal copilots. Check /services#automate.";
  }
  if (/(market|seo|ads|campaign|social|brand|roas|traffic|grow)/.test(text)) {
    return "On the growth side we run SEO, paid ads, branding, and content — see /services#grow for specifics and real campaign results.";
  }
  if (/(web|app|mobile|build|develop|frontend|backend|cloud)/.test(text)) {
    return "Web, mobile, cloud, backend — full product builds from prototype to production. See /services#build for the details.";
  }
  if (/(contact|talk|call|email|reach|phone|whatsapp)/.test(text)) {
    return "You can reach us at hello@phronix.io or via the contact form — head to /contact and we'll get back to you quickly.";
  }
  if (/(project|case study|portfolio|work|demo)/.test(text)) {
    return "Take a look at /projects — filter by Web App, Mobile, AI & Automation, or Marketing & Growth to see relevant case studies.";
  }
  return "I'm a lightweight demo bot, so I don't catch everything — but for anything specific, the team at Phronix will. Try /contact, or ask me about services, pricing, or AI.";
}

export default function ChatBotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: GREETING },
  ]);
  const [draft, setDraft] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const listRef = useRef(null);

  // Allow other components (e.g. the floating dock) to open the bot globally.
  useEffect(() => {
    const openHandler = () => setIsOpen(true);
    window.addEventListener("phronix:open-chatbot", openHandler);
    return () => window.removeEventListener("phronix:open-chatbot", openHandler);
  }, []);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;

    const userMsg = { role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setDraft("");
    setIsTyping(true);

    const reply = getBotReply(trimmed);
    const delay = 450 + Math.min(reply.length * 8, 800);

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
      setIsTyping(false);
    }, delay);
  };

  return (
    <>
      <button
        type="button"
        className="chatbot-fab"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
        data-cursor-label="AI Bot"
      >
        {isOpen ? <X size={22} /> : <Bot size={24} />}
      </button>

      {isOpen && (
        <div className="chatbot-panel" role="dialog" aria-label="Phronix AI assistant">
          <div className="chatbot-panel__header">
            <div className="chatbot-panel__title">
              <Sparkles size={15} />
              <span>Phronix AI Assistant</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span className="chatbot-panel__badge">Live demo</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "rgba(255,255,255,0.6)",
                  cursor: "pointer",
                  display: "grid",
                  placeItems: "center",
                  padding: "2px",
                }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="chatbot-panel__messages" ref={listRef}>
            {messages.map((m, i) => (
              <div
                key={i}
                className={`chatbot-msg chatbot-msg--${m.role}`}
              >
                {m.text}
              </div>
            ))}
            {isTyping && (
              <div className="chatbot-msg chatbot-msg--bot chatbot-msg--typing">
                <span />
                <span />
                <span />
              </div>
            )}
          </div>

          <form className="chatbot-panel__input" onSubmit={handleSend}>
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Ask about services, pricing, AI…"
              aria-label="Message"
            />
            <button type="submit" aria-label="Send message">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
