import { useEffect, useState } from "react";
import { theChamps_backend } from "declarations/theChamps_backend";
import HomePage from "./pages/HomePage";
import MyProfilePage from "./pages/MyProfilePage";
import Header from "./components/common/Header";
import ProductPage from "./pages/ProductPage";
import Footer from "./components/common/Footer";
import { RouterProvider } from "react-router-dom";
import appRoutes from "./app.routing";

function App() {
  const [greeting, setGreeting] = useState("");

  // Set initial body background
  document.body.style.background =
    "linear-gradient(to left, rgba(38, 0, 252,0.1), rgba(255, 0, 234, 0.1))";

  // Effect changing bg on scroll down
  useEffect(() => {
    const handleScroll = () => {
      document.body.style.transition = "background 2s";
      document.body.style.background =
        window.scrollY > 800
          ? "white"
          : "linear-gradient(to left, rgba(38, 0, 252, 0.1), rgba(255, 0, 234, 0.1))";
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    theChamps_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }

  return (
    <main>
      <Header />
      <div className="mt-28">
        <RouterProvider router={appRoutes} />
      </div>
      <Footer />
    </main>
  );
}

export default App;
