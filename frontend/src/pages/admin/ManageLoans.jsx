
// import { useEffect, useState } from "react";
// import axiosClient from "../../api/axiosClient";

// export default function Loans() {
//   const [loans, setLoans] = useState([]);
//   const [confirmModal, setConfirmModal] = useState({
//     open: false,
//     loanId: null,
//     action: null, // "approved" or "rejected"
//   });

//   useEffect(() => {
//     fetchLoans();
//   }, []);

//   const fetchLoans = async () => {
//     try {
//       const res = await axiosClient.get("/loan/allpendingloans");
//       setLoans(res.data);
//     } catch (err) {
//       console.error("Error fetching loans:", err);
//     }
//   };

//   const confirmAction = async () => {
//     try {
//       await axiosClient.put(`/loan/${confirmModal.loanId}/status`, {
//         status: confirmModal.action,
//       });
//       fetchLoans();
//     } catch (err) {
//       console.error("Error updating loan status:", err);
//     } finally {
//       setConfirmModal({ open: false, loanId: null, action: null });
//     }
//   };

//   const cancelAction = () => {
//     setConfirmModal({ open: false, loanId: null, action: null });
//   };

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "approved":
//         return "bg-green-100 text-green-700 border border-green-300";
//       case "rejected":
//         return "bg-red-100 text-red-700 border border-red-300";
//       case "pending":
//       default:
//         return "bg-yellow-100 text-yellow-700 border border-yellow-300";
//     }
//   };

//   return (
//     <div className="p-4 sm:p-6">
//       <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
//         All Loans
//       </h2>

//       {/* ✅ Table for larger screens */}
//       <div className="hidden sm:block overflow-x-auto shadow-lg rounded-xl">
//         <table className="w-full border-collapse">
//           <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
//             <tr>
//               <th className="p-3 text-left">Member</th>
//               <th className="p-3 text-left">Phone</th>
//               <th className="p-3 text-left">Loan Amount</th>
//               <th className="p-3 text-left">Guarantor</th>
//               <th className="p-3 text-left">Issue Date</th>
//               <th className="p-3 text-left">Repayment Due</th>
//               <th className="p-3 text-left">Status</th>
//               <th className="p-3 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loans.length > 0 ? (
//               loans.map((loan, idx) => (
//                 <tr
//                   key={loan._id}
//                   className={`hover:bg-gray-50 ${
//                     idx % 2 === 0 ? "bg-white" : "bg-gray-50"
//                   }`}
//                 >
//                   <td className="p-3 font-medium text-gray-800">
//                     {loan.member?.name} {loan.member?.middlename}{" "}
//                     {loan.member?.lastname}
//                   </td>
//                   <td className="p-3 text-gray-600">{loan.member?.phone}</td>
//                   <td className="p-3 text-gray-900 font-semibold">
//                     ₹{loan.amount}
//                   </td>
//                   <td className="p-3 text-gray-600">
//                     {loan.guarantor?.name} {loan.guarantor?.middlename}{" "}
//                     {loan.guarantor?.lastname}
//                   </td>
//                   <td className="p-3 text-gray-600">
//                     {loan.issueDate
//                       ? new Date(loan.issueDate).toLocaleDateString("en-GB")
//                       : "-"}
//                   </td>
//                   <td className="p-3 text-gray-600">
//                     {loan.repaymentDue
//                       ? new Date(loan.repaymentDue).toLocaleDateString("en-GB")
//                       : "-"}
//                   </td>
//                   <td className="p-3">
//                     <span
//                       className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
//                         loan.status
//                       )}`}
//                     >
//                       {loan.status}
//                     </span>
//                   </td>
//                   <td className="p-3 text-center">
//                     {loan.status === "pending" && (
//                       <div className="flex justify-center gap-3">
//                         <button
//                           onClick={() =>
//                             setConfirmModal({
//                               open: true,
//                               loanId: loan._id,
//                               action: "approved",
//                             })
//                           }
//                           className="bg-green-500 text-white px-4 py-1.5 rounded-lg shadow hover:bg-green-600 transition"
//                         >
//                           Approve
//                         </button>
//                         <button
//                           onClick={() =>
//                             setConfirmModal({
//                               open: true,
//                               loanId: loan._id,
//                               action: "rejected",
//                             })
//                           }
//                           className="bg-red-500 text-white px-4 py-1.5 rounded-lg shadow hover:bg-red-600 transition"
//                         >
//                           Reject
//                         </button>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="8"
//                   className="border px-4 py-6 text-center text-gray-500 italic"
//                 >
//                   No loan requests found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* ✅ Card layout for mobile */}
//       <div className="sm:hidden space-y-4">
//         {loans.map((loan) => (
//           <div
//             key={loan._id}
//             className="bg-white shadow-md rounded-xl p-4 border"
//           >
//             <div className="flex justify-between items-center">
//               <h3 className="text-lg font-bold text-gray-800">
//                 {loan.member?.name} {loan.member?.lastname}
//               </h3>
//               <span
//                 className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
//                   loan.status
//                 )}`}
//               >
//                 {loan.status}
//               </span>
//             </div>
//             <p className="text-gray-600">📞 {loan.member?.phone}</p>
//             <p className="text-gray-900 font-semibold">₹{loan.amount}</p>
//             <p className="text-sm text-gray-600">
//               Guarantor: {loan.guarantor?.name} {loan.guarantor?.lastname}
//             </p>
//             <p className="text-sm text-gray-600">
//               Issue:{" "}
//               {loan.issueDate
//                 ? new Date(loan.issueDate).toLocaleDateString("en-GB")
//                 : "-"}
//             </p>
//             <p className="text-sm text-gray-600">
//               Due:{" "}
//               {loan.repaymentDue
//                 ? new Date(loan.repaymentDue).toLocaleDateString("en-GB")
//                 : "-"}
//             </p>

