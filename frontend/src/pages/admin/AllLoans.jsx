// import { useEffect, useState } from "react";
// import axiosClient from "../../api/axiosClient";

// export default function AllLoans() {
//   const [loans, setLoans] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchLoans = async () => {
//       try {
//         const res = await axiosClient.get("/loan/all");
//         setLoans(res.data);
//       } catch (err) {
//         console.error("Error fetching loans:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchLoans();
//   }, []);

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-64">
//         <p className="text-lg font-medium text-blue-600 animate-pulse">
//           Loading loans...
//         </p>
//       </div>
//     );

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b-4 border-blue-500 inline-block pb-1">
//         All Loans
//       </h1>

//       <div className="overflow-x-auto shadow-xl rounded-2xl">
//         <table className="min-w-full border-collapse bg-white text-sm">
//           <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
//             <tr>
//               <th className="px-6 py-3 text-left font-semibold">Member Name</th>
//               <th className="px-6 py-3 text-left font-semibold">Phone</th>
//               <th className="px-6 py-3 text-left font-semibold">Loan Amount</th>
//               <th className="px-6 py-3 text-left font-semibold">Guarantor</th>
//               <th className="px-6 py-3 text-left font-semibold">Issue Date</th>
//               <th className="px-6 py-3 text-left font-semibold">Repayment Due</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loans.length > 0 ? (
//               loans.map((loan) => (
//                 <tr
//                   key={loan._id}
//                   className="hover:bg-blue-50 transition-colors duration-200"
//                 >
//                   <td className="px-6 py-3 border-b text-gray-700 font-medium">
//                     {loan.member?.name} {loan.member?.middlename}{" "}
//                     {loan.member?.lastname}
//                   </td>
//                   <td className="px-6 py-3 border-b text-gray-600">
//                     {loan.member?.phone}
//                   </td>
//                   <td className="px-6 py-3 border-b text-green-600 font-semibold">
//                     ₹{loan.amount}
//                   </td>
//                   <td className="px-6 py-3 border-b text-gray-700">
//                     {loan.guarantor
//                       ? `${loan.guarantor.name} ${loan.guarantor.middlename} ${loan.guarantor.lastname}`
//                       : "N/A"}
//                   </td>
//                   <td className="px-6 py-3 border-b text-gray-500">
//                     {new Date(loan.issueDate).toLocaleDateString("en-GB")}
//                   </td>
//                   <td className="px-6 py-3 border-b text-red-600 font-medium">
//                     {new Date(loan.repaymentDue).toLocaleDateString("en-GB")}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="6"
//                   className="px-6 py-6 text-center text-gray-500 font-medium"
//                 >
//                   No loans found
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

export default function AllLoans() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await axiosClient.get("/loan/all");
        setLoans(res.data.filter((loan) => loan.status === "approved" || loan.status === "repayment_requested"));
      } catch (err) {
        console.error("Error fetching loans:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-medium text-blue-600 animate-pulse">
          Loading loans...
        </p>
      </div>
    );

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b-4 border-blue-500 inline-block pb-1">
        All Active Loans
      </h1>

      {/* ✅ Table for medium & large screens */}
      <div className="hidden md:block overflow-x-auto shadow-xl rounded-2xl">
        <table className="min-w-full border-collapse bg-white text-sm">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Member Name</th>
              <th className="px-6 py-3 text-left font-semibold">Phone</th>
              <th className="px-6 py-3 text-left font-semibold">Loan Amount</th>
              <th className="px-6 py-3 text-left font-semibold">Guarantor</th>
              <th className="px-6 py-3 text-left font-semibold">Issue Date</th>
              <th className="px-6 py-3 text-left font-semibold">Repayment Due</th>
            </tr>
          </thead>
          <tbody>
            {loans.length > 0 ? (
              loans.map((loan) => (
                <tr
                  key={loan._id}
                  className="hover:bg-blue-50 transition-colors duration-200"
                >
                  <td className="px-6 py-3 border-b text-gray-700 font-medium">
                    {loan.member?.name} {loan.member?.middlename}{" "}
                    {loan.member?.lastname}
                  </td>
                  <td className="px-6 py-3 border-b text-gray-600">
                    {loan.member?.phone}
                  </td>
                  <td className="px-6 py-3 border-b text-green-600 font-semibold">
                    ₹{loan.amount}
                  </td>
                  <td className="px-6 py-3 border-b text-gray-700">
                    {loan.guarantor
                      ? `${loan.guarantor.name} ${loan.guarantor.middlename} ${loan.guarantor.lastname}`
                      : "N/A"}
                  </td>
                  <td className="px-6 py-3 border-b text-gray-500">
                    {new Date(loan.issueDate).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-6 py-3 border-b text-red-600 font-medium">
                    {new Date(loan.repaymentDue).toLocaleDateString("en-GB")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-6 text-center text-gray-500 font-medium"
                >
                  No loans found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Card layout for mobile */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {loans.length > 0 ? (
          loans.map((loan) => (
            <div
              key={loan._id}
              className="bg-white shadow-md rounded-xl p-4 border border-gray-200"
            >
              <p className="text-lg font-semibold text-gray-800">
                {loan.member?.name} {loan.member?.middlename}{" "}
                {loan.member?.lastname}
              </p>
              <p className="text-sm text-gray-600">📞 {loan.member?.phone}</p>
              <p className="text-green-600 font-semibold mt-2">
                Loan: ₹{loan.amount}
              </p>
              <p className="text-gray-700">
                Guarantor:{" "}
                {loan.guarantor
                  ? `${loan.guarantor.name} ${loan.guarantor.middlename} ${loan.guarantor.lastname}`
                  : "N/A"}
              </p>
              <p className="text-gray-500 text-sm">
                Issued: {new Date(loan.issueDate).toLocaleDateString("en-GB")}
              </p>
              <p className="text-red-600 text-sm font-medium">
                Due: {new Date(loan.repaymentDue).toLocaleDateString("en-GB")}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 font-medium">No loans found</p>
        )}
      </div>
    </div>
  );
}
