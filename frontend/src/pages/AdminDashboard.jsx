// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import { useContext, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import {
//   Menu,
//   X,
//   Users,
//   WalletCards,
//   Clock3,
//   Landmark,
//   BadgeCheck,
//   ClipboardCheck,
//   UserRoundPlus,
//   LogOut,
//   ShieldCheck,
//   ChevronRight,
// } from "lucide-react";
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

//   const navigationItems = [
//     {
//       to: "/admin/members",
//       label: "Members",
//       icon: Users,
//     },
//     {
//       to: "/admin/deposits",
//       label: "Deposits",
//       icon: WalletCards,
//     },
//     {
//       to: "/admin/pendingdeposits",
//       label: "Pending Deposits",
//       icon: Clock3,
//     },
//     {
//       to: "/admin/loans",
//       label: "Active Loans",
//       icon: Landmark,
//     },
//     {
//       to: "/admin/repaidloans",
//       label: "Repaid Loans",
//       icon: BadgeCheck,
//     },
//     {
//       to: "/admin/approvedeposits",
//       label: "Approve/Reject Deposits",
//       icon: ClipboardCheck,
//     },
//     {
//       to: "/admin/manageloans",
//       label: "Approve/Reject Loans",
//       icon: ClipboardCheck,
//     },
//     {
//       to: "/admin/repayment",
//       label: "Repayment",
//       icon: WalletCards,
//     },
//     {
//       to: "/admin/register",
//       label: "Add New Members",
//       icon: UserRoundPlus,
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-slate-50">

//       {/* ==================================================
//           SIDEBAR
//       ================================================== */}

//       <aside
//         className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-slate-200 bg-white shadow-xl transition-transform duration-300 ease-in-out lg:z-40 lg:w-72 lg:translate-x-0 lg:shadow-sm ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="flex min-h-0 flex-1 flex-col">

//           {/* Sidebar Branding */}

//           <div className="border-b border-slate-100 px-5 py-6">
//             <div className="flex items-center gap-3">

//               <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
//                 <img
//                   src={logo}
//                   alt="Society Logo"
//                   className="h-full w-full object-contain"
//                 />
//               </div>

//               <div className="min-w-0">
//                 <h2 className="truncate text-lg font-bold tracking-tight text-slate-900">
//                   Azhari United
//                 </h2>

//                 <p className="mt-0.5 text-sm font-medium text-slate-500">
//                   Society
//                 </p>
//               </div>

//             </div>
//           </div>

//           {/* Navigation */}

//           <div className="flex-1 overflow-y-auto px-4 py-5">

//             <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
//               Administration
//             </p>

//             <nav className="space-y-1.5">

//               {navigationItems.map((item) => {
//                 const Icon = item.icon;

//                 return (
//                   <NavLink
//                     key={item.to}
//                     to={item.to}
//                     onClick={() => setIsOpen(false)}
//                     className={({ isActive }) =>
//                       `group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-200 ${
//                         isActive
//                           ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
//                           : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
//                       }`
//                     }
//                   >
//                     {({ isActive }) => (
//                       <>
//                         <span
//                           className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
//                             isActive
//                               ? "bg-white/15 text-white"
//                               : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-blue-600"
//                           }`}
//                         >
//                           <Icon className="h-[18px] w-[18px]" />
//                         </span>

//                         <span className="min-w-0 flex-1 leading-5">
//                           {item.label}
//                         </span>

//                         <ChevronRight
//                           className={`h-4 w-4 shrink-0 transition-transform ${
//                             isActive
//                               ? "text-white/80"
//                               : "text-slate-300 group-hover:translate-x-0.5 group-hover:text-slate-500"
//                           }`}
//                         />
//                       </>
//                     )}
//                   </NavLink>
//                 );
//               })}

//             </nav>
//           </div>

//           {/* Sidebar Footer */}

//           <div className="border-t border-slate-100 p-4">

//             <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-3">

