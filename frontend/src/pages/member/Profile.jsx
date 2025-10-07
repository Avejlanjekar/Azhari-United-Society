// import { useEffect, useState } from "react";
// import axiosClient from "../../api/axiosClient";
// import { Loader2, User, Wallet, CreditCard, Clock } from "lucide-react";

// export default function Profile() {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axiosClient.get("/auth/profile");
//         setProfile(res.data.profile);
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="flex justify-center items-center h-64 text-red-500 font-medium">
//         Failed to load profile.
//       </div>
//     );
//   }

//   const { basicInfo, stats, recentDeposits, recentLoans } = profile;

//   return (
//     <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
//       {/* ✅ Welcome Message */}
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">
//         Welcome, {profile.basicInfo.name} 👋
//       </h1>
//       {/* Profile Card */}
//       <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 border-l-4 border-indigo-500 hover:shadow-xl transition">
//         <div className="flex items-center gap-3 mb-3">
//           <User className="text-indigo-600 h-7 w-7" />
//           <h2 className="text-2xl font-bold text-gray-800">Profile</h2>
//         </div>
//         <p className="text-gray-700">
//           <span className="font-semibold text-indigo-600">Name:</span>{" "}
//           {basicInfo.name}
//         </p>
//         <p className="text-gray-700">
//           <span className="font-semibold text-indigo-600">Email:</span>{" "}
//           {basicInfo.email}
//         </p>
//         <p className="text-gray-700">
//           <span className="font-semibold text-indigo-600">Phone:</span>{" "}
//           {basicInfo.phone}
//         </p>
//         <p className="text-gray-700">
//           <span className="font-semibold text-indigo-600">Role:</span>{" "}
//           {basicInfo.role}
//         </p>
//         <p className="text-gray-700">
//           <span className="font-semibold text-indigo-600">Joined On:</span>{" "}
//           {new Date(basicInfo.joinedOn).toLocaleDateString()}
//         </p>
//       </div>

//       {/* Stats Section */}
//       <div className="grid md:grid-cols-2 gap-6 mb-6">
//         {/* Total Deposit */}
//         <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-green-500 hover:shadow-xl transition">
//           <div className="flex items-center gap-3 mb-2">
//             <Wallet className="text-green-600 h-6 w-6" />
//             <h2 className="text-lg font-bold text-gray-800">Total Deposit</h2>
//           </div>
//           <p className="text-green-700 text-2xl font-extrabold">
//             ₹{stats.totalDeposited}
//           </p>
//         </div>

//         {/* Recent Activity */}
//         <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-purple-500 hover:shadow-xl transition">
//           <div className="flex items-center gap-3 mb-2">
//             <Clock className="text-purple-600 h-6 w-6" />
//             <h2 className="text-lg font-bold text-gray-800">Recent Activity</h2>
//           </div>
//           <p className="text-gray-700">
//             <span className="font-medium text-purple-600">Last Deposit:</span>{" "}
//             {stats.lastDeposit
//               ? new Date(stats.lastDeposit.date).toLocaleDateString()
//               : "No deposits yet"}
//           </p>
//           <p className="text-gray-700">
//             <span className="font-medium text-purple-600">Last Loan:</span>{" "}
//             {stats.lastLoan
//               ? new Date(stats.lastLoan.statusDate).toLocaleDateString()
//               : "No loans yet"}
//           </p>
//         </div>
//       </div>

//       {/* Recent Deposits */}
//       <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 border-l-4 border-green-500 hover:shadow-xl transition">
//         <div className="flex items-center gap-3 mb-3">
//           <Wallet className="text-green-600 h-6 w-6" />
//           <h2 className="text-xl font-bold text-gray-800">Recent Deposits</h2>
//         </div>
//         {recentDeposits.length > 0 ? (
//           <ul className="space-y-3">
//             {recentDeposits.map((deposit, idx) => (
//               <li
//                 key={idx}
//                 className="flex justify-between items-center border-b pb-2 last:border-b-0 hover:bg-green-50 px-2 rounded-md transition"
//               >
//                 <span className="text-gray-800 font-medium">
//                   ₹{deposit.amount}
//                 </span>
//                 <span className="text-sm text-gray-500">
//                   {new Date(deposit.date).toLocaleDateString()}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-600 italic">No deposits yet.</p>
//         )}
//       </div>

