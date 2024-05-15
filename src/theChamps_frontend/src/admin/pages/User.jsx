import React, { useEffect, useMemo, useState } from "react";
import Table, { DetailButton, DetailButton2 } from "../utils/Table";
import { Link } from "react-router-dom";
import "regenerator-runtime/runtime";
import { useCanister } from "@connect2ic/react";
import { Grid } from "react-loader-spinner";
import { Principal } from "@dfinity/principal";

const User = () => {
  const [backend] = useCanister("backend");
  const [isLoading, setIsLoading] = useState(true);

  const [sampleData, setSampleData] = useState([]);

  const getlistUsers = async () => {
    try {
      const data = await backend.listUsers();
      setSampleData(data);
      setIsLoading(false);
      console.log("data", data);
    } catch (error) {
      console.log("reeegdf");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getlistUsers();
    }, 1000);
    return () => clearTimeout(timer);
  }, [backend]);
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "firstName",
      },
      {
        Header: "email",
        accessor: "email",
      },
      {
        Header: "discord",
        accessor: "discord",
      },
      {
        Header: "Detail",
        accessor: "id",
        Cell: ({ value }) => <DetailButton2 value={value} />,
      },
    ],
    []
  );

  const data = useMemo(() => sampleData, [sampleData]);
  // Get data from the second element of each sub-array
  const extractedData = data.map(([key, data]) => data);
  console.log(extractedData);
  return (
    <div className=" mx-4 md:py-8 md:px-6 p-2 flex h-screen flex-col dark:text-[#e0e0e0] text-[#676767] dark:bg-[#2e2e48] bg-[#fff] shadow-2xl dark:shadow-[#323257] rounded-2xl  mt-6">
      {isLoading ? (
        <div className="flex justify-center h-80 items-center">
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
        <Table columns={columns} data={extractedData} />
      )}
    </div>
  );
};

export default User;
