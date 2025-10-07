// import { useState, useEffect } from "react";
// import axiosClient from "../../api/axiosClient";

// export default function Loans() {
//   const [amount, setAmount] = useState(5000);
//   const [guarantorId, setGuarantorId] = useState("");
//   const [members, setMembers] = useState([]);
//   const [loanHistory, setLoanHistory] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     fetchMembers();
//     fetchLoanHistory();
//   }, []);

//   const fetchMembers = async () => {
//     try {
//       const res = await axiosClient.get("/loan/memberss");
//       setMembers(res.data);
//     } catch (err) {
//       console.error("Error fetching members:", err);
//     }
//   };

//   const fetchLoanHistory = async () => {
//     try {
//       const res = await axiosClient.get("/loan/history");
//       setLoanHistory(res.data);
//     } catch (err) {
//       console.error("Error fetching loan history:", err);
//     }
//   };

//   const requestLoan = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");
//     try {
//       const res = await axiosClient.post("/loan/request", { amount, guarantorId });
//       setMessage(res.data.message);
//       fetchLoanHistory();
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Error requesting loan");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const statusBadge = (status) => {
//     switch (status) {
//       case "approved":
//         return "bg-green-100 text-green-700";
//       case "rejected":
//         return "bg-red-100 text-red-700";
//       case "repaid":
//         return "bg-blue-100 text-blue-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-8">
//       <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">
//         💰 Loan Request
//       </h1>

//       {/* Loan Request Form */}
//       <form
//         onSubmit={requestLoan}
//         className="bg-white p-5 sm:p-6 rounded-2xl shadow-lg space-y-5"
//       >
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Loan Amount</label>
//             <select
//               value={amount}
//               onChange={(e) => setAmount(Number(e.target.value))}
//               className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             >
//               <option value={5000}>₹5000</option>
//               <option value={10000}>₹10000</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-2">Select Guarantor</label>
//             <select
//               value={guarantorId}
//               onChange={(e) => setGuarantorId(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
//               required
//             >
//               <option value="">-- Choose Guarantor --</option>
//               {members
//                 .filter((m) => m._id !== localStorage.getItem("userId"))
//                 .map((m) => (
//                   <option key={m._id} value={m._id}>
//                     {m.name} {m.middlename} {m.lastname}
//                   </option>
//                 ))}
//             </select>
//           </div>
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full sm:w-auto px-6 py-2 rounded-lg text-white font-medium transition-colors ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
//             }`}
//         >
//           {loading ? "Submitting..." : "Request Loan"}
//         </button>

//         {message && (
//           <div className="mt-3 text-center sm:text-left text-gray-800 bg-gray-100 p-3 rounded-lg">
//             {message}
//           </div>
//         )}
//       </form>

//       {/* Loan History */}
//       <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6">
//         <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-5">
//           📜 Loan History
//         </h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200 table-auto">
//             <thead className="bg-gray-100 sticky top-0 z-10">
//               <tr>
//                 {["Amount", "Guarantor", "Status", "Issue Date", "Due Date", "Repaid Date"].map(
//                   (col) => (
//                     <th
//                       key={col}
//                       className="px-4 py-3 text-left text-gray-700 font-semibold text-sm uppercase tracking-wider"
//                     >
//                       {col}
//                     </th>
//                   )
//                 )}
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-100">
//               {loanHistory.length > 0 ? (
//                 loanHistory.map((loan, index) => (
//                   <tr
//                     key={loan._id}
//                     className={`transition-colors duration-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                       } hover:bg-gray-100`}
//                   >
//                     <td className="px-4 py-3 font-medium text-gray-800">₹{loan.amount}</td>
//                     {/* <td className="px-4 py-3 text-gray-700">{loan.guarantor?.name || "-"}</td> */}
//                     <td className="px-4 py-3 text-gray-700">{loan.guarantor?`${loan.guarantor.name} ${loan.guarantor.middlename} ${loan.guarantor.lastname}`: "-"}</td>
//                     <td className="px-4 py-3 text-center">
//                       <span
//                         className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${statusBadge(
//                           loan.status
//                         )}`}
//                       >
//                         {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3 text-gray-700">
//                       {loan.issueDate ? new Date(loan.issueDate).toLocaleDateString() : "-"}
//                     </td>
//                     <td className="px-4 py-3 text-gray-700">
//                       {loan.repaymentDue ? new Date(loan.repaymentDue).toLocaleDateString() : "-"}
//                     </td>
//                     <td className="px-4 py-3 text-gray-700">
//                       {loan.repaidDate ? new Date(loan.repaidDate).toLocaleDateString() : "-"}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="text-center py-6 text-gray-400 italic">
//                     No loans found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";

