// src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Founders from "./pages/Founders";
import Rules from "./pages/Rules";
import Login from "./pages/Login";

// ✅ Import dashboards
import AdminDashboard from "./pages/AdminDashboard";
import MemberDashboard from "./pages/MemberDashboard";

// ✅ Import nested pages for Member
import Deposits from "./pages/member/Deposits";
import Loans from "./pages/member/Loans";
import Fines from "./pages/member/Fines";
import Profile from "./pages/member/Profile";
import Repayment from "./pages/member/Repayment";

// ✅ Import nested pages for Admin
import ApproveDeposits from "./pages/admin/ApproveDeposits";
import AllDeposits from "./pages/admin/AllDeposits";
import AllLoans from "./pages/admin/AllLoans";
import ManageLoans from "./pages/admin/ManageLoans";
import Members from "./pages/admin/Members";
import RegisterMembers from "./pages/admin/RegisterMembers";
import ApproveRepayment from "./pages/admin/ApproveRepayment";
import RepaidLoans from "./pages/admin/RepaidLoans";
import PendingDeposits from "./pages/admin/PendingDeposits"

function App() {
  const location = useLocation();

  // ✅ Hide Navbar on /login, /admin/*, /member/*
  const hideNavbar =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/member") ||
    location.pathname === "/login";

  return (
    <div className="min-h-screen bg-gray-50">
      {!hideNavbar && <Navbar />}

      <div className={hideNavbar ? "" : "p-6"}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/founders" element={<Founders />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/login" element={<Login />} />

          {/* Admin Dashboard (nested routes) */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="members" element={<Members />} />
            <Route path="deposits" element={<AllDeposits />} />
            <Route path="loans" element={<AllLoans />} />
            <Route path="repaidloans" element={<RepaidLoans />} />
            <Route path="approvedeposits" element={<ApproveDeposits />} />
            <Route path="manageloans" element={<ManageLoans />} />
            <Route path="repayment" element={<ApproveRepayment />} />
            <Route path="register" element={<RegisterMembers />} />
            <Route path="pendingdeposits" element={<PendingDeposits />} />
          </Route>

          {/* Member Dashboard (nested routes) */}
          <Route path="/member" element={<MemberDashboard />}>
            <Route path="deposits" element={<Deposits />} />
            <Route path="loans" element={<Loans />} />
            <Route path="fines" element={<Fines />} />
            <Route path="profile" element={<Profile />} />
            <Route path="repayment" element={<Repayment />} />
          </Route>
        </Routes>
      </div>
    </div>
    
  );
}

export default App;
