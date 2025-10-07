// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import { useContext, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import logo from "../assets/logo.png"; // ✅ make sure this path is correct

// export default function AdminDashboard() {
//   const { logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [showConfirm, setShowConfirm] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate("/login"); // redirect to login page
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between fixed left-0 top-0 bottom-0">
//         <div>
//           {/* ✅ Society Logo + Name */}
//           <div className="flex items-center gap-3 mb-8">
//             <img
//               src={logo}
//               alt="Society Logo"
//               className="w-12 h-12 object-contain rounded-full shadow"
//             />
//             <div>
//               <h2 className="text-lg font-bold text-gray-800">Ahlan Razanagar</h2>
//               <p className="text-sm text-gray-600 font-medium">Society</p>
//             </div>
//           </div>

//           {/* ✅ Navigation */}
//           <nav className="flex flex-col space-y-3">
           
//             <NavLink
//               to="/admin/members"
//               className={({ isActive }) =>
//                 `px-4 py-2 rounded-lg ${
//                   isActive
//                     ? "bg-blue-500 text-white"
//                     : "text-gray-700 hover:bg-gray-200"
//                 }`
//               }
//             >
//               Members
//             </NavLink>
//             <NavLink
//               to="/admin/deposits"
//               className={({ isActive }) =>
//                 `px-4 py-2 rounded-lg ${
//                   isActive
//                     ? "bg-blue-500 text-white"
//                     : "text-gray-700 hover:bg-gray-200"
//                 }`
//               }
//             >
//               Deposits
//             </NavLink>
//             <NavLink
//               to="/admin/loans"
//               className={({ isActive }) =>
//                 `px-4 py-2 rounded-lg ${
//                   isActive
//                     ? "bg-blue-500 text-white"
//                     : "text-gray-700 hover:bg-gray-200"
//                 }`
//               }
//             >
//               Active Loans
//             </NavLink>
//              <NavLink
//               to="/admin/repaidloans"
//               className={({ isActive }) =>
//                 `px-4 py-2 rounded-lg ${
//                   isActive
//                     ? "bg-blue-500 text-white"
//                     : "text-gray-700 hover:bg-gray-200"
//                 }`
//               }
//             >
//               Repaid Loans
//             </NavLink>
//             <NavLink
//               to="/admin/approvedeposits"
//               className={({ isActive }) =>
//                 `px-4 py-2 rounded-lg ${
//                   isActive
//                     ? "bg-blue-500 text-white"
//                     : "text-gray-700 hover:bg-gray-200"
//                 }`
//               }
//             >
//               Approve/Reject Deposits
//             </NavLink><NavLink
//               to="/admin/manageloans"
//               className={({ isActive }) =>
//                 `px-4 py-2 rounded-lg ${
//                   isActive
//                     ? "bg-blue-500 text-white"
//                     : "text-gray-700 hover:bg-gray-200"
//                 }`
//               }
//             >
//               Approve/Reject Loans
//             </NavLink>
//             <NavLink
//               to="/admin/repayment"
//               className={({ isActive }) =>
//                 `px-4 py-2 rounded-lg ${
//                   isActive
//                     ? "bg-blue-500 text-white"
//                     : "text-gray-700 hover:bg-gray-200"
//                 }`
//               }
//             >
//               Repayment
//             </NavLink>
//             <NavLink
//               to="/admin/register"
//               className={({ isActive }) =>
//                 `px-4 py-2 rounded-lg ${
//                   isActive
//                     ? "bg-blue-500 text-white"
//                     : "text-gray-700 hover:bg-gray-200"
//                 }`
//               }
//             >
//               Add New Members
//             </NavLink>
//           </nav>
//         </div>

//         {/* ✅ Fixed Logout Button */}
//         <button
//           onClick={() => setShowConfirm(true)}
//           className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8 ml-64">
//         <Outlet />
//       </main>

//       {/* ✅ Logout Confirmation Modal */}
//       {showConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl shadow-xl p-6 w-96 text-center border border-gray-200">
//             <h2 className="text-xl font-bold mb-4 text-gray-800">⚠️ Confirm Logout</h2>
//             <p className="text-gray-600 mb-6">
//               Are you sure you want to logout from your account?
//             </p>
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={handleLogout}
//                 className="px-5 py-2 bg-red-600 text-white font-medium rounded-lg shadow hover:bg-red-700 transition"
//               >
//                 Yes, Logout
//               </button>
//               <button
//                 onClick={() => setShowConfirm(false)}
//                 className="px-5 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-200 transition"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Menu, X } from "lucide-react"; 
import logo from "../assets/logo.png";

export default function AdminDashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ✅ Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-800 shadow-md flex items-center justify-between px-4 py-3 z-50">
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Society Logo"
            className="w-8 h-8 rounded-full object-contain shadow"
          />
          <h2 className="text-lg font-bold text-white">Ahlan Razanagar</h2>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-gradient-to-b from-white to-blue-50 shadow-xl p-6 flex flex-col justify-between transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
      >
        <div>
          {/* ✅ Society Logo + Name (hidden on mobile, already in top bar) */}
          <div className="hidden lg:flex items-center gap-3 mb-8">
            <img
              src={logo}
              alt="Society Logo"
              className="w-12 h-12 object-contain rounded-full shadow"
            />
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                Ahlan Razanagar
              </h2>
              <p className="text-sm text-gray-600 font-medium">Society</p>
            </div>
          </div>

          {/* ✅ Navigation */}
          <nav className="flex flex-col space-y-3 mt-16 lg:mt-0">
            {[
              { to: "/admin/members", label: "Members" },
              { to: "/admin/deposits", label: "Deposits" },
               { to: "/admin/pendingdeposits", label: "Pending Deposits" },
              { to: "/admin/loans", label: "Active Loans" },
              { to: "/admin/repaidloans", label: "Repaid Loans" },
              { to: "/admin/approvedeposits", label: "Approve/Reject Deposits" },
              { to: "/admin/manageloans", label: "Approve/Reject Loans" },
              { to: "/admin/repayment", label: "Repayment" },
              { to: "/admin/register", label: "Add New Members" },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-medium transition ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* ✅ Fixed Logout Button */}
        <button
          onClick={() => setShowConfirm(true)}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 hover:shadow-lg transition"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 pt-20 lg:pt-8 lg:ml-64">
        <Outlet />
      </main>

      {/* ✅ Logout Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-11/12 max-w-md text-center border border-gray-200">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              ⚠️ Confirm Logout
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout from your account?
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-red-600 text-white font-medium rounded-lg shadow hover:bg-red-700 transition"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-5 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg shadow hover:bg-gray-200 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}