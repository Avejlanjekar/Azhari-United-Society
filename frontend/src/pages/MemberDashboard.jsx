// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import { useContext, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import logo from "../assets/logo.png"; // ✅ make sure this path is correct

// export default function MemberDashboard() {
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
//               to="/member/profile"
//               className={({ isActive }) =>
//                 `px-4 py-2 rounded-lg ${
//                   isActive
//                     ? "bg-blue-500 text-white"
//                     : "text-gray-700 hover:bg-gray-200"
//                 }`
//               }
//             >
//               Profile
//             </NavLink>
//             <NavLink
//               to="/member/deposits"
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
//               to="/member/loans"
//               className={({ isActive }) =>
//                 `px-4 py-2 rounded-lg ${
//                   isActive
//                     ? "bg-blue-500 text-white"
//                     : "text-gray-700 hover:bg-gray-200"
//                 }`
//               }
//             >
//               Loans
//             </NavLink>
//             <NavLink
//               to="/member/repayment"
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
import { Menu, X } from "lucide-react"; // ✅ for mobile toggle button
import logo from "../assets/logo.png";

export default function MemberDashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar (desktop & mobile) */}
      <aside
        className={`fixed top-0 left-0 bottom-0 bg-white shadow-lg p-6 flex flex-col justify-between transform transition-transform duration-300 z-40
        w-64 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div>
          {/* ✅ Society Logo + Name */}
          <div className="flex items-center gap-3 mb-8">
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
          <nav className="flex flex-col space-y-3">
            {[
              { to: "/member/profile", label: "Profile" },
              { to: "/member/deposits", label: "Deposits" },
              { to: "/member/loans", label: "Loans" },
              { to: "/member/repayment", label: "Repayment" },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-medium transition-colors ${isActive
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-800 hover:bg-blue-100 md:text-gray-700 md:hover:bg-gray-200"
                  }`
                }
                onClick={() => setSidebarOpen(false)} // ✅ close on mobile click
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* ✅ Fixed Logout Button */}
        <button
          onClick={() => setShowConfirm(true)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

      {/* Mobile Top Bar with Hamburger */}
      {/* Mobile Top Bar with Hamburger */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-blue-600 shadow flex items-center justify-between px-4 py-3 z-30">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Society Logo" className="w-8 h-8 rounded-full" />
          <h2 className="font-semibold text-white">Ahlan Razanagar</h2>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>


      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 md:ml-64 mt-14 md:mt-0">
        <Outlet />
      </main>

      {/* ✅ Logout Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-96 text-center border border-gray-200">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              ⚠️ Confirm Logout
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout from your account?
            </p>
            <div className="flex justify-center gap-4">
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
