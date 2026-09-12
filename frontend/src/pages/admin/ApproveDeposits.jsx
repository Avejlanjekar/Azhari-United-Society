
// import { useEffect, useState } from "react";
// import axiosClient from "../../api/axiosClient";
// import {
//   Loader2,
//   CheckCircle,
//   XCircle,
//   FileText,
// } from "lucide-react";

// export default function ApproveDeposits() {
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Confirmation modal
//   const [confirmAction, setConfirmAction] = useState(null);

//   // Rejection reason
//   const [rejectionReason, setRejectionReason] = useState("");

//   const fetchSubmissions = async () => {
//     try {
//       setLoading(true);

//       const res = await axiosClient.get("/deposit-proofs/my");

//       setSubmissions(res.data);
//     } catch (err) {
//       console.error("Error fetching submissions:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleConfirm = async () => {
//     if (!confirmAction) return;

//     try {
//       // -----------------------------
//       // APPROVE
//       // -----------------------------
//       if (confirmAction.type === "approve") {
//         await axiosClient.post(
//           `/deposit-proofs/admin/${confirmAction.id}/approve`
//         );

//         await fetchSubmissions();
//       }

//       // -----------------------------
//       // REJECT
//       // -----------------------------
//       else {
//         if (!rejectionReason.trim()) {
//           return;
//         }

//         await axiosClient.post(
//           `/deposit-proofs/admin/${confirmAction.id}/reject`,
//           {
//             rejectionReason: rejectionReason.trim(),
//           }
//         );

//         await fetchSubmissions();
//       }

//     } catch (err) {
//       console.error("Error handling action:", err);

//       alert(
//         err.response?.data?.message ||
//         "Something went wrong."
//       );
//     } finally {
//       setConfirmAction(null);
//       setRejectionReason("");
//     }
//   };

//   useEffect(() => {
//     fetchSubmissions();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 border border-gray-100">

//       <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800 border-b pb-3">
//         Approve Deposits
//       </h2>

//       {submissions.length === 0 ? (
//         <p className="text-gray-500 text-center py-10">
//           🎉 No pending submissions
//         </p>
//       ) : (
//         <>
//           {/* =========================================
//               DESKTOP / TABLET
//           ========================================= */}
//           <div className="hidden md:block overflow-x-auto">

//             <table className="w-full border-collapse rounded-xl overflow-hidden">

//               <thead>
//                 <tr className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wide">

//                   <th className="p-4 text-left">
//                     Member
//                   </th>

//                   <th className="p-4 text-left">
//                     Month
//                   </th>

//                   <th className="p-4 text-left">
//                     Year
//                   </th>

//                   <th className="p-4 text-left">
//                     Proof
//                   </th>

//                   <th className="p-4 text-center">
//                     Actions
//                   </th>

//                 </tr>
//               </thead>

//               <tbody>

//                 {submissions.map((s, idx) => (

//                   <tr
//                     key={s._id}
//                     className={`${
//                       idx % 2 === 0
//                         ? "bg-white"
//                         : "bg-gray-50"
//                     } hover:bg-gray-100 transition`}
//                   >

//                     <td className="p-4 font-medium text-gray-800">
//                       {s.member?.name}{" "}
//                       {s.member?.middlename}{" "}
//                       {s.member?.lastname}
//                     </td>

//                     <td className="p-4 text-gray-700">
//                       {s.month}
//                     </td>

//                     <td className="p-4 text-gray-700">
//                       {s.year}
//                     </td>

//                     <td className="p-4">

//                       {s.filePath ? (
//                         <a
//                           href={s.fileUrl}
//                           target="_blank"
//                           rel="noreferrer"
//                           className="text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium"
//                         >
//                           <FileText className="w-4 h-4" />
//                           View
//                         </a>
//                       ) : (
//                         <span className="text-gray-400 italic">
//                           No file
//                         </span>
//                       )}

//                     </td>

//                     <td className="p-4">

//                       <div className="flex justify-center gap-3">