//       {/* Recent Loans */}
//       <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-red-500 hover:shadow-xl transition">
//         <div className="flex items-center gap-3 mb-3">
//           <CreditCard className="text-red-600 h-6 w-6" />
//           <h2 className="text-xl font-bold text-gray-800">Recent Loans</h2>
//         </div>
//         {recentLoans.length > 0 ? (
//           <ul className="space-y-3">
//             {recentLoans.map((loan, idx) => (
//               <li
//                 key={idx}
//                 className="flex justify-between items-center border-b pb-2 last:border-b-0 hover:bg-red-50 px-2 rounded-md transition"
//               >
//                 <span
//                   className={`font-medium ${loan.status === "approved"
//                       ? "text-green-700"
//                       : loan.status === "pending"
//                         ? "text-yellow-600"
//                         : loan.status === "repaid"
//                           ? "text-blue-700"
//                           : "text-red-700"
//                     }`}
//                 >
//                   ₹{loan.amount} - {loan.status}
//                 </span>
//                 <span className="text-sm text-gray-500">
//                   {loan.statusDate
//                     ? new Date(loan.statusDate).toLocaleDateString()
//                     : "N/A"}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-600 italic">No loans yet.</p>
//         )}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { Loader2, User, Wallet, CreditCard, Clock } from "lucide-react";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosClient.get("/auth/profile");
        setProfile(res.data.profile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500 font-semibold text-lg">
        Failed to load profile.
      </div>
    );
  }

  const { basicInfo, stats, recentDeposits, recentLoans } = profile;

  return (
    <div className="p-4 sm:p-8 bg-gradient-to-br from-indigo-50 via-white to-indigo-100 min-h-screen font-inter">
      {/* Welcome Message */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-800 mb-8 text-center sm:text-left tracking-tight">
         Welcome, <span className="text-indigo-600">{basicInfo.name}</span>
      </h1>

      {/* Profile Card */}
      <div className="bg-white shadow-xl rounded-2xl p-6 mb-8 border border-gray-100 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
        <div className="flex items-center gap-3 mb-4">
          <User className="text-indigo-600 h-7 w-7" />
          <h2 className="text-xl font-bold text-gray-900">Profile</h2>
        </div>
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold text-indigo-600">Name:</span>{" "}
            {basicInfo.name}
          </p>
          <p>
            <span className="font-semibold text-indigo-600">Email:</span>{" "}
            {basicInfo.email}
          </p>
          <p>
            <span className="font-semibold text-indigo-600">Phone:</span>{" "}
            {basicInfo.phone}
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {/* Total Deposit */}
        <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 shadow-md rounded-2xl p-6 border border-emerald-200 hover:shadow-lg transition">
          <div className="flex items-center gap-3 mb-2">
            <Wallet className="text-emerald-600 h-6 w-6" />
            <h2 className="text-lg font-semibold text-emerald-900">Total Deposit</h2>
          </div>
          <p className="text-emerald-700 text-2xl sm:text-3xl font-extrabold">
            ₹{stats.totalDeposited}
          </p>
        </div>

        {/* Recent Activity */}
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 shadow-md rounded-2xl p-6 border border-purple-200 hover:shadow-lg transition">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="text-purple-600 h-6 w-6" />
            <h2 className="text-lg font-semibold text-purple-900">Recent Activity</h2>
          </div>
          <p className="text-gray-700">
            <span className="font-medium text-purple-600">Last Deposit:</span>{" "}
            {stats.lastDeposit
              ? new Date(stats.lastDeposit.date).toLocaleDateString()
              : "No deposits yet"}
          </p>
          <p className="text-gray-700">
            <span className="font-medium text-purple-600">Last Loan:</span>{" "}
            {stats.lastLoan
              ? new Date(stats.lastLoan.statusDate).toLocaleDateString()
              : "No loans yet"}
          </p>
        </div>
      </div>

      {/* Recent Deposits */}
      <div className="bg-white shadow-xl rounded-2xl p-6 mb-8 border-l-4 border-emerald-500 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-4">
          <Wallet className="text-emerald-600 h-6 w-6" />
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            Recent Deposits
          </h2>
        </div>
        {recentDeposits.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {recentDeposits.map((deposit, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center py-3 px-2 hover:bg-emerald-50 rounded-md transition"
              >
                <span className="text-gray-900 font-medium">
                  ₹{deposit.amount}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(deposit.date).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 italic">No deposits yet.</p>
        )}
      </div>

      {/* Recent Loans */}
      <div className="bg-white shadow-xl rounded-2xl p-6 border-l-4 border-rose-500 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-4">
          <CreditCard className="text-rose-600 h-6 w-6" />
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            Recent Loans
          </h2>
        </div>
        {recentLoans.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {recentLoans.map((loan, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center py-3 px-2 hover:bg-rose-50 rounded-md transition"
              >
                <span
                  className={`font-semibold ${
                    loan.status === "approved"
                      ? "text-emerald-700"
                      : loan.status === "pending"
                      ? "text-yellow-600"
                      : loan.status === "repaid"
                      ? "text-blue-700"
                      : "text-rose-700"
                  }`}
                >
                  ₹{loan.amount} — {loan.status}
                </span>
                <span className="text-sm text-gray-500">
                  {loan.statusDate
                    ? new Date(loan.statusDate).toLocaleDateString()
                    : "N/A"}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 italic">No loans yet.</p>
        )}
      </div>
    </div>
  );
}
