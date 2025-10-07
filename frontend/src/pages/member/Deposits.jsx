// import { useState, useEffect } from "react";
// import axiosClient from "../../api/axiosClient";

// export default function Deposits() {
//   const [month, setMonth] = useState("");
//   const [year, setYear] = useState(new Date().getFullYear());
//   const [screenshot, setScreenshot] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [deposits, setDeposits] = useState([]);

//   // Fetch deposit history
//   useEffect(() => {
//     fetchDeposits();
//   }, []);

//   const fetchDeposits = async () => {
//     try {
//       const res = await axiosClient.get("/deposit-proofs/history");
//       setDeposits(res.data || []); // directly use res.data (because backend sends deposits array)
//     } catch (err) {
//       console.error(err);
//     }
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!month || !year || !screenshot) {
//       setMessage("⚠️ Please fill all fields and upload a screenshot.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("month", month);
//     formData.append("year", year);
//     formData.append("screenshot", screenshot);

//     try {
//       setLoading(true);
//       setMessage("");
//       await axiosClient.post("/deposit-proofs/submit", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setMessage("✅ Deposit proof submitted successfully!");
//       setMonth("");
//       setYear(new Date().getFullYear());
//       setScreenshot(null);
//       fetchDeposits();
//     } catch (err) {
//       setMessage("❌ Error submitting deposit proof.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6 space-y-10">
//       {/* Page Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <h1 className="text-3xl font-bold text-gray-800">💰 My Deposits</h1>
//         <p className="text-sm text-gray-500">
//           Manage your monthly deposit proofs and view history.
//         </p>
//       </div>

//       {/* Upload Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 space-y-6"
//       >
//         <h2 className="text-xl font-semibold text-gray-700 border-b pb-3">
//           Upload Deposit Proof
//         </h2>

//         {/* Fields */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Month <span className="text-red-500">*</span>
//             </label>
//             <select
//               value={month}
//               onChange={(e) => setMonth(e.target.value)}
//               className="w-full border border-gray-300 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
//             >
//               <option value="">Select Month</option>
//               {[
//                 "January",
//                 "February",
//                 "March",
//                 "April",
//                 "May",
//                 "June",
//                 "July",
//                 "August",
//                 "September",
//                 "October",
//                 "November",
//                 "December",
//               ].map((m, i) => (
//                 <option key={i} value={i + 1}>
//                   {m}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Year <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="number"
//               value={year}
//               onChange={(e) => setYear(e.target.value)}
//               className="w-full border border-gray-300 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
//               min="2023"
//               max="2100"
//             />
//           </div>
//         </div>

//         {/* <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Screenshot <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="file"
//             onChange={(e) => setScreenshot(e.target.files[0])}
//             accept="image/*"
//             className="w-full border border-gray-300 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
//           />
//         </div> */}

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Screenshot <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="file"
//             onChange={(e) => setScreenshot(e.target.files[0])}
//             accept="image/*"
//             className="w-full border border-gray-300 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
//           />

//           {/* Preview with Remove Button */}
//           {screenshot && (
//             <div className="mt-4 flex items-center gap-4">
//               <img
//                 src={URL.createObjectURL(screenshot)}
//                 alt="Preview"
//                 className="w-24 h-24 object-cover rounded-xl border border-gray-300"
//               />
//               <button
//                 type="button"
//                 onClick={() => setScreenshot(null)}
//                 className="bg-red-600 text-white px-4 py-1 rounded-xl hover:bg-red-700 transition"
//               >
//                 Remove
//               </button>
//             </div>
//           )}
//         </div>


//         {/* Status Message */}
//         {message && (
//           <div
//             className={`text-sm font-medium px-4 py-2 rounded-lg ${message.startsWith("✅")
//               ? "bg-green-50 text-green-700"
//               : message.startsWith("❌")
//                 ? "bg-red-50 text-red-700"
//                 : "bg-yellow-50 text-yellow-700"
//               }`}
//           >
//             {message}
//           </div>
//         )}

//         {/* Submit Button */}
//         <div className="flex justify-end">
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium shadow hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? "Submitting..." : "Submit Proof"}
//           </button>
//         </div>
//       </form>

//       {/* Deposit History */}
//       <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 text-gray-900">
//         <h2 className="text-xl font-semibold text-gray-800 mb-6">
//           Deposit History
//         </h2>

//         {deposits.length === 0 ? (
//           <p className="text-gray-500 text-sm">No deposits found.</p>
//         ) : (
//           <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-md">
//             <table className="w-full text-sm text-left border-collapse">
//               <thead>
//                 <tr className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
//                   <th className="p-3 border-b border-gray-200">Month</th>
//                   <th className="p-3 border-b border-gray-200">Year</th>
//                   <th className="p-3 border-b border-gray-200">Status</th>
//                   <th className="p-3 border-b border-gray-200">Screenshot</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {deposits.map((d) => {
//                   // Convert month number to month name
//                   const monthNames = [
//                     "January",
//                     "February",
//                     "March",
//                     "April",
//                     "May",
//                     "June",
//                     "July",
//                     "August",
//                     "September",
//                     "October",
//                     "November",
//                     "December",
//                   ];
//                   const monthName = monthNames[d.month - 1] || "Unknown";

