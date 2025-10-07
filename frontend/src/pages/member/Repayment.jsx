// // src/pages/Repayment.jsx
// import { useState, useEffect } from "react";
// import axiosClient from "../../api/axiosClient";

// export default function Repayment() {
//   const [activeLoan, setActiveLoan] = useState(null);
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchLoans = async () => {
//       try {
//         setLoading(true);

//         // ✅ Fetch active loan
//         const activeRes = await axiosClient.get("/loan/activeloan");
//         setActiveLoan(activeRes.data.length > 0 ? activeRes.data[0] : null);

//         // ✅ Fetch repayment history
//         const historyRes = await axiosClient.get("/loan/repaymenthistory");
//         setHistory(historyRes.data || []);

//       } catch (err) {
//         console.error("Error fetching repayment data", err);
//         setMessage("❌ Failed to load repayment data");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchLoans();
//   }, []);

//   const handleRepaymentRequest = async (loanId) => {
//     try {
//       setMessage("⏳ Processing repayment request...");
//       const res = await axiosClient.post(`/loan/${loanId}/request-repayment`);
//       setMessage(res.data.message);

//       // Refresh data after repayment request
//       const activeRes = await axiosClient.get("/loan/activeloan");
//       setActiveLoan(activeRes.data.length > 0 ? activeRes.data[0] : null);

//       const historyRes = await axiosClient.get("/loan/repaymenthistory");
//       setHistory(historyRes.data || []);
//     } catch (err) {
//       setMessage(err.response?.data?.message || "⚠️ Error submitting repayment request");
//     }
//   };

//   if (loading) return <p className="p-6 text-gray-600">Loading repayment data...</p>;

//   return (
//     <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-2xl">
//       <h1 className="text-3xl font-bold mb-6 text-indigo-700">💰 Loan Repayment</h1>

//       {message && (
//         <div className="mb-5 p-3 rounded-lg text-sm font-medium 
//                         bg-blue-50 text-blue-700 border border-blue-200">
//           {message}
//         </div>
//       )}

//       {/* Active Loan */}
//       <section className="mb-10">
//         <h2 className="text-xl font-semibold mb-3 text-gray-800">📌 Active Loan</h2>
//         {activeLoan ? (
//           <div className="p-5 border rounded-xl shadow-sm bg-gray-50 hover:bg-gray-100 transition">
//             <p className="text-gray-700"><strong>Amount:</strong> <span className="text-green-700 font-semibold">₹{activeLoan.amount}</span></p>
//             <p className="text-gray-700"><strong>Status:</strong> <span className="text-indigo-600">{activeLoan.status}</span></p>
//             <p className="text-gray-700"><strong>Issue Date:</strong> <span className="text-red-600">{new Date(activeLoan.issueDate).toLocaleDateString()}</span></p>

//             <p className="text-gray-700"><strong>Due Date:</strong> <span className="text-red-600">{new Date(activeLoan.repaymentDue).toLocaleDateString()}</span></p>
//             <button
//               onClick={() => handleRepaymentRequest(activeLoan._id)}
//               className="mt-4 px-5 py-2 bg-green-600 text-white font-medium rounded-lg shadow hover:bg-green-700 transition"
//             >
//               ✅ Request Repayment
//             </button>
//           </div>
//         ) : (
//           <p className="text-gray-500 italic">No active loan available for repayment.</p>
//         )}
//       </section>

//       {/* Repayment History */}
//       <section>
//         <h2 className="text-xl font-semibold mb-3 text-gray-800">📜 Repayment History</h2>
//         {history.length > 0 ? (
//           <div className="space-y-4">
//             {history.map((loan) => (
//               <div key={loan._id} className="p-5 border rounded-xl shadow-sm bg-gray-50 hover:bg-gray-100 transition">
//                 <p className="text-gray-700"><strong>Amount:</strong> <span className="text-green-700 font-semibold">₹{loan.amount}</span></p>
//                 <p className="text-gray-700"><strong>Status:</strong> <span className="text-indigo-600">{loan.status}</span></p>
//                 <p className="text-gray-700"><strong>Repaid On:</strong>
//                   <span className="text-gray-900 ml-1">
//                     {loan.repaidDate ? new Date(loan.repaidDate).toLocaleDateString() : "⏳ "}
//                   </span>
//                 </p>
//                 {loan.fine > 0 && (
//                   <p className="text-gray-700"><strong>Fine:</strong> <span className="text-red-600 font-semibold">₹{loan.fine}</span></p>
//                 )}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500 italic">No repayment history found.</p>
//         )}
//       </section>
//     </div>
//   );
// }
// src/pages/Repayment.jsx



import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";

export default function Repayment() {
  const [activeLoan, setActiveLoan] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [screenshot, setScreenshot] = useState(null);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        setLoading(true);

        // ✅ Fetch active loan
        const activeRes = await axiosClient.get("/loan/activeloan");
        setActiveLoan(activeRes.data.length > 0 ? activeRes.data[0] : null);

        // ✅ Fetch repayment history
        const historyRes = await axiosClient.get("/loan/repaymenthistory");
        setHistory(historyRes.data || []);
      } catch (err) {
        console.error("Error fetching repayment data", err);
        setMessage("❌ Failed to load repayment data");
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, []);

  const handleRepaymentRequest = async (loanId) => {
    if (!screenshot) {
      setMessage("⚠️ Please upload repayment screenshot before submitting.");
      return;
    }

    try {
      setMessage("⏳ Uploading repayment screenshot...");

      const formData = new FormData();
      formData.append("screenshot", screenshot);

      const res = await axiosClient.post(
        `/loan/${loanId}/request-repayment`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMessage(res.data.message);
      setScreenshot(null);

      // Refresh data after repayment request
      const activeRes = await axiosClient.get("/loan/activeloan");
      setActiveLoan(activeRes.data.length > 0 ? activeRes.data[0] : null);

      const historyRes = await axiosClient.get("/loan/repaymenthistory");
      setHistory(historyRes.data || []);
    } catch (err) {
      setMessage(err.response?.data?.message || "⚠️ Error submitting repayment request");
    }
  };

  if (loading) return <p className="p-4 sm:p-6 text-gray-600">Loading repayment data...</p>;

  return (
    <div className="p-4 sm:p-6 max-w-full sm:max-w-3xl mx-auto bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-indigo-700 text-center sm:text-left">
        💰 Loan Repayment
      </h1>

      {message && (
        <div className="mb-4 sm:mb-5 p-3 rounded-lg text-sm sm:text-base font-medium 
                        bg-blue-50 text-blue-700 border border-blue-200">
          {message}
        </div>
      )}

      {/* Active Loan */}
      <section className="mb-8 sm:mb-10">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800">📌 Active Loan</h2>
        {activeLoan ? (
          <div className="p-4 sm:p-5 border rounded-xl shadow-sm bg-gray-50 hover:bg-gray-100 transition">
            <p className="text-gray-700"><strong>Amount:</strong> <span className="text-green-700 font-semibold">₹{activeLoan.amount}</span></p>
            <p className="text-gray-700"><strong>Status:</strong> <span className="text-indigo-600">{activeLoan.status}</span></p>
            <p className="text-gray-700"><strong>Issue Date:</strong> <span className="text-red-600">{new Date(activeLoan.issueDate).toLocaleDateString()}</span></p>
            <p className="text-gray-700"><strong>Due Date:</strong> <span className="text-red-600">{new Date(activeLoan.repaymentDue).toLocaleDateString()}</span></p>

            {/* File Upload */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setScreenshot(e.target.files[0])}
              className="mt-3 block w-full text-sm text-gray-600 border rounded-lg cursor-pointer focus:outline-none"
            />

            <button
              onClick={() => handleRepaymentRequest(activeLoan._id)}
              className="mt-4 w-full sm:w-auto px-5 py-2 bg-green-600 text-white font-medium rounded-lg shadow hover:bg-green-700 transition"
            >
              ✅ Request Repayment
            </button>
          </div>
        ) : (
          <p className="text-gray-500 italic">No active loan available for repayment.</p>
        )}
      </section>

      {/* Repayment History */}
      <section>
        <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800">📜 Repayment History</h2>
        {history.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {history.map((loan) => (
              <div key={loan._id} className="p-4 sm:p-5 border rounded-xl shadow-sm bg-gray-50 hover:bg-gray-100 transition">
                <p className="text-gray-700"><strong>Amount:</strong> <span className="text-green-700 font-semibold">₹{loan.amount}</span></p>
                <p className="text-gray-700"><strong>Status:</strong> <span className="text-indigo-600">{loan.status}</span></p>
                <p className="text-gray-700"><strong>Repaid On:</strong>
                  <span className="text-gray-900 ml-1">
                    {loan.repaidDate ? new Date(loan.repaidDate).toLocaleDateString() : "⏳ "}
                  </span>
                </p>
                {loan.fine > 0 && (
                  <p className="text-gray-700"><strong>Fine:</strong> <span className="text-red-600 font-semibold">₹{loan.fine}</span></p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No repayment history found.</p>
        )}
      </section>
    </div>
  );
}
