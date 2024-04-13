import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import MyProfilePage from "./pages/MyProfilePage";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./pages/ProductDetails";

import FAQ from "./components/policy-faq/Faq";
import PrivacyPolicy from "./components/policy-faq/Privacy-policy";
/**** Create Routes *****/
const appRoutes = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/products", element: <ProductPage /> },
  { path: "/my-profile", element: <MyProfilePage /> },
  { path: "/collection", element: <CollectionPage name={"All Collection"} /> },
  { path: "/collections/collection", element: <ProductPage name={""} /> },
  { path: "/collections/collection/a", element: <ProductDetails /> },
  
  { path: "/faq", element: <FAQ /> },
  { path: "/privacy-policy", element: <PrivacyPolicy /> },
]);

export default appRoutes;
