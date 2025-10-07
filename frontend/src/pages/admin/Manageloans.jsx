// import { useEffect, useState } from "react";
// import axiosClient from "../../api/axiosClient";

// export default function Loans() {
//   const [loans, setLoans] = useState([]);

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

//   const handleStatusUpdate = async (loanId, status) => {
//     try {
//       await axiosClient.put(`/loan/${loanId}/status`, { status });
//       fetchLoans(); // refresh table
//     } catch (err) {
//       console.error("Error updating loan status:", err);
//     }
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
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
//         All Loans
//       </h2>
//       <div className="overflow-x-auto shadow-lg rounded-xl">
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
//             {loans.map((loan, idx) => (
//               <tr
//                 key={loan._id}
//                 className={`hover:bg-gray-50 ${
//                   idx % 2 === 0 ? "bg-white" : "bg-gray-50"
//                 }`}
//               >
//                 <td className="p-3 font-medium text-gray-800">
//                   {loan.member?.name} {loan.member?.middlename}{" "}
//                   {loan.member?.lastname}
//                 </td>
//                 <td className="p-3 text-gray-600">{loan.member?.phone}</td>
//                 <td className="p-3 text-gray-900 font-semibold">
//                   ₹{loan.amount}
//                 </td>
//                 <td className="p-3 text-gray-600">
//                   {loan.guarantor?.name} {loan.guarantor?.middlename}{" "}
//                   {loan.guarantor?.lastname}
//                 </td>
//                 <td className="p-3 text-gray-600">
//                   {loan.issueDate
//                     ? new Date(loan.issueDate).toLocaleDateString("en-GB")
//                     : "-"}
//                 </td>
//                 <td className="p-3 text-gray-600">
//                   {loan.repaymentDue
//                     ? new Date(loan.repaymentDue).toLocaleDateString("en-GB")
//                     : "-"}
//                 </td>
//                 <td className="p-3">
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
//                       loan.status
//                     )}`}
//                   >
//                     {loan.status}
//                   </span>
//                 </td>
//                 <td className="p-3 text-center">
//                   {loan.status === "pending" && (
//                     <div className="flex justify-center gap-3">
//                       <button
//                         onClick={() =>
//                           handleStatusUpdate(loan._id, "approved")
//                         }
//                         className="bg-green-500 text-white px-4 py-1.5 rounded-lg shadow hover:bg-green-600 transition"
//                       >
//                         Approve
//                       </button>
//                       <button
//                         onClick={() =>
//                           handleStatusUpdate(loan._id, "rejected")
//                         }
//                         className="bg-red-500 text-white px-4 py-1.5 rounded-lg shadow hover:bg-red-600 transition"
//                       >
//                         Reject
//                       </button>
//                     </div>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

export default function Loans() {
  const [loans, setLoans] = useState([]);
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    loanId: null,
    action: null, // "approved" or "rejected"
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
      setConfirmModal({ open: false, loanId: null, action: null });
    }
  };

  const cancelAction = () => {
    setConfirmModal({ open: false, loanId: null, action: null });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700 border border-green-300";
      case "rejected":
        return "bg-red-100 text-red-700 border border-red-300";
      case "pending":
      default:
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
        All Loans
      </h2>

      {/* ✅ Table for larger screens */}
      <div className="hidden sm:block overflow-x-auto shadow-lg rounded-xl">
        <table className="w-full border-collapse">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            <tr>
              <th className="p-3 text-left">Member</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Loan Amount</th>
              <th className="p-3 text-left">Guarantor</th>
              <th className="p-3 text-left">Issue Date</th>
              <th className="p-3 text-left">Repayment Due</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.length > 0 ? (
              loans.map((loan, idx) => (
                <tr
                  key={loan._id}
                  className={`hover:bg-gray-50 ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="p-3 font-medium text-gray-800">
                    {loan.member?.name} {loan.member?.middlename}{" "}
                    {loan.member?.lastname}
                  </td>
                  <td className="p-3 text-gray-600">{loan.member?.phone}</td>
                  <td className="p-3 text-gray-900 font-semibold">
                    ₹{loan.amount}
                  </td>
                  <td className="p-3 text-gray-600">
                    {loan.guarantor?.name} {loan.guarantor?.middlename}{" "}
                    {loan.guarantor?.lastname}
                  </td>
                  <td className="p-3 text-gray-600">
                    {loan.issueDate
                      ? new Date(loan.issueDate).toLocaleDateString("en-GB")
                      : "-"}
                  </td>
                  <td className="p-3 text-gray-600">
                    {loan.repaymentDue
                      ? new Date(loan.repaymentDue).toLocaleDateString("en-GB")
                      : "-"}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
                        loan.status
                      )}`}
                    >
                      {loan.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    {loan.status === "pending" && (
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() =>
                            setConfirmModal({
                              open: true,
                              loanId: loan._id,
                              action: "approved",
                            })
                          }
                          className="bg-green-500 text-white px-4 py-1.5 rounded-lg shadow hover:bg-green-600 transition"
                        >
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
                          className="bg-red-500 text-white px-4 py-1.5 rounded-lg shadow hover:bg-red-600 transition"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="border px-4 py-6 text-center text-gray-500 italic"
                >
                  No loan requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Card layout for mobile */}
      <div className="sm:hidden space-y-4">
        {loans.map((loan) => (
          <div
            key={loan._id}
            className="bg-white shadow-md rounded-xl p-4 border"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">
                {loan.member?.name} {loan.member?.lastname}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
                  loan.status
                )}`}
              >
                {loan.status}
              </span>
            </div>
            <p className="text-gray-600">📞 {loan.member?.phone}</p>
            <p className="text-gray-900 font-semibold">₹{loan.amount}</p>
            <p className="text-sm text-gray-600">
              Guarantor: {loan.guarantor?.name} {loan.guarantor?.lastname}
            </p>
            <p className="text-sm text-gray-600">
              Issue:{" "}
              {loan.issueDate
                ? new Date(loan.issueDate).toLocaleDateString("en-GB")
                : "-"}
            </p>
            <p className="text-sm text-gray-600">
              Due:{" "}
              {loan.repaymentDue
                ? new Date(loan.repaymentDue).toLocaleDateString("en-GB")
                : "-"}
            </p>

            {loan.status === "pending" && (
              <div className="flex gap-3 mt-3">
                <button
                  onClick={() =>
                    setConfirmModal({
                      open: true,
                      loanId: loan._id,
                      action: "approved",
                    })
                  }
                  className="flex-1 bg-green-500 text-white px-3 py-1.5 rounded-lg shadow hover:bg-green-600 transition"
                >
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
                  className="flex-1 bg-red-500 text-white px-3 py-1.5 rounded-lg shadow hover:bg-red-600 transition"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ✅ Confirmation Modal */}
      {confirmModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              {confirmModal.action === "approved"
                ? "Approve Loan Request"
                : "Reject Loan Request"}
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to{" "}
              <span className="font-bold">
                {confirmModal.action === "approved" ? "APPROVE" : "REJECT"}
              </span>{" "}
              this loan?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelAction}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`px-4 py-2 rounded-lg text-white shadow ${
                  confirmModal.action === "approved"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {confirmModal.action === "approved" ? "Approve" : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