//               <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
//                 <ShieldCheck className="h-[18px] w-[18px]" />
//               </div>

//               <div className="min-w-0">
//                 <p className="text-xs font-semibold text-slate-700">
//                   Administrator Account
//                 </p>

//                 <p className="mt-0.5 truncate text-[11px] text-slate-400">
//                   Administrative access secured
//                 </p>
//               </div>

//             </div>

//             <button
//               type="button"
//               onClick={() => setShowConfirm(true)}
//               className="group flex w-full items-center gap-3 rounded-xl border border-red-100 bg-red-50 px-3.5 py-3 text-sm font-semibold text-red-600 transition-all duration-200 hover:border-red-200 hover:bg-red-100"
//             >
//               <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-red-500 shadow-sm transition-colors group-hover:bg-red-600 group-hover:text-white">
//                 <LogOut className="h-4 w-4" />
//               </span>

//               <span>Logout</span>
//             </button>

//           </div>
//         </div>
//       </aside>

//       {/* ==================================================
//           MOBILE OVERLAY
//       ================================================== */}

//       {isOpen && (
//         <button
//           type="button"
//           aria-label="Close navigation menu"
//           onClick={() => setIsOpen(false)}
//           className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[1px] lg:hidden"
//         />
//       )}

//       {/* ==================================================
//           MAIN CONTENT
//       ================================================== */}

//       <main className="min-h-screen transition-all duration-300 lg:ml-72">

//         <div className="px-3 pb-24 pt-5 sm:px-6 sm:pb-24 lg:px-8 lg:py-8">

//           <Outlet />

//         </div>

//       </main>

//       {/* ==================================================
//           MOBILE BOTTOM MENU
//       ================================================== */}

//       <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-3 py-2 shadow-[0_-4px_20px_rgba(15,23,42,0.08)] backdrop-blur-md lg:hidden">

//         <div className="mx-auto flex max-w-lg items-center justify-between gap-2">

//           {/* Menu Button */}

//           <button
//             type="button"
//             onClick={() => setIsOpen(true)}
//             className="flex flex-1 flex-col items-center justify-center rounded-xl py-2 text-slate-600 transition hover:bg-slate-100 active:bg-slate-200"
//           >
//             <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
//               <Menu className="h-5 w-5" />
//             </div>

//             <span className="mt-1 text-[11px] font-semibold">
//               Menu
//             </span>
//           </button>

//           {/* Members */}

//           <NavLink
//             to="/admin/members"
//             className={({ isActive }) =>
//               `flex flex-1 flex-col items-center justify-center rounded-xl py-2 transition ${
//                 isActive
//                   ? "bg-blue-50 text-blue-600"
//                   : "text-slate-500 hover:bg-slate-100"
//               }`
//             }
//           >
//             <Users className="h-5 w-5" />

//             <span className="mt-1 text-[11px] font-semibold">
//               Members
//             </span>
//           </NavLink>

//           {/* Deposits */}

//           <NavLink
//             to="/admin/deposits"
//             className={({ isActive }) =>
//               `flex flex-1 flex-col items-center justify-center rounded-xl py-2 transition ${
//                 isActive
//                   ? "bg-blue-50 text-blue-600"
//                   : "text-slate-500 hover:bg-slate-100"
//               }`
//             }
//           >
//             <WalletCards className="h-5 w-5" />

//             <span className="mt-1 text-[11px] font-semibold">
//               Deposits
//             </span>
//           </NavLink>

//           {/* Loans */}

//           <NavLink
//             to="/admin/loans"
//             className={({ isActive }) =>
//               `flex flex-1 flex-col items-center justify-center rounded-xl py-2 transition ${
//                 isActive
//                   ? "bg-blue-50 text-blue-600"
//                   : "text-slate-500 hover:bg-slate-100"
//               }`
//             }
//           >
//             <Landmark className="h-5 w-5" />

