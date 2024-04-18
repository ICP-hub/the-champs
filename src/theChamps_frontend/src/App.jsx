import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import appRoutes from "./app.routing";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  // Set initial body background
  document.body.className = "bg-champs-main";

  // Initialize AOS and handle scroll effect
  React.useEffect(() => {
    AOS.init();
    const handleScroll = () => {
      document.body.style.transition = "background 2s";
      document.body.className =
        window.scrollY > 100 ? "bg-champs-white" : "bg-champs-main";
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Router>
      <main>
        <Header />
        <div className="mt-28">
          <Routes>{appRoutes}</Routes>
        </div>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
