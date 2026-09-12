
// import { useEffect, useState } from "react";
// import axiosClient from "../../api/axiosClient";
// import { Loader2, Download } from "lucide-react";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import * as XLSX from "xlsx";

// export default function AllDeposits() {
//   const [deposits, setDeposits] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const today = new Date();
//   const [filters, setFilters] = useState({
//     month: today.getMonth() + 1, // current month (1–12)
//     year: today.getFullYear(),
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
//     <div className="p-4 md:p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
//       <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 tracking-tight">
//         All Deposits
//       </h1>

//       {/* Filters */}
//       <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-6 bg-white shadow-md p-4 rounded-xl border border-gray-200">
//         <input
//           type="number"
//           placeholder="Year"
//           className="border rounded-lg p-2 w-full sm:w-28 focus:ring-2 focus:ring-indigo-400 
//             outline-none text-white-700 placeholder-gray-400 font-medium"
//           value={filters.year}
//           onChange={(e) => setFilters({ ...filters, year: e.target.value })}
//         />

//         <select
//           className="border rounded-lg p-2 w-full sm:w-auto focus:ring-2 focus:ring-indigo-400 
//             outline-none text-white-700 font-medium"
//           value={filters.month}
//           onChange={(e) => setFilters({ ...filters, month: e.target.value })}
//         >
//           <option value="">All Months</option>
//           {[...Array(12).keys()].map((m) => (
//             <option key={m + 1} value={m + 1}>
//               {new Date(0, m).toLocaleString("default", { month: "long" })}
//             </option>
//           ))}
//         </select>

//         <input
//           type="text"
//           placeholder="Search member..."
//           className="border rounded-lg p-2 w-full sm:w-56 focus:ring-2 focus:ring-indigo-400 
//             outline-none text-white-700 placeholder-gray-400 font-medium"
//           value={filters.search}
//           onChange={(e) => setFilters({ ...filters, search: e.target.value })}
//         />

//         <button
//           onClick={exportExcel}
//           className="bg-green-500 hover:bg-green-600 transition text-white px-4 py-2 
//             rounded-lg flex items-center justify-center gap-2 font-medium shadow-md w-full sm:w-auto"
//         >
//           <Download size={16} /> Export Excel
//         </button>
//       </div>

//       {/* Table (Desktop) */}
//       {loading ? (
//         <div className="flex justify-center items-center h-40">
//           <Loader2 className="animate-spin text-indigo-500" size={32} />
//         </div>
//       ) : (
//         <>
//           {/* Desktop Table */}
//           <div className="hidden md:block overflow-x-auto shadow-lg rounded-xl border border-gray-200 bg-white">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-indigo-600 text-white">
//                   <th className="p-3 text-left">Member</th>
//                   {/* <th className="p-3 text-left">Email</th> */}
//                   <th className="p-3 text-left">Phone</th>
//                   <th className="p-3 text-right">Amount</th>
//                   <th className="p-3 text-right">Month & Year</th>
//                   <th className="p-3 text-center">Status</th>
//                   <th className="p-3 text-center">Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {deposits.map((d) => (
//                   <tr
//                     key={d._id}
//                     className="border-t hover:bg-gray-50 transition text-gray-700"
//                   >
//                     <td className="p-3">
//                       {d.member?.name} {d.member?.middlename}{" "}
//                       {d.member?.lastname}
//                     </td>
//                     {/* <td className="p-3">{d.member?.email}</td> */}
//                     <td className="p-3">{d.member?.phone}</td>
//                     <td className="p-3 text-right font-semibold text-green-600">
//                       ₹{d.amount}
//                     </td>
//                     <td className="p-3 text-right font-semibold text-green-600">
//                       {d.month} {d.year}
//                     </td>
//                     <td
//                       className={`p-3 text-center font-medium ${d.status === "paid"
//                         ? "text-green-600"
//                         : "text-yellow-600"
//                         }`}
//                     >
//                       {d.status === "paid" ? "✅ Paid" : "⏳ Pending"}
//                     </td>
//                     <td className="p-3 text-center">
//                       {new Date(d.date).toLocaleDateString()}
//                     </td>
//                   </tr>
//                 ))}
//                 {deposits.length === 0 && (
//                   <tr>
//                     <td colSpan="6" className="p-6 text-center text-gray-500">
//                       No deposits found 🚫
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile Cards */}
//           <div className="md:hidden space-y-4">
//             {deposits.map((d) => (
//               <div
//                 key={d._id}
//                 className="bg-white shadow rounded-xl p-4 border border-gray-200"
//               >
//                 <h3 className="font-bold text-gray-800 text-lg mb-1">
//                   {d.member?.name} {d.member?.middlename} {d.member?.lastname}
//                 </h3>
//                 <p className="text-sm text-gray-600">📧 {d.member?.email}</p>
//                 <p className="text-sm text-gray-600">📞 {d.member?.phone}</p>
//                 <p className="text-sm font-semibold text-green-600">
//                   💰 ₹{d.amount}
//                 </p>
//                 <p
//                   className={`text-sm font-medium ${d.status === "paid" ? "text-green-700" : "text-yellow-600"
//                     }`}
//                 >
//                   {d.status === "paid" ? "✅ Paid" : "⏳ Pending"}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   📅 {new Date(d.date).toLocaleDateString()}
//                 </p>
//               </div>
//             ))}
//             {deposits.length === 0 && (
//               <p className="text-center text-gray-500">No deposits found 🚫</p>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import {
  Loader2,
  Download,
  Users,
  Phone,
  IndianRupee,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  FileText,
} from "lucide-react";
import * as XLSX from "xlsx";