//             <span className="mt-1 text-[11px] font-semibold">
//               Loans
//             </span>
//           </NavLink>

//         </div>
//       </div>

//       {/* ==================================================
//           LOGOUT CONFIRMATION MODAL
//       ================================================== */}

//       {showConfirm && (
//         <div
//           className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 px-4 backdrop-blur-sm"
//           role="dialog"
//           aria-modal="true"
//           aria-labelledby="logout-title"
//         >
//           <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

//             {/* Modal Header */}

//             <div className="border-b border-slate-100 px-5 py-5 sm:px-6">

//               <div className="flex items-center gap-3">

//                 <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
//                   <LogOut className="h-5 w-5" />
//                 </div>

//                 <div className="min-w-0">

//                   <h2
//                     id="logout-title"
//                     className="text-lg font-bold text-slate-900"
//                   >
//                     Confirm Logout
//                   </h2>

//                   <p className="mt-0.5 text-xs text-slate-500">
//                     You are about to leave the administrator account.
//                   </p>

//                 </div>

//               </div>

//             </div>

//             {/* Modal Content */}

//             <div className="px-5 py-5 sm:px-6">

//               <p className="text-sm leading-6 text-slate-600">
//                 Are you sure you want to logout from your account?
//               </p>

//             </div>

//             {/* Modal Actions */}

//             <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">

//               <button
//                 type="button"
//                 onClick={() => setShowConfirm(false)}
//                 className="w-full rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 sm:w-auto"
//               >
//                 Cancel
//               </button>

//               <button
//                 type="button"
//                 onClick={handleLogout}
//                 className="w-full rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700 sm:w-auto"
//               >
//                 Yes, Logout
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
  LayoutDashboard,
} from "lucide-react";
import logo from "../assets/logo.png";

