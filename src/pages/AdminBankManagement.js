import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminBankManagement.css"; // CSS file for styling
import { backendDomain } from "../config";
const AdminBankManagement = () => {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [loading, setLoading] = useState(false); // To handle loading state
  const [error, setError] = useState(""); // To handle error messages

  // Fetch all bank accounts (admin view)
  useEffect(() => {
    fetchAllBankAccounts();
  }, []);

  const fetchAllBankAccounts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendDomain}/api/admin/getAllBankAccount`, { withCredentials: true });
      setBankAccounts(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Error fetching bank accounts.");
      console.error("Error fetching bank accounts", error);
    }
  };

  return (
    <div className="container">
      <h2>Admin - All Bank Accounts</h2>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Loading Spinner */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Bank Accounts List */}
          {bankAccounts.length > 0 ? (
            <table className="bank-accounts-table">
              <thead>
                <tr>
                  <th>Bank Name</th>
                  <th>Branch Name</th>
                  <th>Account Number</th>
                  <th>Account Holder</th>
                  <th>User</th>
                </tr>
              </thead>
              <tbody>
                {bankAccounts.map((account) => (
                  <tr key={account._id}>
                    <td>{account.bankName}</td>
                    <td>{account.branchName}</td>
                    <td>{account.accountNumber}</td>
                    <td>{account.accountHolderName}</td>
                    <td>{account.user ? `${account.user.username} (${account.user.email})` : "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No bank accounts available.</p>
          )}
        </>
      )}
      <a href="/admin/search"><button >search...</button></a>
    </div>
  );
};

export default AdminBankManagement;
