import React, { useEffect, useMemo, useState } from "react";
import Table, { DetailButton } from "../../utils/Table";
import { Link } from "react-router-dom";
import "regenerator-runtime/runtime";
import { useCanister } from "@connect2ic/react";
import AdminLoader from "../../components/laoding-admin";
// import { Grid } from "react-loader-spinner";

const Contact = () => {
  const [backend] = useCanister("backend");
  const [isLoading, setIsLoading] = useState(true);

  const [sampleData, setSampleData] = useState([]);

  const getAllCollections = async () => {
    try {
      const data = await backend.listContacts();
      setSampleData(data);
      setIsLoading(false);
      console.log("data", data);
    } catch (err) {
      console.error("error fetching messages : ", err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getAllCollections();
    }, 1000);
    return () => clearTimeout(timer);
  }, [backend]);
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "email",
        accessor: "email",
      },
      {
        Header: "contact_number",
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
  console.log(extractedData);

  return (
    <div className="flex flex-col">
      {isLoading ? (
        <AdminLoader />
      ) : (
        <Table columns={columns} data={extractedData} />
      )}
    </div>
  );
};

export default Contact;
