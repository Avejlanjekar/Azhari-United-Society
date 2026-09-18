// import { useState, useEffect } from "react";
// import axiosClient from "../../api/axiosClient";
// import {
//   Loader2,
//   AlertCircle,
//   WalletCards,
//   Landmark,
//   IndianRupee,
//   ReceiptText,
//   Phone,
//   CalendarDays,
//   UserRound,
//   Users,
//   CheckCircle2,
//   CircleOff,
// } from "lucide-react";

// export default function Members() {
//   const [summary, setSummary] = useState(null);
//   const [members, setMembers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         const [summaryRes, membersRes] = await Promise.all([
//           axiosClient.get("/loan/members/summary"),
//           axiosClient.get("/loan/members"),
//         ]);

//         setSummary(summaryRes.data);
//         setMembers(membersRes.data);
//         setError(null);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const getMemberName = (member) => {
//     return `${member.name} ${member.middlename || ""} ${
//       member.lastname || ""
//     }`.replace(/\s+/g, " ").trim();
//   };

//   const getInitials = (member) => {
//     const name = getMemberName(member);

//     return name
//       .split(" ")
//       .filter(Boolean)
//       .slice(0, 2)
//       .map((part) => part.charAt(0).toUpperCase())
//       .join("");
//   };

//   const formatDate = (date) => {
//     if (!date) return "-";

//     return new Date(date).toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-slate-50">

//       {/* ==================================================
//           PAGE HEADER
//       ================================================== */}

//       <div className="mb-6">

//         <div className="flex items-start gap-3">

//           <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
//             <Users className="h-5 w-5" />
//           </div>

//           <div>
//             <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
//               Members Overview
//             </h1>

//             <p className="mt-1 text-sm text-slate-500">
//               Monitor member contributions, loans and account activity.
//             </p>
//           </div>

//         </div>

//       </div>


//       {/* ==================================================
//           LOADING
//       ================================================== */}

//       {loading && (
//         <div className="flex min-h-[240px] items-center justify-center">

//           <div className="flex flex-col items-center">

//             <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
//               <Loader2 className="h-6 w-6 animate-spin" />
//             </div>

//             <p className="mt-3 text-sm font-medium text-slate-600">
//               Loading member information...
//             </p>

//           </div>

//         </div>
//       )}


//       {/* ==================================================
//           ERROR
//       ================================================== */}

//       {error && !loading && (
//         <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">

//           <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

//           <div>
//             <p className="text-sm font-semibold">
//               Unable to load members
//             </p>

//             <p className="mt-0.5 text-xs text-red-600">
//               {error}
//             </p>
//           </div>

//         </div>
//       )}


//       {/* ==================================================
//           SUMMARY CARDS
//       ================================================== */}

//       {!loading && !error && summary && (
//         <section className="mb-8">

//           <div className="mb-3 flex items-center justify-between">

//             <div>
//               <h2 className="text-sm font-bold text-slate-800">
//                 Financial Summary
//               </h2>

//               <p className="text-xs text-slate-400">
//                 Current society account overview
//               </p>
//             </div>

//           </div>


//           <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">

//             {/* ==================================================
//                 TOTAL DEPOSITS
//             ================================================== */}

//             <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5">

//               <div className="flex items-start justify-between gap-2">

//                 <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 sm:h-10 sm:w-10">
//                   <WalletCards className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
//                 </div>

//                 <span className="hidden rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-600 sm:block">
//                   Deposits
//                 </span>

//               </div>

//               <p className="mt-4 text-[11px] font-medium text-slate-500 sm:text-xs">
//                 Total Deposits
//               </p>

//               <p className="mt-1 text-lg font-bold tracking-tight text-emerald-600 sm:text-2xl">
//                 ₹{summary.totalDeposits.toLocaleString("en-IN")}
//               </p>

//             </div>


//             {/* ==================================================
//                 ACTIVE LOANS
//             ================================================== */}

//             <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5">

//               <div className="flex items-start justify-between gap-2">

//                 <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 sm:h-10 sm:w-10">
//                   <Landmark className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
//                 </div>

//                 <span className="hidden rounded-full bg-blue-50 px-2 py-1 text-[9px] font-semibold text-blue-600 sm:block">
//                   Loans
//                 </span>

//               </div>

//               <p className="mt-4 text-[11px] font-medium text-slate-500 sm:text-xs">
//                 Active Loans
//               </p>