export default function Loans() {
  const [amount, setAmount] = useState(5000);
  const [guarantorId, setGuarantorId] = useState("");
  const [members, setMembers] = useState([]);
  const [loanHistory, setLoanHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchMembers();
    fetchLoanHistory();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await axiosClient.get("/loan/memberss");
      setMembers(res.data);
    } catch (err) {
      console.error("Error fetching members:", err);
    }
  };

  const fetchLoanHistory = async () => {
    try {
      const res = await axiosClient.get("/loan/history");
      setLoanHistory(res.data);
    } catch (err) {
      console.error("Error fetching loan history:", err);
    }
  };

  const requestLoan = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await axiosClient.post("/loan/request", {
        amount,
        guarantorId,
      });
      setMessage(res.data.message);
      fetchLoanHistory();
    } catch (err) {
      setMessage(err.response?.data?.message || "Error requesting loan");
    } finally {
      setLoading(false);
    }
  };

  const statusBadge = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "repaid":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">
        💰 Loan Request
      </h1>

      {/* Loan Request Form */}
      <form
        onSubmit={requestLoan}
        className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg space-y-5"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Loan Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loan Amount
            </label>
            <select
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value={5000}>₹5000</option>
              <option value={10000}>₹10000</option>
            </select>
          </div>

          {/* Guarantor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Guarantor
            </label>
            <select
              value={guarantorId}
              onChange={(e) => setGuarantorId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            >
              <option value="">-- Choose Guarantor --</option>
              {members
                .filter((m) => m._id !== localStorage.getItem("userId"))
                .map((m) => (
                  <option key={m._id} value={m._id}>
                    {m.name} {m.middlename} {m.lastname}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full sm:w-auto px-6 py-3 rounded-lg text-white font-medium transition-colors text-sm sm:text-base ${loading
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
            }`}
        >
          {loading ? "Submitting..." : "Request Loan"}
        </button>

        {message && (
          <div className="mt-3 text-xs sm:text-sm text-center sm:text-left text-gray-800 bg-gray-100 p-3 rounded-lg">
            {message}
          </div>
        )}
      </form>

      {/* Loan History */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-5">
          📜 Loan History
        </h2>

        {/* Mobile view -> Cards */}
        <div className="space-y-4 sm:hidden">
          {loanHistory.length > 0 ? (
            loanHistory.map((loan) => (
              <div
                key={loan._id}
                className="border rounded-lg p-4 shadow-sm bg-gray-50"
              >
                <p className="font-semibold text-gray-800">
                  Amount: ₹{loan.amount}
                </p>
                <p className="text-gray-700">
                  Guarantor:{" "}
                  {loan.guarantor
                    ? `${loan.guarantor.name} ${loan.guarantor.middlename} ${loan.guarantor.lastname}`
                    : "-"}
                </p>
                <p className="text-gray-700">
                  Status:{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${statusBadge(
                      loan.status
                    )}`}
                  >
                    {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                  </span>
                </p>
                <p className="text-gray-600">
                  Issue:{" "}
                  {loan.issueDate
                    ? new Date(loan.issueDate).toLocaleDateString()
                    : "-"}
                </p>
                <p className="text-gray-600">
                  Due:{" "}
                  {loan.repaymentDue
                    ? new Date(loan.repaymentDue).toLocaleDateString()
                    : "-"}
                </p>
                <p className="text-gray-600">
                  Repaid:{" "}
                  {loan.repaidDate
                    ? new Date(loan.repaidDate).toLocaleDateString()
                    : "-"}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 italic">No loans found.</p>
          )}
        </div>

        {/* Desktop view -> Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 table-auto text-sm">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                {[
                  "Amount",
                  "Guarantor",
                  "Status",
                  "Issue Date",
                  "Due Date",
                  "Repaid Date",
                ].map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-left text-gray-700 font-semibold uppercase tracking-wider"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {loanHistory.length > 0 ? (
                loanHistory.map((loan, index) => (
                  <tr
                    key={loan._id}
                    className={`transition-colors duration-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100`}
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">
                      ₹{loan.amount}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {loan.guarantor
                        ? `${loan.guarantor.name} ${loan.guarantor.middlename} ${loan.guarantor.lastname}`
                        : "-"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${statusBadge(
                          loan.status
                        )}`}
                      >
                        {loan.status.charAt(0).toUpperCase() +
                          loan.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {loan.issueDate
                        ? new Date(loan.issueDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {loan.repaymentDue
                        ? new Date(loan.repaymentDue).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {loan.repaidDate
                        ? new Date(loan.repaidDate).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-400 italic"
                  >
                    No loans found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