export default function AllDeposits() {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(false);

  const today = new Date();

  const [filters, setFilters] = useState({
    month: today.getMonth() + 1,
    year: today.getFullYear(),
    status: "",
    search: "",
  });

  // --------------------------------------------------
  // Fetch deposits
  // --------------------------------------------------

  const fetchDeposits = async () => {
    setLoading(true);

    try {
      const { data } = await axiosClient.get(
        "/deposit-proofs/admin/deposits",
        {
          params: filters,
        }
      );

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

  // --------------------------------------------------
  // Export Excel
  // --------------------------------------------------

  const exportExcel = () => {
    const worksheetData = deposits.map((d) => ({
      Member: `${d.member?.name || ""} ${
        d.member?.middlename || ""
      } ${d.member?.lastname || ""}`.trim(),

      Email: d.member?.email,

      Phone: d.member?.phone,

      Amount: d.amount,

      Status: d.status,

      Date: new Date(d.date).toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Deposits"
    );

    XLSX.writeFile(
      workbook,
      "deposits_report.xlsx"
    );
  };

  // --------------------------------------------------
  // Status configuration
  // --------------------------------------------------

  const getStatusConfig = (status) => {
    if (status === "paid") {
      return {
        label: "Paid",
        icon: CheckCircle2,
        classes:
          "border-emerald-200 bg-emerald-50 text-emerald-700",
      };
    }

    return {
      label: "Pending",
      icon: Clock3,
      classes:
        "border-amber-200 bg-amber-50 text-amber-700",
    };
  };

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-6 sm:py-6 lg:px-8">

        {/* ==================================================
            PAGE HEADER
        ================================================== */}

        <div className="mb-6 sm:mb-8">

          <div className="flex items-start gap-3 sm:items-center">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm sm:h-11 sm:w-11 sm:rounded-2xl">
              <IndianRupee className="h-5 w-5" />
            </div>

            <div className="min-w-0">

              <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                All Deposits
              </h1>

              <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500 sm:text-sm">
                View and manage member deposit records.
              </p>

            </div>

          </div>

        </div>

        {/* ==================================================
            FILTERS
        ================================================== */}

        <div className="mb-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl">

          <div className="border-b border-slate-100 px-4 py-4 sm:px-5">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FileText className="h-4.5 w-4.5" />
              </div>

              <div>

                <h2 className="text-sm font-semibold text-slate-900">
                  Deposit Filters
                </h2>

                <p className="mt-0.5 text-[11px] text-slate-500">
                  Filter deposits by period or member.
                </p>

              </div>

            </div>

          </div>

          <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-5">

            {/* Year */}

            <div>

              <label className="mb-1.5 block text-xs font-medium text-slate-600">
                Year
              </label>

              <input
                type="number"
                placeholder="Year"
                min="2023"
                max="2100"
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                value={filters.year}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    year: e.target.value,
                  })
                }
              />

            </div>

            {/* Month */}

            <div>

              <label className="mb-1.5 block text-xs font-medium text-slate-600">
                Month
              </label>

              <select
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                value={filters.month}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    month: e.target.value,
                  })
                }
              >

                <option value="">
                  All Months
                </option>

                {[...Array(12).keys()].map((m) => (
                  <option
                    key={m + 1}
                    value={m + 1}
                  >
                    {new Date(
                      0,
                      m
                    ).toLocaleString("default", {
                      month: "long",
                    })}
                  </option>
                ))}

              </select>

            </div>

            {/* Status */}

            <div>

              <label className="mb-1.5 block text-xs font-medium text-slate-600">
                Status
              </label>

              <select
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                value={filters.status}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    status: e.target.value,
                  })
                }
              >

                <option value="">
                  All Statuses
                </option>

                <option value="paid">
                  Paid
                </option>

                <option value="pending">
                  Pending
                </option>

              </select>

            </div>

            {/* Search */}

            <div>

              <label className="mb-1.5 block text-xs font-medium text-slate-600">
                Member Search
              </label>

              <div className="relative">

                <Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  placeholder="Search member..."
                  className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-3.5 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  value={filters.search}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      search: e.target.value,
                    })
                  }
                />

              </div>

            </div>

            {/* Export */}

            <div className="flex items-end">

              <button
                type="button"
                onClick={exportExcel}
                disabled={deposits.length === 0}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
              >

                <Download className="h-4 w-4" />

                Export Excel

              </button>

            </div>

          </div>

        </div>

        {/* ==================================================
            RESULT SUMMARY
        ================================================== */}

        {!loading && (
          <div className="mb-4 flex items-center justify-between gap-3">

            <div>

              <p className="text-sm font-semibold text-slate-800">
                Deposit Records
              </p>

              <p className="mt-0.5 text-xs text-slate-500">
                {deposits.length}{" "}
                {deposits.length === 1
                  ? "record"
                  : "records"}{" "}
                found
              </p>

            </div>

          </div>
        )}

        {/* ==================================================
            LOADING
        ================================================== */}

        {loading ? (

          <div className="flex min-h-64 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl">

            <div className="flex flex-col items-center gap-3">

              <Loader2 className="h-7 w-7 animate-spin text-blue-600" />

              <p className="text-sm text-slate-500">
                Loading deposits...
              </p>

            </div>

          </div>

        ) : (
          <>

            {/* ==================================================
                DESKTOP TABLE
            ================================================== */}

            <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">

              <div className="overflow-x-auto">

                <table className="w-full border-collapse text-sm">

                  <thead>

                    <tr className="border-b border-slate-200 bg-slate-50">

                      <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Member
                      </th>

                      <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Phone
                      </th>

                      <th className="whitespace-nowrap px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Amount
                      </th>

                      <th className="whitespace-nowrap px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Month & Year
                      </th>

                      <th className="whitespace-nowrap px-5 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Status
                      </th>

                      <th className="whitespace-nowrap px-5 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Date
                      </th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-slate-100">

                    {deposits.map((d) => {

                      const statusConfig =
                        getStatusConfig(d.status);

                      const StatusIcon =
                        statusConfig.icon;

                      return (
                        <tr
                          key={d._id}
                          className="transition-colors hover:bg-slate-50/80"
                        >

                          {/* Member */}

                          <td className="px-5 py-4">

                            <div className="flex items-center gap-3">

                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                <Users className="h-4 w-4" />
                              </div>

                              <div className="min-w-0">

                                <p className="font-semibold text-slate-800">
                                  {d.member?.name}{" "}
                                  {d.member?.middlename}{" "}
                                  {d.member?.lastname}
                                </p>

                                {d.member?.email && (
                                  <p className="mt-0.5 truncate text-xs text-slate-400">
                                    {d.member.email}
                                  </p>
                                )}

                              </div>

                            </div>

                          </td>

                          {/* Phone */}

                          <td className="whitespace-nowrap px-5 py-4">

                            <div className="flex items-center gap-2 text-slate-600">

                              <Phone className="h-4 w-4 text-slate-400" />

                              <span>
                                {d.member?.phone || "Not available"}
                              </span>

                            </div>

                          </td>

                          {/* Amount */}

                          <td className="whitespace-nowrap px-5 py-4 text-right">

                            <span className="font-bold text-emerald-600">
                              ₹{d.amount}
                            </span>

                          </td>

                          {/* Month and Year */}

                          <td className="whitespace-nowrap px-5 py-4 text-right">

                            <div className="inline-flex items-center gap-2 font-semibold text-slate-700">

                              <CalendarDays className="h-4 w-4 text-slate-400" />

                              <span>
                                {d.month} {d.year}
                              </span>

                            </div>

                          </td>

                          {/* Status */}

                          <td className="whitespace-nowrap px-5 py-4 text-center">

                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${statusConfig.classes}`}
                            >

                              <StatusIcon className="h-3.5 w-3.5" />

                              {statusConfig.label}

                            </span>

                          </td>

                          {/* Date */}

                          <td className="whitespace-nowrap px-5 py-4 text-center text-slate-500">

                            {new Date(
                              d.date
                            ).toLocaleDateString()}

                          </td>

                        </tr>
                      );
                    })}

                    {deposits.length === 0 && (
                      <tr>

                        <td
                          colSpan="6"
                          className="px-5 py-12 text-center"
                        >

                          <div className="flex flex-col items-center">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">

                              <FileText className="h-7 w-7 text-slate-400" />

                            </div>

                            <p className="mt-4 text-sm font-semibold text-slate-700">
                              No deposits found
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              Try changing your filters or search criteria.
                            </p>

                          </div>

                        </td>

                      </tr>
                    )}

                  </tbody>

                </table>

              </div>

            </div>

            {/* ==================================================
                MOBILE CARDS
            ================================================== */}

            <div className="space-y-3 md:hidden">

              {deposits.map((d) => {

                const statusConfig =
                  getStatusConfig(d.status);

                const StatusIcon =
                  statusConfig.icon;

                return (
                  <div
                    key={d._id}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                  >

                    {/* Card Header */}

                    <div className="flex items-start justify-between gap-3 border-b border-slate-100 bg-slate-50 px-4 py-4">

                      <div className="flex min-w-0 items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">

                          <Users className="h-4.5 w-4.5" />

                        </div>

                        <div className="min-w-0">

                          <h3 className="truncate text-sm font-bold text-slate-900">

                            {d.member?.name}{" "}
                            {d.member?.middlename}{" "}
                            {d.member?.lastname}

                          </h3>

                          <p className="mt-0.5 text-xs text-slate-500">
                            Member Deposit
                          </p>

                        </div>

                      </div>

                      <span
                        className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${statusConfig.classes}`}
                      >

                        <StatusIcon className="h-3 w-3" />

                        {statusConfig.label}

                      </span>

                    </div>

                    {/* Member Contact */}

                    <div className="space-y-3 px-4 py-4">

                      {d.member?.email && (
                        <div className="flex items-center gap-3">

                          <Mail className="h-4 w-4 shrink-0 text-slate-400" />

                          <div className="min-w-0">

                            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                              Email
                            </p>

                            <p className="mt-0.5 truncate text-xs font-medium text-slate-700">
                              {d.member.email}
                            </p>

                          </div>

                        </div>
                      )}

                      <div className="flex items-center gap-3">

                        <Phone className="h-4 w-4 shrink-0 text-slate-400" />

                        <div>

                          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                            Phone
                          </p>

                          <p className="mt-0.5 text-xs font-medium text-slate-700">
                            {d.member?.phone || "Not available"}
                          </p>

                        </div>

                      </div>

                    </div>

                    {/* Deposit Information */}

                    <div className="grid grid-cols-2 gap-px border-t border-slate-100 bg-slate-100">

                      <div className="bg-white px-4 py-3">

                        <div className="flex items-center gap-2">

                          <IndianRupee className="h-4 w-4 text-emerald-500" />

                          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                            Amount
                          </p>

                        </div>

                        <p className="mt-1 text-base font-bold text-emerald-600">
                          ₹{d.amount}
                        </p>

                      </div>

                      <div className="bg-white px-4 py-3">

                        <div className="flex items-center gap-2">

                          <CalendarDays className="h-4 w-4 text-blue-500" />

                          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                            Period
                          </p>

                        </div>

                        <p className="mt-1 text-sm font-bold text-slate-800">
                          {d.month} {d.year}
                        </p>

                      </div>

                    </div>

                    {/* Date */}

                    <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">

                      <div className="flex items-center gap-2">

                        <CalendarDays className="h-4 w-4 text-slate-400" />

                        <span className="text-xs text-slate-500">
                          Payment Date
                        </span>

                      </div>

                      <span className="text-xs font-semibold text-slate-700">
                        {new Date(
                          d.date
                        ).toLocaleDateString()}
                      </span>

                    </div>

                  </div>
                );
              })}

              {deposits.length === 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white px-5 py-12 text-center shadow-sm">

                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">

                    <FileText className="h-7 w-7 text-slate-400" />

                  </div>

                  <p className="mt-4 text-sm font-semibold text-slate-700">
                    No deposits found
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Try changing your filters or search criteria.
                  </p>

                </div>
              )}

            </div>

          </>
        )}

      </div>
    </div>
  );
}