//               <p className="mt-1 text-lg font-bold tracking-tight text-blue-600 sm:text-2xl">
//                 {summary.activeLoans.toLocaleString("en-IN")}
//               </p>

//             </div>


//             {/* ==================================================
//                 ACTIVE LOAN AMOUNT
//             ================================================== */}

//             <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5">

//               <div className="flex items-start justify-between gap-2">

//                 <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 sm:h-10 sm:w-10">
//                   <IndianRupee className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
//                 </div>

//                 <span className="hidden rounded-full bg-indigo-50 px-2 py-1 text-[9px] font-semibold text-indigo-600 sm:block">
//                   Outstanding
//                 </span>

//               </div>

//               <p className="mt-4 text-[11px] font-medium text-slate-500 sm:text-xs">
//                 Active Loan Amount
//               </p>

//               <p className="mt-1 text-lg font-bold tracking-tight text-indigo-600 sm:text-2xl">
//                 ₹{summary.activeLoansAmount.toLocaleString("en-IN")}
//               </p>

//             </div>


//             {/* ==================================================
//                 TOTAL FINES
//             ================================================== */}

//             <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5">

//               <div className="flex items-start justify-between gap-2">

//                 <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 sm:h-10 sm:w-10">
//                   <ReceiptText className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
//                 </div>

//                 <span className="hidden rounded-full bg-red-50 px-2 py-1 text-[9px] font-semibold text-red-600 sm:block">
//                   Collected
//                 </span>

//               </div>

//               <p className="mt-4 text-[11px] font-medium text-slate-500 sm:text-xs">
//                 Total Fines Collected
//               </p>

//               <p className="mt-1 text-lg font-bold tracking-tight text-red-600 sm:text-2xl">
//                 ₹{summary.totalFine.toLocaleString("en-IN")}
//               </p>

//             </div>

//           </div>

//         </section>
//       )}


//       {/* ==================================================
//           MEMBERS SECTION
//       ================================================== */}

//       {!loading && !error && (
//         <section>

//           {/* SECTION HEADER */}

//           <div className="mb-4 flex items-end justify-between">

//             <div>

//               <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
//                 Society Members
//               </h2>

//               <p className="mt-1 text-xs text-slate-500 sm:text-sm">
//                 Member contribution and loan information
//               </p>

//             </div>

//             <div className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">
//               {members.length} Members
//             </div>

//           </div>


//           {/* ==================================================
//               DESKTOP TABLE
//           ================================================== */}

//           <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">

//             <div className="overflow-x-auto">

//               <table className="min-w-full">

//                 <thead>
//                   <tr className="border-b border-slate-200 bg-slate-50">

//                     <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
//                       #
//                     </th>

//                     <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
//                       Member
//                     </th>

//                     <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
//                       Phone
//                     </th>

//                     <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
//                       Total Deposited
//                     </th>

//                     <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
//                       Active Loan
//                     </th>

//                     <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
//                       Loan Amount
//                     </th>

//                     <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
//                       Due Date
//                     </th>

//                   </tr>
//                 </thead>


//                 <tbody className="divide-y divide-slate-100">

//                   {members.map((member, i) => (

//                     <tr
//                       key={member._id}
//                       className="transition-colors hover:bg-slate-50/70"
//                     >

//                       {/* NUMBER */}

//                       <td className="px-5 py-4">

//                         <span className="text-xs font-semibold text-slate-400">
//                           {String(i + 1).padStart(2, "0")}
//                         </span>

//                       </td>


//                       {/* MEMBER */}

//                       <td className="px-5 py-4">

//                         <div className="flex items-center gap-3">

//                           <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-blue-600">
//                             {getInitials(member)}
//                           </div>

//                           <div className="min-w-0">

//                             <p className="truncate text-sm font-semibold text-slate-800">
//                               {getMemberName(member)}
//                             </p>

//                             <p className="mt-0.5 text-[10px] text-slate-400">
//                               Society Member
//                             </p>

//                           </div>

//                         </div>

//                       </td>


//                       {/* PHONE */}

//                       <td className="px-5 py-4">

//                         <div className="flex items-center gap-2 text-sm text-slate-600">

//                           <Phone className="h-3.5 w-3.5 text-slate-400" />

//                           <span>{member.phone || "-"}</span>

//                         </div>

//                       </td>


//                       {/* DEPOSIT */}

//                       <td className="px-5 py-4">

//                         <span className="text-sm font-bold text-emerald-600">
//                           ₹{(member.deposits || 0).toLocaleString("en-IN")}
//                         </span>

