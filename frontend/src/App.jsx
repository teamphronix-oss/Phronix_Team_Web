import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import SmoothScroll from "./components/SmoothScroll";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import ChatBotWidget from "./components/ChatBotWidget";
import PageLoader from "./components/PageLoader";
import CustomCursor from "./components/CustomCursor";
import CursorTrailBlobs from "./components/CursorTrailBlobs";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Downloads from "./pages/Downloads";
import ActivateDownload from "./pages/ActivateDownload";
import Clients from "./pages/Clients";
import Team from "./pages/Team";
import OngoingProjects from "./pages/OngoingProjects";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Careers from "./pages/Careers";

import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <SmoothScroll>
        <CursorTrailBlobs />
        <CustomCursor />
        <PageLoader />
        <ScrollToTop />

        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/activate-download" element={<ActivateDownload />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/team" element={<Team />} />
            <Route path="/ongoing-projects" element={<OngoingProjects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/careers" element={<Careers />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
        <ScrollToTopButton />
        <WhatsAppButton />
        <ChatBotWidget />
      </SmoothScroll>
    </AuthProvider>
  );
}