import { useState, useCallback } from "react";
import { SplashScreen } from "./components/medical/SplashScreen";
import { Navigation } from "./components/medical/Navigation";
import { HomePage } from "./components/medical/HomePage";
import { AboutPage } from "./components/medical/AboutPage";
import { ServicesPage } from "./components/medical/ServicesPage";
import { AppointmentPage } from "./components/medical/AppointmentPage";
import { LocationPage } from "./components/medical/LocationPage";
import { ChatWidget } from "./components/medical/ChatWidget";
import { AdminDashboard } from "./components/medical/AdminDashboard";
import { Footer } from "./components/medical/Footer";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState("home");

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  const handleNavigate = useCallback((page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-white">
      {currentPage !== "admin" && (
        <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      )}

      {currentPage === "home" && <HomePage onNavigate={handleNavigate} />}
      {currentPage === "about" && <AboutPage />}
      {currentPage === "services" && <ServicesPage />}
      {currentPage === "appointment" && <AppointmentPage />}
      {currentPage === "location" && <LocationPage />}
      {currentPage === "admin" && <AdminDashboard onNavigate={handleNavigate}/>}

      {currentPage !== "admin" && <Footer />}
      {currentPage !== "admin" && <ChatWidget />}
    </div>
  );
}