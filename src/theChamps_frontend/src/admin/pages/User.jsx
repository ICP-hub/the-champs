import React from "react";
import Table, { DetailButton } from "../utils/Table";
import { Link } from "react-router-dom";

const User = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "title",
      },
      {
        Header: "Type",
        accessor: "category",
      },
      {
        Header: "Total nft",
        accessor: "totalnft",
      },
      {
        Header: "Detail",
        accessor: "slug",
        Cell: ({ value }) => <DetailButton value={value} />,
      },
    ],
    []
  );

  const sampleData = [
    {
      title: "rutba",
      category: "creator",
      status: "Active",
      totalnft: "8",
      inventory: "sgfsgjfdg34fsdgfdgdsd",
      image:
        "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg?w=740&t=st=1713351871~exp=1713352471~hmac=ed679c41842035c86855182a5cdfd9b4317fac54471101d127d87f9cdd467412", // Sample NFT image link
      slug: "product-1",
    },
    {
      title: "Ritesh",
      category: "minner",
      status: "Paused",
      totalnft: "6",
      inventory: "54gfg54fdgfd5g4fd5g",
      image:
        "https://img.freepik.com/free-vector/hand-drawn-virtual-sports-illustration_23-2150581118.jpg?t=st=1713351989~exp=1713355589~hmac=121e9e0f3087dd1846af2c6832cffff96815d1016baa128800f8ef2bd443f93e&w=740", // Sample NFT image link
      slug: "product-2",
    },
  ];
  return (
    <div className=" mx-4 md:py-8 md:px-6 p-2 flex h-screen flex-col dark:text-[#e0e0e0] text-[#676767] dark:bg-[#2e2e48] bg-[#fff] shadow-2xl dark:shadow-[#323257] rounded-2xl  mt-6">
      <Table columns={columns} data={sampleData} />
    </div>
  );
};

export default User;
