import React, { useState, useEffect } from "react";
import axiosClient from "../../../axios-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProcessingIcon, CloseIcon } from "../../utils/icons";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";

export const ViewLeaf = ({ isOpen, onClose, selectedLeafId }) => {
  const [leaf, setLeaf] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaf = () => {
      setLoading(true);
      axiosClient
        .get(`/GreenLeafBls/${selectedLeafId}`)
        .then((res) => {
          setLeaf(res.data);
        })
        .catch((error) => {
          console.error("Error fetching leaves:", error);
          toast.error("Failed to fetch leaves.");
        })
        .finally(() => {
          setLoading(false);
        });
    };

    if (selectedLeafId) {
      fetchLeaf();
    }
  }, [selectedLeafId]);

  const inputItems = [
  {
    name: "Entry Date & Time",
    inputName: new Date(leaf.date).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
  {
    name: "Supplier Name",
    inputName: leaf.supplier,
  },
  {
    name: "Number of Sacks",
    inputName: leaf.noofSacks,
  },
  {
    name: "Total Weight (Kg)",
    inputName: leaf.totalKg,
  },
  {
    name: "Sacks Weight (Kg)",
    inputName: leaf.sacksWeight,
  },
  {
    name: "Small Leaf Weight (SW)",
    inputName: leaf.sw,
  },
  {
    name: "Small Leaf Deduction (SWDS)",
    inputName: leaf.swds,
  },
  {
    name: "Big Leaf Weight (BW)",
    inputName: leaf.bw,
  },
  {
    name: "Big Leaf Deduction (BWDS)",
    inputName: leaf.bwds,
  },
  {
    name: "Small Leaf Entry (SWENT)",
    inputName: leaf.swent,
  },
  {
    name: "Water Content",
    inputName: leaf.water,
  },
  {
    name: "Coarse Leaf Weight",
    inputName: leaf.coastLeaf,
  },
  {
    name: "Other Deductions",
    inputName: leaf.other,
  },
  {
    name: "Return Weight",
    inputName: leaf.return,
  },
  {
    name: "Net Quantity (Kg)",
    inputName: leaf.netQty,
  },
  {
    name: "GL To Date",
    inputName: leaf.gltodate,
  },
  {
    name: "Leaf Category",
    inputName: leaf.leafCat,
  },
  {
    name: "DWS GLTR Number",
    inputName: leaf.dwsgltrNo,
  },
  {
    name: "Entry Time",
    inputName: new Date(leaf.entTime).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
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
          <div className={`w-4 h-4  ${leaf.complete? 'bg-green-500': 'bg-red-700'} rounded-full mt-1`}></div>
            <span className="font-poppins font-medium text-[16px] md:text-[22px] leading-8 md:leading-[30px] text-[#64728C] mt-1">
            {leaf.trNo} - Leaf Stock Details
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
