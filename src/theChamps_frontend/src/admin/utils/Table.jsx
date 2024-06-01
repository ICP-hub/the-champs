import React from "react";
import { Link } from "react-router-dom"; // Added import for Link
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  usePagination,
} from "react-table";
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
  HiChevronUp, // Added import for HiChevronUp
  HiChevronDown, // Added import for HiChevronDown
} from "react-icons/hi";
import { BsSortNumericDown } from "react-icons/bs";
// import { IoIosSearch } from "react-icons/io";
import { Principal } from "@dfinity/principal";
import { HiMagnifyingGlass } from "react-icons/hi2";

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div className="flex gap-2 border border-gray-400 rounded-md px-4 py-3 relative bg-transparent">
      <span className="bg-gradient-to-tr from-[#FC001E] to-[#FF7D57] absolute top-0 left-0 bottom-0 flex items-center px-2 rounded-l-md">
        <HiMagnifyingGlass size={24} color="white" />
      </span>
      <input
        type="text"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Search ${count} records...`}
        className="h-full outline-none pl-8 bg-transparent"
      />
    </div>
    // <div className="flex items-center w-full border dark:border-gray-500 rounded-md">
    //   <IoIosSearch />
    //   <input
    //     value={value || ""}
    //     onChange={(e) => {
    //       setValue(e.target.value);
    //       onChange(e.target.value);
    //     }}
    //     placeholder={`Search ${count} records...`}
    //     className="bg-transparent w-full py-2 px-4 pl-10 leading-tight focus:outline-none"
    //   />
    // </div>
  );
}

export const DetailButton = ({ value }) => {
  return (
    <Link
      to={value}
      className="bg-red-500 text-md tracking-wide py-2 px-4 rounded-xl text-white font-medium"
    >
      Detail
    </Link>
  );
};
export const DetailButton2 = ({ value }) => {
  const principal = value.toText();
  return (
    <Link
      to={principal}
      className="bg-red-500 text-md tracking-wide py-2 px-4 rounded-xl text-white font-medium"
    >
      Detail
    </Link>
  );
};

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <>
      <div className="flex items-center w-full">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        {headerGroups.map((headerGroup) =>
          headerGroup.headers.map((column) =>
            column.Filter ? (
              <div className="mt-2 sm:mt-0" key={column.id}>
                {column.render("Filter")}
              </div>
            ) : null
          )
        )}
      </div>
      <div className="mt-4 flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-7">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-md shadow-md">
              <table
                {...getTableProps()}
                className="min-w-full divide-y divide-[#121111]"
              >
                <thead className=" ">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          scope="col"
                          className="group px-6 py-3 text-left text-xs font-medium text-white bg-red-500  uppercase tracking-wider"
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          <div className="flex items-center justify-between ">
                            {column.render("Header")}
                            <span>
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <HiChevronDown className="w-4 h-4 text-[#6D01F6]" />
                                ) : (
                                  <HiChevronUp className="w-4 h-4 text-[#6D01F6]" />
                                )
                              ) : (
                                <BsSortNumericDown className="w-4 h-4 text-[#6D01F6] opacity-0 group-hover:opacity-100" />
                              )}
                            </span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()} className="bg-card">
                  {page.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                          <td
                            {...cell.getCellProps()}
                            className="px-6 py-4 whitespace-nowrap "
                            role="cell"
                          >
                            {cell.column.Cell.name === "defaultRenderer" ? (
                              <div className="text-sm ">
                                {cell.render("Cell")}
                              </div>
                            ) : (
                              cell.render("Cell")
                            )}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="py-3 flex items-center justify-between">
        <div className="flex-1 flex justify-between sm:hidden">
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous
          </button>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div className="flex gap-x-2 items-baseline ">
            <span className="text-sm ">
              Page <span className="font-medium ">{state.pageIndex + 1}</span>{" "}
              of <span className="font-medium">{pageOptions.length}</span>
            </span>
            <label>
              <span className="sr-only">Items Per Page</span>
              <select
                className=" dark:bg-[#3d3d5f] bg-white dark:border-[#914fe66a] outline-none border"
                value={state.pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[5, 10, 20].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-lg -space-x-px "
              aria-label="Pagination"
            >
              <button
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
                className="!rounded-l-lg !bg-[#F4F2F2] !hover:bg-[#F4F2F2] !border-[#330000] "
              >
                <HiChevronDoubleLeft
                  className="h-5 w-5 text-[#330000]"
                  aria-hidden="true"
                />
              </button>
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                className="!bg-[#F4F2F2] !hover:bg-[#F4F2F2] !border-[#330000]"
              >
                <HiChevronLeft
                  className="h-5 w-5 text-[#330000]"
                  aria-hidden="true"
                />
              </button>
              <button
                onClick={() => nextPage()}
                disabled={!canNextPage}
                className="!bg-[#F4F2F2] !hover:bg-[#F4F2F2] !border-[#330000]"
              >
                <HiChevronRight
                  className="h-5 w-5 text-[#330000]"
                  aria-hidden="true"
                />
              </button>
              <button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
                className="!rounded-r-lg !bg-[#F4F2F2] !hover:bg-[#F4F2F2] !border-[#330000]"
              >
                <HiChevronDoubleRight
                  className="h-5 w-5 text-[#330000]"
                  aria-hidden="true"
                />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