//             {loan.status === "pending" && (
//               <div className="flex gap-3 mt-3">
//                 <button
//                   onClick={() =>
//                     setConfirmModal({
//                       open: true,
//                       loanId: loan._id,
//                       action: "approved",
//                     })
//                   }
//                   className="flex-1 bg-green-500 text-white px-3 py-1.5 rounded-lg shadow hover:bg-green-600 transition"
//                 >
//                   Approve
//                 </button>
//                 <button
//                   onClick={() =>
//                     setConfirmModal({
//                       open: true,
//                       loanId: loan._id,
//                       action: "rejected",
//                     })
//                   }
//                   className="flex-1 bg-red-500 text-white px-3 py-1.5 rounded-lg shadow hover:bg-red-600 transition"
//                 >
//                   Reject
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* ✅ Confirmation Modal */}
//       {confirmModal.open && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
//             <h3 className="text-lg font-semibold mb-4 text-gray-800">
//               {confirmModal.action === "approved"
//                 ? "Approve Loan Request"
//                 : "Reject Loan Request"}
//             </h3>
//             <p className="text-gray-600 mb-6">
//               Are you sure you want to{" "}
//               <span className="font-bold">
//                 {confirmModal.action === "approved" ? "APPROVE" : "REJECT"}
//               </span>{" "}
//               this loan?
//             </p>
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={cancelAction}
//                 className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmAction}
//                 className={`px-4 py-2 rounded-lg text-white shadow ${
//                   confirmModal.action === "approved"
//                     ? "bg-green-500 hover:bg-green-600"
//                     : "bg-red-500 hover:bg-red-600"
//                 }`}
//               >
//                 {confirmModal.action === "approved" ? "Approve" : "Reject"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import {
  Loader2,
  WalletCards,
  User,
  Phone,
  IndianRupee,
  Users,
  CalendarDays,
  Clock3,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";

