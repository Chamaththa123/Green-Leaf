import React, { useState, useEffect } from "react";
import { IconButton, Tooltip } from "@material-tailwind/react";
import Select from "react-select";
import { ViewIcon } from "../../utils/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";
import { tableHeaderStyles } from "../../utils/utils";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../contexts/NavigationContext";
import { ViewLeaf } from "./ViewLeaf";
import * as XLSX from "xlsx";

export const GreenLeaf = () => {
  const { user } = useStateContext();
  const factoryId = user.factoryId;
  const [leafs, setLeafs] = useState([]);
  const [filteredLeafs, setFilteredLeafs] = useState([]);
  const [fromDate, setFromDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);
  const [viewLeafOpen, setViewLeafOpen] = useState(false);
  const [editLeafOpen, setEditLeafOpen] = useState(false);
  const [selectedLeafId, setSelectedLeafId] = useState(null);

  // Fetching leaf details
  const fetchLeaf = () => {
    axiosClient
      .get(`/GreenLeafBls/byFactory/${factoryId}`)
      .then((res) => {
        setLeafs(res.data);
        filterLeafsByDate(res.data, fromDate, toDate);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchLeaf();
  }, [factoryId]);

  // Filter data by date range
  const filterLeafsByDate = (data, start, end) => {
    const startDate = new Date(start).setHours(0, 0, 0, 0);
    const endDate = new Date(end).setHours(23, 59, 59, 999);
    const filtered = data.filter((leaf) => {
      const leafDate = new Date(leaf.date).getTime();
      return leafDate >= startDate && leafDate <= endDate;
    });
    setFilteredLeafs(filtered);
  };

  // Handle date range changes
  const handleFromDateChange = (e) => {
    const newFromDate = e.target.value;
    setFromDate(newFromDate);
    filterLeafsByDate(leafs, newFromDate, toDate);
  };

  const handleToDateChange = (e) => {
    const newToDate = e.target.value;
    setToDate(newToDate);
    filterLeafsByDate(leafs, fromDate, newToDate);
  };

  const handleViewClick = (leaf) => {
    setViewLeafOpen(true);
    setSelectedLeafId(leaf.trNo);
  };

  const handleEditClick = (leaf) => {
    setEditLeafOpen(true);
    setSelectedLeafId(leaf.trNo);
  };

  const handleLeafClose = () => {
    setSelectedLeafId(null);
    setViewLeafOpen(false);
    setEditLeafOpen(false);
    fetchLeaf();
  };
  // Creating the table
  const TABLE_LEAF = [
    {
      name: "Id",
      selector: (row) => `${row.trNo}`,
      wrap: true,
      compact: true,
      maxWidth: "auto",
      cellStyle: {
        whiteSpace: "normal",
        wordBreak: "break-word",
      },
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => {
        const date = new Date(row.date);
        return new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }).format(date);
      },
      wrap: true,
      compact: true,
      minWidth: "100px",
      cellStyle: {
        whiteSpace: "normal",
        wordBreak: "break-word",
      },
    },

    {
      name: "Supplier",
      selector: (row) => row.supplier,
      wrap: true,
      compact: true,
      maxWidth: "auto",
      cellStyle: {
        whiteSpace: "normal",
        wordBreak: "break-word",
      },
    },
    {
      name: "No of Sacks",
      selector: (row) => row.noofSacks,
      wrap: true,
      compact: true,
      maxWidth: "auto",
      cellStyle: {
        whiteSpace: "normal",
        wordBreak: "break-word",
      },
    },
    {
      name: "Total (Kg)",
      selector: (row) => row.totalKg.toFixed(2),
      wrap: true,
      compact: true,
      maxWidth: "auto",
      cellStyle: {
        whiteSpace: "normal",
        wordBreak: "break-word",
      },
    },

    {
      name: "Sacks Weight (g)",
      selector: (row) => row.sacksWeight.toFixed(2),
      wrap: true,
      compact: true,
      minWidth: "150px",
      cellStyle: {
        whiteSpace: "normal",
        wordBreak: "break-word",
      },
    },
    {
      name: "Water Weight",
      selector: (row) => row.water.toFixed(2),
      wrap: true,
      compact: true,
      maxWidth: "auto",
      cellStyle: {
        whiteSpace: "normal",
        wordBreak: "break-word",
      },
    },
    {
      name: "Net Weight (Kg)",
      selector: (row) => row.netQty.toFixed(2),
      wrap: true,
      compact: true,
      maxWidth: "auto",
      cellStyle: {
        whiteSpace: "normal",
        wordBreak: "break-word",
      },
    },
    {
      name: "Status",
      selector: (row) => (
        <>
          <div
            className={`w-4 h-4  ${
              row.complete ? "bg-green-500" : "bg-red-700"
            } rounded-full mt-1`}
          ></div>
        </>
      ),
      wrap: true,
      compact: true,
      maxWidth: "auto",
      center: true,
      cellStyle: {
        whiteSpace: "normal",
        wordBreak: "break-word",
      },
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          {/* <Tooltip content="Edit Supplier">
            <IconButton
              onClick={() => handleEditClick(row)}
              variant="text"
              className="mx-2 bg-white"
            >
              <EditNewIcon />
            </IconButton>
          </Tooltip> */}
          <Tooltip content="View Leaf Stock">
            <IconButton
              onClick={() => handleViewClick(row)}
              variant="text"
              className="mx-2 bg-white"
            >
              <ViewIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const exportToExcel = () => {
    if (filteredLeafs.length === 0) {
      toast.warning("No data available to export.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(filteredLeafs);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Filtered Data");

    // Save the file
    XLSX.writeFile(workbook, "GreenLeaf_Report.xlsx");
  };

  return (
    <>
      <section className=" mt-8 ">
        <div className="w-full bg-white rounded-[15px] px-[30px] pt-[20px] pb-[40px]">
          <div className="flex flex-col mt-4 md:flex-row md:justify-between">
            <div className="md:flex">
              <div className="w-full md:w-[250px] md:mr-5 mb-4 md:mb-0">
                <p className="font-poppins text-[14px] font-medium leading-[22px] text-[#64728C] pb-2">
                  Select From Date
                </p>
                <input
                  type="date"
                  placeholder="Type here...."
                  value={fromDate}
                  onChange={handleFromDateChange}
                  className="border border-[#e6e8ed] focus:outline-[#bdbdbd] rounded-[15px] px-5 py-2 min-w-[250px] text-[15px] font-poppins font-medium leading-[22px]"
                />
              </div>
              <div className="w-full md:w-[250px] md:mr-5 mb-4 md:mb-0">
                <p className="font-poppins text-[14px] font-medium leading-[22px] text-[#64728C] pb-2">
                  Select To Date
                </p>
                <input
                  type="date"
                  placeholder="Type here...."
                  value={toDate}
                  onChange={handleToDateChange}
                  className="border border-[#e6e8ed] focus:outline-[#bdbdbd] rounded-[15px] px-5 py-2 min-w-[250px] text-[15px] font-poppins font-medium leading-[22px]"
                />
              </div>
            </div>

            <div className="flex flex-col justify-end">
              <div className="flex items-center justify-end w-full pb-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={exportToExcel}
                    className="bg-[#769EFF] bg-opacity-30 font-poppins text-[14px] font-semibold leading-[22px] px-4 py-2 rounded-[20px] min-w-[80px] items-center justify-center gap-2 text-[#10275E] hidden md:flex hover:opacity-70"
                  >
                    <span>Export to Excel</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-white rounded-[15px] px-[30px] pt-[20px] pb-[20px] mt-10 relative">
          <DataTable
            columns={TABLE_LEAF}
            responsive
            data={filteredLeafs}
            customStyles={tableHeaderStyles}
            className="mt-4"
            pagination
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 15]}
            paginationComponentOptions={{
              rowsPerPageText: "Entries per page:",
              rangeSeparatorText: "of",
            }}
            noDataComponent={
              <div className="text-center">No data available</div>
            }
          />
        </div>
      </section>
      {viewLeafOpen && (
        <ViewLeaf
          isOpen={viewLeafOpen}
          onClose={handleLeafClose}
          selectedLeafId={selectedLeafId}
        />
      )}
      <ToastContainer />
    </>
  );
};
