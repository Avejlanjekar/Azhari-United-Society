
// import { useEffect, useState } from "react";
// import axiosClient from "../../api/axiosClient";
// import { FileText } from "lucide-react";

// export default function ApproveRepayment() {
//   const [loans, setLoans] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Modal state
//   const [repaymentModal, setRepaymentModal] = useState({
//     open: false,
//     loanId: null,
//     action: null, // "confirm" | "reject"
//   });

//   const fetchLoans = async () => {
//     try {
//       const res = await axiosClient.get("/loan/all");
//       setLoans(res.data.filter((loan) => loan.status === "repayment_requested"));
//     } catch (err) {
//       console.error("Error fetching loans:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRepaymentAction = async () => {
//     try {
//       if (repaymentModal.action === "confirm") {
//         await axiosClient.post(
//           `/loan/${repaymentModal.loanId}/confirm-repayment`
//         );
//         alert("✅ Loan repayment confirmed");
//       } else {
//         await axiosClient.post(
//           `/loan/${repaymentModal.loanId}/reject-repayment`
//         );
//         alert("❌ Loan repayment rejected");
//       }
//       fetchLoans();
//     } catch (err) {
//       console.error("Error updating repayment:", err);
//       alert("⚠️ Failed to update repayment");
//     } finally {
//       setRepaymentModal({ open: false, loanId: null, action: null });
//     }
//   };

//   const cancelRepaymentAction = () => {
//     setRepaymentModal({ open: false, loanId: null, action: null });
//   };

//   useEffect(() => {
//     fetchLoans();
//   }, []);

//   if (loading)
//     return (
//       <p className="p-6 text-lg text-gray-600 animate-pulse">
//         Loading loans...
//       </p>
//     );

//   return (
//     <div className="p-4 sm:p-6">
//       <h1 className="text-2xl sm:text-3xl font-extrabold mb-6 text-gray-800 border-b-2 border-indigo-500 pb-2">
//         Approve Loan Repayments
//       </h1>

//       {/* ✅ Desktop Table */}
//       <div className="hidden md:block overflow-x-auto shadow-xl rounded-xl border border-gray-200 bg-white">
//         <table className="min-w-full border-collapse text-sm">
//           <thead className="bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-800 uppercase text-xs font-semibold">
//             <tr>
//               <th className="border px-4 py-3 text-left">Member</th>
//               <th className="border px-4 py-3 text-left">Loan Amount</th>
//               <th className="border px-4 py-3 text-left">View payment Proof</th>
//               <th className="border px-4 py-3 text-left">Issue Date</th>
//               <th className="border px-4 py-3 text-left">Due Date</th>
//               <th className="border px-4 py-3 text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-700">
//             {loans.length > 0 ? (
//               loans.map((loan) => (
//                 <tr
//                   key={loan._id}
//                   className="hover:bg-indigo-50 transition-colors duration-200"
//                 >
//                   <td className="border px-4 py-3 font-medium text-gray-900">
//                     {loan.member?.name} {loan.member?.middlename}{" "}
//                     {loan.member?.lastname}
//                   </td>

//                   <td className="border px-4 py-3 font-semibold text-green-700">
//                     ₹{loan.amount}
//                   </td>

//                   <td className="p-4">
//                     {loan.filePath ? (
//                       <a
//                         href={loan.fileUrl}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium"
//                       >
//                         <FileText className="w-4 h-4" /> View
//                       </a>
//                     ) : (
//                       <span className="text-gray-400 italic">
//                         No payment proof
//                       </span>
//                     )}
//                   </td>

