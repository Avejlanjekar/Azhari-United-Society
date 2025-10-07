// import { useEffect, useState } from "react";
// import axiosClient from "../../api/axiosClient";
// import { Loader2, FileText, Download } from "lucide-react";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import * as XLSX from "xlsx";

// export default function AllDeposits() {
//   const [deposits, setDeposits] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [filters, setFilters] = useState({
//     month: "",
//     year: new Date().getFullYear(),
//     status: "",
//     search: "",
//   });

//   // ✅ Fetch deposits
//   const fetchDeposits = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axiosClient.get("/deposit-proofs/admin/deposits", {
//         params: filters,
//       });
//       if (data.success) {
//         setDeposits(data.deposits);
//       }
//     } catch (error) {
//       console.error("Error fetching deposits:", error);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchDeposits();
//   }, [filters]);

//   // ✅ Export PDF
//   const exportPDF = () => {
//     const doc = new jsPDF();
//     doc.text("All Deposits Report", 14, 10);
//     doc.autoTable({
//       head: [["Member", "Email", "Phone", "Amount", "Status", "Date"]],
//       body: deposits.map((d) => [
//         `${d.member?.name} ${d.member?.middlename} ${d.member?.lastname}`,
//         d.member?.email,
//         d.member?.phone,
//         d.amount,
//         d.status,
//         new Date(d.date).toLocaleDateString(),
//       ]),
//     });
//     doc.save("deposits_report.pdf");
//   };