//                       </td>


//                       {/* LOAN STATUS */}

//                       <td className="px-5 py-4">

//                         {member.activeLoan ? (
//                           <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
//                             <CheckCircle2 className="h-3.5 w-3.5" />
//                             Active
//                           </span>
//                         ) : (
//                           <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
//                             <CircleOff className="h-3.5 w-3.5" />
//                             No Loan
//                           </span>
//                         )}

//                       </td>


//                       {/* LOAN AMOUNT */}

//                       <td className="px-5 py-4">

//                         <span className="text-sm font-semibold text-blue-600">
//                           {member?.activeLoan?.amount
//                             ? `₹${member.activeLoan.amount.toLocaleString(
//                                 "en-IN"
//                               )}`
//                             : "-"}
//                         </span>

//                       </td>


//                       {/* DUE DATE */}

//                       <td className="px-5 py-4">

//                         <div
//                           className={`flex items-center gap-2 text-sm ${
//                             member?.activeLoan?.repaymentDue
//                               ? "text-red-600"
//                               : "text-slate-400"
//                           }`}
//                         >

//                           <CalendarDays className="h-3.5 w-3.5" />

//                           <span>
//                             {formatDate(
//                               member?.activeLoan?.repaymentDue
//                             )}
//                           </span>

//                         </div>

//                       </td>

//                     </tr>

//                   ))}

//                 </tbody>

//               </table>

//             </div>

//           </div>


//           {/* ==================================================
//               MOBILE MEMBER CARDS
//           ================================================== */}

//           <div className="space-y-3 md:hidden">

//             {members.map((member, i) => (

//               <div
//                 key={member._id}
//                 className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
//               >

//                 {/* CARD HEADER */}

//                 <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">

//                   <div className="flex min-w-0 items-center gap-3">

//                     {/* INITIALS */}

//                     <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-600">
//                       {getInitials(member)}
//                     </div>

//                     {/* NAME */}

//                     <div className="min-w-0">

//                       <h3 className="truncate text-sm font-bold text-slate-900">
//                         {getMemberName(member)}
//                       </h3>

//                       <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-400">
//                         Member #{String(i + 1).padStart(2, "0")}
//                       </p>

//                     </div>

//                   </div>


//                   {/* LOAN STATUS */}

//                   {member.activeLoan ? (
//                     <span className="flex shrink-0 items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-700">
//                       <CheckCircle2 className="h-3 w-3" />
//                       Active
//                     </span>
//                   ) : (
//                     <span className="flex shrink-0 items-center gap-1 rounded-full border border-slate-200 bg-slate-100 px-2 py-1 text-[9px] font-bold text-slate-500">
//                       <CircleOff className="h-3 w-3" />
//                       No Loan
//                     </span>
//                   )}

//                 </div>


//                 {/* PHONE */}

//                 <div className="px-4 pt-4">

//                   <div className="flex items-center gap-2 text-xs text-slate-500">

//                     <Phone className="h-3.5 w-3.5 text-slate-400" />

//                     <span>
//                       {member.phone || "-"}
//                     </span>

//                   </div>

//                 </div>


//                 {/* FINANCIAL DETAILS */}

//                 <div className="grid grid-cols-2 gap-3 p-4">

//                   {/* CONTRIBUTION */}

//                   <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3">

//                     <div className="flex items-center gap-1.5">

//                       <WalletCards className="h-3.5 w-3.5 text-emerald-600" />

//                       <p className="text-[9px] font-semibold uppercase tracking-wide text-emerald-700">
//                         Contributed
//                       </p>

//                     </div>

//                     <p className="mt-1 text-sm font-bold text-emerald-700">
//                       ₹{(member.deposits || 0).toLocaleString("en-IN")}
//                     </p>

//                   </div>


//                   {/* LOAN AMOUNT */}

//                   <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-3">

//                     <div className="flex items-center gap-1.5">

//                       <Landmark className="h-3.5 w-3.5 text-blue-600" />

//                       <p className="text-[9px] font-semibold uppercase tracking-wide text-blue-700">
//                         Loan Amount
//                       </p>

//                     </div>

//                     <p className="mt-1 text-sm font-bold text-blue-700">
//                       {member?.activeLoan?.amount
//                         ? `₹${member.activeLoan.amount.toLocaleString(
//                             "en-IN"
//                           )}`
//                         : "-"}
//                     </p>

//                   </div>


//                   {/* DUE DATE */}

//                   <div className="col-span-2 rounded-xl border border-red-100 bg-red-50/60 p-3">

