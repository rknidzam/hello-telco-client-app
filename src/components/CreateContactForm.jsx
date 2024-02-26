import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

const CreateContactForm = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      var payLoad = {
        number: data.phone,
        status: true,
        customerId: customerId,
      };

      // const response = await axios.post("https://localhost:44355/api/PhoneNumbers", payLoad, {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      const response = await axios.post("https://hello-telco-api.azurewebsites.net/api/PhoneNumbers", payLoad, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Server response:", response.data);

      // Show toast with delay
      toast.success("Phone number saved successfully!", {
        autoClose: 1000, // 1.5 seconds delay
        onClose: () => {
          navigate(`/contact-list`); // Redirect to view list
        },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container pt-2">
        <div className="row">
          <h3>Create Contact Form</h3>
        </div>
        <div className="row">
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input type="text" placeholder="+60173286020" className={`form-control ${errors.phone ? "is-invalid" : ""}`} {...register("phone", { required: true })} />
            {errors.phone && <div className="invalid-feedback">Phone number is required.</div>}
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary btn-sm">
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateContactForm;