//                   <td className="border px-4 py-3 text-gray-600">
//                     {new Date(loan.issueDate).toLocaleDateString("en-GB")}
//                   </td>
//                   <td className="border px-4 py-3 text-gray-600">
//                     {new Date(loan.repaymentDue).toLocaleDateString("en-GB")}
//                   </td>
//                   <td className="border px-4 py-3 text-center space-x-2">
//                     <button
//                       onClick={() =>
//                         setRepaymentModal({
//                           open: true,
//                           loanId: loan._id,
//                           action: "confirm",
//                         })
//                       }
//                       className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 hover:shadow-lg transition-all duration-200"
//                     >
//                       Confirm
//                     </button>
//                     <button
//                       onClick={() =>
//                         setRepaymentModal({
//                           open: true,
//                           loanId: loan._id,
//                           action: "reject",
//                         })
//                       }
//                       className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 hover:shadow-lg transition-all duration-200"
//                     >
//                       Reject
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="6"
//                   className="border px-4 py-6 text-center text-gray-500 italic"
//                 >
//                   No repayment requests found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* ✅ Mobile Cards */}
//       <div className="md:hidden space-y-4">
//         {loans.length > 0 ? (
//           loans.map((loan) => (
//             <div
//               key={loan._id}
//               className="bg-white shadow-md rounded-lg border border-gray-200 p-4"
//             >
//               <p className="font-bold text-gray-900">
//                 {loan.member?.name} {loan.member?.middlename}{" "}
//                 {loan.member?.lastname}
//               </p>
//               <p className="text-green-700 font-semibold">₹{loan.amount}</p>
//               <p className="text-gray-600 text-sm">
//                 Issue: {new Date(loan.issueDate).toLocaleDateString("en-GB")}
//               </p>
//               <p className="text-gray-600 text-sm">
//                 Due: {new Date(loan.repaymentDue).toLocaleDateString("en-GB")}
//               </p>
//               <div className="flex gap-2 mt-3">
//                 <button
//                   onClick={() =>
//                     setRepaymentModal({
//                       open: true,
//                       loanId: loan._id,
//                       action: "confirm",
//                     })
//                   }
//                   className="flex-1 bg-green-600 text-white py-2 rounded-lg shadow hover:bg-green-700 transition"
//                 >
//                   Confirm
//                 </button>
//                 <button
//                   onClick={() =>
//                     setRepaymentModal({
//                       open: true,
//                       loanId: loan._id,
//                       action: "reject",
//                     })
//                   }
//                   className="flex-1 bg-red-600 text-white py-2 rounded-lg shadow hover:bg-red-700 transition"
//                 >
//                   Reject
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500 italic">
//             No repayment requests found
//           </p>
//         )}
//       </div>

//       {/* ✅ Confirmation Modal */}
//       {repaymentModal.open && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
//             <h3 className="text-lg font-semibold mb-4 text-gray-800">
//               {repaymentModal.action === "confirm"
//                 ? "Confirm Repayment"
//                 : "Reject Repayment"}
//             </h3>
//             <p className="text-gray-600 mb-6">
//               Are you sure you want to{" "}
//               <span className="font-bold">
//                 {repaymentModal.action === "confirm"
//                   ? "CONFIRM"
//                   : "REJECT"}
//               </span>{" "}
//               this repayment request?
//             </p>
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={cancelRepaymentAction}
//                 className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleRepaymentAction}
//                 className={`px-4 py-2 rounded-lg text-white shadow ${
//                   repaymentModal.action === "confirm"
//                     ? "bg-green-600 hover:bg-green-700"
//                     : "bg-red-600 hover:bg-red-700"
//                 }`}
//               >
//                 {repaymentModal.action === "confirm" ? "Confirm" : "Reject"}
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
  FileText,
  WalletCards,
  User,
  IndianRupee,
  CalendarDays,
  Clock3,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

