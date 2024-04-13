/* ----------------------------------------------------------------------------------------------------- */
/*  @ Imports.
/* ----------------------------------------------------------------------------------------------------- */

import CustomDivide from "../common/CustomDivide";
import HomeFeatured from "./HomeFeatured";
import HomePageA from "./HomepageA";
import HomePageB from "./HomepageB";
import HomePageC from "./HomepageC";
import HomePageD from "./HomepageD";
import HomePageE from "./HomepageE";
import HomePageF from "./HomepageF";
import HomePageG from "./HomepageG";
import HomePageH from "./HomepageH";
import HomePageI from "./HomepageI";
import HomePageJ from "./HomepageJ";
import Wallets from "./Wallets";

/* ----------------------------------------------------------------------------------------------------- */
/*  @ Base : <HomepageContainerMain />.
/* ----------------------------------------------------------------------------------------------------- */
const HomepageContainerMain = () => {
  return (
    <div>
      <HomePageA />;
      <Wallets />
      <HomePageB />
      <CustomDivide />
      <HomeFeatured />
      <CustomDivide />
      <HomePageC />
      <CustomDivide />
      <HomePageD />
      <CustomDivide />
      <HomePageE />
      <CustomDivide />
      <HomePageF />
      <CustomDivide />
      <HomePageG />
      <CustomDivide />
      <HomePageH />
      <CustomDivide />
      <HomePageI />
      <CustomDivide />
      <HomePageJ />
    </div>
  );
};

export default HomepageContainerMain;
