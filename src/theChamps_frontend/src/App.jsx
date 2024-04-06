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
    "linear-gradient(90deg, hsl(15deg 80% 94%) 0%, hsl(7deg 100% 95%) 13%, hsl(355deg 100% 95%) 24%, hsl(340deg 100% 94%) 35%, hsl(324deg 100% 94%) 46%, hsl(306deg 94% 93%) 55%, hsl(275deg 100% 94%) 64%, hsl(246deg 100% 95%) 73%, hsl(222deg 100% 93%) 82%, hsl(211deg 100% 91%) 91%, hsl(203deg 88% 90%) 100%)";
  // Effect changing bg on scroll down
  useEffect(() => {
    const handleScroll = () => {
      document.body.style.transition = "background 2s";
      document.body.style.background =
        window.scrollY > 800
          ? "white"
          : "linear-gradient(90deg, hsl(15deg 80% 94%) 0%, hsl(7deg 100% 95%) 13%, hsl(355deg 100% 95%) 24%, hsl(340deg 100% 94%) 35%, hsl(324deg 100% 94%) 46%, hsl(306deg 94% 93%) 55%, hsl(275deg 100% 94%) 64%, hsl(246deg 100% 95%) 73%, hsl(222deg 100% 93%) 82%, hsl(211deg 100% 91%) 91%, hsl(203deg 88% 90%) 100%)";
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
