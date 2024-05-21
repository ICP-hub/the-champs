import React, { useEffect } from "react";
import appRoutes from "./app.routing";
import { RouterProvider } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { AnimatePresence } from "framer-motion";
import { useCanister } from "@connect2ic/react";

function App() {
  // Set initial body background
  // console.log("backend from app.jsx", backend);
  document.body.className = "bg-champs-main";
  // Initialize AOS and handle scroll effect
  useEffect(() => {
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
    <main className="App">
      <AnimatePresence mode="wait" initial={true}>
        <RouterProvider router={appRoutes} />
      </AnimatePresence>
    </main>
  );
}

export default App;
