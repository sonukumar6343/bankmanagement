
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BankManagement.css"; // CSS file for styling
import { backendDomain } from "../config";

const BankManagement = () => {
  const [banks, setBanks] = useState([]);
  const [formData, setFormData] = useState({
    ifscCode: "",
    branchName: "",
    bankName: "",
    accountNumber: "",
    accountHolderName: "",
  });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState(""); // To display success or error messages
  const [loading, setLoading] = useState(false); // To handle loading state

  // Fetch bank data from backend
  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendDomain}/api/bank/getBankAccount`, { withCredentials: true });
      setBanks(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setMessage("Error fetching bank accounts.");
      console.error("Error fetching banks", error);
    }
  };

  // Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (Add or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editId) {
        // Edit existing bank account
        await axios.post(`${backendDomain}/api/bank/editBankInfo`, { ...formData, accountNumber: formData.accountNumber }, { withCredentials: true });
        setMessage("Bank account updated successfully.");
      } else {
        // Add new bank account
        await axios.post(`${backendDomain}/api/bank/addBankAccount`, formData, { withCredentials: true });
        setMessage("Bank account added successfully.");
      }

      setFormData({
        ifscCode: "",
        branchName: "",
        bankName: "",
        accountNumber: "",
        accountHolderName: "",
      });
      setEditId(null);
      fetchBanks(); // Refresh bank list
    } catch (error) {
      setMessage("Error saving bank account.");
      console.error("Error saving bank", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Edit
  const handleEdit = (bank) => {
    setEditId(bank._id);
    setFormData({
      ifscCode: bank.ifscCode,
      branchName: bank.branchName,
      bankName: bank.bankName,
      accountNumber: bank.accountNumber,
      accountHolderName: bank.accountHolderName,
    });
  };

  // Handle Delete
  const handleDelete = async (accountNumber) => {
    setLoading(true);

    try {
      await axios.delete(`${backendDomain}/api/bank/removeBankInfo`, {
        data: { accountNumber },
        withCredentials: true,
      });
      setMessage("Bank account removed successfully.");
      fetchBanks(); // Refresh bank list
    } catch (error) {
      setMessage("Error deleting bank account.");
      console.error("Error deleting bank", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Bank Information Management</h2>

      {/* Success/Error Message */}
      {message && <p className="message">{message}</p>}

      {/* Add / Edit Form */}
      <form onSubmit={handleSubmit} className="bank-form">
        <input
          type="text"
          name="ifscCode"
          value={formData.ifscCode}
          placeholder="IFSC Code"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="branchName"
          value={formData.branchName}
          placeholder="Branch Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="bankName"
          value={formData.bankName}
          placeholder="Bank Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="accountNumber"
          value={formData.accountNumber}
          placeholder="Account Number"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="accountHolderName"
          value={formData.accountHolderName}
          placeholder="Account Holder Name"
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : editId ? "Update Bank" : "Add Bank"}
        </button>
      </form>

      {/* Bank List */}
      <h3>Bank Accounts</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="bank-list">
          {banks.length > 0 ? (
            banks.map((bank) => (
              <li key={bank._id}>
                <strong>{bank.bankName}</strong> ({bank.branchName}) - {bank.accountHolderName}
                <br />
                IFSC: {bank.ifscCode} | A/C: {bank.accountNumber}
                <br />
                <button onClick={() => handleEdit(bank)}>Edit</button>
                <button onClick={() => handleDelete(bank.accountNumber)}>Delete</button>
              </li>
            ))
          ) : (
            <p>No bank accounts available.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default BankManagement;

