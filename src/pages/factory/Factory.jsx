import React, { useState, useEffect } from "react";
import axiosClient from "../../../axios-client";
import { toast ,ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProcessingIcon } from "../../utils/icons";
import { useStateContext } from "../../contexts/NavigationContext";
import { FormInput } from "../../components/global/FormInput";

export const Factory = () => {
  const { user } = useStateContext();
  const factoryId = user.factoryId;

  const [loading, setLoading] = useState(true);

  const [editedFactory, setEditedFactory] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = (data) => {
    const errors = {};
    if (!data.name) {
      errors.name = "Name is required.";
    }
    if (!data.description) {
      errors.description = "Description is required.";
    }
    if (!data.address) {
      errors.address = "Address is required.";
    }
    if (!data.factoryCode) {
      errors.factoryCode = "Factory Code is required.";
    }
    if (!data.phoneNumber) {
      errors.phoneNumber = "Contact No is required.";
    }
    return errors;
  };

  console.log(editedFactory);
  //Fetching the customer details from the database
  useEffect(() => {
    const fetchFactory = () => {
      setLoading(true);
      axiosClient
        .get(`/FactoryMas/${factoryId}`)
        .then((res) => {
          setEditedFactory(res.data);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Failed to fetch factory details.");
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchFactory();
  }, [factoryId]);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    console.log("test")
    event.preventDefault();
    const validateErrors = validate(editedFactory);
    setErrors(validateErrors);
    if (Object.keys(validateErrors).length === 0) {
      setSubmitting(true);
      try {
        console.log("test2")
        await axiosClient
          .put(`/FactoryMas/${factoryId}`, editedFactory)
          .then((res) => {
            toast.success("Factory details updated successfully !");
            setSubmitting(false);
          })
          .catch((error) => {
            setSubmitting(false);
            console.log(error);
            toast.error("Failed to edit factory details. Please try again.");
          });
        setSubmitting(false);
      } catch (error) {
        toast.error("Failed to edit factory details. Please try again.");
      }
    }
  };

  const handleChange = (name, value) => {
    setEditedFactory((prevFactory) => ({
      ...prevFactory,
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
      name: "Factory Code",
      inputName: "factoryCode",
      type: "text",
      placeholder: "Type here....",
    },
    {
      name: "Factory Name",
      inputName: "name",
      type: "text",
      placeholder: "Type here....",
    },
    {
      name: "Description",
      inputName: "description",
      type: "text",
      placeholder: "Type here....",
    },

    {
      name: "Address",
      inputName: "address",
      type: "text",
      placeholder: "Type here....",
    },
  ];
  return (
    <section className=" mt-8 ">
      <div className="w-full bg-white rounded-[15px] px-[30px] pt-[20px] pb-[40px]">
        <div className="flex flex-col mt-4 md:flex-row md:justify-left">
          <div className="w-full  md:mr-5 mb-4 md:mb-0">
            <span className="font-poppins font-medium text-[16px] md:text-[22px] leading-8 md:leading-[30px] text-[#64728C] mt-1">
              Factory Details
            </span>
            <section className=" mt-6">
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col items-start w-full gap-3 mt-6 md:flex-row md:gap-20 md:mt-2">
                    {inputItems.slice(0, 2).map((item, itemIndex) => {
                      return (
                        <div className="md:w-[35%] w-full mb-3" key={itemIndex}>
                          <FormInput
                            data={editedFactory}
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
                    {inputItems.slice(2, 4).map((item, itemIndex) => {
                      return (
                        <div className="md:w-[35%] w-full mb-3" key={itemIndex}>
                          <FormInput
                            data={editedFactory}
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
                  <div className="md:w-[30%] w-full mb-3">
                    <div className="w-full">
                      <p className="font-poppins text-[14px] md:text-[16px] leading-[24px] font-medium text-[#64728C]">
                        Contact Number
                      </p>
                      <input
                        name="phoneNumber"
                        type="text"
                        className="block rounded-[15px] focus:outline-[#bdbdbd] border-0 py-2.5 pl-3 text-gray-900 ring-1 ring-inset mt-2 ring-gray-300 placeholder:text-[#64728C]-400 placeholder:text-[14px] md:placeholder:text-[14px] placeholder:poppins focus:ring-1 focus:ring-inset sm:leading-6 w-full text-[14px] md:text-[15px] font-normal font-poppins"
                        value={editedFactory.phoneNumber}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          const isNumericInput = /^\d+$/.test(inputValue);

                          if (isNumericInput || inputValue === "") {
                            setEditedFactory({
                              ...editedFactory,
                              phoneNumber: inputValue,
                            });
                            setErrors((prevErrors) => ({
                              ...prevErrors,
                              phoneNumber: "",
                            }));
                          } else {
                            setErrors((prevErrors) => ({
                              ...prevErrors,
                              phoneNumber: "Please enter valid phone number.",
                            }));
                          }
                        }}
                        placeholder="Type here...."
                      />
                      {errors.phoneNumber && (
                        <p className="pt-1 text-xs font-medium text-red-500 font-poppins">
                          {errors.phoneNumber}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end gap-5 md:mt-0 mt-7">
                    <button
                      className="bg-[#03d63d] font-poppins text-[14px] font-semibold leading-[22px] px-4 py-2 rounded-[20px] min-w-[80px] hover:bg-[#03d63d] hover:text-white text-white border border-[#03d63d] transition-all duration-300 flex items-center gap-2 justify-center"
                      type="submit"
                      disabled={submitting}
                    >
                      {submitting && <ProcessingIcon />}
                      Change Factory Details
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </section>
  );
};
