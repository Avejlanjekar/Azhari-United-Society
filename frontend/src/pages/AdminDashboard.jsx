
// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import { useContext, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { Menu, X } from "lucide-react"; 
// import logo from "../assets/logo.png";

// export default function AdminDashboard() {
//   const { logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/*  Mobile Top Bar */}
//       <div className="lg:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-800 shadow-md flex items-center justify-between px-4 py-3 z-50">
//         <div className="flex items-center gap-2">
//           <img
//             src={logo}
//             alt="Society Logo"
//             className="w-8 h-8 rounded-full object-contain shadow"
//           />
//           <h2 className="text-lg font-bold text-white">Ahlan Razanagar</h2>
//         </div>
//         <button onClick={() => setIsOpen(!isOpen)} className="text-white">
//           {isOpen ? <X size={26} /> : <Menu size={26} />}
//         </button>
//       </div>

//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 bottom-0 w-64 bg-gradient-to-b from-white to-blue-50 shadow-xl p-6 flex flex-col justify-between transform transition-transform duration-300 z-40
//         ${isOpen ? "translate-x-0" : "-translate-x-full"} 
//         lg:translate-x-0`}
//       >
//         <div>
//           <div className="hidden lg:flex items-center gap-3 mb-8">
//             <img
//               src={logo}
//               alt="Society Logo"
//               className="w-12 h-12 object-contain rounded-full shadow"
//             />
//             <div>
//               <h2 className="text-lg font-bold text-gray-800">
//                 Azhari United
//               </h2>
//               <p className="text-sm text-gray-600 font-medium">Society</p>
//             </div>
//           </div>

//           <nav className="flex flex-col space-y-3 mt-16 lg:mt-0">
//             {[
//               { to: "/admin/members", label: "Members" },
//               { to: "/admin/deposits", label: "Deposits" },
//                { to: "/admin/pendingdeposits", label: "Pending Deposits" },
//               { to: "/admin/loans", label: "Active Loans" },
//               { to: "/admin/repaidloans", label: "Repaid Loans" },
//               { to: "/admin/approvedeposits", label: "Approve/Reject Deposits" },
//               { to: "/admin/manageloans", label: "Approve/Reject Loans" },
//               { to: "/admin/repayment", label: "Repayment" },
//               { to: "/admin/register", label: "Add New Members" },
//             ].map((item) => (
//               <NavLink
//                 key={item.to}
//                 to={item.to}
//                 onClick={() => setIsOpen(false)}
//                 className={({ isActive }) =>
//                   `px-4 py-2 rounded-lg font-medium transition ${
//                     isActive
//                       ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
//                       : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
//                   }`
//                 }
//               >
//                 {item.label}
//               </NavLink>
//             ))}
//           </nav>
//         </div>

//         <button
//           onClick={() => setShowConfirm(true)}
//           className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 hover:shadow-lg transition"
//         >
//           Logout
//         </button>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6 lg:p-8 pt-20 lg:pt-8 lg:ml-64">
//         <Outlet />
//       </main>

