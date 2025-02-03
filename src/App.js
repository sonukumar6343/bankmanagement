import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import BankManagement from "./pages/BankManagement";
import AdminBankManagement from "./pages/AdminBankManagement";
import AdminBankManagementsearch from "./pages/AdminBankManagementsearch";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/bankManagement" element={<BankManagement />} />
        <Route path="/admin" element={<AdminBankManagement/>} />
        <Route path="/admin/search" element={<AdminBankManagementsearch/>} />
      </Routes>
    </Router>
  );
};

export default App;

