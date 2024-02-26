import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import ContactList from "./components/ContactList";
import CustomerList from "./components/CustomerList";
import CustomerDetails from "./components/CustomerDetails";
import NoPage from "./components/NoPage";
import "bootstrap/dist/css/bootstrap.css";
import CreateContactForm from "./components/CreateContactForm";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="customer-list" element={<CustomerList />} />
        <Route path="/customer/:customerId" element={<CustomerDetails />} />
        <Route path="/customer/create-contact/:customerId" element={<CreateContactForm />} />
        <Route path="contact-list" element={<ContactList />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
    <ToastContainer />
  </BrowserRouter>
);