//       {showConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl shadow-xl p-6 w-11/12 max-w-md text-center border border-gray-200">
//             <h2 className="text-xl font-bold mb-4 text-gray-800">
//               ⚠️ Confirm Logout
//             </h2>
//             <p className="text-gray-600 mb-6">
//               Are you sure you want to logout from your account?
//             </p>
//             <div className="flex justify-center gap-4 flex-wrap">
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
import {
  Menu,
  X,
  Users,
  WalletCards,
  Clock3,
  Landmark,
  BadgeCheck,
  ClipboardCheck,
  UserRoundPlus,
  LogOut,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
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

  const navigationItems = [
    {
      to: "/admin/members",
      label: "Members",
      icon: Users,
    },
    {
      to: "/admin/deposits",
      label: "Deposits",
      icon: WalletCards,
    },
    {
      to: "/admin/pendingdeposits",
      label: "Pending Deposits",
      icon: Clock3,
    },
    {
      to: "/admin/loans",
      label: "Active Loans",
      icon: Landmark,
    },
    {
      to: "/admin/repaidloans",
      label: "Repaid Loans",
      icon: BadgeCheck,
    },
    {
      to: "/admin/approvedeposits",
      label: "Approve/Reject Deposits",
      icon: ClipboardCheck,
    },
    {
      to: "/admin/manageloans",
      label: "Approve/Reject Loans",
      icon: ClipboardCheck,
    },
    {
      to: "/admin/repayment",
      label: "Repayment",
      icon: WalletCards,
    },
    {
      to: "/admin/register",
      label: "Add New Members",
      icon: UserRoundPlus,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ==================================================
          MOBILE TOP BAR
      ================================================== */}

      <header className="fixed inset-x-0 top-0 z-50 border-b border-blue-700/30 bg-blue-600 shadow-sm lg:hidden">
        <div className="flex h-16 items-center justify-between px-4">

          <div className="flex min-w-0 items-center gap-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm">
              <img
                src={logo}
                alt="Society Logo"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-sm font-bold text-white">
                Ahlan Razanagar
              </h2>

              <p className="text-[10px] font-medium text-blue-100">
                Admin Dashboard
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={
              isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white transition-colors hover:bg-white/10 active:bg-white/20"
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

        </div>
      </header>

      {/* ==================================================
          MOBILE OVERLAY
      ================================================== */}

      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[1px] lg:hidden"
        />
      )}

      {/* ==================================================
          SIDEBAR
      ================================================== */}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-slate-200 bg-white shadow-xl transition-transform duration-300 ease-in-out lg:z-40 lg:w-72 lg:translate-x-0 lg:shadow-sm ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        <div className="flex min-h-0 flex-1 flex-col">

          {/* Sidebar Branding */}

          <div className="border-b border-slate-100 px-5 py-6">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <img
                  src={logo}
                  alt="Society Logo"
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-lg font-bold tracking-tight text-slate-900">
                  Azhari United
                </h2>

                <p className="mt-0.5 text-sm font-medium text-slate-500">
                  Society
                </p>
              </div>

            </div>

          </div>

          {/* Navigation */}

          <div className="flex-1 overflow-y-auto px-4 py-5">

            <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
              Administration
            </p>

            <nav className="space-y-1.5">

              {navigationItems.map((item) => {

                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`
                    }
                  >

                    {({ isActive }) => (
                      <>
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                            isActive
                              ? "bg-white/15 text-white"
                              : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-blue-600"
                          }`}
                        >
                          <Icon className="h-4.5 w-4.5" />
                        </span>

                        <span className="min-w-0 flex-1 leading-5">
                          {item.label}
                        </span>

                        <ChevronRight
                          className={`h-4 w-4 shrink-0 transition-transform ${
                            isActive
                              ? "text-white/80"
                              : "text-slate-300 group-hover:translate-x-0.5 group-hover:text-slate-500"
                          }`}
                        />
                      </>
                    )}

                  </NavLink>
                );
              })}

            </nav>

          </div>

          {/* Sidebar Footer */}

          <div className="border-t border-slate-100 p-4">

            <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <ShieldCheck className="h-4.5 w-4.5" />
              </div>

              <div className="min-w-0">

                <p className="text-xs font-semibold text-slate-700">
                  Administrator Account
                </p>

                <p className="mt-0.5 truncate text-[11px] text-slate-400">
                  Administrative access secured
                </p>

              </div>

            </div>

            <button
              type="button"
              onClick={() => setShowConfirm(true)}
              className="group flex w-full items-center gap-3 rounded-xl border border-red-100 bg-red-50 px-3.5 py-3 text-sm font-semibold text-red-600 transition-all duration-200 hover:border-red-200 hover:bg-red-100"
            >

              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-red-500 shadow-sm transition-colors group-hover:bg-red-600 group-hover:text-white">
                <LogOut className="h-4 w-4" />
              </span>

              <span>Logout</span>

            </button>

          </div>

        </div>

      </aside>

      {/* ==================================================
          MAIN CONTENT
      ================================================== */}

      <main className="min-h-screen transition-all duration-300 lg:ml-72">

        <div className="px-3 pb-8 pt-20 sm:px-6 lg:px-8 lg:py-8">

          <Outlet />

        </div>

      </main>

      {/* ==================================================
          LOGOUT CONFIRMATION MODAL
      ================================================== */}

      {showConfirm && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 px-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="logout-title"
        >

          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

            {/* Modal Header */}

            <div className="border-b border-slate-100 px-5 py-5 sm:px-6">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <LogOut className="h-5 w-5" />
                </div>

                <div className="min-w-0">

                  <h2
                    id="logout-title"
                    className="text-lg font-bold text-slate-900"
                  >
                    Confirm Logout
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-500">
                    You are about to leave the administrator account.
                  </p>

                </div>

              </div>

            </div>

            {/* Modal Content */}

            <div className="px-5 py-5 sm:px-6">

              <p className="text-sm leading-6 text-slate-600">
                Are you sure you want to logout from your account?
              </p>

            </div>

            {/* Modal Actions */}

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">

              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="w-full rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 sm:w-auto"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700 sm:w-auto"
              >
                Yes, Logout
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}


