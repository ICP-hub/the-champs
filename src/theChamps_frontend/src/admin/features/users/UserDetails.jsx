import { useCanister } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";
import { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";
import { useParams } from "react-router";

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
      {isUserDataLoading ? (
        <div className="flex w-full items-center justify-center mt-12">
          <Grid
            visible={true}
            height="150"
            width="150"
            color="#EF4444"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass="grid-wrapper"
          />
        </div>
      ) : (
        <div>{id}</div>
      )}
    </div>
  );
};

export default UserDetail;
