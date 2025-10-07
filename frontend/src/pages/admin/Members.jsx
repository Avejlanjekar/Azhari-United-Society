// import { useState, useEffect } from "react";
// import axiosClient from "../../api/axiosClient";
// import { Loader2, AlertCircle } from "lucide-react";

// export default function Members() {
//     const [summary, setSummary] = useState(null);
//     const [members, setMembers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setLoading(true);
//                 const [summaryRes, membersRes] = await Promise.all([
//                     axiosClient.get("/loan/members/summary"),
//                     axiosClient.get("/loan/members"),
//                 ]);
//                 setSummary(summaryRes.data);
//                 setMembers(membersRes.data);
//                 setError(null);
//             } catch (err) {
//                 console.error(err);
//                 setError("Failed to fetch data");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);


//     return (
//         <div className="p-6 bg-gray-50 min-h-screen">
//             <h2 className="text-3xl font-bold mb-6 text-gray-800">
//                 Members Overview
//             </h2>

//             {/* Loading */}
//             {loading && (
//                 <div className="flex justify-center items-center py-10 text-gray-600">
//                     <Loader2 className="h-6 w-6 animate-spin" />
//                     <span className="ml-2">Loading...</span>
//                 </div>
//             )}

//             {/* Error */}
//             {error && (
//                 <div className="flex items-center text-red-700 bg-red-100 p-4 rounded-xl shadow-sm">
//                     <AlertCircle className="h-5 w-5 mr-2" />
//                     {error}
//                 </div>
//             )}

//             {/* Summary Cards */}
//             {summary && (
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
//                     <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
//                         <h3 className="text-sm font-medium text-gray-500">
//                             Total Deposits
//                         </h3>
//                         <p className="text-2xl font-bold text-green-600 mt-2">
//                             ₹{summary.totalDeposits.toLocaleString()}
//                         </p>
//                     </div>

//                     <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
//                         <h3 className="text-sm font-medium text-gray-500">Active Loans</h3>
//                         <p className="text-2xl font-bold text-blue-600 mt-2">
//                             {summary.activeLoans.toLocaleString()}
//                         </p>
//                     </div>

//                     <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
//                         <h3 className="text-sm font-medium text-gray-500">
//                             Active Loan Amount
//                         </h3>
//                         <p className="text-2xl font-bold text-indigo-600 mt-2">
//                             ₹{summary.activeLoansAmount.toLocaleString()}
//                         </p>
//                     </div>

//                     <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
//                         <h3 className="text-sm font-medium text-gray-500">
//                             Total Fines Collected
//                         </h3>
//                         <p className="text-2xl font-bold text-red-600 mt-2">
//                             ₹{summary.totalFine.toLocaleString()}
//                         </p>
//                     </div>
//                 </div>
//             )}

//             {/* Members Table */}
//             {!loading && !error && (
//                 <div className="p-4">
//                     <div className="bg-white shadow rounded-2xl p-4">
//                         <table className="min-w-full table-auto text-left">
//                             <thead className="bg-gray-100 text-gray-700">
//                                 <tr>
//                                     <th className="p-2">Name</th>
//                                     <th className="p-2">Phone</th>
//                                     {/* <th className="p-2">Email</th> */}
//                                     <th className="p-2">Total Deposited</th>
//                                     <th className="p-2">Active Loan</th>
//                                     <th className="p-2">Loan Amount</th>
//                                     <th className="p-2">Due Date</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {members.map((member) => {
//                                     const activeLoan = member.activeLoan;

//                                     return (
//                                         <tr key={member._id} className="border-t hover:bg-gray-50 transition">
//                                             <td className="p-2 font-medium text-gray-800">
//                                                 {`${member.name} ${member.middlename || ""} ${member.lastname || ""}`}
//                                             </td>
//                                             <td className="p-2 text-gray-600">{member.phone || "-"}</td>
//                                             {/* <td className="p-2 text-gray-600">{member.email || "-"}</td> */}
//                                             <td className="p-2 text-green-600 font-semibold">
//                                                 ₹{(member.deposits || 0).toLocaleString()}
//                                             </td>
//                                             <td className="p-2">
//                                                 <span className={`px-2 py-1 rounded text-xs font-medium ${member.activeLoan ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
//                                                     }`}>
//                                                     {member.activeLoan ? "Yes" : "No"}
//                                                 </span>
//                                             </td>
//                                             <td className="p-2 text-blue-600">
//                                                 {member?.activeLoan?.amount
//                                                     ? `₹${member.activeLoan.amount.toLocaleString("en-IN")}`
//                                                     : "-"}
//                                             </td>
//                                             <td className="p-2 text-gray-600">
//                                                 {member?.activeLoan?.repaymentDue
//                                                     ? new Date(member.activeLoan.repaymentDue).toLocaleDateString("en-IN", {
//                                                         day: "2-digit", month: "short", year: "numeric"
//                                                     })
//                                                     : "-"}
//                                             </td>
//                                         </tr>