//                     <div className="flex items-center justify-between">

//                       <div className="flex items-center gap-1.5">

//                         <CalendarDays className="h-3.5 w-3.5 text-red-600" />

//                         <p className="text-[9px] font-semibold uppercase tracking-wide text-red-700">
//                           Repayment Due
//                         </p>

//                       </div>

//                       <span className="text-xs font-semibold text-red-700">
//                         {formatDate(
//                           member?.activeLoan?.repaymentDue
//                         )}
//                       </span>

//                     </div>

//                   </div>

//                 </div>

//               </div>

//             ))}


//             {/* EMPTY STATE */}

//             {members.length === 0 && (
//               <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center">

//                 <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
//                   <UserRound className="h-6 w-6" />
//                 </div>

//                 <p className="mt-3 text-sm font-semibold text-slate-700">
//                   No members found
//                 </p>

//                 <p className="mt-1 text-xs text-slate-400">
//                   There are currently no society members to display.
//                 </p>

//               </div>
//             )}

//           </div>

//         </section>
//       )}

//     </div>
//   );
// }

import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import {
  Loader2,
  AlertCircle,
  WalletCards,
  Landmark,
  IndianRupee,
  ReceiptText,
  Phone,
  CalendarDays,
  UserRound,
  Users,
  CheckCircle2,
  CircleOff,
} from "lucide-react";

