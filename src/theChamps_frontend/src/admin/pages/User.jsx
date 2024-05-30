import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCanister } from "@connect2ic/react";
import { Grid } from "react-loader-spinner";
import { Principal } from "@dfinity/principal";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { motion } from "framer-motion";
// listUsers: () → (vec record {principal; record {twitter:text; email:text; discord:text; profileimage:text; lastName:text; telegram:text; firstName:text}}) query
// User Component
const User = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [backend] = useCanister("backend");
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const usersPerPage = 10;

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = userData?.filter(
    ([principal, user]) =>
      principal.toText().includes(searchQuery) ||
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers?.slice(indexOfFirstUser, indexOfLastUser);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsUserLoading(true);
        const res = await backend.listUsers();
        console.log("response for list users:", res);
        setUserData(res);
      } catch (err) {
        console.error("error fetching user data:", err);
      } finally {
        setIsUserLoading(false);
      }
    };
    fetchUsers();
  }, [backend]);

  return (
    <div className="mx-4 md:py-8 md:px-6 p-2 text-textall h-full flex flex-col">
      <SearchUser handleSearch={handleSearch} />
      <div className="bg-card rounded-lg mt-6 flex flex-col flex-grow">
        {isUserLoading ? (
          <div className="h-full w-full flex items-center justify-center">
            <Grid
              visible={true}
              height="150"
              width="150"
              color="#EF4444"
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperClass="grid-wrapper"
            />
          </div>
        ) : (
          <>
            <UserLabels users={currentUsers} />
            <div className="mt-auto">
              <Pagination
                totalUsers={filteredUsers?.length}
                usersPerPage={usersPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const SearchUser = ({ handleSearch }) => {
  return (
    <div className="flex gap-2 border border-gray-400 rounded-md px-4 py-3 relative bg-transparent">
      <span className="bg-gradient-to-tr from-[#FC001E] to-[#FF7D57] absolute top-0 left-0 bottom-0 flex items-center px-2 rounded-l-md">
        <HiMagnifyingGlass size={24} color="white" />
      </span>
      <input
        type="text"
        placeholder="Search user data"
        onChange={handleSearch}
        className="h-full outline-none pl-8 bg-transparent"
      />
    </div>
  );
};

const UserLabels = ({ users }) => {
  return (
    <div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 uppercase text-sm font-medium button rounded-t-lg py-4 text-white">
        <div className="flex items-center mx-16">Name</div>
        <div className="hidden md:flex items-center mx-16">Email</div>
        <div className="hidden lg:flex items-center mx-16">Principal</div>
        <div className="flex items-center justify-center mx-16">Detail</div>
      </div>
      {users && users.length > 0 ? (
        users?.map(([principal, user], index) => (
          <div
            key={index}
            className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 py-4 border-t border-divider text-sm"
          >
            <div className="flex items-center gap-2 mx-12">
              <img
                src={user.profileimage}
                alt={`${user.firstName} ${user.lastName}`}
                className="h-8 w-8 rounded-full"
              />
              <div className="h-8 flex items-center overflow-hidden">
                <p className="line-clamp-1">{`${user.firstName} ${user.lastName}`}</p>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center overflow-hidden w-full">
              <span className="truncate">{user.email}</span>
            </div>
            <div className="hidden lg:flex items-center justify-center overflow-hidden w-full">
              <span className="truncate">{principal.toText()}</span>
            </div>
            <Link
              to={`/admin/users/user-details/${principal.toText()}`}
              className="flex items-center justify-center"
            >
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="button text-white px-2 py-1 rounded text-sm font-medium"
              >
                View
              </motion.button>
            </Link>
          </div>
        ))
      ) : (
        <div className="h-full w-full flex items-center justify-center">
          No users Available
        </div>
      )}
    </div>
  );
};

const Pagination = ({
  totalUsers,
  usersPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex space-x-3 text-textall w-full items-center justify-center py-4">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        className="flex items-center justify-center cursor-pointer bg-gray-300 w-9 h-8 rounded"
      >
        <MdKeyboardArrowLeft size={24} color="black" />
      </button>
      <div className="flex gap-4">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`flex items-center justify-center cursor-pointer text-sm font-bold w-9 h-8 rounded ${
              currentPage === number ? "button text-white" : ""
            }`}
          >
            {number}
          </button>
        ))}
      </div>
      <button
        onClick={() =>
          setCurrentPage((prev) => Math.min(prev + 1, pageNumbers.length))
        }
        className="flex items-center justify-center cursor-pointer bg-gray-300 w-9 h-8 rounded"
      >
        <MdKeyboardArrowRight size={24} color="black" />
      </button>
    </div>
  );
};

// const [backend] = useCanister("backend");
// const [isLoading, setIsLoading] = useState(true);

// const [sampleData, setSampleData] = useState([]);

// const getlistUsers = async () => {
//   try {
//     const data = await backend.listUsers();
//     setSampleData(data);
//     setIsLoading(false);
//     console.log("data", data);
//   } catch (error) {
//     console.log("reeegdf");
//   }
// };

// useEffect(() => {
//   const timer = setTimeout(() => {
//     getlistUsers();
//   }, 1000);
//   return () => clearTimeout(timer);
// }, [backend]);
// const columns = React.useMemo(
//   () => [
//     {
//       Header: "Name",
//       accessor: "firstName",
//     },
//     {
//       Header: "email",
//       accessor: "email",
//     },
//     {
//       Header: "discord",
//       accessor: "discord",
//     },
//     {
//       Header: "Detail",
//       accessor: "id",
//       Cell: ({ value }) => <DetailButton2 value={value} />,
//     },
//   ],
//   []
// );

// const data = useMemo(() => sampleData, [sampleData]);
// // Get data from the second element of each sub-array
// const extractedData = data.map(([key, data]) => data);
// console.log(extractedData);
// return (
//   <div className=" mx-4 md:py-8 md:px-6 p-2 flex h-screen flex-col dark:text-[#e0e0e0] text-[#676767] dark:bg-[#2e2e48] bg-[#fff] shadow-2xl dark:shadow-[#323257] rounded-2xl  mt-6">
//     {isLoading ? (
//       <div className="flex justify-center h-80 items-center">
//         <Grid
//           visible={true}
//           height="150"
//           width="150"
//           color="#EF4444"
//           ariaLabel="grid-loading"
//           radius="12.5"
//           wrapperStyle={{}}
//           wrapperClass="grid-wrapper"
//         />
//       </div>
//     ) : (
//       <Table columns={columns} data={extractedData} />
//     )}
//   </div>
// );
// };

export default User;
