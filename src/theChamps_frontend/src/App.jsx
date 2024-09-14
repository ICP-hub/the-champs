import React, { useEffect, useState } from "react";
import appRoutes from "./app.routing";
import { RouterProvider } from "react-router-dom";
import { AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import bgImg from "./assets/bg.png";
import { useAuth } from "./auth/useClient";

function App() {
  const { scrollY } = useScroll();
  const [isBgVisible, setIsBgVisible] = useState(true);
  const { logout, authClient, isAuthenticated, principal, backendActor } =
    useAuth();

  // console.log("principal from app", principal);
  // console.log("isAuth form app", isAuthenticated);
  useMotionValueEvent(scrollY, "change", (scrollVal) => {
    // console.log("scroll", scrollVal);
    scrollVal > 0 ? setIsBgVisible(false) : setIsBgVisible(true);
  });

  // console.log(isBgVisible);
  return (
    <div>
      <main className="App flex flex-col h-screen w-screen relative">
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