//   // ✅ Export Excel
//   const exportExcel = () => {
//     const worksheetData = deposits.map((d) => ({
//       Member: `${d.member?.name} ${d.member?.middlename} ${d.member?.lastname}`,
//       Email: d.member?.email,
//       Phone: d.member?.phone,
//       Amount: d.amount,
//       Status: d.status,
//       Date: new Date(d.date).toLocaleDateString(),
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(worksheetData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Deposits");
//     XLSX.writeFile(workbook, "deposits_report.xlsx");
//   };

//   return (
//     <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800 tracking-tight">
//         All Deposits
//       </h1>

//       {/* Filters */}
//       <div className="flex flex-wrap gap-3 mb-6 bg-white shadow-md p-4 rounded-xl border border-gray-200">
//         <input
//           type="number"
//           placeholder="Year"
//           className="border rounded-lg p-2 w-28 focus:ring-2 focus:ring-indigo-400 
//                outline-none text-white placeholder-gray-400 font-medium"
//           value={filters.year}
//           onChange={(e) => setFilters({ ...filters, year: e.target.value })}
//         />

//         <select
//           className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 
//                outline-none text-white font-medium"
//           value={filters.month}
//           onChange={(e) => setFilters({ ...filters, month: e.target.value })}
//         >
//           <option value="" className="text-gray-500">
//             All Months
//           </option>
//           {[...Array(12).keys()].map((m) => (
//             <option key={m + 1} value={m + 1}>
//               {new Date(0, m).toLocaleString("default", { month: "long" })}
//             </option>
//           ))}
//         </select>

//         {/* <select
//           className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 
//                outline-none text-white font-medium"
//           value={filters.status}
//           onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//         >
//           <option value="" className="text-gray-500">
//             All Status
//           </option>
//           <option value="paid" className="text-green-600">✅ Paid</option>
//           <option value="pending" className="text-yellow-600">⏳ Pending</option>
//         </select> */}

//         <input
//           type="text"
//           placeholder="Search member..."
//           className="border rounded-lg p-2 w-56 focus:ring-2 focus:ring-indigo-400 
//                outline-none text-white placeholder-gray-400 font-medium"
//           value={filters.search}
//           onChange={(e) => setFilters({ ...filters, search: e.target.value })}
//         />

//         {/* Export buttons */}
//         {/* <button
//           onClick={exportPDF}
//           className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 
//                rounded-lg flex items-center gap-2 font-medium shadow-md"
//         >
//           <FileText size={16} /> Export PDF
//         </button> */}
//         <button
//           onClick={exportExcel}
//           className="bg-green-500 hover:bg-green-600 transition text-white px-4 py-2 
//                rounded-lg flex items-center gap-2 font-medium shadow-md"
//         >
//           <Download size={16} /> Export Excel
//         </button>
//       </div>

//       {/* Table */}
//       {loading ? (
//         <div className="flex justify-center items-center h-40">
//           <Loader2 className="animate-spin text-indigo-500" size={32} />
//         </div>
//       ) : (
//         <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200 bg-white">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-indigo-600 text-white">
//                 <th className="p-3 text-left">Member</th>
//                 <th className="p-3 text-left">Email</th>
//                 <th className="p-3 text-left">Phone</th>
//                 <th className="p-3 text-right">Amount</th>
//                 <th className="p-3 text-center">Status</th>
//                 <th className="p-3 text-center">Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {deposits.map((d) => (
//                 <tr
//                   key={d._id}
//                   className="border-t hover:bg-gray-50 transition text-gray-700"
//                 >
//                   <td className="p-3">
//                     {d.member?.name} {d.member?.middlename} {d.member?.lastname}
//                   </td>
//                   <td className="p-3">{d.member?.email}</td>
//                   <td className="p-3">{d.member?.phone}</td>
//                   <td className="p-3 text-right font-semibold text-green-600">
//                     ₹{d.amount}
//                   </td>
//                   <td
//                     className={`p-3 text-center font-medium ${d.status === "paid"
//                       ? "text-green-600"
//                       : "text-yellow-600"
//                       }`}
//                   >
//                     {d.status === "paid" ? "✅ Paid" : "⏳ Pending"}
//                   </td>
//                   <td className="p-3 text-center">
//                     {new Date(d.date).toLocaleDateString()}
//                   </td>
//                 </tr>
//               ))}
//               {deposits.length === 0 && (
//                 <tr>
//                   <td colSpan="6" className="p-6 text-center text-gray-500">
//                     No deposits found 🚫
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { Loader2, Download } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

export default function AllDeposits() {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(false);
  const today = new Date();
  const [filters, setFilters] = useState({
    month: today.getMonth() + 1, // current month (1–12)
    year: today.getFullYear(),
    status: "",
    search: "",
  });


  // ✅ Fetch deposits
  const fetchDeposits = async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get("/deposit-proofs/admin/deposits", {
        params: filters,
      });
      if (data.success) {
        setDeposits(data.deposits);
      }
    } catch (error) {
      console.error("Error fetching deposits:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDeposits();
  }, [filters]);

  // ✅ Export Excel
  const exportExcel = () => {
    const worksheetData = deposits.map((d) => ({
      Member: `${d.member?.name} ${d.member?.middlename} ${d.member?.lastname}`,
      Email: d.member?.email,
      Phone: d.member?.phone,
      Amount: d.amount,
      Status: d.status,
      Date: new Date(d.date).toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Deposits");
    XLSX.writeFile(workbook, "deposits_report.xlsx");
  };

  return (
    <div className="p-4 md:p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 tracking-tight">
        All Deposits
      </h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-6 bg-white shadow-md p-4 rounded-xl border border-gray-200">
        <input
          type="number"
          placeholder="Year"
          className="border rounded-lg p-2 w-full sm:w-28 focus:ring-2 focus:ring-indigo-400 
            outline-none text-white-700 placeholder-gray-400 font-medium"
          value={filters.year}
          onChange={(e) => setFilters({ ...filters, year: e.target.value })}
        />

        <select
          className="border rounded-lg p-2 w-full sm:w-auto focus:ring-2 focus:ring-indigo-400 
            outline-none text-white-700 font-medium"
          value={filters.month}
          onChange={(e) => setFilters({ ...filters, month: e.target.value })}
        >
          <option value="">All Months</option>
          {[...Array(12).keys()].map((m) => (
            <option key={m + 1} value={m + 1}>
              {new Date(0, m).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search member..."
          className="border rounded-lg p-2 w-full sm:w-56 focus:ring-2 focus:ring-indigo-400 
            outline-none text-white-700 placeholder-gray-400 font-medium"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />

        <button
          onClick={exportExcel}
          className="bg-green-500 hover:bg-green-600 transition text-white px-4 py-2 
            rounded-lg flex items-center justify-center gap-2 font-medium shadow-md w-full sm:w-auto"
        >
          <Download size={16} /> Export Excel
        </button>
      </div>

      {/* Table (Desktop) */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin text-indigo-500" size={32} />
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto shadow-lg rounded-xl border border-gray-200 bg-white">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-indigo-600 text-white">
                  <th className="p-3 text-left">Member</th>
                  {/* <th className="p-3 text-left">Email</th> */}
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-right">Amount</th>
                  <th className="p-3 text-right">Month & Year</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Date</th>
                </tr>
              </thead>
              <tbody>
                {deposits.map((d) => (
                  <tr
                    key={d._id}
                    className="border-t hover:bg-gray-50 transition text-gray-700"
                  >
                    <td className="p-3">
                      {d.member?.name} {d.member?.middlename}{" "}
                      {d.member?.lastname}
                    </td>
                    {/* <td className="p-3">{d.member?.email}</td> */}
                    <td className="p-3">{d.member?.phone}</td>
                    <td className="p-3 text-right font-semibold text-green-600">
                      ₹{d.amount}
                    </td>
                    <td className="p-3 text-right font-semibold text-green-600">
                      {d.month} {d.year}
                    </td>
                    <td
                      className={`p-3 text-center font-medium ${d.status === "paid"
                        ? "text-green-600"
                        : "text-yellow-600"
                        }`}
                    >
                      {d.status === "paid" ? "✅ Paid" : "⏳ Pending"}
                    </td>
                    <td className="p-3 text-center">
                      {new Date(d.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {deposits.length === 0 && (
                  <tr>
                    <td colSpan="6" className="p-6 text-center text-gray-500">
                      No deposits found 🚫
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {deposits.map((d) => (
              <div
                key={d._id}
                className="bg-white shadow rounded-xl p-4 border border-gray-200"
              >
                <h3 className="font-bold text-gray-800 text-lg mb-1">
                  {d.member?.name} {d.member?.middlename} {d.member?.lastname}
                </h3>
                <p className="text-sm text-gray-600">📧 {d.member?.email}</p>
                <p className="text-sm text-gray-600">📞 {d.member?.phone}</p>
                <p className="text-sm font-semibold text-green-600">
                  💰 ₹{d.amount}
                </p>
                <p
                  className={`text-sm font-medium ${d.status === "paid" ? "text-green-700" : "text-yellow-600"
                    }`}
                >
                  {d.status === "paid" ? "✅ Paid" : "⏳ Pending"}
                </p>
                <p className="text-sm text-gray-500">
                  📅 {new Date(d.date).toLocaleDateString()}
                </p>
              </div>
            ))}
            {deposits.length === 0 && (
              <p className="text-center text-gray-500">No deposits found 🚫</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
