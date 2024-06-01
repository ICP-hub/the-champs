import { useCanister } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";
import { useEffect, useState } from "react";
// import { Grid } from "react-loader-spinner";
import { useParams } from "react-router";
import AdminLoader from "../../components/laoding-admin";

const UserDetail = () => {
  const { id } = useParams();
  const [isUserDataLoading, setIsUserDataLoading] = useState(false);
  const [backend] = useCanister("backend");
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setIsUserDataLoading(true);
        const res = await backend.getUserdetailsbyid(Principal.fromText(id));
        console.log(res);
      } catch (err) {
        console.error("Error fetching user details : ", err);
      } finally {
        setIsUserDataLoading(false);
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <div className="md:py-8 md:px-6 p-2">
      {isUserDataLoading ? <AdminLoader /> : <div>{id}</div>}
    </div>
  );
};

export default UserDetail;