//                         <button
//                           onClick={() =>
//                             setConfirmAction({
//                               type: "approve",
//                               id: s._id,
//                             })
//                           }
//                           className="flex items-center gap-1 px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition text-sm font-medium"
//                         >
//                           <CheckCircle className="w-4 h-4" />
//                           Approve
//                         </button>

//                         <button
//                           onClick={() => {
//                             setRejectionReason("");

//                             setConfirmAction({
//                               type: "reject",
//                               id: s._id,
//                             });
//                           }}
//                           className="flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition text-sm font-medium"
//                         >
//                           <XCircle className="w-4 h-4" />
//                           Reject
//                         </button>

//                       </div>

//                     </td>

//                   </tr>

//                 ))}

//               </tbody>

//             </table>

//           </div>

//           {/* =========================================
//               MOBILE
//           ========================================= */}
//           <div className="grid grid-cols-1 gap-4 md:hidden">

//             {submissions.map((s) => (

//               <div
//                 key={s._id}
//                 className="bg-white border border-gray-200 rounded-xl shadow p-4"
//               >

//                 <p className="text-lg font-semibold text-gray-800">
//                   {s.member?.name}
//                 </p>

//                 <p className="text-gray-600 text-sm">
//                   {s.month} {s.year}
//                 </p>

//                 <div className="mt-2">

//                   {s.filePath ? (
//                     <a
//                       href={s.fileUrl}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium"
//                     >
//                       <FileText className="w-4 h-4" />
//                       View
//                     </a>
//                   ) : (
//                     <span className="text-gray-400 italic">
//                       No file
//                     </span>
//                   )}

//                 </div>

//                 <div className="mt-4 flex flex-wrap gap-2">

//                   <button
//                     onClick={() =>
//                       setConfirmAction({
//                         type: "approve",
//                         id: s._id,
//                       })
//                     }
//                     className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition text-sm font-medium"
//                   >
//                     <CheckCircle className="w-4 h-4" />
//                     Approve
//                   </button>

//                   <button
//                     onClick={() => {
//                       setRejectionReason("");

//                       setConfirmAction({
//                         type: "reject",
//                         id: s._id,
//                       });
//                     }}
//                     className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition text-sm font-medium"
//                   >
//                     <XCircle className="w-4 h-4" />
//                     Reject
//                   </button>

//                 </div>

//               </div>

//             ))}

//           </div>
//         </>
//       )}

//       {/* =========================================
//           CONFIRMATION / REJECTION MODAL
//       ========================================= */}
//       {confirmAction && (

//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">

//           <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">

//             <h3 className="text-lg font-semibold text-gray-800 mb-4">

//               {confirmAction.type === "approve"
//                 ? "✅ Approve Deposit"
//                 : "⚠️ Reject Deposit"}

//             </h3>

//             {confirmAction.type === "approve" ? (

//               <>
//                 <p className="text-gray-600 mb-6">
//                   Are you sure you want to{" "}
//                   <span className="text-green-600 font-bold">
//                     APPROVE
//                   </span>{" "}
//                   this deposit?
//                 </p>
//               </>

//             ) : (

//               <>
//                 <p className="text-gray-600 mb-3">
//                   Please provide a reason for rejecting this deposit.
//                 </p>

//                 <textarea
//                   value={rejectionReason}
//                   onChange={(e) =>
//                     setRejectionReason(e.target.value)
//                   }
//                   placeholder="Enter rejection reason..."
//                   rows={4}
//                   className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none resize-none"
//                 />

//                 {!rejectionReason.trim() && (
//                   <p className="text-xs text-red-500 mt-2">
//                     Rejection reason is required.
//                   </p>
//                 )}
//               </>

//             )}

//             {/* Modal Buttons */}
//             <div className="flex justify-end gap-3 mt-6">

