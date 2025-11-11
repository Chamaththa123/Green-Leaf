import React, { useState, useEffect } from "react";
import { IconButton, Tooltip } from "@material-tailwind/react";
import {
  EditNewIcon,
  PlusIcon,
  ViewIcon,
} from "../../utils/icons";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import DataTable from "react-data-table-component";
import { tableHeaderStyles } from "../../utils/utils";
import axiosClient from "../../../axios-client";
import { AddSupplier } from "./AddSupplier";
import { useStateContext } from "../../contexts/NavigationContext";
import { ViewSupplier } from "./ViewSupplier";
import { EditSupplier } from "./EditSupplier";

export const Supplier = () => {
  const { user } = useStateContext();
  const factoryId = user.factoryId;
  const [suppliers, setSuppliers] = useState([]);

  const [filteredSuppliers, setFilteredSuppliers] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [addSupplierOpen, setAddSupplierOpen] = useState(false);
  const [viewSupplierOpen, setViewSupplierOpen] = useState(false);
  const [editSupplierOpen, setEditSupplierOpen] = useState(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);

  //Fetching supplier details
  const fetchSupplier = () => {
    axiosClient
      .get(`/SupplierMas/byFactory/${factoryId}`)
      .then((res) => {
        setSuppliers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchSupplier();
  }, [factoryId]);

  // Handler for search input changes
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAddClick = () => {
    setAddSupplierOpen(true);
  };

  const handleViewClick = (supplier) => {
    setViewSupplierOpen(true);
    setSelectedSupplierId(supplier.supId);
  };

  const handleEditClick = (supplier) => {
    setEditSupplierOpen(true);
    setSelectedSupplierId(supplier.supId);
  };

  // Handler for closing modal
  const handleSupplierClose = () => {
    setSelectedSupplierId(null);
    setAddSupplierOpen(false);
    setViewSupplierOpen(false);
    setEditSupplierOpen(false);
    fetchSupplier();
  };

  // Filter supplier based on search query and status
  useEffect(() => {
    const filtered = suppliers.filter((supplier) => {
      const matchesSearch =
        supplier.supCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.supName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.branchCode.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
    setFilteredSuppliers(filtered);
  }, [searchQuery, suppliers]);

  // Creating the table
  const TABLE_SUPPLIER = [
    {
      name: "Code",
      selector: (row) => row.supCode,
      wrap: true,
      compact: true,
      maxWidth: "auto",
      cellStyle: {
        whiteSpace: "normal",
        wordBreak: "break-word",
      },
    },
    {
      name: "Name",
      selector: (row) => row.supName,
      wrap: true,
      compact: true,
      maxWidth: "auto",
      cellStyle: {
        whiteSpace: "normal",
        wordBreak: "break-word",
      },
    },
    {
      name: "Company",
      selector: (row) => row.comName,
      wrap: true,
      compact: true,
      maxWidth: "auto",
      cellStyle: {
        whiteSpace: "normal",
        wordBreak: "break-word",
      },
    },
    {
      name: "Email",
      selector: (row) => row.email,
      wrap: true,
      compact: true,
      maxWidth: "auto",
      cellStyle: {
        whiteSpace: "normal",
        wordBreak: "break-word",
      },
    },

    {
      name: "Contact No",
      selector: (row) => row.telephone,
      wrap: true,
      compact: true,
      maxWidth: "auto",
      cellStyle: {
        whiteSpace: "normal",
        wordBreak: "break-word",
      },
    },
    {
      name: "Address",
      selector: (row) => row.address1,
      wrap: true,
      compact: true,
      maxWidth: "auto",
      cellStyle: {
        whiteSpace: "normal",
        wordBreak: "break-word",
      },
    },
    {
      name: "Credit Limit",
      selector: (row) => row.creditLimit,
      wrap: true,
      compact: true,
      maxWidth: "auto",
      cellStyle: {
        whiteSpace: "normal",
        wordBreak: "break-word",
      },
    },
    {
      name: "Credit Period",
      selector: (row) => row.creditPeriod,
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
        <div className={`w-4 h-4  ${row.inActive? 'bg-red-500': 'bg-green-500'} rounded-full mt-1`}></div>
        </>
      ),
      wrap: true,
      compact: true,
      maxWidth: "auto",
      center:true,
      cellStyle: {
        whiteSpace: "normal",
        wordBreak: "break-word",
      },
      
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <Tooltip content="Edit Supplier">
            <IconButton
              onClick={() => handleEditClick(row)}
              variant="text"
              className="mx-2 bg-white"
            >
              <EditNewIcon />
            </IconButton>
          </Tooltip>
          <Tooltip content="View Supplier">
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

  return (
    <>
      {/* Desktop version */}
      <section className=" mt-8 ">
        <div className="w-full bg-white rounded-[15px] px-[30px] pt-[20px] pb-[40px]">
          <div className="flex flex-col mt-4 md:flex-row md:justify-left">
            <div className="w-full md:w-[250px] md:mr-5 mb-4 md:mb-0">
              <p className="font-poppins text-[14px] font-medium leading-[22px] text-[#64728C] pb-2">
                Search Supplier
              </p>
              <input
                type="text"
                placeholder="Type here...."
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="border border-[#e6e8ed] focus:outline-[#bdbdbd] rounded-[15px] px-5 py-2 min-w-[250px] text-[15px] font-poppins font-medium leading-[22px]"
              />
            </div>
          </div>
        </div>
        <div className="w-full bg-white rounded-[15px] px-[30px] pt-[20px] pb-[20px] mt-10 relative">
          <button
            onClick={() => handleAddClick()}
            className="w-[50px] aspect-square absolute rounded-full bg-[#03d63d] -top-5 -right-3 flex items-center justify-center cursor-pointer"
          >
            <PlusIcon width={"24px"} color={"#FFFFFF"} />
          </button>
          <DataTable
            columns={TABLE_SUPPLIER}
            responsive
            data={filteredSuppliers}
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

      {addSupplierOpen && (
        <AddSupplier
          isOpen={addSupplierOpen}
          onClose={handleSupplierClose}
        />
      )}

      {viewSupplierOpen && (
        <ViewSupplier
          isOpen={viewSupplierOpen}
          onClose={handleSupplierClose}
          selectedSupplierId={selectedSupplierId}
        />
      )}

      {editSupplierOpen && (
        <EditSupplier
          isOpen={editSupplierOpen}
          onClose={handleSupplierClose}
          selectedSupplierId={selectedSupplierId}
        />
      )}

      <ToastContainer />
    </>
  );
};
