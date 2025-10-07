// import { useEffect, useState } from "react";
// import axiosClient from "../../api/axiosClient";

// export default function ApproveRepayment() {
//   const [loans, setLoans] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchLoans = async () => {
//     try {
//       const res = await axiosClient.get("/loan/all");
//       // Filter loans where repayment is requested
//       setLoans(res.data.filter((loan) => loan.status === "repayment_requested"));
//     } catch (err) {
//       console.error("Error fetching loans:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const confirmRepayment = async (loanId) => {
//     if (!window.confirm("Are you sure you want to confirm repayment?")) return;
//     try {
//       await axiosClient.post(`/loan/${loanId}/confirm-repayment`);
//       alert("✅ Loan repayment confirmed");
//       fetchLoans(); // refresh list
//     } catch (err) {
//       console.error("Error confirming repayment:", err);
//       alert("❌ Failed to confirm repayment");
//     }
//   };

//   useEffect(() => {
//     fetchLoans();
//   }, []);

//   if (loading)
//     return <p className="p-6 text-lg text-gray-600 animate-pulse">Loading loans...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-extrabold mb-6 text-gray-800 border-b-2 border-indigo-500 pb-2">
//         Approve Loan Repayments
//       </h1>

//       <div className="overflow-x-auto shadow-xl rounded-xl border border-gray-200 bg-white">
//         <table className="min-w-full border-collapse text-sm">
//           <thead className="bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-800 uppercase text-xs font-semibold">
//             <tr>
//               <th className="border px-4 py-3 text-left">Member</th>
//               <th className="border px-4 py-3 text-left">Loan Amount</th>
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
//                   <td className="border px-4 py-3 text-gray-600">
//                     {new Date(loan.issueDate).toLocaleDateString("en-GB")}
//                   </td>
//                   <td className="border px-4 py-3 text-gray-600">
//                     {new Date(loan.repaymentDue).toLocaleDateString("en-GB")}
//                   </td>
//                   <td className="border px-4 py-3 text-center">
//                     <button
//                       onClick={() => confirmRepayment(loan._id)}
//                       className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 hover:shadow-lg transition-all duration-200"
//                     >
//                       Confirm
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="5"
//                   className="border px-4 py-6 text-center text-gray-500 italic"
//                 >
//                   No repayment requests found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { FileText } from "lucide-react";

export default function ApproveRepayment() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Modal state
  const [repaymentModal, setRepaymentModal] = useState({
    open: false,
    loanId: null,
    action: null, // "confirm" | "reject"
  });

  const fetchLoans = async () => {
    try {
      const res = await axiosClient.get("/loan/all");
      setLoans(res.data.filter((loan) => loan.status === "repayment_requested"));
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
        alert("✅ Loan repayment confirmed");
      } else {
        await axiosClient.post(
          `/loan/${repaymentModal.loanId}/reject-repayment`
        );
        alert("❌ Loan repayment rejected");
      }
      fetchLoans();
    } catch (err) {
      console.error("Error updating repayment:", err);
      alert("⚠️ Failed to update repayment");
    } finally {
      setRepaymentModal({ open: false, loanId: null, action: null });
    }
  };

  const cancelRepaymentAction = () => {
    setRepaymentModal({ open: false, loanId: null, action: null });
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  if (loading)
    return (
      <p className="p-6 text-lg text-gray-600 animate-pulse">
        Loading loans...
      </p>
    );

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-extrabold mb-6 text-gray-800 border-b-2 border-indigo-500 pb-2">
        Approve Loan Repayments
      </h1>

      {/* ✅ Desktop Table */}
      <div className="hidden md:block overflow-x-auto shadow-xl rounded-xl border border-gray-200 bg-white">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-800 uppercase text-xs font-semibold">
            <tr>
              <th className="border px-4 py-3 text-left">Member</th>
              <th className="border px-4 py-3 text-left">Loan Amount</th>
              <th className="border px-4 py-3 text-left">View payment Proof</th>
              <th className="border px-4 py-3 text-left">Issue Date</th>
              <th className="border px-4 py-3 text-left">Due Date</th>
              <th className="border px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {loans.length > 0 ? (
              loans.map((loan) => (
                <tr
                  key={loan._id}
                  className="hover:bg-indigo-50 transition-colors duration-200"
                >
                  <td className="border px-4 py-3 font-medium text-gray-900">
                    {loan.member?.name} {loan.member?.middlename}{" "}
                    {loan.member?.lastname}
                  </td>

                  <td className="border px-4 py-3 font-semibold text-green-700">
                    ₹{loan.amount}
                  </td>

                  <td className="p-4">
                    {loan.filePath ? (
                      <a
                        href={loan.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium"
                      >
                        <FileText className="w-4 h-4" /> View
                      </a>
                    ) : (
                      <span className="text-gray-400 italic">
                        No payment proof
                      </span>
                    )}
                  </td>

                  <td className="border px-4 py-3 text-gray-600">
                    {new Date(loan.issueDate).toLocaleDateString("en-GB")}
                  </td>
                  <td className="border px-4 py-3 text-gray-600">
                    {new Date(loan.repaymentDue).toLocaleDateString("en-GB")}
                  </td>
                  <td className="border px-4 py-3 text-center space-x-2">
                    <button
                      onClick={() =>
                        setRepaymentModal({
                          open: true,
                          loanId: loan._id,
                          action: "confirm",
                        })
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 hover:shadow-lg transition-all duration-200"
                    >
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
                      className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 hover:shadow-lg transition-all duration-200"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="border px-4 py-6 text-center text-gray-500 italic"
                >
                  No repayment requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Mobile Cards */}
      <div className="md:hidden space-y-4">
        {loans.length > 0 ? (
          loans.map((loan) => (
            <div
              key={loan._id}
              className="bg-white shadow-md rounded-lg border border-gray-200 p-4"
            >
              <p className="font-bold text-gray-900">
                {loan.member?.name} {loan.member?.middlename}{" "}
                {loan.member?.lastname}
              </p>
              <p className="text-green-700 font-semibold">₹{loan.amount}</p>
              <p className="text-gray-600 text-sm">
                Issue: {new Date(loan.issueDate).toLocaleDateString("en-GB")}
              </p>
              <p className="text-gray-600 text-sm">
                Due: {new Date(loan.repaymentDue).toLocaleDateString("en-GB")}
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() =>
                    setRepaymentModal({
                      open: true,
                      loanId: loan._id,
                      action: "confirm",
                    })
                  }
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg shadow hover:bg-green-700 transition"
                >
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
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg shadow hover:bg-red-700 transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 italic">
            No repayment requests found
          </p>
        )}
      </div>

      {/* ✅ Confirmation Modal */}
      {repaymentModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              {repaymentModal.action === "confirm"
                ? "Confirm Repayment"
                : "Reject Repayment"}
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to{" "}
              <span className="font-bold">
                {repaymentModal.action === "confirm"
                  ? "CONFIRM"
                  : "REJECT"}
              </span>{" "}
              this repayment request?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelRepaymentAction}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleRepaymentAction}
                className={`px-4 py-2 rounded-lg text-white shadow ${
                  repaymentModal.action === "confirm"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {repaymentModal.action === "confirm" ? "Confirm" : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
