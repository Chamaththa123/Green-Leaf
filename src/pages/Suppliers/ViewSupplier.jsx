import React, { useState, useEffect } from "react";
import axiosClient from "../../../axios-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProcessingIcon, CloseIcon } from "../../utils/icons";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";

export const ViewSupplier = ({ isOpen, onClose, selectedSupplierId }) => {
  const [supplier, setSupplier] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSupplier = () => {
      setLoading(true);
      axiosClient
        .get(`/SupplierMas/${selectedSupplierId}`)
        .then((res) => {
          setSupplier(res.data);
        })
        .catch((error) => {
          console.error("Error fetching supplier:", error);
          toast.error("Failed to fetch supplier details.");
        })
        .finally(() => {
          setLoading(false);
        });
    };

    if (selectedSupplierId) {
      fetchSupplier();
    }
  }, [selectedSupplierId]);

const inputItems = [
  {
    name: "Supplier Code",
    inputName: supplier.supCode,
  },
  {
    name: "Supplier Name",
    inputName: supplier.supName,
  },
  {
    name: "Company Name",
    inputName: supplier.comName,
  },
  {
    name: "Address",
    inputName: supplier.address1,
  },
  {
    name: "Contact Number",
    inputName: supplier.telephone,
  },
  {
    name: "Contact Person",
    inputName: supplier.contactPerson,
  },
  {
    name: "Email Address",
    inputName: supplier.email,
  },
  {
    name: "Fax Number",
    inputName: supplier.fax,
  },
  {
    name: "Credit Limit",
    inputName: supplier.creditLimit,
  },
  {
    name: "Credit Period",
    inputName: supplier.creditPeriod,
  },
  {
    name: "Payment Type",
    inputName: supplier.payType,
  },
  {
    name: "Bank Code",
    inputName: supplier.bankCode,
  },
  {
    name: "Branch Code",
    inputName: supplier.branchCode,
  },
  {
    name: "Account Number",
    inputName: supplier.accountNo,
  },
  {
    name: "Payee Name",
    inputName: supplier.payeeName,
  },
  {
    name: "Main Account Code",
    inputName: supplier.mainCode,
  },
  {
    name: "Sub Account Code",
    inputName: supplier.subCode,
  },
  {
    name: "Account Code",
    inputName: supplier.accCode,
  },
  {
    name: "Entry Date",
    inputName: new Date(supplier.entDate).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
  {
    name: "Created By (Username)",
    inputName: supplier.userName,
  },
];

  return (
    <Dialog
      size="xl"
      open={isOpen}
      handler={() => {}}
      dismiss={{ outside: false }}
      className="bg-white shadow-none rounded-[10px] overflow-scroll scrollbar-hide font-inter px-5"
    >
      <DialogHeader className="flex justify-between align-center border-b border-[#ececec] pb-3">
        <div className="flex align-center">
          <div className="flex items-center gap-4">
          <div className={`w-4 h-4  ${supplier.inActive? 'bg-red-500': 'bg-green-500'} rounded-full mt-1`}></div>
            <span className="font-poppins font-medium text-[16px] md:text-[22px] leading-8 md:leading-[30px] text-[#64728C] mt-1">
              {supplier.supCode} - Supplier Details
            </span>
          </div>
        </div>
        <div onClick={onClose} className="cursor-pointer">
          <CloseIcon />
        </div>
      </DialogHeader>
      <DialogBody className="p-5 max-h-[80vh] overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <ProcessingIcon className="animate-spin text-gray-500" />
            <span className="ml-2 text-gray-500">Loading...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-3 md:gap-2 md:mt-2">
            {inputItems.map((item, itemIndex) => (
              <div className="mb-3" key={itemIndex}>
                <div className="font-semibold">{item.name}</div>
                <div className="text-[14px]">{item.inputName}</div>
              </div>
            ))}
          </div>
        )}
      </DialogBody>
    </Dialog>
  );
};
