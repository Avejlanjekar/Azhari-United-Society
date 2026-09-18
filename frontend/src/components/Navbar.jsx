import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Home,
  Menu,
  X,
  ShieldCheck,
  LogIn,
  ChevronRight,
} from "lucide-react";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* ==================================================
          DESKTOP TOP NAVBAR
      ================================================== */}

      <nav className="fixed left-0 top-0 z-50 hidden w-full border-b border-slate-200 bg-white shadow-sm md:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[68px] items-center justify-between">

            {/* LOGO / BRAND */}

            <Link
              to="/"
              onClick={closeMenu}
              className="flex min-w-0 items-center gap-3"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <img
                  src={logo}
                  alt="Azhari United"
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="min-w-0">
                <p className="truncate text-base font-bold tracking-tight text-slate-900 sm:text-lg">
                  Azhari United
                </p>

                <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400 sm:text-[11px]">
                  Society Financial Portal
                </p>
              </div>
            </Link>

            {/* DESKTOP NAVIGATION */}

            <div className="flex items-center gap-7">

              {/* ABOUT */}

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `relative py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-blue-600"
                      : "text-slate-600 hover:text-blue-600"
                  }`
                }
              >
                About
              </NavLink>

              {/* SECURITY */}

              <div className="flex items-center gap-2 border-l border-slate-200 pl-6 text-xs font-medium text-slate-500">
                <ShieldCheck
                  size={17}
                  className="text-emerald-600"
                />

                <span>Secure Platform</span>
              </div>

              {/* LOGIN */}

              <Link
                to="/login"
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500/20"
              >
                <LogIn size={17} />
                Login
              </Link>

            </div>
          </div>
        </div>
      </nav>


      {/* ==================================================
          MOBILE TOP BRAND HEADER
      ================================================== */}

      <header className="fixed left-0 top-0 z-40 w-full border-b border-slate-200 bg-white shadow-sm md:hidden">
        <div className="flex h-[64px] items-center px-4">

          <Link
            to="/"
            onClick={closeMenu}
            className="flex min-w-0 items-center gap-3"
          >
            {/* LOGO */}

            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <img
                src={logo}
                alt="Azhari United"
                className="h-full w-full object-contain"
              />
            </div>

            {/* BRAND */}

            <div className="min-w-0">
              <p className="truncate text-base font-bold tracking-tight text-slate-900">
                Azhari United
              </p>

              <p className="text-[9px] font-medium uppercase tracking-wider text-slate-400">
                Society Financial Portal
              </p>
            </div>
          </Link>

        </div>
      </header>


      {/* ==================================================
          MOBILE MENU PANEL
      ================================================== */}

      {isOpen && (
        <>
          {/* BACKDROP */}

          <button
            type="button"
            aria-label="Close menu"
            onClick={closeMenu}
            className="fixed inset-0 z-40 bg-slate-900/30 md:hidden"
          />

          {/* MENU PANEL */}

          <div className="fixed bottom-[68px] left-0 z-50 w-full border-t border-slate-200 bg-white shadow-2xl md:hidden">

            <div className="px-4 py-4">

              {/* PANEL HEADER */}

              <div className="mb-4 flex items-center justify-between">

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Navigation
                  </p>

                  <p className="text-xs text-slate-500">
                    Society Financial Portal
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50"
                >
                  <X size={19} />
                </button>

              </div>


              {/* SECURITY CARD */}

              <div className="mb-3 flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">
                  <ShieldCheck size={18} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-emerald-800">
                    Secure Financial Portal
                  </p>

                  <p className="mt-0.5 text-[11px] text-emerald-600">
                    Protected society account access
                  </p>
                </div>

              </div>


              {/* ABOUT */}

              <NavLink
                to="/about"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>About Azhari United</span>

                    <ChevronRight
                      size={18}
                      className={
                        isActive
                          ? "text-blue-600"
                          : "text-slate-300"
                      }
                    />
                  </>
                )}
              </NavLink>


              {/* LOGIN */}

              <Link
                to="/login"
                onClick={closeMenu}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                <LogIn size={18} />
                Login to Account
              </Link>

            </div>
          </div>
        </>
      )}


      {/* ==================================================
          MOBILE BOTTOM NAVIGATION
      ================================================== */}

      <nav className="fixed bottom-0 left-0 z-50 w-full border-t border-slate-200 bg-white/95 shadow-[0_-4px_20px_rgba(15,23,42,0.08)] backdrop-blur md:hidden">

        <div className="grid h-[68px] grid-cols-4">

          {/* HOME */}

          <NavLink
            to="/"
            onClick={closeMenu}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 text-[10px] font-semibold transition ${
                isActive
                  ? "text-blue-600"
                  : "text-slate-500 hover:text-blue-600"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Home
                  size={21}
                  strokeWidth={isActive ? 2.5 : 2}
                />

                <span>Home</span>
              </>
            )}
          </NavLink>


          {/* ABOUT */}

          <NavLink
            to="/about"
            onClick={closeMenu}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 text-[10px] font-semibold transition ${
                isActive
                  ? "text-blue-600"
                  : "text-slate-500 hover:text-blue-600"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <ShieldCheck
                  size={21}
                  strokeWidth={isActive ? 2.5 : 2}
                />

                <span>About</span>
              </>
            )}
          </NavLink>


          {/* LOGIN */}

          <NavLink
            to="/login"
            onClick={closeMenu}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 text-[10px] font-semibold transition ${
                isActive
                  ? "text-blue-600"
                  : "text-slate-500 hover:text-blue-600"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <LogIn
                  size={21}
                  strokeWidth={isActive ? 2.5 : 2}
                />

                <span>Login</span>
              </>
            )}
          </NavLink>


          {/* MENU */}

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={
              isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isOpen}
            className={`flex flex-col items-center justify-center gap-1 text-[10px] font-semibold transition ${
              isOpen
                ? "text-blue-600"
                : "text-slate-500 hover:text-blue-600"
            }`}
          >
            {isOpen ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}

            <span>Menu</span>
          </button>

        </div>
      </nav>


      {/* ==================================================
          PAGE SPACING
      ================================================== */}

      {/* Only reserve space for the fixed TOP header.
          Bottom navigation is fixed and does not affect
          the document flow. */}

      <div className="h-[64px] md:h-[68px]" />
    </>
  );
}