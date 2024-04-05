import { useState } from "react";
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
