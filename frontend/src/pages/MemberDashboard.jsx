import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  Menu,
  X,
  User,
  WalletCards,
  UserRoundPen,
  LogOut,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
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

  const navigationItems = [
    {
      to: "/member/profile",
      label: "Profile",
      icon: User,
    },
    {
      to: "/member/deposits",
      label: "Deposits",
      icon: WalletCards,
    },
    {
      to: "/member/profile-update",
      label: "Update Profile",
      icon: UserRoundPen,
    },
    {
      to: "/member/loans",
      label: "Loans",
      icon: WalletCards,
    },
    {
      to: "/member/repayment",
      label: "Repayment",
      icon: WalletCards,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ==================================================
          DESKTOP SIDEBAR
      ================================================== */}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white shadow-sm transition-transform duration-300 ease-in-out
        ${sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
          }`}
      >

        {/* Sidebar Content */}
        <div className="flex min-h-0 flex-1 flex-col">

          {/* Brand */}
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
          <div className="flex-1 overflow-y-auto px-4 py-6">

            <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
              Member Menu
            </p>

            <nav className="space-y-1.5">

              {navigationItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-200 ${isActive
                        ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${isActive
                              ? "bg-white/15 text-white"
                              : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-blue-600"
                            }`}
                        >
                          <Icon className="h-4.5 w-4.5" />
                        </span>

                        <span className="flex-1">
                          {item.label}
                        </span>

                        <ChevronRight
                          className={`h-4 w-4 transition-transform ${isActive
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

          {/* Sidebar Bottom */}
          <div className="border-t border-slate-100 p-4">

            <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <ShieldCheck className="h-4.5 w-4.5" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-700">
                  Member Account
                </p>

                <p className="mt-0.5 truncate text-[11px] text-slate-400">
                  Account access secured
                </p>
              </div>

            </div>

            {/* Logout */}
            <button
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
          MOBILE HEADER
      ================================================== */}

      <header className="fixed inset-x-0 top-0 z-30 border-b border-blue-700/30 bg-blue-600 shadow-sm md:hidden">

        <div className="flex h-16 items-center justify-between px-4">

          <div className="flex min-w-0 items-center gap-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/95">
              <img
                src={logo}
                alt="Society Logo"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold text-white">
                Ahlan Razanagar
              </h2>

              <p className="text-[10px] font-medium text-blue-100">
                Member Dashboard
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={
              sidebarOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white transition-colors hover:bg-white/10 active:bg-white/20"
          >
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

        </div>

      </header>

      {/* ==================================================
          MOBILE SIDEBAR OVERLAY
      ================================================== */}

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-[1px] md:hidden"
        />
      )}

      {/* ==================================================
          MAIN CONTENT
      ================================================== */}

      <main className="min-h-screen transition-all duration-300 md:ml-72">

        <div className="px-4 pb-8 pt-20 sm:px-6 md:px-8 md:py-8 lg:px-10">

          <Outlet />

        </div>

      </main>

      {/* ==================================================
          LOGOUT CONFIRMATION MODAL
      ================================================== */}

      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 backdrop-blur-sm"
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

                <div>
                  <h2
                    id="logout-title"
                    className="text-lg font-bold text-slate-900"
                  >
                    Confirm Logout
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-500">
                    You are about to leave your member account.
                  </p>
                </div>

              </div>

            </div>

            {/* Modal Body */}
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

