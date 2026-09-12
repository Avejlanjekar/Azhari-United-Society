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
// import { useEffect, useState } from "react";
// import axiosClient from "../../api/axiosClient";

// export default function AllLoans() {
//   const [loans, setLoans] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchLoans = async () => {
//       try {
//         const res = await axiosClient.get("/loan/all");
//         setLoans(res.data.filter((loan) => loan.status === "approved" || loan.status === "repayment_requested"));
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
//     <div className="p-4 sm:p-6">
//       <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 border-b-4 border-blue-500 inline-block pb-1">
//         All Active Loans
//       </h1>

//       {/* ✅ Table for medium & large screens */}
//       <div className="hidden md:block overflow-x-auto shadow-xl rounded-2xl">
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

//       {/* ✅ Card layout for mobile */}
//       <div className="grid grid-cols-1 gap-4 md:hidden">
//         {loans.length > 0 ? (
//           loans.map((loan) => (
//             <div
//               key={loan._id}
//               className="bg-white shadow-md rounded-xl p-4 border border-gray-200"
//             >
//               <p className="text-lg font-semibold text-gray-800">
//                 {loan.member?.name} {loan.member?.middlename}{" "}
//                 {loan.member?.lastname}
//               </p>
//               <p className="text-sm text-gray-600">📞 {loan.member?.phone}</p>
//               <p className="text-green-600 font-semibold mt-2">
//                 Loan: ₹{loan.amount}
//               </p>
//               <p className="text-gray-700">
//                 Guarantor:{" "}
//                 {loan.guarantor
//                   ? `${loan.guarantor.name} ${loan.guarantor.middlename} ${loan.guarantor.lastname}`
//                   : "N/A"}
//               </p>
//               <p className="text-gray-500 text-sm">
//                 Issued: {new Date(loan.issueDate).toLocaleDateString("en-GB")}
//               </p>
//               <p className="text-red-600 text-sm font-medium">
//                 Due: {new Date(loan.repaymentDue).toLocaleDateString("en-GB")}
//               </p>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500 font-medium">No loans found</p>
//         )}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import {
  Loader2,
  WalletCards,
  User,
  Phone,
  IndianRupee,
  Users,
  CalendarDays,
  Clock3,
  CheckCircle2,
} from "lucide-react";

export default function AllLoans() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await axiosClient.get("/loan/all");

        setLoans(
          res.data.filter(
            (loan) =>
              loan.status === "approved" ||
              loan.status === "repayment_requested"
          )
        );
      } catch (err) {
        console.error("Error fetching loans:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <p className="text-sm sm:text-base font-medium text-slate-600">
            Loading loans...
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
                All Active Loans
              </h1>

              <p className="mt-1 text-sm text-slate-500 sm:text-base">
                View all currently approved and active member loans.
              </p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-5 rounded-xl border border-blue-100 bg-blue-50 p-4 sm:mb-6 sm:rounded-2xl sm:p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
              <CheckCircle2 className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-blue-600">
                Active Loans
              </p>
              <p className="text-xl font-bold text-slate-900">
                {loans.length}
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="px-5 py-4 text-left font-semibold">
                    Member
                  </th>
                  <th className="px-5 py-4 text-left font-semibold">
                    Phone
                  </th>
                  <th className="px-5 py-4 text-left font-semibold">
                    Loan Amount
                  </th>
                  <th className="px-5 py-4 text-left font-semibold">
                    Guarantor
                  </th>
                  <th className="px-5 py-4 text-left font-semibold">
                    Issue Date
                  </th>
                  <th className="px-5 py-4 text-left font-semibold">
                    Repayment Due
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loans.length > 0 ? (
                  loans.map((loan) => (
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

                          <div>
                            <p className="font-semibold text-slate-800">
                              {loan.member?.name}{" "}
                              {loan.member?.middlename}{" "}
                              {loan.member?.lastname}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Phone className="h-4 w-4 text-slate-400" />
                          <span>{loan.member?.phone || "N/A"}</span>
                        </div>
                      </td>

                      {/* Amount */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1 font-semibold text-emerald-600">
                          <IndianRupee className="h-4 w-4" />
                          <span>{loan.amount}</span>
                        </div>
                      </td>

                      {/* Guarantor */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-slate-700">
                          <Users className="h-4 w-4 text-slate-400" />

                          <span>
                            {loan.guarantor
                              ? `${loan.guarantor.name} ${loan.guarantor.middlename || ""
                                } ${loan.guarantor.lastname || ""
                                }`.trim()
                              : "N/A"}
                          </span>
                        </div>
                      </td>

                      {/* Issue Date */}
                      <td className="px-5 py-4 text-slate-600">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-slate-400" />
                          <span>
                            {new Date(loan.issueDate).toLocaleDateString(
                              "en-GB"
                            )}
                          </span>
                        </div>
                      </td>

                      {/* Repayment Due */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 font-medium text-red-600">
                          <Clock3 className="h-4 w-4" />
                          <span>
                            {new Date(
                              loan.repaymentDue
                            ).toLocaleDateString("en-GB")}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center"
                    >
                      <div className="flex flex-col items-center">
                        <WalletCards className="mb-3 h-10 w-10 text-slate-300" />

                        <p className="font-medium text-slate-600">
                          No active loans found
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                          There are currently no approved active loans.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {loans.length > 0 ? (
            loans.map((loan) => (
              <div
                key={loan._id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between gap-3 border-b border-slate-100 p-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                      <User className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-900">
                        {loan.member?.name}{" "}
                        {loan.member?.middlename}{" "}
                        {loan.member?.lastname}
                      </p>

                      <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                        <Phone className="h-3.5 w-3.5" />
                        <span>
                          {loan.member?.phone || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    Active
                  </span>
                </div>

                {/* Loan Amount */}
                <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Loan Amount
                  </p>

                  <div className="mt-1 flex items-center gap-1 font-bold text-emerald-600">
                    <IndianRupee className="h-5 w-5" />
                    <span className="text-xl">{loan.amount}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4 p-4">
                  {/* Guarantor */}
                  <div className="flex items-start gap-3">
                    <Users className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />

                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Guarantor
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {loan.guarantor
                          ? `${loan.guarantor.name} ${loan.guarantor.middlename || ""
                            } ${loan.guarantor.lastname || ""
                            }`.trim()
                          : "N/A"}
                      </p>
                    </div>
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
                        {new Date(
                          loan.issueDate
                        ).toLocaleDateString("en-GB")}
                      </p>
                    </div>

                    <div className="rounded-xl border border-red-100 bg-red-50 p-3">
                      <div className="flex items-center gap-2 text-red-500">
                        <Clock3 className="h-4 w-4" />
                        <span className="text-xs font-medium uppercase tracking-wide">
                          Repayment Due
                        </span>
                      </div>

                      <p className="mt-2 text-sm font-semibold text-red-600">
                        {new Date(
                          loan.repaymentDue
                        ).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-12 text-center shadow-sm">
              <WalletCards className="mx-auto mb-3 h-10 w-10 text-slate-300" />

              <p className="font-medium text-slate-600">
                No active loans found
              </p>

              <p className="mt-1 text-sm text-slate-400">
                There are currently no approved active loans.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