//               <button
//                 onClick={() => {
//                   setConfirmAction(null);
//                   setRejectionReason("");
//                 }}
//                 className="px-4 py-2 text-black bg-gray-200 rounded-lg hover:bg-gray-300"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleConfirm}
//                 disabled={
//                   confirmAction.type === "reject" &&
//                   !rejectionReason.trim()
//                 }
//                 className={`px-4 py-2 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed ${
//                   confirmAction.type === "approve"
//                     ? "bg-green-600 hover:bg-green-700"
//                     : "bg-red-600 hover:bg-red-700"
//                 }`}
//               >
//                 {confirmAction.type === "approve"
//                   ? "Confirm Approval"
//                   : "Confirm Rejection"}
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
  CheckCircle,
  XCircle,
  FileText,
  WalletCards,
  User,
  CalendarDays,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

export default function ApproveDeposits() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Confirmation modal
  const [confirmAction, setConfirmAction] = useState(null);

  // Rejection reason
  const [rejectionReason, setRejectionReason] = useState("");

  const fetchSubmissions = async () => {
    try {
      setLoading(true);

      const res = await axiosClient.get("/deposit-proofs/my");

      setSubmissions(res.data);
    } catch (err) {
      console.error("Error fetching submissions:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!confirmAction) return;

    try {
      // APPROVE
      if (confirmAction.type === "approve") {
        await axiosClient.post(
          `/deposit-proofs/admin/${confirmAction.id}/approve`
        );

        await fetchSubmissions();
      }

      // REJECT
      else {
        if (!rejectionReason.trim()) {
          return;
        }

        await axiosClient.post(
          `/deposit-proofs/admin/${confirmAction.id}/reject`,
          {
            rejectionReason: rejectionReason.trim(),
          }
        );

        await fetchSubmissions();
      }
    } catch (err) {
      console.error("Error handling action:", err);

      alert(
        err.response?.data?.message ||
        "Something went wrong."
      );
    } finally {
      setConfirmAction(null);
      setRejectionReason("");
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  // Loading
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />

          <p className="text-sm font-medium text-slate-600 sm:text-base">
            Loading deposit submissions...
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
              <WalletCards className="h-5 w-5" />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Approve Deposits
              </h1>

              <p className="mt-1 text-sm text-slate-500 sm:text-base">
                Review submitted deposit proofs and approve or reject them.
              </p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-5 rounded-xl border border-amber-100 bg-amber-50 p-4 sm:mb-6 sm:rounded-2xl sm:p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-amber-600 shadow-sm">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-amber-600">
                Pending Reviews
              </p>

              <p className="text-xl font-bold text-slate-900">
                {submissions.length}
              </p>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {submissions.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-14 text-center shadow-sm">
            <CheckCircle className="mx-auto mb-4 h-12 w-12 text-emerald-500" />

            <h2 className="text-lg font-semibold text-slate-800">
              No pending submissions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              All deposit submissions have been reviewed.
            </p>
          </div>
        ) : (
          <>
            {/* =========================================
                DESKTOP TABLE
            ========================================= */}
            <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-900 text-white">
                    <tr>
                      <th className="px-5 py-4 text-left font-semibold">
                        Member
                      </th>

                      <th className="px-5 py-4 text-left font-semibold">
                        Month
                      </th>

                      <th className="px-5 py-4 text-left font-semibold">
                        Year
                      </th>

                      <th className="px-5 py-4 text-left font-semibold">
                        Proof
                      </th>

                      <th className="px-5 py-4 text-center font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {submissions.map((s) => (
                      <tr
                        key={s._id}
                        className="transition-colors hover:bg-slate-50"
                      >
                        {/* Member */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                              <User className="h-4 w-4" />
                            </div>

                            <p className="font-semibold text-slate-800">
                              {s.member?.name}{" "}
                              {s.member?.middlename}{" "}
                              {s.member?.lastname}
                            </p>
                          </div>
                        </td>

                        {/* Month */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 text-slate-700">
                            <CalendarDays className="h-4 w-4 text-slate-400" />
                            <span>{s.month}</span>
                          </div>
                        </td>

                        {/* Year */}
                        <td className="px-5 py-4 text-slate-700">
                          {s.year}
                        </td>

                        {/* Proof */}
                        <td className="px-5 py-4">
                          {s.filePath ? (
                            <a
                              href={s.fileUrl}
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
                              No file
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-4">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() =>
                                setConfirmAction({
                                  type: "approve",
                                  id: s._id,
                                })
                              }
                              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
                            >
                              <CheckCircle className="h-4 w-4" />
                              Approve
                            </button>

                            <button
                              onClick={() => {
                                setRejectionReason("");

                                setConfirmAction({
                                  type: "reject",
                                  id: s._id,
                                });
                              }}
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
              {submissions.map((s) => (
                <div
                  key={s._id}
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
                          {s.member?.name}{" "}
                          {s.member?.middlename}{" "}
                          {s.member?.lastname}
                        </p>

                        <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                          <CalendarDays className="h-3.5 w-3.5" />
                          <span>
                            {s.month} {s.year}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Deposit Details */}
                  <div className="space-y-4 p-4">
                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Deposit Period
                      </p>

                      <p className="mt-1 font-semibold text-slate-700">
                        {s.month} {s.year}
                      </p>
                    </div>

                    {/* Proof */}
                    <div>
                      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                        Deposit Proof
                      </p>

                      {s.filePath ? (
                        <a
                          href={s.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
                        >
                          <FileText className="h-4 w-4" />
                          View Deposit Proof
                        </a>
                      ) : (
                        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-400">
                          <FileText className="h-4 w-4" />
                          No proof file available
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() =>
                          setConfirmAction({
                            type: "approve",
                            id: s._id,
                          })
                        }
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Approve
                      </button>

                      <button
                        onClick={() => {
                          setRejectionReason("");

                          setConfirmAction({
                            type: "reject",
                            id: s._id,
                          });
                        }}
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
          CONFIRMATION / REJECTION MODAL
      ========================================= */}
      {confirmAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-3 sm:p-4">
          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* Modal Header */}
            <div
              className={`flex items-center gap-3 border-b px-5 py-4 sm:px-6 ${confirmAction.type === "approve"
                  ? "border-emerald-100 bg-emerald-50"
                  : "border-red-100 bg-red-50"
                }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${confirmAction.type === "approve"
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-red-100 text-red-600"
                  }`}
              >
                {confirmAction.type === "approve" ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <XCircle className="h-5 w-5" />
                )}
              </div>

              <h3 className="text-lg font-semibold text-slate-900">
                {confirmAction.type === "approve"
                  ? "Approve Deposit"
                  : "Reject Deposit"}
              </h3>
            </div>

            {/* Modal Content */}
            <div className="p-5 sm:p-6">
              {confirmAction.type === "approve" ? (
                <div>
                  <p className="text-sm leading-6 text-slate-600 sm:text-base">
                    Are you sure you want to approve this deposit?
                  </p>

                  <div className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-100 bg-emerald-50 p-3">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />

                    <p className="text-sm text-emerald-700">
                      This action will mark the deposit as approved.
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm leading-6 text-slate-600 sm:text-base">
                    Please provide a reason for rejecting this deposit.
                  </p>

                  <textarea
                    value={rejectionReason}
                    onChange={(e) =>
                      setRejectionReason(e.target.value)
                    }
                    placeholder="Enter rejection reason..."
                    rows={4}
                    className="mt-4 w-full resize-none rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                  />

                  {!rejectionReason.trim() && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-600">
                      <AlertCircle className="h-3.5 w-3.5" />
                      Rejection reason is required.
                    </div>
                  )}
                </div>
              )}

              {/* Modal Buttons */}
              <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <button
                  onClick={() => {
                    setConfirmAction(null);
                    setRejectionReason("");
                  }}
                  className="order-2 rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 sm:order-1"
                >
                  Cancel
                </button>

                <button
                  onClick={handleConfirm}
                  disabled={
                    confirmAction.type === "reject" &&
                    !rejectionReason.trim()
                  }
                  className={`order-1 rounded-xl px-4 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50 sm:order-2 ${confirmAction.type === "approve"
                      ? "bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-500/20"
                      : "bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-500/20"
                    }`}
                >
                  {confirmAction.type === "approve"
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
