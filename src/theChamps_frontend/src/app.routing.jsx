import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import MyProfilePage from "./pages/MyProfilePage";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./pages/ProductDetails";
import Protected from "./components/common/Protected";

import FAQ from "./components/policy-faq/Faq";

import ContactUs from "./components/contact/ContactUs";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicyPage";
import TermsAndService from "./pages/TermsAndService";
import HowItWorks from "./pages/How-it-works";
/**** Create Routes *****/
const appRoutes = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/products", element: <ProductPage /> },
  {
    path: "/my-profile",
    element: (
      <Protected>
        <MyProfilePage />
      </Protected>
    ),
  },
  { path: "/collection", element: <CollectionPage name={"All Collection"} /> },
  { path: "/collections/collection", element: <ProductPage name={""} /> },
  { path: "/collections/collection/a", element: <ProductDetails /> },

  { path: "/faq", element: <FAQ /> },

  { path: "/contact", element: <ContactUs /> },
  { path: "/about", element: <About /> },
  { path: "/privacy-policy", element: <PrivacyPolicy /> },
  { path: "/Terms-and-services", element: <TermsAndService /> },
  { path: "/how-it-works", element: <HowItWorks /> },
]);

export default appRoutes;
