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
import MainAdmin from "./admin/pages/MainAdmin";
import DashBoard from "./admin/features/dashboard/DashBoard";
import Market from "./admin/features/collections/Market";
import CreateCollections from "./admin/features/collections/CreateCollection";
import HeroNFT from "./admin/features/NFT/HeroNFT";
import UserDashboard from "./admin/features/users/Users";
import UpdateCollection from "./admin/features/collections/UpdateCollection";
import NFTList from "./admin/features/NFT/NFTList";
import SingleNFT from "./admin/features/NFT/SingleNFT";
import User from "./admin/pages/User";
import Contact from "./admin/features/contact/contact";
import ContactDetail from "./admin/features/contact/ContactDetail";
import MintNft from "./admin/features/NFT/MintNft";
import UserDetail from "./admin/features/users/UserDetails";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderFailure from "./pages/OrderFailure";
/**** Create Routes *****/
const appRoutes = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/products", element: <ProductPage /> },
  {
    path: "/my-profile",
    element: <MyProfilePage />,
  },
  { path: "/collections", element: <CollectionPage name={"All Collection"} /> },
  { path: "/collection/:id", element: <ProductPage name={""} /> },
  { path: "/collection/:id/:slug/:index", element: <ProductDetails /> },

  { path: "/faq", element: <FAQ /> },

  { path: "/contact", element: <ContactUs /> },
  { path: "/about", element: <About /> },
  { path: "/privacy-policy", element: <PrivacyPolicy /> },
  { path: "/Terms-and-services", element: <TermsAndService /> },
  { path: "/how-it-works", element: <HowItWorks /> },
  { path: "/success", element: <OrderConfirmation /> },
  { path: "/failure", element: <OrderFailure /> },

  {
    path: "/admin",
    element: (
      <MainAdmin>
        <DashBoard />
      </MainAdmin>
    ),
  },
  {
    path: "/admin/collections",
    element: (
      <MainAdmin>
        <Market />
      </MainAdmin>
    ),
  },
  {
    path: "/admin/users",
    element: (
      <MainAdmin>
        <User />
      </MainAdmin>
    ),
  },
  {
    path: "/admin/collectibles/:slug",
    element: (
      <MainAdmin>
        <NFTList />
      </MainAdmin>
    ),
  },
  {
    path: "/details/:slug/:id",
    element: (
      <MainAdmin>
        <SingleNFT />
      </MainAdmin>
    ),
  },
  {
    path: "admin/create-collectibles/:slug",
    element: (
      <MainAdmin>
        <MintNft />
      </MainAdmin>
    ),
  },
  // {
  //   path: "/create-collection",
  //   element: (
  //     <MainAdmin>
  //       <CreateCollections></CreateCollections>
  //     </MainAdmin>
  //   ),
  // },

  // {
  //   path: "/admin/users/:sdf",
  //   element: (
  //     <MainAdmin>
  //       <UserDashboard />
  //     </MainAdmin>
  //   ),
  // },
  // User detail
  {
    path: "/admin/users/user-details/:id",
    element: (
      <MainAdmin>
        <UserDetail />
      </MainAdmin>
    ),
  },

  {
    path: "/admin/users/:sdf/update-collections",
    element: (
      <MainAdmin>
        <UpdateCollection />
      </MainAdmin>
    ),
  },
  {
    path: "/admin/users/:sdf/collection-detail",
    element: (
      <MainAdmin>
        <NFTList />
      </MainAdmin>
    ),
  },
  // {
  //   path: "/admin/users/:sdf/collection-detail/:slug",
  //   element: (
  //     <MainAdmin>
  //       <SingleNFT />
  //     </MainAdmin>
  //   ),
  // },
  {
    path: "/admin/collectible-detail/:collection/:slug/:id",
    element: (
      <MainAdmin>
        <SingleNFT />
      </MainAdmin>
    ),
  },
  {
    path: "admin/message",
    element: (
      <MainAdmin>
        <Contact />
      </MainAdmin>
    ),
  },
  {
    path: "admin/message/:slug",
    element: (
      <MainAdmin>
        <ContactDetail />
      </MainAdmin>
    ),
  },
]);

export default appRoutes;