export default function ApproveRepayment() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [repaymentModal, setRepaymentModal] = useState({
    open: false,
    loanId: null,
    action: null,
  });

  const fetchLoans = async () => {
    try {
      const res = await axiosClient.get("/loan/all");

      setLoans(
        res.data.filter(
          (loan) => loan.status === "repayment_requested"
        )
      );
    } catch (err) {
      console.error("Error fetching loans:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRepaymentAction = async () => {
    try {
      if (repaymentModal.action === "confirm") {
        await axiosClient.post(
          `/loan/${repaymentModal.loanId}/confirm-repayment`
        );

        alert("Loan repayment confirmed");
      } else {
        await axiosClient.post(
          `/loan/${repaymentModal.loanId}/reject-repayment`
        );

        alert("Loan repayment rejected");
      }

      fetchLoans();
    } catch (err) {
      console.error("Error updating repayment:", err);

      alert("Failed to update repayment");
    } finally {
      setRepaymentModal({
        open: false,
        loanId: null,
        action: null,
      });
    }
  };

  const cancelRepaymentAction = () => {
    setRepaymentModal({
      open: false,
      loanId: null,
      action: null,
    });
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

  useEffect(() => {
    fetchLoans();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />

          <p className="text-sm font-medium text-slate-600 sm:text-base">
            Loading repayment requests...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-6 sm:py-6 lg:px-8">

        {/* Header */}
        <div className="mb-5 sm:mb-7">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Approve Loan Repayments
              </h1>

              <p className="mt-1 text-sm text-slate-500 sm:text-base">
                Review member repayment requests and confirm or reject them.
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
                Pending Repayments
              </p>

              <p className="text-xl font-bold text-slate-900">
                {loans.length}
              </p>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {loans.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-14 text-center shadow-sm">
            <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-emerald-500" />

            <h2 className="text-lg font-semibold text-slate-800">
              No repayment requests
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              There are currently no repayment requests waiting for review.
            </p>
          </div>
        ) : (
          <>
            {/* =========================================
                DESKTOP TABLE
            ========================================= */}
            <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
              <div className="overflow-x-auto">
                <table className="min-w-[1000px] w-full text-sm">
                  <thead className="bg-slate-900 text-white">
                    <tr>
                      <th className="px-5 py-4 text-left font-semibold">
                        Member
                      </th>

                      <th className="px-5 py-4 text-left font-semibold">
                        Loan Amount
                      </th>

                      <th className="px-5 py-4 text-left font-semibold">
                        Payment Proof
                      </th>

                      <th className="px-5 py-4 text-left font-semibold">
                        Issue Date
                      </th>

                      <th className="px-5 py-4 text-left font-semibold">
                        Due Date
                      </th>

                      <th className="px-5 py-4 text-center font-semibold">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {loans.map((loan) => (
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

                        {/* Amount */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1 font-semibold text-emerald-600">
                            <IndianRupee className="h-4 w-4" />
                            <span>{loan.amount}</span>
                          </div>
                        </td>

                        {/* Proof */}
                        <td className="px-5 py-4">
                          {loan.filePath ? (
                            <a
                              href={loan.fileUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100 hover:text-blue-700"
                            >
                              <FileText className="h-4 w-4" />
                              View Proof
                            </a>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-sm italic text-slate-400">
                              <FileText className="h-4 w-4" />
                              No payment proof
                            </span>
                          )}
                        </td>

                        {/* Issue Date */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 text-slate-600">
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

                        {/* Due Date */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 text-slate-600">
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

                        {/* Actions */}
                        <td className="px-5 py-4">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() =>
                                setRepaymentModal({
                                  open: true,
                                  loanId: loan._id,
                                  action: "confirm",
                                })
                              }
                              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
                            >
                              <CheckCircle2 className="h-4 w-4" />
                              Confirm
                            </button>

                            <button
                              onClick={() =>
                                setRepaymentModal({
                                  open: true,
                                  loanId: loan._id,
                                  action: "reject",
                                })
                              }
                              className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/20"
                            >
                              <XCircle className="h-4 w-4" />
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* =========================================
                MOBILE CARDS
            ========================================= */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {loans.map((loan) => (
                <div
                  key={loan._id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  {/* Card Header */}
                  <div className="border-b border-slate-100 p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                        <User className="h-5 w-5" />
                      </div>

                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900">
                          {getMemberName(loan.member)}
                        </p>

                        <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                          <Clock3 className="h-3.5 w-3.5" />
                          Repayment Requested
                        </span>
                      </div>
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
                    {/* Payment Proof */}
                    <div>
                      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                        Payment Proof
                      </p>

                      {loan.filePath ? (
                        <a
                          href={loan.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
                        >
                          <FileText className="h-4 w-4" />
                          View Payment Proof
                        </a>
                      ) : (
                        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-400">
                          <FileText className="h-4 w-4" />
                          No payment proof available
                        </div>
                      )}
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

                      <div className="rounded-xl border border-amber-100 bg-amber-50 p-3">
                        <div className="flex items-center gap-2 text-amber-600">
                          <Clock3 className="h-4 w-4" />

                          <span className="text-xs font-medium uppercase tracking-wide">
                            Due Date
                          </span>
                        </div>

                        <p className="mt-2 text-sm font-semibold text-amber-700">
                          {loan.repaymentDue
                            ? new Date(
                              loan.repaymentDue
                            ).toLocaleDateString("en-GB")
                            : "-"}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">
                      <button
                        onClick={() =>
                          setRepaymentModal({
                            open: true,
                            loanId: loan._id,
                            action: "confirm",
                          })
                        }
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Confirm
                      </button>

                      <button
                        onClick={() =>
                          setRepaymentModal({
                            open: true,
                            loanId: loan._id,
                            action: "reject",
                          })
                        }
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-red-600 px-3 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/20"
                      >
                        <XCircle className="h-4 w-4" />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* =========================================
          CONFIRMATION MODAL
      ========================================= */}
      {repaymentModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-3 sm:p-4">
          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* Modal Header */}
            <div
              className={`flex items-center gap-3 border-b px-5 py-4 sm:px-6 ${repaymentModal.action === "confirm"
                  ? "border-emerald-100 bg-emerald-50"
                  : "border-red-100 bg-red-50"
                }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${repaymentModal.action === "confirm"
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-red-100 text-red-600"
                  }`}
              >
                {repaymentModal.action === "confirm" ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <XCircle className="h-5 w-5" />
                )}
              </div>

              <h3 className="text-lg font-semibold text-slate-900">
                {repaymentModal.action === "confirm"
                  ? "Confirm Repayment"
                  : "Reject Repayment"}
              </h3>
            </div>

            {/* Modal Content */}
            <div className="p-5 sm:p-6">
              <p className="text-sm leading-6 text-slate-600 sm:text-base">
                Are you sure you want to{" "}
                <span
                  className={`font-bold ${repaymentModal.action === "confirm"
                      ? "text-emerald-600"
                      : "text-red-600"
                    }`}
                >
                  {repaymentModal.action === "confirm"
                    ? "CONFIRM"
                    : "REJECT"}
                </span>{" "}
                this repayment request?
              </p>

              <div
                className={`mt-4 flex items-start gap-2 rounded-xl border p-3 ${repaymentModal.action === "confirm"
                    ? "border-emerald-100 bg-emerald-50"
                    : "border-red-100 bg-red-50"
                  }`}
              >
                {repaymentModal.action === "confirm" ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                ) : (
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                )}

                <p
                  className={`text-sm ${repaymentModal.action === "confirm"
                      ? "text-emerald-700"
                      : "text-red-700"
                    }`}
                >
                  {repaymentModal.action === "confirm"
                    ? "This will mark the loan repayment as completed."
                    : "This will reject the member's repayment request."}
                </p>
              </div>

              {/* Modal Buttons */}
              <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <button
                  onClick={cancelRepaymentAction}
                  className="order-2 rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 sm:order-1"
                >
                  Cancel
                </button>

                <button
                  onClick={handleRepaymentAction}
                  className={`order-1 rounded-xl px-4 py-3 text-sm font-semibold text-white transition sm:order-2 ${repaymentModal.action === "confirm"
                      ? "bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-500/20"
                      : "bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-500/20"
                    }`}
                >
                  {repaymentModal.action === "confirm"
                    ? "Confirm Repayment"
                    : "Reject Repayment"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
