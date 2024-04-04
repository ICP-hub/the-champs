import { useState } from "react";
import { theChamps_backend } from "declarations/theChamps_backend";
import HomePage from "./pages/HomePage";
import MyProfilePage from "./pages/MyProfilePage";
import Header from "./components/common/Header";
import ProductPage from "./pages/ProductPage";

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
      <ProductPage name={"All collection"} />
      {/* <HomePage />
      <MyProfilePage/> */}
    </main>
  );
}

export default App;