export default function AdminDashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setShowConfirm(false);
    setIsOpen(false);
    navigate("/login");
  };

  const navigationItems = [
    {
      to: "/admin/members",
      label: "Members",
      description: "Manage society members",
      icon: Users,
    },
    {
      to: "/admin/deposits",
      label: "Deposits",
      description: "View member deposits",
      icon: WalletCards,
    },
    {
      to: "/admin/pendingdeposits",
      label: "Pending Deposits",
      description: "Track pending contributions",
      icon: Clock3,
    },
    {
      to: "/admin/loans",
      label: "Active Loans",
      description: "View active loans",
      icon: Landmark,
    },
    {
      to: "/admin/repaidloans",
      label: "Repaid Loans",
      description: "View completed loans",
      icon: BadgeCheck,
    },
    {
      to: "/admin/approvedeposits",
      label: "Approve/Reject Deposits",
      description: "Review deposit submissions",
      icon: ClipboardCheck,
    },
    {
      to: "/admin/manageloans",
      label: "Approve/Reject Loans",
      description: "Review loan requests",
      icon: ClipboardCheck,
    },
    {
      to: "/admin/repayment",
      label: "Repayment",
      description: "Manage loan repayments",
      icon: WalletCards,
    },
    {
      to: "/admin/register",
      label: "Add New Members",
      description: "Register society members",
      icon: UserRoundPlus,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ==================================================
          DESKTOP SIDEBAR
      ================================================== */}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[285px] flex-col border-r border-slate-200 bg-white shadow-xl transition-transform duration-300 ease-in-out lg:z-40 lg:w-72 lg:translate-x-0 lg:shadow-sm ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex min-h-0 flex-1 flex-col">

          {/* ==================================================
              SIDEBAR BRANDING
          ================================================== */}

          <div className="border-b border-slate-100 px-5 py-5">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <img
                  src={logo}
                  alt="Azhari United"
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="truncate text-base font-bold tracking-tight text-slate-900">
                  Azhari United
                </h2>

                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Administrator Portal
                </p>
              </div>

            </div>

          </div>


          {/* ==================================================
              ACCOUNT STATUS
          ================================================== */}

          <div className="px-4 pt-4">

            <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">
                <ShieldCheck className="h-[18px] w-[18px]" />
              </div>

              <div className="min-w-0">

                <p className="text-xs font-bold text-emerald-800">
                  Secure Admin Account
                </p>

                <p className="mt-0.5 text-[10px] text-emerald-600">
                  Administrative access active
                </p>

              </div>

            </div>

          </div>


          {/* ==================================================
              SIDEBAR NAVIGATION
          ================================================== */}

          <div className="flex-1 overflow-y-auto px-4 py-5">

            <div className="mb-3 flex items-center gap-2 px-3">

              <LayoutDashboard className="h-3.5 w-3.5 text-slate-400" />

              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Administration
              </p>

            </div>


            <nav className="space-y-1">

              {navigationItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 ${
                        isActive
                          ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>

                        {/* ICON */}

                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                            isActive
                              ? "bg-white/15 text-white"
                              : "bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600"
                          }`}
                        >
                          <Icon className="h-[17px] w-[17px]" />
                        </span>


                        {/* TEXT */}

                        <span className="min-w-0 flex-1">

                          <span
                            className={`block truncate text-xs font-semibold ${
                              isActive
                                ? "text-white"
                                : "text-slate-700"
                            }`}
                          >
                            {item.label}
                          </span>

                          <span
                            className={`mt-0.5 block truncate text-[9px] ${
                              isActive
                                ? "text-blue-100"
                                : "text-slate-400"
                            }`}
                          >
                            {item.description}
                          </span>

                        </span>


                        {/* ARROW */}

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


          {/* ==================================================
              DESKTOP SIDEBAR FOOTER
          ================================================== */}

          <div className="border-t border-slate-100 p-4">

            <button
              type="button"
              onClick={() => setShowConfirm(true)}
              className="group flex w-full items-center gap-3 rounded-xl border border-red-100 bg-red-50 px-3 py-3 text-sm font-semibold text-red-600 transition-all duration-200 hover:border-red-200 hover:bg-red-100"
            >

              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-red-500 shadow-sm transition-colors group-hover:bg-red-600 group-hover:text-white">
                <LogOut className="h-4 w-4" />
              </span>

              <span>Logout</span>

              <ChevronRight className="ml-auto h-4 w-4 text-red-300 transition-transform group-hover:translate-x-0.5" />

            </button>

          </div>

        </div>
      </aside>


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
          MOBILE MENU DRAWER
      ================================================== */}

      <div
        className={`fixed inset-y-0 left-0 z-50 flex w-[300px] max-w-[88vw] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        {/* MOBILE DRAWER HEADER */}

        <div className="border-b border-slate-100 px-4 py-4">

          <div className="flex items-center justify-between">

            <div className="flex min-w-0 items-center gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <img
                  src={logo}
                  alt="Azhari United"
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="min-w-0">

                <p className="truncate text-sm font-bold text-slate-900">
                  Azhari United
                </p>

                <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                  Administrator Portal
                </p>

              </div>

            </div>


            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50"
            >
              <X className="h-5 w-5" />
            </button>

          </div>

        </div>


        {/* MOBILE SECURITY STATUS */}

        <div className="px-4 pt-4">

          <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">
              <ShieldCheck className="h-[18px] w-[18px]" />
            </div>

            <div>

              <p className="text-xs font-bold text-emerald-800">
                Secure Admin Account
              </p>

              <p className="mt-0.5 text-[10px] text-emerald-600">
                Administrative access active
              </p>

            </div>

          </div>

        </div>


        {/* MOBILE NAVIGATION */}

        <div className="flex-1 overflow-y-auto px-4 py-5">

          <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Administration
          </p>

          <nav className="space-y-1">

            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-xl px-3 py-2.5 transition ${
                      isActive
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-50"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>

                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          isActive
                            ? "bg-white/15 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <Icon className="h-[17px] w-[17px]" />
                      </span>

                      <span className="min-w-0 flex-1">

                        <span
                          className={`block truncate text-xs font-semibold ${
                            isActive
                              ? "text-white"
                              : "text-slate-700"
                          }`}
                        >
                          {item.label}
                        </span>

                        <span
                          className={`mt-0.5 block truncate text-[9px] ${
                            isActive
                              ? "text-blue-100"
                              : "text-slate-400"
                          }`}
                        >
                          {item.description}
                        </span>

                      </span>

                      <ChevronRight
                        className={`h-4 w-4 shrink-0 ${
                          isActive
                            ? "text-white/80"
                            : "text-slate-300"
                        }`}
                      />

                    </>
                  )}
                </NavLink>
              );
            })}

          </nav>

        </div>


        {/* ==================================================
            MOBILE DRAWER LOGOUT
        ================================================== */}

        <div className="border-t border-slate-100 bg-white p-4">

          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            className="group flex w-full items-center gap-3 rounded-xl border border-red-100 bg-red-50 px-3.5 py-3 text-sm font-semibold text-red-600 transition-all hover:border-red-200 hover:bg-red-100"
          >

            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-red-500 shadow-sm group-hover:bg-red-600 group-hover:text-white">
              <LogOut className="h-4 w-4" />
            </span>

            <span>Logout</span>

            <ChevronRight className="ml-auto h-4 w-4 text-red-300" />

          </button>

        </div>

      </div>


      {/* ==================================================
          MAIN CONTENT
      ================================================== */}

      <main className="min-h-screen transition-all duration-300 lg:ml-72">

        <div className="px-3 pb-24 pt-5 sm:px-6 sm:pb-24 lg:px-8 lg:py-8">

          <Outlet />

        </div>

      </main>


      {/* ==================================================
          MOBILE BOTTOM NAVIGATION
      ================================================== */}

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-2 py-2 shadow-[0_-4px_20px_rgba(15,23,42,0.08)] backdrop-blur-md lg:hidden">

        <div className="mx-auto grid h-[62px] max-w-lg grid-cols-4 gap-1">

          {/* MENU */}

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className={`flex flex-col items-center justify-center rounded-xl transition ${
              isOpen
                ? "bg-blue-50 text-blue-600"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >

            <Menu className="h-5 w-5" />

            <span className="mt-1 text-[10px] font-semibold">
              Menu
            </span>

          </button>


          {/* MEMBERS */}

          <NavLink
            to="/admin/members"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center rounded-xl transition ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-500 hover:bg-slate-50"
              }`
            }
          >

            <Users className="h-5 w-5" />

            <span className="mt-1 text-[10px] font-semibold">
              Members
            </span>

          </NavLink>


          {/* DEPOSITS */}

          <NavLink
            to="/admin/deposits"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center rounded-xl transition ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-500 hover:bg-slate-50"
              }`
            }
          >

            <WalletCards className="h-5 w-5" />

            <span className="mt-1 text-[10px] font-semibold">
              Deposits
            </span>

          </NavLink>


          {/* LOANS */}

          <NavLink
            to="/admin/loans"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center rounded-xl transition ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-500 hover:bg-slate-50"
              }`
            }
          >

            <Landmark className="h-5 w-5" />

            <span className="mt-1 text-[10px] font-semibold">
              Loans
            </span>

          </NavLink>

        </div>

      </nav>


      {/* ==================================================
          LOGOUT CONFIRMATION MODAL
      ================================================== */}

      {showConfirm && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/50 px-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="logout-title"
        >

          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

            {/* MODAL HEADER */}

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
                    Administrator session
                  </p>

                </div>

              </div>

            </div>


            {/* MODAL CONTENT */}

            <div className="px-5 py-5 sm:px-6">

              <p className="text-sm leading-6 text-slate-600">
                Are you sure you want to logout from your administrator
                account?
              </p>

            </div>


            {/* MODAL ACTIONS */}

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