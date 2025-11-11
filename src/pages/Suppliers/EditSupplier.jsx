import React, { useState, useEffect } from "react";
import axiosClient from "../../../axios-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProcessingIcon, AddCustomerIcon, CloseIcon } from "../../utils/icons";
import { FormInput } from "../../components/global/FormInput";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import Swal from "sweetalert2";

export const EditSupplier = ({
  isOpen,
  onClose,
  handleLoading,
  selectedSupplierId,
}) => {
  const [loading, setLoading] = useState(true);

  const [editedSupplier, setEditedSupplier] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = (data) => {
    const errors = {};
    if (!data.supCode) {
      errors.supCode = "Code is required.";
    }
    if (!data.supName) {
      errors.supName = "Name is required.";
    }
    if (!data.comName) {
      errors.comName = "Company is required.";
    }
    if (!data.telephone) {
      errors.telephone = "Contact No is required.";
    }
    if (data.inActive === null || data.inActive === undefined) {
      errors.inActive = "Status is required.";
    }
    return errors;
  };

  //Fetching the customer details from the database
  useEffect(() => {
    const fetchSupplier = () => {
      setLoading(true);
      axiosClient
        .get(`/SupplierMas/${selectedSupplierId}`)
        .then((res) => {
          const supplierData = res.data;
          if (supplierData.entDate) {
            supplierData.entDate = supplierData.entDate.split("T")[0]; // Extract YYYY-MM-DD
          }
          setEditedSupplier(supplierData);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Failed to fetch supplier details.");
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchSupplier();
  }, [selectedSupplierId]);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const validateErrors = validate(editedSupplier);
    setErrors(validateErrors);
    if (Object.keys(validateErrors).length === 0) {
      setSubmitting(true);
      try {
        axiosClient
          .put(`/SupplierMas/${selectedSupplierId}`, editedSupplier)
          .then((res) => {
            toast.success("Supplier edited successfully !");
            setSubmitting(false);
            onClose();
          })
          .catch((error) => {
            setSubmitting(false);
            console.log(error);
            toast.error("Failed to add Supplier. Please try again.");
          });
        setSubmitting(false);
      } catch (error) {
        toast.error("Failed to add Supplier. Please try again.");
      }
    } else {
      let errorMessage = "";
      Object.values(validateErrors).forEach((error) => {
        errorMessage += `${error}\n`;
      });
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: errorMessage,
        allowOutsideClick: false,
      });
    }
  };

  const handleChange = (name, value) => {
    setEditedSupplier((prevSupplier) => ({
      ...prevSupplier,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // Array of input items for rendering the form
  const inputItems = [
    {
      name: "Code",
      inputName: "supCode",
      type: "text",
      placeholder: "Type here....",
    },
    {
      name: "Name",
      inputName: "supName",
      type: "text",
      placeholder: "Type here....",
    },
    {
      name: "Company",
      inputName: "comName",
      type: "text",
      placeholder: "Type here....",
    },

    {
      name: "Address",
      inputName: "address1",
      type: "text",
      placeholder: "Type here....",
    },
    {
      name: "Contact Person",
      inputName: "contactPerson",
      type: "text",
      placeholder: "Type here....",
    },
    {
      name: "Email",
      inputName: "email",
      type: "email",
      placeholder: "Type here....",
    },
    {
      name: "payType",
      inputName: "payType",
      type: "text",
      placeholder: "Type here....",
    },
    {
      name: "bankCode",
      inputName: "bankCode",
      type: "text",
      placeholder: "Type here....",
    },
    {
      name: "branchCode",
      inputName: "branchCode",
      type: "text",
      placeholder: "Type here....",
    },
    {
      name: "accountNo",
      inputName: "accountNo",
      type: "text",
      placeholder: "Type here....",
    },
    {
      name: "payeeName",
      inputName: "payeeName",
      type: "text",
      placeholder: "Type here....",
    },
    {
      name: "mainCode",
      inputName: "mainCode",
      type: "text",
      placeholder: "Type here....",
    },
    {
      name: "subCode",
      inputName: "subCode",
      type: "text",
      placeholder: "Type here....",
    },
    {
      name: "accCode",
      inputName: "accCode",
      type: "text",
      placeholder: "Type here....",
    },
    {
      name: "entDate",
      inputName: "entDate",
      type: "date",
      placeholder: "Type here....",
    },
    {
      name: "userName",
      inputName: "userName",
      type: "text",
      placeholder: "Type here....",
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
            <AddCustomerIcon />
            <span className="font-poppins font-medium text-[16px] md:text-[22px] leading-8 md:leading-[30px] text-[#64728C] mt-1">
              Edit Supplier
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
          <section className=" mt-1">
            <div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-start w-full gap-3 mt-6 md:flex-row md:gap-20 md:mt-2">
                  {inputItems.slice(0, 3).map((item, itemIndex) => {
                    return (
                      <div className="md:w-[30%] w-full mb-3" key={itemIndex}>
                        <FormInput
                          data={editedSupplier}
                          type={item.type}
                          errors={errors}
                          handleChange={handleChange}
                          name={item.name}
                          inputName={item.inputName}
                          placeholder={item.placeholder}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-col items-start w-full gap-3 mt-6 md:flex-row md:gap-20 md:mt-2">
                  {inputItems.slice(3, 4).map((item, itemIndex) => {
                    return (
                      <div className="md:w-[30%] w-full mb-3" key={itemIndex}>
                        <FormInput
                          data={editedSupplier}
                          type={item.type}
                          errors={errors}
                          handleChange={handleChange}
                          name={item.name}
                          inputName={item.inputName}
                          placeholder={item.placeholder}
                        />
                      </div>
                    );
                  })}
                  <div className="md:w-[30%] w-full mb-3">
                    <div className="w-full">
                      <p className="font-poppins text-[14px] md:text-[16px] leading-[24px] font-medium text-[#64728C]">
                        Contact Number
                      </p>
                      <input
                        name="telephone"
                        type="text"
                        className="block rounded-[15px] focus:outline-[#bdbdbd] border-0 py-2.5 pl-3 text-gray-900 ring-1 ring-inset mt-2 ring-gray-300 placeholder:text-[#64728C]-400 placeholder:text-[14px] md:placeholder:text-[14px] placeholder:poppins focus:ring-1 focus:ring-inset sm:leading-6 w-full text-[14px] md:text-[15px] font-normal font-poppins"
                        value={editedSupplier.telephone}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          const isNumericInput = /^\d+$/.test(inputValue);

                          if (isNumericInput || inputValue === "") {
                            setEditedSupplier({
                              ...editedSupplier,
                              telephone: inputValue,
                            });
                            setErrors((prevErrors) => ({
                              ...prevErrors,
                              telephone: "",
                            }));
                          } else {
                            setErrors((prevErrors) => ({
                              ...prevErrors,
                              telephone: "Please enter only phone number.",
                            }));
                          }
                        }}
                        placeholder="Type here...."
                      />
                      {errors.telephone && (
                        <p className="pt-1 text-xs font-medium text-red-500 font-poppins">
                          {errors.telephone}
                        </p>
                      )}
                    </div>
                  </div>
                  {inputItems.slice(4, 5).map((item, itemIndex) => {
                    return (
                      <div className="md:w-[30%] w-full mb-3" key={itemIndex}>
                        <FormInput
                          data={editedSupplier}
                          type={item.type}
                          errors={errors}
                          handleChange={handleChange}
                          name={item.name}
                          inputName={item.inputName}
                          placeholder={item.placeholder}
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col items-start w-full gap-3 mt-6 md:flex-row md:gap-20 md:mt-2">
                  {inputItems.slice(5, 6).map((item, itemIndex) => {
                    return (
                      <div className="md:w-[30%] w-full mb-3" key={itemIndex}>
                        <FormInput
                          data={editedSupplier}
                          type={item.type}
                          errors={errors}
                          handleChange={handleChange}
                          name={item.name}
                          inputName={item.inputName}
                          placeholder={item.placeholder}
                        />
                      </div>
                    );
                  })}
                  <div className="md:w-[30%] w-full mb-3">
                    <div className="w-full">
                      <p className="font-poppins text-[14px] md:text-[16px] leading-[24px] font-medium text-[#64728C]">
                        Fax
                      </p>
                      <input
                        name="Contact Number"
                        type="text"
                        className="block rounded-[15px] focus:outline-[#bdbdbd] border-0 py-2.5 pl-3 text-gray-900 ring-1 ring-inset mt-2 ring-gray-300 placeholder:text-[#64728C]-400 placeholder:text-[14px] md:placeholder:text-[14px] placeholder:poppins focus:ring-1 focus:ring-inset sm:leading-6 w-full text-[14px] md:text-[15px] font-normal font-poppins"
                        value={editedSupplier.fax}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          const isNumericInput = /^\d+$/.test(inputValue);

                          if (isNumericInput || inputValue === "") {
                            setEditedSupplier({
                              ...editedSupplier,
                              fax: inputValue,
                            });
                            setErrors((prevErrors) => ({
                              ...prevErrors,
                              fax: "",
                            }));
                          } else {
                            setErrors((prevErrors) => ({
                              ...prevErrors,
                              fax: "Please enter valid fax number.",
                            }));
                          }
                        }}
                        placeholder="Type here...."
                      />
                      {errors.fax && (
                        <p className="pt-1 text-xs font-medium text-red-500 font-poppins">
                          {errors.fax}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="md:w-[30%] w-full mb-3">
                    <div className="w-full">
                      <p className="font-poppins text-[14px] md:text-[16px] leading-[24px] font-medium text-[#64728C]">
                        Credit Limit
                      </p>
                      <input
                        name="Contact Number"
                        type="text"
                        className="block rounded-[15px] focus:outline-[#bdbdbd] border-0 py-2.5 pl-3 text-gray-900 ring-1 ring-inset mt-2 ring-gray-300 placeholder:text-[#64728C]-400 placeholder:text-[14px] md:placeholder:text-[14px] placeholder:poppins focus:ring-1 focus:ring-inset sm:leading-6 w-full text-[14px] md:text-[15px] font-normal font-poppins"
                        value={editedSupplier.creditLimit}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          const isNumericInput = /^\d+$/.test(inputValue);

                          if (isNumericInput || inputValue === "") {
                            setEditedSupplier({
                              ...editedSupplier,
                              creditLimit: inputValue,
                            });
                            setErrors((prevErrors) => ({
                              ...prevErrors,
                              creditLimit: "",
                            }));
                          } else {
                            setErrors((prevErrors) => ({
                              ...prevErrors,
                              creditLimit: "Please enter only numbers.",
                            }));
                          }
                        }}
                        placeholder="Type here...."
                      />
                      {errors.creditLimit && (
                        <p className="pt-1 text-xs font-medium text-red-500 font-poppins">
                          {errors.creditLimit}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start w-full gap-3 mt-6 md:flex-row md:gap-20 md:mt-2">
                  <div className="md:w-[30%] w-full mb-3">
                    <div className="w-full">
                      <p className="font-poppins text-[14px] md:text-[16px] leading-[24px] font-medium text-[#64728C]">
                        Credit Period
                      </p>
                      <input
                        name="Contact Number"
                        type="text"
                        className="block rounded-[15px] focus:outline-[#bdbdbd] border-0 py-2.5 pl-3 text-gray-900 ring-1 ring-inset mt-2 ring-gray-300 placeholder:text-[#64728C]-400 placeholder:text-[14px] md:placeholder:text-[14px] placeholder:poppins focus:ring-1 focus:ring-inset sm:leading-6 w-full text-[14px] md:text-[15px] font-normal font-poppins"
                        value={editedSupplier.creditPeriod}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          const isNumericInput = /^\d+$/.test(inputValue);

                          if (isNumericInput || inputValue === "") {
                            setEditedSupplier({
                              ...editedSupplier,
                              creditPeriod: inputValue,
                            });
                            setErrors((prevErrors) => ({
                              ...prevErrors,
                              creditPeriod: "",
                            }));
                          } else {
                            setErrors((prevErrors) => ({
                              ...prevErrors,
                              creditPeriod: "Please enter only numbers.",
                            }));
                          }
                        }}
                        placeholder="Type here...."
                      />
                      {errors.creditPeriod && (
                        <p className="pt-1 text-xs font-medium text-red-500 font-poppins">
                          {errors.creditPeriod}
                        </p>
                      )}
                    </div>
                  </div>
                  {inputItems.slice(6, 8).map((item, itemIndex) => {
                    return (
                      <div className="md:w-[30%] w-full mb-3" key={itemIndex}>
                        <FormInput
                          data={editedSupplier}
                          type={item.type}
                          errors={errors}
                          handleChange={handleChange}
                          name={item.name}
                          inputName={item.inputName}
                          placeholder={item.placeholder}
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col items-start w-full gap-3 mt-3 md:flex-row md:gap-20 md:mt-5">
                  {inputItems.slice(8, 11).map((item, itemIndex) => {
                    return (
                      <div className="md:w-[50%] w-full mb-3" key={itemIndex}>
                        <FormInput
                          data={editedSupplier}
                          type={item.type}
                          errors={errors}
                          handleChange={handleChange}
                          name={item.name}
                          inputName={item.inputName}
                          placeholder={item.placeholder}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-col items-start w-full gap-3 mt-3 md:flex-row md:gap-20 md:mt-5">
                  {inputItems.slice(11, 14).map((item, itemIndex) => {
                    return (
                      <div className="md:w-[30%] w-full mb-3" key={itemIndex}>
                        <FormInput
                          data={editedSupplier}
                          type={item.type}
                          errors={errors}
                          handleChange={handleChange}
                          name={item.name}
                          inputName={item.inputName}
                          placeholder={item.placeholder}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-col items-start w-full gap-3 mt-3 md:flex-row md:gap-20 md:mt-5">
                  {inputItems.slice(14, 19).map((item, itemIndex) => {
                    return (
                      <div className="md:w-[30%] w-full mb-3" key={itemIndex}>
                        <FormInput
                          data={editedSupplier}
                          type={item.type}
                          errors={errors}
                          handleChange={handleChange}
                          name={item.name}
                          inputName={item.inputName}
                          placeholder={item.placeholder}
                        />
                      </div>
                    );
                  })}
                  <div className="md:w-[30%] w-full mb-3">
                    <div className="w-full">
                      <p className="font-poppins text-[14px] md:text-[16px] mb-4 leading-[24px] font-medium text-[#64728C]">
                        Status
                      </p>

                      <div className="flex gap-4">
                        <label className="flex gap-2">
                          <input
                            type="radio"
                            name="inActive"
                            value={false}
                            checked={editedSupplier.inActive === false}
                            onChange={() =>
                              setEditedSupplier({
                                ...editedSupplier,
                                inActive: false, // Set inActive to false
                              })
                            }
                          />
                          Active
                        </label>
                        <label className="flex gap-2">
                          <input
                            type="radio"
                            name="inActive"
                            value={true}
                            checked={editedSupplier.inActive === true}
                            onChange={() =>
                              setEditedSupplier({
                                ...editedSupplier,
                                inActive: true, // Set inActive to true
                              })
                            }
                          />
                          Inactive
                        </label>
                      </div>
                      {errors.inActive && (
                        <span className="error">{errors.inActive}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-5 md:mt-0 mt-7">
                  <button
                    className="bg-[#03d63d] font-poppins text-[14px] font-semibold leading-[22px] px-4 py-2 rounded-[20px] min-w-[80px] hover:bg-[#03d63d] hover:text-white text-white border border-[#03d63d] transition-all duration-300 flex items-center gap-2 justify-center"
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting && <ProcessingIcon />}
                    Update Details
                  </button>
                </div>
              </form>
            </div>
          </section>
        )}
      </DialogBody>
    </Dialog>
  );
};