export default function Members() {
  const [summary, setSummary] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [summaryRes, membersRes] = await Promise.all([
          axiosClient.get("/loan/members/summary"),
          axiosClient.get("/loan/members"),
        ]);

        setSummary(summaryRes.data);
        setMembers(membersRes.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getMemberName = (member) => {
    return `${member.name} ${member.middlename || ""} ${
      member.lastname || ""
    }`
      .replace(/\s+/g, " ")
      .trim();
  };

  const getInitials = (member) => {
    const name = getMemberName(member);

    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ==================================================
          PAGE HEADER
      ================================================== */}

      <div className="mb-6">

        <div className="flex items-start gap-3">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Users className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Members Overview
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Monitor member contributions, loans and account activity.
            </p>
          </div>

        </div>

      </div>


      {/* ==================================================
          LOADING
      ================================================== */}

      {loading && (
        <div className="flex min-h-[240px] items-center justify-center">

          <div className="flex flex-col items-center">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>

            <p className="mt-3 text-sm font-medium text-slate-600">
              Loading member information...
            </p>

          </div>

        </div>
      )}


      {/* ==================================================
          ERROR
      ================================================== */}

      {error && !loading && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">

          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

          <div>
            <p className="text-sm font-semibold">
              Unable to load members
            </p>

            <p className="mt-0.5 text-xs text-red-600">
              {error}
            </p>
          </div>

        </div>
      )}


      {/* ==================================================
          SUMMARY CARDS
      ================================================== */}

      {!loading && !error && summary && (
        <section className="mb-8">

          <div className="mb-3 flex items-center justify-between">

            <div>
              <h2 className="text-sm font-bold text-slate-800">
                Financial Summary
              </h2>

              <p className="text-xs text-slate-400">
                Current society account overview
              </p>
            </div>

          </div>


          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">

            {/* TOTAL DEPOSITS */}

            <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5">

              <div className="flex items-start justify-between gap-2">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 sm:h-10 sm:w-10">
                  <WalletCards className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
                </div>

                <span className="hidden rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-600 sm:block">
                  Deposits
                </span>

              </div>

              <p className="mt-4 text-[11px] font-medium text-slate-500 sm:text-xs">
                Total Deposits
              </p>

              <p className="mt-1 text-lg font-bold tracking-tight text-emerald-600 sm:text-2xl">
                ₹{summary.totalDeposits.toLocaleString("en-IN")}
              </p>

            </div>


            {/* ACTIVE LOANS */}

            <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5">

              <div className="flex items-start justify-between gap-2">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 sm:h-10 sm:w-10">
                  <Landmark className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
                </div>

                <span className="hidden rounded-full bg-blue-50 px-2 py-1 text-[9px] font-semibold text-blue-600 sm:block">
                  Loans
                </span>

              </div>

              <p className="mt-4 text-[11px] font-medium text-slate-500 sm:text-xs">
                Active Loans
              </p>

              <p className="mt-1 text-lg font-bold tracking-tight text-blue-600 sm:text-2xl">
                {summary.activeLoans.toLocaleString("en-IN")}
              </p>

            </div>


            {/* ACTIVE LOAN AMOUNT */}

            <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5">

              <div className="flex items-start justify-between gap-2">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 sm:h-10 sm:w-10">
                  <IndianRupee className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
                </div>

                <span className="hidden rounded-full bg-indigo-50 px-2 py-1 text-[9px] font-semibold text-indigo-600 sm:block">
                  Outstanding
                </span>

              </div>

              <p className="mt-4 text-[11px] font-medium text-slate-500 sm:text-xs">
                Active Loan Amount
              </p>

              <p className="mt-1 text-lg font-bold tracking-tight text-indigo-600 sm:text-2xl">
                ₹{summary.activeLoansAmount.toLocaleString("en-IN")}
              </p>

            </div>


            {/* TOTAL FINES */}

            <div className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5">

              <div className="flex items-start justify-between gap-2">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 sm:h-10 sm:w-10">
                  <ReceiptText className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
                </div>

                <span className="hidden rounded-full bg-red-50 px-2 py-1 text-[9px] font-semibold text-red-600 sm:block">
                  Collected
                </span>

              </div>

              <p className="mt-4 text-[11px] font-medium text-slate-500 sm:text-xs">
                Total Fines Collected
              </p>

              <p className="mt-1 text-lg font-bold tracking-tight text-red-600 sm:text-2xl">
                ₹{summary.totalFine.toLocaleString("en-IN")}
              </p>

            </div>

          </div>

        </section>
      )}


      {/* ==================================================
          MEMBERS SECTION
      ================================================== */}

      {!loading && !error && (
        <section>

          {/* SECTION HEADER */}

          <div className="mb-4 flex items-end justify-between">

            <div>

              <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                Society Members
              </h2>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Member contribution and loan information
              </p>

            </div>

            <div className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm">
              {members.length} Members
            </div>

          </div>


          {/* ==================================================
              DESKTOP TABLE
          ================================================== */}

          <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">

            <div className="overflow-x-auto">

              <table className="min-w-full">

                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">

                    <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      #
                    </th>

                    <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Member
                    </th>

                    <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Phone
                    </th>

                    <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Total Deposited
                    </th>

                    <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Active Loan
                    </th>

                    <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Loan Amount
                    </th>

                    <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Due Date
                    </th>

                  </tr>
                </thead>


                <tbody className="divide-y divide-slate-100">

                  {members.map((member, i) => (

                    <tr
                      key={member._id}
                      className="transition-colors hover:bg-slate-50/70"
                    >

                      {/* NUMBER */}

                      <td className="px-5 py-4">

                        <span className="text-xs font-semibold text-slate-400">
                          {String(i + 1).padStart(2, "0")}
                        </span>

                      </td>


                      {/* MEMBER */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-blue-600">
                            {getInitials(member)}
                          </div>

                          <div className="min-w-0">

                            <p className="truncate text-sm font-semibold text-slate-800">
                              {getMemberName(member)}
                            </p>

                            <p className="mt-0.5 text-[10px] text-slate-400">
                              Society Member
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* PHONE */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-2 text-sm text-slate-600">

                          <Phone className="h-3.5 w-3.5 text-slate-400" />

                          <span>
                            {member.phone || "-"}
                          </span>

                        </div>

                      </td>


                      {/* DEPOSIT */}

                      <td className="px-5 py-4">

                        <span className="text-sm font-bold text-emerald-600">
                          ₹{(member.deposits || 0).toLocaleString("en-IN")}
                        </span>

                      </td>


                      {/* LOAN STATUS */}

                      <td className="px-5 py-4">

                        {member.activeLoan ? (

                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">

                            <CheckCircle2 className="h-3.5 w-3.5" />

                            Active

                          </span>

                        ) : (

                          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">

                            <CircleOff className="h-3.5 w-3.5" />

                            No Loan

                          </span>

                        )}

                      </td>


                      {/* ==================================================
                          LOAN AMOUNT
                          SHOW ONLY IF IT EXISTS
                      ================================================== */}

                      <td className="px-5 py-4">

                        {member?.activeLoan?.amount != null && (
                          <span className="text-sm font-semibold text-blue-600">
                            ₹{member.activeLoan.amount.toLocaleString("en-IN")}
                          </span>
                        )}

                      </td>


                      {/* ==================================================
                          DUE DATE
                          SHOW ONLY IF IT EXISTS
                      ================================================== */}

                      <td className="px-5 py-4">

                        {member?.activeLoan?.repaymentDue && (
                          <div className="flex items-center gap-2 text-sm text-red-600">

                            <CalendarDays className="h-3.5 w-3.5" />

                            <span>
                              {formatDate(member.activeLoan.repaymentDue)}
                            </span>

                          </div>
                        )}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>


          {/* ==================================================
              MOBILE MEMBER CARDS
          ================================================== */}

          <div className="space-y-3 md:hidden">

            {members.map((member, i) => {

              const hasLoanAmount =
                member?.activeLoan?.amount != null;

              const hasRepaymentDue =
                !!member?.activeLoan?.repaymentDue;

              return (
                <div
                  key={member._id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >

                  {/* CARD HEADER */}

                  <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">

                    <div className="flex min-w-0 items-center gap-3">

                      {/* INITIALS */}

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-600">
                        {getInitials(member)}
                      </div>

                      {/* NAME */}

                      <div className="min-w-0">

                        <h3 className="truncate text-sm font-bold text-slate-900">
                          {getMemberName(member)}
                        </h3>

                        <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-400">
                          Member #{String(i + 1).padStart(2, "0")}
                        </p>

                      </div>

                    </div>


                    {/* LOAN STATUS */}

                    {member.activeLoan ? (

                      <span className="flex shrink-0 items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-700">

                        <CheckCircle2 className="h-3 w-3" />

                        Active

                      </span>

                    ) : (

                      <span className="flex shrink-0 items-center gap-1 rounded-full border border-slate-200 bg-slate-100 px-2 py-1 text-[9px] font-bold text-slate-500">

                        <CircleOff className="h-3 w-3" />

                        No Loan

                      </span>

                    )}

                  </div>


                  {/* PHONE */}

                  <div className="px-4 pt-4">

                    <div className="flex items-center gap-2 text-xs text-slate-500">

                      <Phone className="h-3.5 w-3.5 text-slate-400" />

                      <span>
                        {member.phone || "-"}
                      </span>

                    </div>

                  </div>


                  {/* ==================================================
                      FINANCIAL DETAILS
                  ================================================== */}

                  <div className="grid grid-cols-2 gap-3 p-4">

                    {/* CONTRIBUTION */}

                    <div
                      className={`rounded-xl border border-emerald-100 bg-emerald-50/60 p-3 ${
                        !hasLoanAmount && !hasRepaymentDue
                          ? "col-span-2"
                          : ""
                      }`}
                    >

                      <div className="flex items-center gap-1.5">

                        <WalletCards className="h-3.5 w-3.5 text-emerald-600" />

                        <p className="text-[9px] font-semibold uppercase tracking-wide text-emerald-700">
                          Contributed
                        </p>

                      </div>

                      <p className="mt-1 text-sm font-bold text-emerald-700">
                        ₹{(member.deposits || 0).toLocaleString("en-IN")}
                      </p>

                    </div>


                    {/* LOAN AMOUNT */}

                    {hasLoanAmount && (

                      <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-3">

                        <div className="flex items-center gap-1.5">

                          <Landmark className="h-3.5 w-3.5 text-blue-600" />

                          <p className="text-[9px] font-semibold uppercase tracking-wide text-blue-700">
                            Loan Amount
                          </p>

                        </div>

                        <p className="mt-1 text-sm font-bold text-blue-700">
                          ₹{member.activeLoan.amount.toLocaleString("en-IN")}
                        </p>

                      </div>

                    )}


                    {/* REPAYMENT DUE */}

                    {hasRepaymentDue && (

                      <div className="col-span-2 rounded-xl border border-red-100 bg-red-50/60 p-3">

                        <div className="flex items-center justify-between gap-3">

                          <div className="flex items-center gap-1.5">

                            <CalendarDays className="h-3.5 w-3.5 text-red-600" />

                            <p className="text-[9px] font-semibold uppercase tracking-wide text-red-700">
                              Repayment Due
                            </p>

                          </div>

                          <span className="text-xs font-semibold text-red-700">
                            {formatDate(member.activeLoan.repaymentDue)}
                          </span>

                        </div>

                      </div>

                    )}

                  </div>

                </div>
              );
            })}


            {/* EMPTY STATE */}

            {members.length === 0 && (

              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                  <UserRound className="h-6 w-6" />
                </div>

                <p className="mt-3 text-sm font-semibold text-slate-700">
                  No members found
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  There are currently no society members to display.
                </p>

              </div>

            )}

          </div>

        </section>
      )}

    </div>
  );
}