//                   return (
//                     <tr key={d._id} className="hover:bg-gray-50 transition-colors">
//                       <td className="p-3 border-b border-gray-200 text-gray-800">{monthName}</td>
//                       <td className="p-3 border-b border-gray-200 text-gray-800">{d.year}</td>
//                       <td className="p-3 border-b border-gray-200">
//                         <span
//                           className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${d.status === "approved"
//                             ? "bg-green-100 text-green-700"
//                             : d.status === "pending"
//                               ? "bg-yellow-100 text-yellow-700"
//                               : "bg-red-100 text-red-700"
//                             }`}
//                         >
//                           {d.status}
//                         </span>
//                       </td>
//                       <td className="p-3 border-b border-gray-200 text-gray-800">
//                         {d.filePath ? (
//                           <a
//                             href={`${import.meta.env.VITE_API_BASE_URL}/${d.filePath}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 hover:underline"
//                           >
//                             View
//                           </a>
//                         ) : (
//                           <span className="text-gray-400">No file</span>
//                         )}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>



//     </div>
//   );
// }
import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import { Loader2, CheckCircle, XCircle, FileText } from "lucide-react";

export default function Deposits() {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    fetchDeposits();
  }, []);

  const fetchDeposits = async () => {
    try {
      const res = await axiosClient.get("/deposit-proofs/history");
      setDeposits(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!month || !year || !screenshot) {
      setMessage("⚠️ Please fill all fields and upload a screenshot.");
      return;
    }
    if (!month || !year ) {
      setMessage("⚠️ Please fill all fields and upload a screenshot.");
      return;
    }

    const formData = new FormData();
    formData.append("month", month);
    formData.append("year", year);
    formData.append("screenshot", screenshot);

    try {
      setLoading(true);
      setMessage("");
      await axiosClient.post("/deposit-proofs/submit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("✅ Deposit proof submitted successfully!");
      setMonth("");
      setYear(new Date().getFullYear());
      setScreenshot(null);
      fetchDeposits();
    } catch (err) {
      setMessage("❌ Error submitting deposit proof.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          💰 My Deposits
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Manage your monthly deposit proofs and view history.
        </p>
      </div>

      {/* Upload Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 sm:p-6 rounded-2xl shadow-md border border-gray-100 space-y-6"
      >
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700 border-b pb-2 sm:pb-3">
          Upload Deposit Proof
        </h2>

        {/* Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Month <span className="text-red-500">*</span>
            </label>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            >
              <option value="">Select Month</option>
              {[
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December",
              ].map((m, i) => (
                <option key={i} value={i + 1}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              min="2023"
              max="2100"
            />
          </div>
        </div>

        {/* Screenshot */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Screenshot <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            onChange={(e) => setScreenshot(e.target.files[0])}
            accept="image/*"
            className="w-full border border-gray-300 rounded-xl p-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />

          {/* Preview */}
          {screenshot && (
            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <img
                src={URL.createObjectURL(screenshot)}
                alt="Preview"
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border border-gray-300"
              />
              <button
                type="button"
                onClick={() => setScreenshot(null)}
                className="bg-red-600 text-white px-4 py-1.5 rounded-xl text-sm hover:bg-red-700 transition"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {/* Status Message */}
        {message && (
          <div
            className={`text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded-lg ${message.startsWith("✅")
              ? "bg-green-50 text-green-700"
              : message.startsWith("❌")
                ? "bg-red-50 text-red-700"
                : "bg-yellow-50 text-yellow-700"
              }`}
          >
            {message}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center sm:justify-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-blue-600 text-white px-5 sm:px-6 py-2.5 rounded-xl font-medium shadow hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {loading ? "Submitting..." : "Submit Proof"}
          </button>
        </div>
      </form>

      {/* Deposit History */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md border border-gray-100 text-gray-900">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
          Deposit History
        </h2>

        {deposits.length === 0 ? (
          <p className="text-gray-500 text-xs sm:text-sm">No deposits found.</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-md">
            <table className="w-full text-xs sm:text-sm text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
                  <th className="p-2 sm:p-3 border-b border-gray-200">Month</th>
                  <th className="p-2 sm:p-3 border-b border-gray-200">Year</th>
                  <th className="p-2 sm:p-3 border-b border-gray-200">Status</th>
                  <th className="p-2 sm:p-3 border-b border-gray-200">Screenshot</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {deposits.map((d) => {
                  const monthNames = [
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December",
                  ];
                  const monthName = monthNames[d.month - 1] || "Unknown";

                  return (
                    <tr key={d._id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-2 sm:p-3 border-b border-gray-200">{monthName}</td>
                      <td className="p-2 sm:p-3 border-b border-gray-200">{d.year}</td>
                      <td className="p-2 sm:p-3 border-b border-gray-200">
                        <span
                          className={`inline-block px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${d.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : d.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                            }`}
                        >
                          {d.status}
                        </span>
                      </td>
                      <td className="p-2 sm:p-3 border-b border-gray-200">
                        {d.filePath ? (
                          <a
                            href={d.fileUrl}
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
