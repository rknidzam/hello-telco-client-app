import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const CustomerDetails = () => {
  const { customerId } = useParams();
  const [name, setName] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState([]);

  useEffect(() => {
    // Fetch data using Axios
    axios
      //.get(`https://localhost:44355/api/Customers/${customerId}`)
      .get(`https://hello-telco-api.azurewebsites.net/api/Customers/${customerId}`)      
      .then((response) => {
        setName(response.data.name);
        setPhoneNumbers(response.data.phoneNumbers);
        console.log(response.data.phoneNumbers);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [customerId]); // Empty dependency array means this effect will run once on mount

  return (
    <div className="container pt-2">
      <div className="row">
        <h3>Customer: {name}</h3>
      </div>
      <div className="row">
        <div className="pt-2">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Phone Number</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {phoneNumbers.length > 0 ? (
                phoneNumbers.map((item, index) => (
                  <tr key={item.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.number}</td>
                    <td>{item.status === true ? <span className="badge text-bg-success">Active</span> : <span className="badge text-bg-warning">Inactive</span>}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
