import AdminHeader from "../components/Admin-Header";
import NavigationMenu from "../components/Navigation-menu";
const BaseLayout = () => {
  return (
    <div className="h-screen w-screen">
      <div className="flex">
        <NavigationMenu />
        <AdminHeader />
      </div>
    </div>
  );
};

export default BaseLayout;
