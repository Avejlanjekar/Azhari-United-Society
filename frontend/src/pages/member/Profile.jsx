
// import { useEffect, useState } from "react";
// import axiosClient from "../../api/axiosClient";
// import { Loader2, User, Wallet, CreditCard, Clock } from "lucide-react";

// export default function Profile() {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axiosClient.get("/auth/profile");
//         setProfile(res.data.profile);
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="flex justify-center items-center h-64 text-red-500 font-semibold text-lg">
//         Failed to load profile.
//       </div>
//     );
//   }

//   const { basicInfo, stats, recentDeposits, recentLoans } = profile;

//   return (
//     <div className="p-4 sm:p-8 bg-gradient-to-br from-indigo-50 via-white to-indigo-100 min-h-screen font-inter">
//       {/* Welcome Message */}
//       <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-800 mb-8 text-center sm:text-left tracking-tight">
//          Welcome, <span className="text-indigo-600">{basicInfo.name}</span>
//       </h1>

//       {/* Profile Card */}
//       <div className="bg-white shadow-xl rounded-2xl p-6 mb-8 border border-gray-100 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
//         <div className="flex items-center gap-3 mb-4">
//           <User className="text-indigo-600 h-7 w-7" />
//           <h2 className="text-xl font-bold text-gray-900">Profile</h2>
//         </div>
//         <div className="space-y-2 text-gray-700">
//           <p>
//             <span className="font-semibold text-indigo-600">Name:</span>{" "}
//             {basicInfo.name}
//           </p>
//           <p>
//             <span className="font-semibold text-indigo-600">Email:</span>{" "}
//             {basicInfo.email}
//           </p>
//           <p>
//             <span className="font-semibold text-indigo-600">Phone:</span>{" "}
//             {basicInfo.phone}
//           </p>
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
//         {/* Total Deposit */}
//         <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 shadow-md rounded-2xl p-6 border border-emerald-200 hover:shadow-lg transition">
//           <div className="flex items-center gap-3 mb-2">
//             <Wallet className="text-emerald-600 h-6 w-6" />
//             <h2 className="text-lg font-semibold text-emerald-900">Total Deposit</h2>
//           </div>
//           <p className="text-emerald-700 text-2xl sm:text-3xl font-extrabold">
//             ₹{stats.totalDeposited}
//           </p>
//         </div>

//         {/* Recent Activity */}
//         <div className="bg-gradient-to-r from-purple-50 to-purple-100 shadow-md rounded-2xl p-6 border border-purple-200 hover:shadow-lg transition">
//           <div className="flex items-center gap-3 mb-2">
//             <Clock className="text-purple-600 h-6 w-6" />
//             <h2 className="text-lg font-semibold text-purple-900">Recent Activity</h2>
//           </div>
//           <p className="text-gray-700">
//             <span className="font-medium text-purple-600">Last Deposit:</span>{" "}
//             {stats.lastDeposit
//               ? new Date(stats.lastDeposit.date).toLocaleDateString()
//               : "No deposits yet"}
//           </p>
//           <p className="text-gray-700">
//             <span className="font-medium text-purple-600">Last Loan:</span>{" "}
//             {stats.lastLoan
//               ? new Date(stats.lastLoan.statusDate).toLocaleDateString()
//               : "No loans yet"}
//           </p>
//         </div>
//       </div>

//       {/* Recent Deposits */}
//       <div className="bg-white shadow-xl rounded-2xl p-6 mb-8 border-l-4 border-emerald-500 hover:shadow-2xl transition-all duration-300">
//         <div className="flex items-center gap-3 mb-4">
//           <Wallet className="text-emerald-600 h-6 w-6" />
//           <h2 className="text-lg sm:text-xl font-bold text-gray-900">
//             Recent Deposits
//           </h2>
//         </div>
//         {recentDeposits.length > 0 ? (
//           <ul className="divide-y divide-gray-200">
//             {recentDeposits.map((deposit, idx) => (
//               <li
//                 key={idx}
//                 className="flex justify-between items-center py-3 px-2 hover:bg-emerald-50 rounded-md transition"
//               >
//                 <span className="text-gray-900 font-medium">
//                   ₹{deposit.amount}
//                 </span>
//                 <span className="text-sm text-gray-500">
//                   {new Date(deposit.date).toLocaleDateString()}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-600 italic">No deposits yet.</p>
//         )}
//       </div>