//                                     );
//                                 })}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import { Loader2, AlertCircle } from "lucide-react";

export default function Members() {
  const [summary, setSummary] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [summaryRes, membersRes] = await Promise.all([
          axiosClient.get("/loan/members/summary"),
          axiosClient.get("/loan/members"),
        ]);
        setSummary(summaryRes.data);
        setMembers(membersRes.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Members Overview
      </h2>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center py-10 text-gray-600">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading...</span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center text-red-700 bg-red-100 p-4 rounded-xl shadow-sm">
          <AlertCircle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
          <div className="bg-white shadow-sm rounded-2xl p-4 md:p-6 border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500">
              Total Deposits
            </h3>
            <p className="text-xl md:text-2xl font-bold text-green-600 mt-2">
              ₹{summary.totalDeposits.toLocaleString()}
            </p>
          </div>

          <div className="bg-white shadow-sm rounded-2xl p-4 md:p-6 border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500">Active Loans</h3>
            <p className="text-xl md:text-2xl font-bold text-blue-600 mt-2">
              {summary.activeLoans.toLocaleString()}
            </p>
          </div>

          <div className="bg-white shadow-sm rounded-2xl p-4 md:p-6 border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500">
              Active Loan Amount
            </h3>
            <p className="text-xl md:text-2xl font-bold text-indigo-600 mt-2">
              ₹{summary.activeLoansAmount.toLocaleString()}
            </p>
          </div>

          <div className="bg-white shadow-sm rounded-2xl p-4 md:p-6 border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500">
              Total Fines Collected
            </h3>
            <p className="text-xl md:text-2xl font-bold text-red-600 mt-2">
              ₹{summary.totalFine.toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {/* Members Table / Cards */}
      {!loading && !error && (
        <div className="p-2 md:p-4">
          <div className="bg-white shadow rounded-2xl p-4 overflow-x-auto hidden md:block">
            {/* Desktop Table */}
            <table className="min-w-full table-auto text-left">
              <thead className="bg-gray-100 text-gray-700 text-sm">
                <tr>
                  <th className="p-2">#</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Phone</th>
                  <th className="p-2">Total Deposited</th>
                  <th className="p-2">Active Loan</th>
                  <th className="p-2">Loan Amount</th>
                  <th className="p-2">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member, i) => (
                  <tr
                    key={member._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="border p-3 text-center text-gray-800">{i + 1}</td>

                    <td className="p-2 font-medium text-gray-800">
                      {`${member.name} ${member.middlename || ""} ${member.lastname || ""
                        }`}
                    </td>
                    <td className="p-2 text-gray-600">{member.phone || "-"}</td>
                    <td className="p-2 text-green-600 font-semibold">
                      ₹{(member.deposits || 0).toLocaleString()}
                    </td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${member.activeLoan
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                          }`}
                      >
                        {member.activeLoan ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="p-2 text-blue-600">
                      {member?.activeLoan?.amount
                        ? `₹${member.activeLoan.amount.toLocaleString("en-IN")}`
                        : "-"}
                    </td>
                    <td className="p-2 text-gray-600">
                      {member?.activeLoan?.repaymentDue
                        ? new Date(
                          member.activeLoan.repaymentDue
                        ).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {members.map((member) => (
              <div
                key={member._id}
                className="bg-gradient-to-br from-white to-gray-50 shadow-md rounded-2xl p-5 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                {/* Member Name */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 tracking-wide">
                  {`${member.name} ${member.middlename || ""} ${member.lastname || ""}`}
                </h3>

                {/* Phone */}
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  📞 <span>{member.phone || "-"}</span>
                </p>

                {/* Deposits */}
                <p className="text-sm text-emerald-600 font-semibold mt-1">
                   Total Contributed:{" "}
                  <span className="text-gray-800">
                    ₹{(member.deposits || 0).toLocaleString()}
                  </span>
                </p>

                {/* Loan Status */}
                <p className="text-sm text-blue-600 font-semibold mt-1">
                  Loan:{" "}
                  <span
                    className={`px-2 py-0.5 rounded-lg text-xs font-medium ${member.activeLoan
                        ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                        : "bg-gray-200 text-gray-600 border border-gray-300"
                      }`}
                  >
                    {member.activeLoan ? "Active" : "No"}
                  </span>
                </p>

                {/* Loan Amount */}
                <p className="text-sm text-blue-600 mt-1">
                  Amount:{" "}
                  <span className="text-gray-800 font-medium">
                    {member?.activeLoan?.amount
                      ? `₹${member.activeLoan.amount.toLocaleString("en-IN")}`
                      : "-"}
                  </span>
                </p>

                {/* Due Date */}
                <p className="text-sm text-red-600 mt-1">
                  📅 Due:{" "}
                  <span className="text-gray-800">
                    {member?.activeLoan?.repaymentDue
                      ? new Date(member.activeLoan.repaymentDue).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )
                      : "-"}
                  </span>
                </p>
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
}
