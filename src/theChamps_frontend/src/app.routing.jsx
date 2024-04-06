import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import MyProfilePage from "./pages/MyProfilePage";

/**** Create Routes *****/
const appRoutes = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/products", element: <ProductPage /> },
  { path: "/my-profile", element: <MyProfilePage /> },
  { path: "/collection", element: <ProductPage name={"All Collection"} /> },
]);

export default appRoutes;
