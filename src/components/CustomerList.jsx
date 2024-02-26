import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CustomerList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data using Axios
    axios
      //.get("https://localhost:44355/api/Customers")
      .get("https://hello-telco-api.azurewebsites.net/api/Customers")      
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array means this effect will run once on mount

  return (
    <div className="container pt-2">
      <div className="row">
        <div className="col-4">
          <h3>Customer</h3>
          <ul className="list-group">
            {data.map((customer) => (
              <li key={customer.id} className="list-group-item">
                {customer.name}
                <Link className="btn btn-primary btn-sm float-end" to={`/customer/${customer.id}`}>
                  View contact &gt;
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
