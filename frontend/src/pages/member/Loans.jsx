
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
//       const res = await axiosClient.post("/loan/request", {
//         amount,
//         guarantorId,
//       });
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
//         className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg space-y-5"
//       >
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           {/* Loan Amount */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Loan Amount
//             </label>
//             <select
//               value={amount}
//               onChange={(e) => setAmount(Number(e.target.value))}
//               className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             >
//               <option value={5000}>₹5000</option>
//               <option value={10000}>₹10000</option>
//             </select>
//           </div>

//           {/* Guarantor */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Select Guarantor
//             </label>
//             <select
//               value={guarantorId}
//               onChange={(e) => setGuarantorId(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-400 focus:outline-none"
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

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full sm:w-auto px-6 py-3 rounded-lg text-white font-medium transition-colors text-sm sm:text-base ${loading
//             ? "bg-blue-300 cursor-not-allowed"
//             : "bg-blue-500 hover:bg-blue-600"
//             }`}
//         >
//           {loading ? "Submitting..." : "Request Loan"}
//         </button>

//         {message && (
//           <div className="mt-3 text-xs sm:text-sm text-center sm:text-left text-gray-800 bg-gray-100 p-3 rounded-lg">
//             {message}
//           </div>
//         )}
//       </form>

//       {/* Loan History */}
//       <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
//         <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-5">
//           📜 Loan History
//         </h2>

//         {/* Mobile view -> Cards */}
//         <div className="space-y-4 sm:hidden">
//           {loanHistory.length > 0 ? (
//             loanHistory.map((loan) => (
//               <div
//                 key={loan._id}
//                 className="border rounded-lg p-4 shadow-sm bg-gray-50"
//               >
//                 <p className="font-semibold text-gray-800">
//                   Amount: ₹{loan.amount}
//                 </p>
//                 <p className="text-gray-700">
//                   Guarantor:{" "}
//                   {loan.guarantor
//                     ? `${loan.guarantor.name} ${loan.guarantor.middlename} ${loan.guarantor.lastname}`
//                     : "-"}
//                 </p>
//                 <p className="text-gray-700">
//                   Status:{" "}
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs font-semibold ${statusBadge(
//                       loan.status
//                     )}`}
//                   >
//                     {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
//                   </span>
//                 </p>
//                 <p className="text-gray-600">
//                   Issue:{" "}
//                   {loan.issueDate
//                     ? new Date(loan.issueDate).toLocaleDateString()
//                     : "-"}
//                 </p>
//                 <p className="text-gray-600">
//                   Due:{" "}
//                   {loan.repaymentDue
//                     ? new Date(loan.repaymentDue).toLocaleDateString()
//                     : "-"}
//                 </p>
//                 <p className="text-gray-600">
//                   Repaid:{" "}
//                   {loan.repaidDate
//                     ? new Date(loan.repaidDate).toLocaleDateString()
//                     : "-"}
//                 </p>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-400 italic">No loans found.</p>
//           )}
//         </div>

//         {/* Desktop view -> Table */}
//         <div className="hidden sm:block overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200 table-auto text-sm">
//             <thead className="bg-gray-100 sticky top-0 z-10">
//               <tr>
//                 {[
//                   "Amount",
//                   "Guarantor",
//                   "Status",
//                   "Issue Date",
//                   "Due Date",
//                   "Repaid Date",
//                 ].map((col) => (
//                   <th
//                     key={col}
//                     className="px-4 py-3 text-left text-gray-700 font-semibold uppercase tracking-wider"
//                   >
//                     {col}
//                   </th>
//                 ))}
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
//                     <td className="px-4 py-3 font-medium text-gray-800">
//                       ₹{loan.amount}
//                     </td>
//                     <td className="px-4 py-3 text-gray-700">
//                       {loan.guarantor
//                         ? `${loan.guarantor.name} ${loan.guarantor.middlename} ${loan.guarantor.lastname}`
//                         : "-"}
//                     </td>
//                     <td className="px-4 py-3 text-center">
//                       <span
//                         className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${statusBadge(
//                           loan.status
//                         )}`}
//                       >
//                         {loan.status.charAt(0).toUpperCase() +
//                           loan.status.slice(1)}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3 text-gray-700">
//                       {loan.issueDate
//                         ? new Date(loan.issueDate).toLocaleDateString()
//                         : "-"}
//                     </td>
//                     <td className="px-4 py-3 text-gray-700">
//                       {loan.repaymentDue
//                         ? new Date(loan.repaymentDue).toLocaleDateString()
//                         : "-"}
//                     </td>
//                     <td className="px-4 py-3 text-gray-700">
//                       {loan.repaidDate
//                         ? new Date(loan.repaidDate).toLocaleDateString()
//                         : "-"}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="6"
//                     className="text-center py-6 text-gray-400 italic"
//                   >
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
import {
  Landmark,
  IndianRupee,
  UserCheck,
  CalendarDays,
  Clock3,
  CheckCircle2,
  XCircle,
  RefreshCcw,
  Send,
  History,
  AlertCircle,
} from "lucide-react";

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
      setMessage(
        err.response?.data?.message || "Error requesting loan"
      );
    } finally {
      setLoading(false);
    }
  };

  const statusBadge = (status) => {
    switch (status) {
      case "approved":
        return {
          className: "bg-emerald-50 text-emerald-700 border-emerald-200",
          icon: CheckCircle2,
        };

      case "rejected":
        return {
          className: "bg-red-50 text-red-700 border-red-200",
          icon: XCircle,
        };

      case "repaid":
        return {
          className: "bg-blue-50 text-blue-700 border-blue-200",
          icon: CheckCircle2,
        };

      default:
        return {
          className: "bg-amber-50 text-amber-700 border-amber-200",
          icon: Clock3,
        };
    }
  };

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString() : "-";
  };

  const getGuarantorName = (guarantor) => {
    if (!guarantor) return "-";

    return [guarantor.name, guarantor.middlename, guarantor.lastname]
      .filter(Boolean)
      .join(" ");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-3 py-5 sm:px-6 sm:py-8 lg:px-8">

        {/* ==================================================
            PAGE HEADER
        ================================================== */}

        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <Landmark size={22} />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
                Loan Request
              </h1>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Submit a loan request and track your loan history.
              </p>
            </div>

          </div>
        </div>

        {/* ==================================================
            LOAN REQUEST FORM
        ================================================== */}

        <section className="mb-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:mb-8 sm:rounded-2xl">

          {/* Form Header */}

          <div className="border-b border-slate-200 bg-slate-50/70 px-4 py-4 sm:px-6 sm:py-5">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Send size={19} />
              </div>

              <div>
                <h2 className="text-base font-bold text-slate-900 sm:text-lg">
                  Apply for a Loan
                </h2>

                <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                  Select the loan amount and your guarantor.
                </p>
              </div>

            </div>

          </div>

          {/* Form */}

          <form
            onSubmit={requestLoan}
            className="p-4 sm:p-6 lg:p-7"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* Loan Amount */}

              <div>
                <label
                  htmlFor="loanAmount"
                  className="mb-1.5 block text-sm font-semibold text-slate-700"
                >
                  Loan Amount
                </label>

                <div className="relative">

                  <IndianRupee
                    size={18}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <select
                    id="loanAmount"
                    value={amount}
                    onChange={(e) =>
                      setAmount(Number(e.target.value))
                    }
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-slate-900 outline-none transition hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 sm:text-base"
                  >
                    <option value={5000}>₹5,000</option>
                    <option value={10000}>₹10,000</option>
                  </select>

                </div>
              </div>

              {/* Guarantor */}

              <div>
                <label
                  htmlFor="guarantor"
                  className="mb-1.5 block text-sm font-semibold text-slate-700"
                >
                  Select Guarantor
                </label>

                <div className="relative">

                  <UserCheck
                    size={18}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <select
                    id="guarantor"
                    value={guarantorId}
                    onChange={(e) =>
                      setGuarantorId(e.target.value)
                    }
                    required
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 sm:text-base"
                  >
                    <option value="">
                      Choose Guarantor
                    </option>

                    {members
                      .filter(
                        (m) =>
                          m._id !==
                          localStorage.getItem("userId")
                      )
                      .map((m) => (
                        <option key={m._id} value={m._id}>
                          {m.name} {m.middlename} {m.lastname}
                        </option>
                      ))}
                  </select>

                </div>
              </div>

            </div>

            {/* Selected Amount */}

            <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50/60 p-4">

              <div className="flex items-center justify-between gap-3">

                <div>
                  <p className="text-xs font-medium text-blue-600">
                    Requested Amount
                  </p>

                  <p className="mt-0.5 text-xl font-bold text-slate-900 sm:text-2xl">
                    ₹{amount.toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                  <IndianRupee size={20} />
                </div>

              </div>

            </div>

            {/* Submit */}

            <div className="mt-5">

              <button
                type="submit"
                disabled={loading}
                className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-sm transition sm:w-auto sm:px-6 ${
                  loading
                    ? "cursor-not-allowed bg-blue-300"
                    : "bg-blue-600 hover:bg-blue-700 hover:shadow-md"
                }`}
              >
                {loading ? (
                  <>
                    <RefreshCcw
                      size={18}
                      className="animate-spin"
                    />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Request Loan
                  </>
                )}
              </button>

            </div>

            {/* Message */}

            {message && (
              <div className="mt-4 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">

                <AlertCircle
                  size={18}
                  className="mt-0.5 shrink-0 text-blue-500"
                />

                <p className="leading-5">
                  {message}
                </p>

              </div>
            )}

          </form>
        </section>

        {/* ==================================================
            LOAN HISTORY
        ================================================== */}

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl">

          {/* History Header */}

          <div className="border-b border-slate-200 bg-slate-50/70 px-4 py-4 sm:px-6 sm:py-5">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <History size={19} />
              </div>

              <div>
                <h2 className="text-base font-bold text-slate-900 sm:text-lg">
                  Loan History
                </h2>

                <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                  View your previous and current loan requests.
                </p>
              </div>

            </div>

          </div>

          {/* ==================================================
              MOBILE CARDS
          ================================================== */}

          <div className="space-y-3 p-4 sm:hidden">

            {loanHistory.length > 0 ? (
              loanHistory.map((loan) => {
                const status = statusBadge(loan.status);
                const StatusIcon = status.icon;

                return (
                  <div
                    key={loan._id}
                    className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                  >

                    {/* Card Top */}

                    <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/70 px-4 py-3">

                      <div>
                        <p className="text-xs font-medium text-slate-500">
                          Loan Amount
                        </p>

                        <p className="mt-0.5 text-lg font-bold text-slate-900">
                          ₹{loan.amount}
                        </p>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${status.className}`}
                      >
                        <StatusIcon size={14} />
                        {loan.status
                          ? loan.status.charAt(0).toUpperCase() +
                            loan.status.slice(1)
                          : "Pending"}
                      </span>

                    </div>

                    {/* Card Body */}

                    <div className="divide-y divide-slate-100 px-4">

                      {/* Guarantor */}

                      <div className="flex items-start gap-3 py-3">

                        <UserCheck
                          size={17}
                          className="mt-0.5 shrink-0 text-slate-400"
                        />

                        <div className="min-w-0">
                          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                            Guarantor
                          </p>

                          <p className="mt-0.5 break-words text-sm font-medium text-slate-700">
                            {getGuarantorName(loan.guarantor)}
                          </p>
                        </div>

                      </div>

                      {/* Issue Date */}

                      <div className="flex items-start gap-3 py-3">

                        <CalendarDays
                          size={17}
                          className="mt-0.5 shrink-0 text-slate-400"
                        />

                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                            Issue Date
                          </p>

                          <p className="mt-0.5 text-sm text-slate-700">
                            {formatDate(loan.issueDate)}
                          </p>
                        </div>

                      </div>

                      {/* Due Date */}

                      <div className="flex items-start gap-3 py-3">

                        <Clock3
                          size={17}
                          className="mt-0.5 shrink-0 text-slate-400"
                        />

                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                            Repayment Due
                          </p>

                          <p className="mt-0.5 text-sm text-slate-700">
                            {formatDate(loan.repaymentDue)}
                          </p>
                        </div>

                      </div>

                      {/* Repaid Date */}

                      <div className="flex items-start gap-3 py-3">

                        <CheckCircle2
                          size={17}
                          className="mt-0.5 shrink-0 text-emerald-500"
                        />

                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                            Repaid Date
                          </p>

                          <p className="mt-0.5 text-sm text-slate-700">
                            {formatDate(loan.repaidDate)}
                          </p>
                        </div>

                      </div>

                    </div>

                  </div>
                );
              })
            ) : (
              <div className="py-8 text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <History size={22} />
                </div>

                <p className="mt-3 text-sm font-medium text-slate-600">
                  No loans found
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Your loan history will appear here.
                </p>

              </div>
            )}

          </div>

          {/* ==================================================
              DESKTOP TABLE
          ================================================== */}

          <div className="hidden overflow-x-auto sm:block">

            <table className="min-w-full divide-y divide-slate-200 text-sm">

              <thead className="bg-slate-50">

                <tr>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Amount
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Guarantor
                  </th>

                  <th className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Issue Date
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Due Date
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Repaid Date
                  </th>
                </tr>

              </thead>

              <tbody className="divide-y divide-slate-100 bg-white">

                {loanHistory.length > 0 ? (
                  loanHistory.map((loan) => {
                    const status = statusBadge(loan.status);
                    const StatusIcon = status.icon;

                    return (
                      <tr
                        key={loan._id}
                        className="transition-colors hover:bg-slate-50"
                      >

                        <td className="whitespace-nowrap px-5 py-4">
                          <span className="font-semibold text-slate-900">
                            ₹{loan.amount}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-slate-700">
                          {getGuarantorName(loan.guarantor)}
                        </td>

                        <td className="px-5 py-4 text-center">

                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${status.className}`}
                          >
                            <StatusIcon size={14} />

                            {loan.status
                              ? loan.status.charAt(0).toUpperCase() +
                                loan.status.slice(1)
                              : "Pending"}
                          </span>

                        </td>

                        <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                          {formatDate(loan.issueDate)}
                        </td>

                        <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                          {formatDate(loan.repaymentDue)}
                        </td>

                        <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                          {formatDate(loan.repaidDate)}
                        </td>

                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-5 py-12 text-center"
                    >
                      <div className="flex flex-col items-center">

                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                          <History size={22} />
                        </div>

                        <p className="mt-3 text-sm font-medium text-slate-600">
                          No loans found
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Your loan history will appear here.
                        </p>

                      </div>
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </section>

      </div>
    </div>
  );
}
