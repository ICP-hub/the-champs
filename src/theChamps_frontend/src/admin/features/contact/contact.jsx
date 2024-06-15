import React, { useEffect, useMemo, useState } from "react";
import Table, { DetailButton } from "../../utils/Table";
import { Link } from "react-router-dom";
import "regenerator-runtime/runtime";
import { useCanister } from "@connect2ic/react";
import AdminLoader from "../../components/laoding-admin";
import { useAuth } from "../../../auth/useClient";
// import { Grid } from "react-loader-spinner";

const Contact = () => {
  const { backendActor } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [sampleData, setSampleData] = useState([]);

  const getAllCollections = async () => {
    try {
      const data = await backendActor?.listContacts();
      setSampleData(data);
      setIsLoading(false);
      console.log("data", data);
    } catch (err) {
      console.error("error fetching messages : ", err);
      setIsLoading(false); // Ensure loading state is turned off in case of error
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getAllCollections();
    }, 1000);
    return () => clearTimeout(timer);
  }, [backendActor]);
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Contact Number",
        accessor: "contact_number",
      },
      {
        Header: "Detail",
        accessor: "id",
        Cell: ({ value }) => <DetailButton value={value} />,
      },
    ],
    []
  );

  const data = useMemo(() => sampleData, [sampleData]);
  // Get data from the second element of each sub-array
  const extractedData = data.map(([key, data]) => data);

  return (
    <div className="flex flex-col">
      {isLoading ? (
        <AdminLoader />
      ) : extractedData.length === 0 ? (
        <div>No data available</div>
      ) : (
        <Table columns={columns} data={extractedData} />
      )}
    </div>
  );
};

export default Contact;
