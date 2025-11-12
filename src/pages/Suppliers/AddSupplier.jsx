import { useState } from "react";
import axiosClient from "../../../axios-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProcessingIcon, AddCustomerIcon, CloseIcon } from "../../utils/icons";
import { FormInput } from "../../components/global/FormInput";
import Swal from "sweetalert2";
import { useStateContext } from "../../contexts/NavigationContext";
import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";

export const AddSupplier = ({ isOpen, onClose }) => {
  const { user } = useStateContext();
  const factoryId = user.factoryId;
  // Initial form data
  const [submitting, setSubmitting] = useState(false);
  const initialFormData = {
    supCode: "",
    supName: "",
    comName: "",
    telephone: "",
    fax: "",
    email: "",
    address1: "",
    address2: "-",
    address3: "-",
    contactPerson: "",
    creditLimit: "",
    creditPeriod: "",
    payType: "",
    bankCode: "",
    branchCode: "",
    accountNo: "",
    payeeName: "",
    mainCode: "",
    subCode: "",
    accCode: "",
    entDate: "",
    inActive: false,
    factoryId: factoryId,
  };

  // State variables for form data and errors
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

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

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const validateErrors = validate(formData);
    setErrors(validateErrors);

    if (Object.keys(validateErrors).length === 0) {
      setSubmitting(true);
      try {
        await axiosClient.post(`/SupplierMas`, formData);
        toast.success("Supplier added successfully!");
        setFormData(initialFormData);
        setSubmitting(false);
        onClose(); // Close the modal
      } catch (error) {
        setSubmitting(false);
        console.error(error);
        toast.error("Failed to add Supplier. Please try again.");
      }
    } else {
      Swal.fire({
        icon: "error",
        text: "Please fill out all required fields.",
        allowOutsideClick: false,
      });
    }
  };

  // Array of input items for rendering the form
const inputItems = [
  {
    name: "Supplier Code",
    inputName: "supCode",
    type: "text",
    placeholder: "Enter supplier code...",
  },
  {
    name: "Supplier Name",
    inputName: "supName",
    type: "text",
    placeholder: "Enter supplier name...",
  },
  {
    name: "Company Name",
    inputName: "comName",
    type: "text",
    placeholder: "Enter company name...",
  },
  {
    name: "Address",
    inputName: "address1",
    type: "text",
    placeholder: "Enter address...",
  },
  {
    name: "Contact Person",
    inputName: "contactPerson",
    type: "text",
    placeholder: "Enter contact person name...",
  },
  {
    name: "Email Address",
    inputName: "email",
    type: "email",
    placeholder: "Enter email address...",
  },
  {
    name: "Payment Type",
    inputName: "payType",
    type: "text",
    placeholder: "Enter payment type...",
  },
  {
    name: "Bank Code",
    inputName: "bankCode",
    type: "text",
    placeholder: "Enter bank code...",
  },
  {
    name: "Branch Code",
    inputName: "branchCode",
    type: "text",
    placeholder: "Enter branch code...",
  },
  {
    name: "Account Number",
    inputName: "accountNo",
    type: "text",
    placeholder: "Enter account number...",
  },
  {
    name: "Payee Name",
    inputName: "payeeName",
    type: "text",
    placeholder: "Enter payee name...",
  },
  {
    name: "Main Account Code",
    inputName: "mainCode",
    type: "text",
    placeholder: "Enter main account code...",
  },
  {
    name: "Sub Account Code",
    inputName: "subCode",
    type: "text",
    placeholder: "Enter sub account code...",
  },
  {
    name: "Account Code",
    inputName: "accCode",
    type: "text",
    placeholder: "Enter account code...",
  },
  {
    name: "Entry Date",
    inputName: "entDate",
    type: "date",
    placeholder: "Select entry date...",
  },
  {
    name: "Created By (Username)",
    inputName: "userName",
    type: "text",
    placeholder: "Enter username...",
  },
];


  console.log(formData);
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
              New Supplier
            </span>
          </div>
        </div>
        <div onClick={onClose} className="cursor-pointer">
          <CloseIcon />
        </div>
      </DialogHeader>
      <DialogBody className="p-5 max-h-[80vh] overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <section className=" mt-1">
          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-start w-full gap-3 mt-6 md:flex-row md:gap-20 md:mt-2">
                {inputItems.slice(0, 3).map((item, itemIndex) => {
                  return (
                    <div className="md:w-[30%] w-full mb-3" key={itemIndex}>
                      <FormInput
                        data={formData}
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
                        data={formData}
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
                      value={formData.telephone}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const isNumericInput = /^\d+$/.test(inputValue);

                        if (isNumericInput || inputValue === "") {
                          setFormData({
                            ...formData,
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
                        data={formData}
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
                        data={formData}
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
                      value={formData.fax}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const isNumericInput = /^\d+$/.test(inputValue);

                        if (isNumericInput || inputValue === "") {
                          setFormData({
                            ...formData,
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
                      value={formData.creditLimit}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const isNumericInput = /^\d+$/.test(inputValue);

                        if (isNumericInput || inputValue === "") {
                          setFormData({
                            ...formData,
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
                      value={formData.creditPeriod}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const isNumericInput = /^\d+$/.test(inputValue);

                        if (isNumericInput || inputValue === "") {
                          setFormData({
                            ...formData,
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
                        data={formData}
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
                        data={formData}
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
                        data={formData}
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
                        data={formData}
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
                          checked={formData.inActive === false}
                          onChange={() =>
                            setFormData({
                              ...formData,
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
                          checked={formData.inActive === true}
                          onChange={() =>
                            setFormData({
                              ...formData,
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
                  className="bg-white font-poppins text-[14px] font-semibold leading-[22px] px-4 py-2 rounded-[20px] min-w-[80px] hover:bg-[#54993a] hover:text-white text-[#54993a] border border-[#54993a] transition-all duration-300 flex items-center gap-2 justify-center"
                  type="button"
                  onClick={() => {
                    setFormData(initialFormData);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#54993a] font-poppins text-[14px] font-semibold leading-[22px] px-4 py-2 rounded-[20px] min-w-[80px] hover:bg-[#54993a] hover:text-white text-white border border-[#54993a] transition-all duration-300 flex items-center gap-2 justify-center"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting && <ProcessingIcon />}
                  Save
                </button>
              </div>
            </form>
          </div>
        </section>
      </DialogBody>
    </Dialog>
  );
};
