import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import MyProfilePage from "./pages/MyProfilePage";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./pages/ProductDetails";

/**** Create Routes *****/
const appRoutes = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/products", element: <ProductPage /> },
  { path: "/my-profile", element: <MyProfilePage /> },
  { path: "/collection", element: <CollectionPage name={"All Collection"} /> },
  { path: "/collections/collection", element: <ProductPage name={""} /> },
  { path: "/collections/collection/a", element: <ProductDetails /> },
]);

export default appRoutes;
