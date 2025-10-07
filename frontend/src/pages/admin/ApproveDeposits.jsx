// src/pages/ApproveDeposits.jsx
// import { useEffect, useState } from "react";
// import axiosClient from "../../api/axiosClient";
// import { Loader2, CheckCircle, XCircle, FileText } from "lucide-react";

// export default function ApproveDeposits() {
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);

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

//   const handleApprove = async (id) => {
//     try {
//       await axiosClient.post(`/deposit-proofs/admin/${id}/approve`);
//       fetchSubmissions();
//     } catch (err) {
//       console.error("Error approving:", err);
//     }
//   };

//   const handleReject = async (id) => {
//     const note = prompt("Reason for rejection:");
//     try {
//       await axiosClient.post(`deposit-proofs/admin/${id}/reject`, { note });
//       fetchSubmissions();
//     } catch (err) {
//       console.error("Error rejecting:", err);
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
//     <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
//       <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-3">
//         Approve Deposits
//       </h2>

//       {submissions.length === 0 ? (
//         <p className="text-gray-500 text-center py-10">
//           🎉 No pending submissions
//         </p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse rounded-xl overflow-hidden">
//             <thead>
//               <tr className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wide">
//                 <th className="p-4 text-left">Member</th>
//                 <th className="p-4 text-left">Month</th>
//                 <th className="p-4 text-left">Year</th>
//                 <th className="p-4 text-left">Proof</th>
//                 <th className="p-4 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {submissions.map((s, idx) => (
//                 <tr
//                   key={s._id}
//                   className={`${
//                     idx % 2 === 0 ? "bg-white" : "bg-gray-50"
//                   } hover:bg-gray-100 transition`}
//                 >
//                   <td className="p-4 font-medium text-gray-800">
//                     {s.member?.name}
//                   </td>
//                   <td className="p-4 text-gray-700">{s.month}</td>
//                   <td className="p-4 text-gray-700">{s.year}</td>
//                   <td className="p-4">
//                     {s.filePath ? (
//                       <a
//                         href={s.filePath}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium"
//                       >
//                         <FileText className="w-4 h-4" /> View
//                       </a>
//                     ) : (
//                       <span className="text-gray-400 italic">No file</span>
//                     )}
//                   </td>
//                   <td className="p-4 flex justify-center gap-3">
//                     <button
//                       onClick={() => handleApprove(s._id)}
//                       className="flex items-center gap-1 px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition text-sm font-medium"
//                     >
//                       <CheckCircle className="w-4 h-4" /> Approve
//                     </button>
//                     <button
//                       onClick={() => handleReject(s._id)}
//                       className="flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition text-sm font-medium"
//                     >
//                       <XCircle className="w-4 h-4" /> Reject
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }



// src/pages/ApproveDeposits.jsx
import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { Loader2, CheckCircle, XCircle, FileText } from "lucide-react";

export default function ApproveDeposits() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 For confirmation modal
  const [confirmAction, setConfirmAction] = useState(null); // { type: "approve"|"reject", id }

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
      if (confirmAction.type === "approve") {
        await axiosClient.post(`/deposit-proofs/admin/${confirmAction.id}/approve`);
        fetchSubmissions();
      } else {
        await axiosClient.post(`/deposit-proofs/admin/${confirmAction.id}/reject`);
        fetchSubmissions();
      }
      // fetchSubmissions();
    } catch (err) {
      console.error("Error handling action:", err);
    } finally {
      setConfirmAction(null); // close modal
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 border border-gray-100">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800 border-b pb-3">
        Approve Deposits
      </h2>

      {submissions.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          🎉 No pending submissions
        </p>
      ) : (
        <>
          {/* ✅ Table (desktop & tablet) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wide">
                  <th className="p-4 text-left">Member</th>
                  <th className="p-4 text-left">Month</th>
                  <th className="p-4 text-left">Year</th>
                  <th className="p-4 text-left">Proof</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((s, idx) => (
                  <tr
                    key={s._id}
                    className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100 transition`}
                  >
                    <td className="p-4 font-medium text-gray-800">
                      {s.member?.name} {s.member?.middlename} {s.member?.lastname}
                    </td>
                    <td className="p-4 text-gray-700">{s.month}</td>
                    <td className="p-4 text-gray-700">{s.year}</td>
                    <td className="p-4">
                      {s.filePath ? (
                        <a
                          href={s.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium"
                        >
                          <FileText className="w-4 h-4" /> View
                        </a>
                      ) : (
                        <span className="text-gray-400 italic">No file</span>
                      )}
                    </td>
                    <td className="p-4 flex justify-center gap-3">
                      <button
                        onClick={() => setConfirmAction({ type: "approve", id: s._id })}
                        className="flex items-center gap-1 px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition text-sm font-medium"
                      >
                        <CheckCircle className="w-4 h-4" /> Approve
                      </button>
                      <button
                        onClick={() => setConfirmAction({ type: "reject", id: s._id })}
                        className="flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition text-sm font-medium"
                      >
                        <XCircle className="w-4 h-4" /> Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ✅ Card layout (mobile) */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {submissions.map((s) => (
              <div
                key={s._id}
                className="bg-white border border-gray-200 rounded-xl shadow p-4"
              >
                <p className="text-lg font-semibold text-gray-800">
                  {s.member?.name}
                </p>
                <p className="text-gray-600 text-sm">
                  {s.month} {s.year}
                </p>
                <div className="mt-2">
                  {s.filePath ? (
                    <a
                      href={s.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium"
                    >
                      <FileText className="w-4 h-4" /> View
                    </a>
                  ) : (
                    <span className="text-gray-400 italic">No file</span>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => setConfirmAction({ type: "approve", id: s._id })}
                    className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition text-sm font-medium"
                  >
                    <CheckCircle className="w-4 h-4" /> Approve
                  </button>
                  <button
                    onClick={() => setConfirmAction({ type: "reject", id: s._id })}
                    className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition text-sm font-medium"
                  >
                    <XCircle className="w-4 h-4" /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 🔹 Confirmation Modal */}
      {confirmAction && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {confirmAction.type === "approve"
                ? "✅ Approve Deposit"
                : "⚠️ Reject Deposit"}
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to{" "}
              <span
                className={
                  confirmAction.type === "approve"
                    ? "text-green-600 font-bold"
                    : "text-red-600 font-bold"
                }
              >
                {confirmAction.type.toUpperCase()}
              </span>{" "}
              this deposit?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmAction(null)}
                className="px-4 py-2 text-black bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className={`px-4 py-2 rounded-lg text-white ${
                  confirmAction.type === "approve"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
