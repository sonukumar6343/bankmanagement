import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminBankManagement.css"; // CSS file for styling
import { backendDomain } from "../config";


const AdminBankManagement = () => {
  const [bankAccounts, setBankAccounts] = useState([]); // Initialize as empty array
  const [users, setUsers] = useState([]); // Initialize as empty array
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [loading, setLoading] = useState(false); // To handle loading state
  const [error, setError] = useState(""); // To handle error messages

  // Fetch all bank accounts (admin view) when the component mounts
  useEffect(() => {
    if (!searchQuery) {
      fetchAllBankAccounts();
    } else {
      search();
    }
  }, [searchQuery]);

  // Fetch all bank accounts (admin view)
  const fetchAllBankAccounts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendDomain}/api/admin/getAllBankAccount`, { withCredentials: true });
      setBankAccounts(response.data.bankAccounts || []); // Ensure it's an array
      setUsers(response.data.users || []); // Ensure it's an array
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Error fetching bank accounts.");
      console.error("Error fetching bank accounts", error);
    }
  };

  // Handle Search Input Change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search (both for users and bank accounts)
  const search = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendDomain}/api/admin/search?query=${searchQuery}`, { withCredentials: true });
      setUsers(response.data.users || []); // Ensure it's an array
      setBankAccounts(response.data.bankAccounts || []); // Ensure it's an array
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Error searching.");
      console.error("Error searching", error);
    }
  };

  return (
    <div className="container">
      <h2>Admin - Bank Accounts & Users Search</h2>

      {/* Search Input */}
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search ..."
        />
      </div>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Loading Spinner */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Bank Accounts List */}
          <div className="search-results">
            <h3>Bank Accounts</h3>
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
              <p>No bank accounts found matching your search.</p>
            )}
          </div>

          {/* Users List */}
          <div className="search-results">
            <h3>Users</h3>
            {users.length > 0 ? (
              <ul className="user-list">
                {users.map((user) => (
                  <li key={user._id}>
                    <strong>{user.username}</strong> ({user.email})
                  </li>
                ))}
              </ul>
            ) : (
              <p>No users found matching your search.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminBankManagement;
