import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import PageLoader from "./components/PageLoader";
import CustomCursor from "./components/CustomCursor";
import CursorTrailBlobs from "./components/CursorTrailBlobs";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Downloads from "./pages/Downloads";
import Clients from "./pages/Clients";
import Team from "./pages/Team";
import OngoingProjects from "./pages/OngoingProjects";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";
import Careers from "./pages/Careers";

export default function App() {
  return (
    <AuthProvider>
      <CursorTrailBlobs />
      <CustomCursor />
      <PageLoader />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/team" element={<Team />} />
          <Route path="/ongoing-projects" element={<OngoingProjects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/careers" element={<Careers />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </AuthProvider>
  );
}