export default function Loans() {
  const [loans, setLoans] = useState([]);
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    loanId: null,
    action: null,
  });

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const res = await axiosClient.get("/loan/allpendingloans");
      setLoans(res.data);
    } catch (err) {
      console.error("Error fetching loans:", err);
    }
  };

  const confirmAction = async () => {
    try {
      await axiosClient.put(`/loan/${confirmModal.loanId}/status`, {
        status: confirmModal.action,
      });

      fetchLoans();
    } catch (err) {
      console.error("Error updating loan status:", err);
    } finally {
      setConfirmModal({
        open: false,
        loanId: null,
        action: null,
      });
    }
  };

  const cancelAction = () => {
    setConfirmModal({
      open: false,
      loanId: null,
      action: null,
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";

      case "rejected":
        return "bg-red-50 text-red-700 border border-red-200";

      case "pending":
      default:
        return "bg-amber-50 text-amber-700 border border-amber-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="h-3.5 w-3.5" />;

      case "rejected":
        return <XCircle className="h-3.5 w-3.5" />;

      case "pending":
      default:
        return <Clock3 className="h-3.5 w-3.5" />;
    }
  };

  const getMemberName = (member) => {
    return [
      member?.name,
      member?.middlename,
      member?.lastname,
    ]
      .filter(Boolean)
      .join(" ");
  };

  const getGuarantorName = (guarantor) => {
    if (!guarantor) return "N/A";

    return [
      guarantor.name,
      guarantor.middlename,
      guarantor.lastname,
    ]
      .filter(Boolean)
      .join(" ");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-6 sm:py-6 lg:px-8">

        {/* Header */}
        <div className="mb-5 sm:mb-7">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <WalletCards className="h-5 w-5" />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                All Loans
              </h1>

              <p className="mt-1 text-sm text-slate-500 sm:text-base">
                Review and manage member loan requests.
              </p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-5 rounded-xl border border-amber-100 bg-amber-50 p-4 sm:mb-6 sm:rounded-2xl sm:p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-amber-600 shadow-sm">
              <Clock3 className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-amber-600">
                Loan Requests
              </p>

              <p className="text-xl font-bold text-slate-900">
                {loans.length}
              </p>
            </div>
          </div>
        </div>

        {/* =========================================
            DESKTOP TABLE
        ========================================= */}
        <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
          <div className="overflow-x-auto">
            <table className="min-w-[1100px] w-full text-sm">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="px-5 py-4 text-left font-semibold">
                    Member
                  </th>

                  <th className="px-5 py-4 text-left font-semibold">
                    Phone
                  </th>

                  <th className="px-5 py-4 text-left font-semibold">
                    Loan Amount
                  </th>

                  <th className="px-5 py-4 text-left font-semibold">
                    Guarantor
                  </th>

                  <th className="px-5 py-4 text-left font-semibold">
                    Issue Date
                  </th>

                  <th className="px-5 py-4 text-left font-semibold">
                    Repayment Due
                  </th>

                  <th className="px-5 py-4 text-left font-semibold">
                    Status
                  </th>

                  <th className="px-5 py-4 text-center font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loans.length > 0 ? (
                  loans.map((loan) => (
                    <tr
                      key={loan._id}
                      className="transition-colors hover:bg-slate-50"
                    >
                      {/* Member */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                            <User className="h-4 w-4" />
                          </div>

                          <p className="font-semibold text-slate-800">
                            {getMemberName(loan.member)}
                          </p>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Phone className="h-4 w-4 text-slate-400" />
                          <span>
                            {loan.member?.phone || "N/A"}
                          </span>
                        </div>
                      </td>

                      {/* Loan Amount */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1 font-semibold text-emerald-600">
                          <IndianRupee className="h-4 w-4" />
                          <span>{loan.amount}</span>
                        </div>
                      </td>

                      {/* Guarantor */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-slate-700">
                          <Users className="h-4 w-4 text-slate-400" />

                          <span>
                            {getGuarantorName(loan.guarantor)}
                          </span>
                        </div>
                      </td>

                      {/* Issue Date */}
                      <td className="px-5 py-4 text-slate-600">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-slate-400" />

                          <span>
                            {loan.issueDate
                              ? new Date(
                                  loan.issueDate
                                ).toLocaleDateString("en-GB")
                              : "-"}
                          </span>
                        </div>
                      </td>

                      {/* Repayment Due */}
                      <td className="px-5 py-4 text-slate-600">
                        <div className="flex items-center gap-2">
                          <Clock3 className="h-4 w-4 text-slate-400" />

                          <span>
                            {loan.repaymentDue
                              ? new Date(
                                  loan.repaymentDue
                                ).toLocaleDateString("en-GB")
                              : "-"}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${getStatusStyle(
                            loan.status
                          )}`}
                        >
                          {getStatusIcon(loan.status)}
                          {loan.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        {loan.status === "pending" ? (
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() =>
                                setConfirmModal({
                                  open: true,
                                  loanId: loan._id,
                                  action: "approved",
                                })
                              }
                              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
                            >
                              <CheckCircle2 className="h-4 w-4" />
                              Approve
                            </button>

                            <button
                              onClick={() =>
                                setConfirmModal({
                                  open: true,
                                  loanId: loan._id,
                                  action: "rejected",
                                })
                              }
                              className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/20"
                            >
                              <XCircle className="h-4 w-4" />
                              Reject
                            </button>
                          </div>
                        ) : (
                          <div className="text-center text-xs text-slate-400">
                            No actions
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-6 py-14 text-center"
                    >
                      <WalletCards className="mx-auto mb-3 h-10 w-10 text-slate-300" />

                      <p className="font-medium text-slate-600">
                        No loan requests found
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        There are currently no loan requests to review.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* =========================================
            MOBILE CARDS
        ========================================= */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {loans.length > 0 ? (
            loans.map((loan) => (
              <div
                key={loan._id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                {/* Card Header */}
                <div className="border-b border-slate-100 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                        <User className="h-5 w-5" />
                      </div>

                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900">
                          {getMemberName(loan.member)}
                        </p>

                        <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                          <Phone className="h-3.5 w-3.5" />

                          <span>
                            {loan.member?.phone || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span
                      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${getStatusStyle(
                        loan.status
                      )}`}
                    >
                      {getStatusIcon(loan.status)}
                      {loan.status}
                    </span>
                  </div>
                </div>

                {/* Loan Amount */}
                <div className="border-b border-slate-100 bg-slate-50 px-4 py-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Loan Amount
                  </p>

                  <div className="mt-1 flex items-center gap-1 text-xl font-bold text-emerald-600">
                    <IndianRupee className="h-5 w-5" />
                    <span>{loan.amount}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4 p-4">
                  {/* Guarantor */}
                  <div className="flex items-start gap-3">
                    <Users className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />

                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Guarantor
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {getGuarantorName(loan.guarantor)}
                      </p>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-100 bg-white p-3">
                      <div className="flex items-center gap-2 text-slate-400">
                        <CalendarDays className="h-4 w-4" />

                        <span className="text-xs font-medium uppercase tracking-wide">
                          Issue Date
                        </span>
                      </div>

                      <p className="mt-2 text-sm font-semibold text-slate-700">
                        {loan.issueDate
                          ? new Date(
                              loan.issueDate
                            ).toLocaleDateString("en-GB")
                          : "-"}
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-white p-3">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Clock3 className="h-4 w-4" />

                        <span className="text-xs font-medium uppercase tracking-wide">
                          Repayment Due
                        </span>
                      </div>

                      <p className="mt-2 text-sm font-semibold text-slate-700">
                        {loan.repaymentDue
                          ? new Date(
                              loan.repaymentDue
                            ).toLocaleDateString("en-GB")
                          : "-"}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  {loan.status === "pending" && (
                    <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">
                      <button
                        onClick={() =>
                          setConfirmModal({
                            open: true,
                            loanId: loan._id,
                            action: "approved",
                          })
                        }
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          setConfirmModal({
                            open: true,
                            loanId: loan._id,
                            action: "rejected",
                          })
                        }
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-red-600 px-3 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/20"
                      >
                        <XCircle className="h-4 w-4" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-14 text-center shadow-sm">
              <WalletCards className="mx-auto mb-3 h-10 w-10 text-slate-300" />

              <p className="font-medium text-slate-600">
                No loan requests found
              </p>

              <p className="mt-1 text-sm text-slate-400">
                There are currently no loan requests to review.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* =========================================
          CONFIRMATION MODAL
      ========================================= */}
      {confirmModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-3 sm:p-4">
          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* Modal Header */}
            <div
              className={`flex items-center gap-3 border-b px-5 py-4 sm:px-6 ${
                confirmModal.action === "approved"
                  ? "border-emerald-100 bg-emerald-50"
                  : "border-red-100 bg-red-50"
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  confirmModal.action === "approved"
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {confirmModal.action === "approved" ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <XCircle className="h-5 w-5" />
                )}
              </div>

              <h3 className="text-lg font-semibold text-slate-900">
                {confirmModal.action === "approved"
                  ? "Approve Loan Request"
                  : "Reject Loan Request"}
              </h3>
            </div>

            {/* Modal Content */}
            <div className="p-5 sm:p-6">
              <p className="text-sm leading-6 text-slate-600 sm:text-base">
                Are you sure you want to{" "}
                <span
                  className={`font-bold ${
                    confirmModal.action === "approved"
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {confirmModal.action === "approved"
                    ? "APPROVE"
                    : "REJECT"}
                </span>{" "}
                this loan?
              </p>

              <div
                className={`mt-4 flex items-start gap-2 rounded-xl border p-3 ${
                  confirmModal.action === "approved"
                    ? "border-emerald-100 bg-emerald-50"
                    : "border-red-100 bg-red-50"
                }`}
              >
                {confirmModal.action === "approved" ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                ) : (
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                )}

                <p
                  className={`text-sm ${
                    confirmModal.action === "approved"
                      ? "text-emerald-700"
                      : "text-red-700"
                  }`}
                >
                  {confirmModal.action === "approved"
                    ? "This action will approve the loan request."
                    : "This action will reject the loan request."}
                </p>
              </div>

              {/* Modal Buttons */}
              <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <button
                  onClick={cancelAction}
                  className="order-2 rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 sm:order-1"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmAction}
                  className={`order-1 rounded-xl px-4 py-3 text-sm font-semibold text-white transition sm:order-2 ${
                    confirmModal.action === "approved"
                      ? "bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-500/20"
                      : "bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-500/20"
                  }`}
                >
                  {confirmModal.action === "approved"
                    ? "Confirm Approval"
                    : "Confirm Rejection"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