//       {/* Recent Loans */}
//       <div className="bg-white shadow-xl rounded-2xl p-6 border-l-4 border-rose-500 hover:shadow-2xl transition-all duration-300">
//         <div className="flex items-center gap-3 mb-4">
//           <CreditCard className="text-rose-600 h-6 w-6" />
//           <h2 className="text-lg sm:text-xl font-bold text-gray-900">
//             Recent Loans
//           </h2>
//         </div>
//         {recentLoans.length > 0 ? (
//           <ul className="divide-y divide-gray-200">
//             {recentLoans.map((loan, idx) => (
//               <li
//                 key={idx}
//                 className="flex justify-between items-center py-3 px-2 hover:bg-rose-50 rounded-md transition"
//               >
//                 <span
//                   className={`font-semibold ${
//                     loan.status === "approved"
//                       ? "text-emerald-700"
//                       : loan.status === "pending"
//                       ? "text-yellow-600"
//                       : loan.status === "repaid"
//                       ? "text-blue-700"
//                       : "text-rose-700"
//                   }`}
//                 >
//                   ₹{loan.amount} — {loan.status}
//                 </span>
//                 <span className="text-sm text-gray-500">
//                   {loan.statusDate
//                     ? new Date(loan.statusDate).toLocaleDateString()
//                     : "N/A"}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-600 italic">No loans yet.</p>
//         )}
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import {
  Loader2,
  User,
  Wallet,
  CreditCard,
  Clock,
  Mail,
  Phone,
  CalendarDays,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosClient.get("/auth/profile");
        setProfile(res.data.profile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // --------------------------------------------------
  // Loading State
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          </div>

          <p className="text-sm font-medium text-slate-500">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // Error State
  // --------------------------------------------------

  if (!profile) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-6 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>

          <h2 className="mt-4 text-lg font-semibold text-slate-900">
            Failed to load profile
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            We could not retrieve your profile information.
          </p>
        </div>
      </div>
    );
  }

  const { basicInfo, stats, recentDeposits, recentLoans } = profile;

  return (
    <div className="mx-auto w-full max-w-7xl">

      {/* ==================================================
          PAGE HEADER
      ================================================== */}

      <div className="mb-8">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Welcome,{" "}
              <span className="text-blue-600">
                {basicInfo.name}
              </span>
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              View your profile, deposit activity, and loan information.
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />

            <span className="text-xs font-medium text-slate-600">
              Member account
            </span>
          </div>

        </div>

      </div>

      {/* ==================================================
          PROFILE + TOTAL DEPOSIT
      ================================================== */}

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Profile Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2">

          {/* Profile Header */}
          <div className="border-b border-slate-100 px-5 py-5 sm:px-6">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <User className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Profile
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  Your registered account information
                </p>
              </div>

            </div>

          </div>

          {/* Profile Information */}
          <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-3 sm:p-6">

            {/* Name */}
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">

              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                <User className="h-4 w-4" />
              </div>

              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Name
              </p>

              <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                {basicInfo.name}
              </p>

            </div>

            {/* Email */}
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">

              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                <Mail className="h-4 w-4" />
              </div>

              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Email
              </p>

              <p className="mt-1 break-all text-sm font-semibold text-slate-800">
                {basicInfo.email}
              </p>

            </div>

            {/* Phone */}
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">

              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                <Phone className="h-4 w-4" />
              </div>

              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Phone
              </p>

              <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                {basicInfo.phone}
              </p>

            </div>

          </div>

        </div>

        {/* Total Deposit */}
        <div className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">

          <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-emerald-50/80 blur-2xl" />

          <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Total Deposit
                </p>

                <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  ₹{stats.totalDeposited}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Wallet className="h-5 w-5" />
              </div>

            </div>

            <div className="mt-8 flex items-center gap-2 border-t border-slate-100 pt-4">

              <CheckCircle2 className="h-4 w-4 text-emerald-500" />

              <span className="text-xs font-medium text-slate-500">
                Total amount deposited
              </span>

            </div>

          </div>

        </div>

      </div>



      {/* ==================================================
          RECENT LOANS
      ================================================== */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Header */}
        <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <CreditCard className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Recent Loans
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Your latest loan activity
              </p>
            </div>

          </div>

          {recentLoans.length > 0 && (
            <span className="w-fit rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700">
              {recentLoans.length}{" "}
              {recentLoans.length === 1 ? "record" : "records"}
            </span>
          )}

        </div>

        {/* Loans */}
        {recentLoans.length > 0 ? (

          <div className="divide-y divide-slate-100">

            {recentLoans.map((loan, idx) => {

              const statusConfig =
                loan.status === "approved"
                  ? {
                      classes:
                        "bg-emerald-50 text-emerald-700 border-emerald-200",
                    }
                  : loan.status === "pending"
                  ? {
                      classes:
                        "bg-amber-50 text-amber-700 border-amber-200",
                    }
                  : loan.status === "repaid"
                  ? {
                      classes:
                        "bg-blue-50 text-blue-700 border-blue-200",
                    }
                  : {
                      classes:
                        "bg-rose-50 text-rose-700 border-rose-200",
                    };

              return (
                <div
                  key={idx}
                  className="flex flex-col gap-4 px-5 py-4 transition-colors hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                >

                  {/* Loan Amount + Status */}
                  <div className="flex min-w-0 items-center gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                      <CreditCard className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-2">

                        <p className="text-sm font-semibold text-slate-800">
                          ₹{loan.amount}
                        </p>

                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold capitalize ${statusConfig.classes}`}
                        >
                          {loan.status}
                        </span>

                      </div>

                      <p className="mt-1 text-xs text-slate-400">
                        Loan amount
                      </p>

                    </div>

                  </div>

                  {/* Status Date */}
                  <div className="flex items-center gap-2 pl-12 sm:pl-0">

                    <CalendarDays className="h-4 w-4 text-slate-400" />

                    <span className="text-xs font-medium text-slate-500 sm:text-sm">
                      {loan.statusDate
                        ? new Date(
                            loan.statusDate
                          ).toLocaleDateString()
                        : "N/A"}
                    </span>

                  </div>

                </div>
              );
            })}

          </div>

        ) : (

          <div className="flex min-h-40 flex-col items-center justify-center px-5 py-8 text-center">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
              <CreditCard className="h-5 w-5 text-slate-400" />
            </div>

            <p className="mt-3 text-sm font-medium text-slate-600">
              No loans yet
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Your loan activity will appear here.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

