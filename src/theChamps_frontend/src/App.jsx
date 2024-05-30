import React, { useState } from "react";
import appRoutes from "./app.routing";
import { RouterProvider } from "react-router-dom";
import "aos/dist/aos.css";
import { AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import bgImg from "./assets/bg.png";

function App() {
  const { scrollY } = useScroll();
  const [isBgVisible, setIsBgVisible] = useState(null);

  useMotionValueEvent(scrollY, "change", (scrollVal) => {
    // console.log("scroll", scrollVal);
    scrollVal > 0 ? setIsBgVisible(false) : setIsBgVisible(true);
  });

  console.log(isBgVisible);

  return (
    <div>
      <main className="App">
        <AnimatePresence mode="wait" initial={true}>
          <RouterProvider router={appRoutes} />
        </AnimatePresence>
      </main>
      <img
        src={bgImg}
        alt="bgImg"
        className={`fixed top-0 left-0 right-0 bottom-0 w-screen h-screen -z-20 ${
          !isBgVisible && "hidden"
        }`}
      />
    </div>
  );
}

export default App;
