import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ContactList = () => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const handleActivate = async (phoneNumberId) => {
    try {
      const result = await MySwal.fire({
        title: "Activate Phone Number?",
        text: "Are you sure you want to activate this phone number?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, activate it!",
      });

      if (result.isConfirmed) {
        // Handle activation logic, e.g., make Axios PUT request
        console.log("Activated!");
        
        //await axios.put(`https://localhost:44355/api/PhoneNumbers/${phoneNumberId}?status=true`);
        await axios.put(`https://hello-telco-api.azurewebsites.net/api/PhoneNumbers/${phoneNumberId}?status=true`);

        // Refresh the page
        navigate(0);
      }
    } catch (error) {
      console.error("Error activating phone number:", error);
    }
  };

  const handleDeactivate = async (phoneNumberId) => {
    try {
      const result = await MySwal.fire({
        title: "Deactivate Phone Number?",
        text: "Are you sure you want to deactivate this phone number?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, deactivate it!",
      });

      if (result.isConfirmed) {
        // Handle deactivation logic, e.g., make Axios PUT request
        console.log("Deactivated!");
        
        //await axios.put(`https://localhost:44355/api/PhoneNumbers/${phoneNumberId}?status=false`);        
        await axios.put(`https://hello-telco-api.azurewebsites.net/api/PhoneNumbers/${phoneNumberId}?status=false`);

        // Refresh the page
        navigate(0);
      }
    } catch (error) {
      console.error("Error deactivating phone number:", error);
    }
  };

  // State to store grouped contacts
  const [groupedContacts, setGroupedContacts] = useState({});

  useEffect(() => {
    // Fetch data using Axios
    axios
      //.get("https://localhost:44355/api/PhoneNumbers")
      .get("https://hello-telco-api.azurewebsites.net/api/PhoneNumbers")
      .then((response) => {
        console.log(response.data);

        const grouped = response.data.reduce((acc, contact) => {
          const { customerId, name } = contact;

          if (!acc[name]) {
            acc[name] = {
              customerId,
              contacts: [],
            };
          }

          acc[name].contacts.push(contact);
          return acc;
        }, {});

        console.log(grouped);

        setGroupedContacts(grouped);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array means this effect will run once on mount

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <h3>Contact List</h3>          
        </div>
      </div>
      <div className="row">
        {Object.keys(groupedContacts).map((key) => {
          const { customerId, contacts } = groupedContacts[key];
          return (
            <div key={key}>
              <div className="d-flex bd-highlight align-items-center">
                <h5>Customer: {key}</h5>
                <div className="ms-auto bd-highlight">
                  <Link className="btn btn-primary btn-sm" to={`/customer/create-contact/${customerId}`}>
                    Add new number
                  </Link>
                </div>
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th style={{ width: "30%" }}>Phone Number</th>
                    <th style={{ width: "30%" }}>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact, index) => (
                    <tr key={index}>
                      <td>{contact.phone}</td>
                      <td>{contact.status === true ? <span className="badge text-bg-success">Active</span> : <span className="badge text-bg-warning">Inactive</span>}</td>
                      <td>
                        {contact.status === true ? (
                          <button className="btn btn-danger btn-sm" onClick={() => handleDeactivate(contact.phoneNumberId)}>
                            Deactivate{" "}
                            <span>
                              <i className="fa-solid fa-ban"></i>
                            </span>
                          </button>
                        ) : (
                          <button className="btn btn-primary btn-sm" onClick={() => handleActivate(contact.phoneNumberId)}>
                            Activate{" "}
                            <span>
                              <i className="fa-regular fa-square-check"></i>
                            </span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactList;
