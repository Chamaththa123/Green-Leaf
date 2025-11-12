import React, { useState, useEffect } from "react";
import axiosClient from "../../../axios-client";
import { toast, ToastContainer } from "react-toastify";
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
    if (!data.name) errors.name = "Name is required.";
    if (!data.description) errors.description = "Description is required.";
    if (!data.address) errors.address = "Address is required.";
    if (!data.factoryCode) errors.factoryCode = "Factory Code is required.";
    if (!data.phoneNumber) errors.phoneNumber = "Contact No is required.";
    return errors;
  };

  // Fetch factory details from the database
  useEffect(() => {
    const fetchFactory = () => {
      setLoading(true);
      axiosClient
        .get(`/FactoryMas/${factoryId}`)
        .then((res) => {
          setEditedFactory(res.data);
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to fetch factory details.");
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchFactory();
  }, [factoryId]);

  // Form submission handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const validateErrors = validate(editedFactory);
    setErrors(validateErrors);
    if (Object.keys(validateErrors).length === 0) {
      setSubmitting(true);
      try {
        await axiosClient
          .put(`/FactoryMas/${factoryId}`, editedFactory)
          .then(() => {
            toast.success("Factory details updated successfully!");
          })
          .catch((error) => {
            console.error(error);
            toast.error("Failed to edit factory details. Please try again.");
          })
          .finally(() => setSubmitting(false));
      } catch (error) {
        toast.error("Failed to edit factory details. Please try again.");
        setSubmitting(false);
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

  // 🌀 Loading Screen
  if (loading) {
    return (
      <section className="flex items-center justify-center h-[60vh] bg-white mt-8 rounded-[15px]">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-[#54993a] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-[#64728C] font-medium text-lg font-poppins">
            Loading factory details...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <div className="w-full bg-white rounded-[15px] px-[30px] pt-[20px] pb-[40px]">
        <div className="flex flex-col mt-4 md:flex-row md:justify-left">
          <div className="w-full md:mr-5 mb-4 md:mb-0">
            <span className="font-poppins font-medium text-[16px] md:text-[22px] leading-8 md:leading-[30px] text-[#64728C] mt-1">
              Factory Details
            </span>
            <section className="mt-6">
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col items-start w-full gap-3 mt-6 md:flex-row md:gap-20 md:mt-2">
                    {inputItems.slice(0, 2).map((item, i) => (
                      <div className="md:w-[35%] w-full mb-3" key={i}>
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
                    ))}
                  </div>

                  <div className="flex flex-col items-start w-full gap-3 mt-6 md:flex-row md:gap-20 md:mt-2">
                    {inputItems.slice(2, 4).map((item, i) => (
                      <div className="md:w-[35%] w-full mb-3" key={i}>
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
                    ))}
                  </div>

                  <div className="md:w-[30%] w-full mb-3">
                    <div className="w-full">
                      <p className="font-poppins text-[14px] md:text-[16px] leading-[24px] font-medium text-[#64728C]">
                        Contact Number
                      </p>
                      <input
                        name="phoneNumber"
                        type="text"
                        className="block rounded-[15px] border-0 py-2.5 pl-3 text-gray-900 ring-1 ring-inset mt-2 ring-gray-300 placeholder:text-[#64728C]-400 placeholder:text-[14px] md:placeholder:text-[14px] focus:ring-1 focus:ring-inset sm:leading-6 w-full text-[14px] md:text-[15px] font-normal font-poppins"
                        value={editedFactory.phoneNumber || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          const isNumeric = /^\d+$/.test(value);
                          if (isNumeric || value === "") {
                            setEditedFactory({
                              ...editedFactory,
                              phoneNumber: value,
                            });
                            setErrors((prev) => ({
                              ...prev,
                              phoneNumber: "",
                            }));
                          } else {
                            setErrors((prev) => ({
                              ...prev,
                              phoneNumber: "Please enter a valid phone number.",
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
                      className="bg-[#54993a] font-poppins text-[14px] font-semibold leading-[22px] px-4 py-2 rounded-[20px] min-w-[80px] hover:bg-[#4a8934] hover:text-white text-white border border-[#54993a] transition-all duration-300 flex items-center gap-2 justify-center"
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
      <ToastContainer />
    </section>
  );
};
