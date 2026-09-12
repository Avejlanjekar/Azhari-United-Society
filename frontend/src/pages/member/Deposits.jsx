
// import { useState, useEffect } from "react";
// import axiosClient from "../../api/axiosClient";
// import {
//   FileText,
//   Upload,
//   CheckCircle2,
//   Clock3,
//   XCircle,
//   AlertCircle,
//   IndianRupee,
//   CalendarDays,
//   ShieldCheck,
//   Loader2,
//   Eye,
//   Trash2,
// } from "lucide-react";

// export default function Deposits() {
//   const [month, setMonth] = useState("");
//   const [year, setYear] = useState(new Date().getFullYear());

//   const [screenshot, setScreenshot] = useState(null);

//   const [loading, setLoading] = useState(false);
//   const [historyLoading, setHistoryLoading] = useState(true);
//   const [message, setMessage] = useState("");
//   const [deposits, setDeposits] = useState([]);

//   const monthNames = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   // --------------------------------------------------
//   // Fetch deposit history
//   // --------------------------------------------------

//   useEffect(() => {
//     fetchDeposits();
//   }, []);

//   const fetchDeposits = async () => {
//     try {
//       setHistoryLoading(true);

//       const res = await axiosClient.get("/deposit-proofs/history");

//       setDeposits(res.data || []);
//     } catch (err) {
//       console.error("Error fetching deposits:", err);
//     } finally {
//       setHistoryLoading(false);
//     }
//   };

//   // --------------------------------------------------
//   // Calculate amount preview
//   // --------------------------------------------------

//   const getSelectedAmount = () => {
//     if (!month || !year) {
//       return null;
//     }

//     const selectedMonth = Number(month);
//     const selectedYear = Number(year);

//     const now = new Date();

//     const currentYear = now.getFullYear();
//     const currentMonth = now.getMonth() + 1;
//     const currentDay = now.getDate();

//     const contribution = 500;
//     let fine = 0;

//     // Previous year
//     if (selectedYear < currentYear) {
//       fine = 100;
//     }

//     // Previous month
//     else if (
//       selectedYear === currentYear &&
//       selectedMonth < currentMonth
//     ) {
//       fine = 100;
//     }

//     // Current month after 12th
//     else if (
//       selectedYear === currentYear &&
//       selectedMonth === currentMonth &&
//       currentDay > 12
//     ) {
//       fine = 100;
//     }

//     return {
//       contribution,
//       fine,
//       total: contribution + fine,
//     };
//   };

//   const selectedAmount = getSelectedAmount();

//   // --------------------------------------------------
//   // Handle screenshot selection
//   // --------------------------------------------------

//   const handleScreenshotChange = (e) => {
//     const file = e.target.files?.[0];

//     if (!file) {
//       setScreenshot(null);
//       return;
//     }

//     // Only allow images
//     if (!file.type.startsWith("image/")) {
//       setMessage("Please upload an image file.");
//       e.target.value = "";
//       setScreenshot(null);
//       return;
//     }

//     // 5 MB limit
//     if (file.size > 5 * 1024 * 1024) {
//       setMessage("Screenshot size must be less than 5 MB.");
//       e.target.value = "";
//       setScreenshot(null);
//       return;
//     }

//     setMessage("");
//     setScreenshot(file);
//   };

//   // --------------------------------------------------
//   // Remove screenshot
//   // --------------------------------------------------

//   const removeScreenshot = () => {
//     setScreenshot(null);

//     const fileInput = document.getElementById(
//       "deposit-screenshot"
//     );

//     if (fileInput) {
//       fileInput.value = "";
//     }
//   };

//   // --------------------------------------------------
//   // Submit deposit
//   // --------------------------------------------------

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!month || !year || !screenshot) {
//       setMessage(
//         "Please select month, year and upload payment screenshot."
//       );
//       return;
//     }

//     try {
//       setLoading(true);
//       setMessage("");

//       // Backend expects multipart/form-data
//       const formData = new FormData();

//       formData.append("month", Number(month));
//       formData.append("year", Number(year));
//       formData.append("screenshot", screenshot);

//       const res = await axiosClient.post(
//         "/deposit-proofs/submit",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       const proof = res.data.proof;

//       setMessage(` ${res.data.message}`);

//       console.log("Submitted proof:", proof);

//       // Reset form
//       setMonth("");
//       setYear(new Date().getFullYear());
//       setScreenshot(null);

//       // Reset file input
//       const fileInput = document.getElementById(
//         "deposit-screenshot"
//       );

//       if (fileInput) {
//         fileInput.value = "";
//       }

//       // Refresh history
//       await fetchDeposits();
//     } catch (err) {
//       console.error("Error submitting deposit proof:", err);

//       setMessage(
//         ` ${
//           err.response?.data?.message ||
//           "Error submitting deposit proof."
//         }`
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --------------------------------------------------
//   // Status configuration
//   // --------------------------------------------------

//   const getStatusConfig = (status) => {
//     switch (status) {
//       case "approved":
//         return {
//           label: "Approved",
//           icon: CheckCircle2,
//           classes:
//             "bg-emerald-50 text-emerald-700 border-emerald-200",
//         };

//       case "rejected":
//         return {
//           label: "Rejected",
//           icon: XCircle,
//           classes: "bg-red-50 text-red-700 border-red-200",
//         };

//       case "pending":
//       default:
//         return {
//           label: "Pending",
//           icon: Clock3,
//           classes:
//             "bg-amber-50 text-amber-700 border-amber-200",
//         };
//     }
//   };

//   // --------------------------------------------------
//   // History statistics
//   // --------------------------------------------------

//   const approvedCount = deposits.filter(
//     (d) => d.status === "approved"
//   ).length;

//   const pendingCount = deposits.filter(
//     (d) => d.status === "pending"
//   ).length;

//   const rejectedCount = deposits.filter(
//     (d) => d.status === "rejected"
//   ).length;

//   // --------------------------------------------------
//   // Render
//   // --------------------------------------------------

//   return (
//     <div className="min-h-screen bg-slate-50">

//       <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">

//         {/* ==================================================
//             PAGE HEADER
//         ================================================== */}

//         <div className="mb-8">

//           <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

//             <div>

//               <div className="flex items-center gap-3">

//                 <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
//                   <IndianRupee className="h-5 w-5" />
//                 </div>

//                 <div>

//                   <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
//                     My Deposits
//                   </h1>

//                   <p className="mt-1 text-sm text-slate-500">
//                     Manage your monthly contributions and payment proofs.
//                   </p>

//                 </div>

//               </div>

//             </div>



//           </div>

//         </div>

//         {/* ==================================================
//             STATISTICS
//         ================================================== */}

//         {deposits.length > 0 && (

//           <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

//             {/* Approved */}

//             <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

//               <div className="flex items-center justify-between">

//                 <div>

//                   <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
//                     Approved
//                   </p>

//                   <p className="mt-1 text-2xl font-bold text-slate-900">
//                     {approvedCount}
//                   </p>

//                 </div>

//                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
//                   <CheckCircle2 className="h-5 w-5 text-emerald-600" />
//                 </div>

//               </div>

//             </div>

//             {/* Pending */}

//             <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

//               <div className="flex items-center justify-between">

//                 <div>

//                   <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
//                     Pending
//                   </p>

//                   <p className="mt-1 text-2xl font-bold text-slate-900">
//                     {pendingCount}
//                   </p>

//                 </div>

//                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
//                   <Clock3 className="h-5 w-5 text-amber-600" />
//                 </div>

//               </div>

//             </div>

//             {/* Rejected */}

//             <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

//               <div className="flex items-center justify-between">

//                 <div>

//                   <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
//                     Rejected
//                   </p>

//                   <p className="mt-1 text-2xl font-bold text-slate-900">
//                     {rejectedCount}
//                   </p>

//                 </div>

//                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
//                   <XCircle className="h-5 w-5 text-red-600" />
//                 </div>

//               </div>

//             </div>

//           </div>

//         )}

//         {/* ==================================================
//             DEPOSIT RULES
//         ================================================== */}

//         <div className="mb-8 overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">

//           <div className="border-b border-blue-100 bg-blue-50/70 px-5 py-4 sm:px-6">

//             <div className="flex items-center gap-3">

//               <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
//                 <AlertCircle className="h-5 w-5" />
//               </div>

//               <div>

//                 <h2 className="font-semibold text-blue-900">
//                   Monthly Deposit Rules
//                 </h2>

//                 <p className="text-xs text-blue-600">
//                   Please review the payment rules before submitting.
//                 </p>

//               </div>

//             </div>

//           </div>

//           <div className="grid grid-cols-1 gap-3 p-5 text-sm sm:grid-cols-2 sm:p-6 lg:grid-cols-4">

//             <div className="rounded-xl bg-slate-50 p-4">

//               <p className="text-xs font-medium text-slate-500">
//                 Monthly contribution
//               </p>

//               <p className="mt-1 text-lg font-bold text-slate-900">
//                 ₹500
//               </p>

//             </div>

//             <div className="rounded-xl bg-emerald-50 p-4">

//               <p className="text-xs font-medium text-emerald-600">
//                 Before / on 12th
//               </p>

//               <p className="mt-1 text-lg font-bold text-emerald-700">
//                 ₹500
//               </p>

//             </div>

//             <div className="rounded-xl bg-amber-50 p-4">

//               <p className="text-xs font-medium text-amber-600">
//                 After 12th
//               </p>

//               <p className="mt-1 text-lg font-bold text-amber-700">
//                 ₹600
//               </p>

//             </div>

//             <div className="rounded-xl bg-red-50 p-4">

//               <p className="text-xs font-medium text-red-600">
//                 Late fine
//               </p>

//               <p className="mt-1 text-lg font-bold text-red-700">
//                 ₹100
//               </p>

//             </div>

//           </div>

//           <div className="border-t border-blue-100 px-5 py-3 sm:px-6">

//             <p className="text-xs text-slate-500">
//               Previous unpaid months are charged ₹600 each.
//             </p>

//           </div>

//         </div>

//         {/* ==================================================
//             SUBMIT FORM
//         ================================================== */}

//         <form
//           onSubmit={handleSubmit}
//           className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
//         >

//           {/* Form Header */}

//           <div className="border-b border-slate-200 px-5 py-5 sm:px-6">

//             <div className="flex items-center gap-3">

//               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
//                 <Upload className="h-5 w-5" />
//               </div>

//               <div>

//                 <h2 className="text-lg font-semibold text-slate-900">
//                   Submit Monthly Deposit
//                 </h2>

//                 <p className="mt-0.5 text-xs text-slate-500">
//                   Select the contribution period and upload your payment proof.
//                 </p>

//               </div>

//             </div>

//           </div>

//           <div className="space-y-6 p-5 sm:p-6">

//             {/* Month and Year */}

//             <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

//               {/* Month */}

//               <div>

//                 <label className="mb-2 block text-sm font-medium text-slate-700">
//                   Month <span className="text-red-500">*</span>
//                 </label>

//                 <div className="relative">

//                   <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

//                   <select
//                     value={month}
//                     onChange={(e) => setMonth(e.target.value)}
//                     className="w-full appearance-none rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
//                   >

//                     <option value="">
//                       Select Month
//                     </option>

//                     {monthNames.map((m, i) => (
//                       <option key={i} value={i + 1}>
//                         {m}
//                       </option>
//                     ))}

//                   </select>

//                 </div>

//               </div>

//               {/* Year */}

//               <div>

//                 <label className="mb-2 block text-sm font-medium text-slate-700">
//                   Year <span className="text-red-500">*</span>
//                 </label>

//                 <input
//                   type="number"
//                   value={year}
//                   onChange={(e) => setYear(e.target.value)}
//                   min="2023"
//                   max="2100"
//                   className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
//                 />

//               </div>

//             </div>

//             {/* Screenshot Upload */}

//             <div>

//               <label className="mb-2 block text-sm font-medium text-slate-700">
//                 Payment Screenshot{" "}
//                 <span className="text-red-500">*</span>
//               </label>

//               <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/70 p-5 transition hover:border-blue-400 hover:bg-blue-50/30">

//                 <div className="flex flex-col items-center justify-center text-center">

//                   <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
//                     <Upload className="h-6 w-6" />
//                   </div>

//                   <p className="text-sm font-semibold text-slate-700">
//                     Upload payment screenshot
//                   </p>

//                   <p className="mt-1 text-xs text-slate-500">
//                     PNG, JPG, JPEG or other image formats · Maximum 5 MB
//                   </p>

//                   <label
//                     htmlFor="deposit-screenshot"
//                     className="mt-4 cursor-pointer rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
//                   >
//                     Choose Image
//                   </label>

//                   <input
//                     id="deposit-screenshot"
//                     type="file"
//                     accept="image/*"
//                     onChange={handleScreenshotChange}
//                     className="hidden"
//                   />

//                 </div>

//               </div>

//               {/* Screenshot Preview */}

//               {screenshot && (

//                 <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">

//                   <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">

//                     <div className="relative shrink-0">

//                       <img
//                         src={URL.createObjectURL(screenshot)}
//                         alt="Payment Preview"
//                         className="h-24 w-24 rounded-xl border border-slate-200 object-cover"
//                       />

//                       <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm">

//                         <CheckCircle2 className="h-4 w-4" />

//                       </div>

//                     </div>

//                     <div className="min-w-0 flex-1">

//                       <p
//                         className="truncate text-sm font-semibold text-slate-800"
//                         title={screenshot.name}
//                       >
//                         {screenshot.name}
//                       </p>

//                       <p className="mt-1 text-xs text-slate-500">
//                         {(screenshot.size / 1024 / 1024).toFixed(2)} MB
//                       </p>

//                       <p className="mt-2 text-xs font-medium text-emerald-600">
//                         Payment screenshot ready to upload
//                       </p>

//                     </div>

//                     <button
//                       type="button"
//                       onClick={removeScreenshot}
//                       className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 sm:shrink-0"
//                     >
//                       <Trash2 className="h-4 w-4" />
//                       Remove
//                     </button>

//                   </div>

//                 </div>

//               )}

//             </div>

//             {/* Amount Preview */}

//             {selectedAmount && (

//               <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">

//                 <div className="border-b border-slate-200 px-5 py-4">

//                   <div className="flex items-center justify-between">

//                     <div>

//                       <h3 className="font-semibold text-slate-800">
//                         Deposit Amount
//                       </h3>

//                       <p className="mt-0.5 text-xs text-slate-500">
//                         Amount calculated based on the selected period.
//                       </p>

//                     </div>

//                     <IndianRupee className="h-5 w-5 text-slate-400" />

//                   </div>

//                 </div>

//                 <div className="space-y-3 p-5 text-sm">

//                   <div className="flex items-center justify-between">

//                     <span className="text-slate-600">
//                       Monthly Contribution
//                     </span>

//                     <span className="font-semibold text-slate-800">
//                       ₹{selectedAmount.contribution}
//                     </span>

//                   </div>

//                   <div className="flex items-center justify-between">

//                     <span className="text-slate-600">
//                       Late Fine
//                     </span>

//                     <span
//                       className={
//                         selectedAmount.fine > 0
//                           ? "font-semibold text-red-600"
//                           : "font-semibold text-emerald-600"
//                       }
//                     >
//                       ₹{selectedAmount.fine}
//                     </span>

//                   </div>

//                   <div className="border-t border-slate-200 pt-3">

//                     <div className="flex items-center justify-between">

//                       <span className="font-semibold text-slate-800">
//                         Total Amount
//                       </span>

//                       <span className="text-xl font-bold text-blue-600">
//                         ₹{selectedAmount.total}
//                       </span>

//                     </div>

//                   </div>

//                 </div>

//                 <div
//                   className={
//                     selectedAmount.fine > 0
//                       ? "border-t border-red-100 bg-red-50 px-5 py-3"
//                       : "border-t border-emerald-100 bg-emerald-50 px-5 py-3"
//                   }
//                 >

//                   {selectedAmount.fine > 0 ? (

//                     <p className="flex items-center gap-2 text-xs font-medium text-red-600">

//                       <AlertCircle className="h-4 w-4 shrink-0" />

//                       A ₹100 late fine is applicable for this contribution.

//                     </p>

//                   ) : (

//                     <p className="flex items-center gap-2 text-xs font-medium text-emerald-600">

//                       <CheckCircle2 className="h-4 w-4 shrink-0" />

//                       No late fine is applicable.

//                     </p>

//                   )}

//                 </div>

//               </div>

//             )}

//             {/* Status Message */}

//             {message && (

//               <div
//                 className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm font-medium ${
//                   message.startsWith("✅")
//                     ? "border-emerald-200 bg-emerald-50 text-emerald-700"
//                     : message.startsWith("❌")
//                     ? "border-red-200 bg-red-50 text-red-700"
//                     : "border-amber-200 bg-amber-50 text-amber-700"
//                 }`}
//               >

//                 {message.startsWith("❌") ? (

//                   <XCircle className="mt-0.5 h-4 w-4 shrink-0" />

//                 ) : message.startsWith("✅") ? (

//                   <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />

//                 ) : (

//                   <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />

//                 )}

//                 <span>
//                   {message.replace(/^[✅❌⚠️]\s*/, "")}
//                 </span>

//               </div>

//             )}

//             {/* Submit Button */}

//             <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-end">

//               <p className="text-xs text-slate-400 sm:mr-auto">
//                 Fields marked with * are required.
//               </p>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
//               >

//                 {loading ? (
//                   <>
//                     <Loader2 className="h-4 w-4 animate-spin" />
//                     Submitting...
//                   </>
//                 ) : (
//                   <>
//                     <Upload className="h-4 w-4" />
//                     Submit Deposit
//                   </>
//                 )}

//               </button>

//             </div>

//           </div>

//         </form>

//         {/* ==================================================
//             DEPOSIT HISTORY
//         ================================================== */}

//         <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

//           {/* History Header */}

//           <div className="border-b border-slate-200 px-5 py-5 sm:px-6">

//             <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

//               <div>

//                 <h2 className="text-lg font-semibold text-slate-900">
//                   Deposit History
//                 </h2>

//                 <p className="mt-1 text-xs text-slate-500">
//                   View all submitted monthly payment proofs and their verification status.
//                 </p>

//               </div>

//               {deposits.length > 0 && (

//                 <div className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
//                   {deposits.length}{" "}
//                   {deposits.length === 1 ? "record" : "records"}
//                 </div>

//               )}

//             </div>

//           </div>

//           {/* History Loading */}

//           {historyLoading ? (

//             <div className="flex min-h-48 items-center justify-center px-5 py-10">

//               <div className="flex flex-col items-center gap-3">

//                 <Loader2 className="h-7 w-7 animate-spin text-blue-600" />

//                 <p className="text-sm text-slate-500">
//                   Loading deposit history...
//                 </p>

//               </div>

//             </div>

//           ) : deposits.length === 0 ? (

//             /* Empty State */

//             <div className="flex min-h-56 flex-col items-center justify-center px-5 py-10 text-center">

//               <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">

//                 <FileText className="h-7 w-7 text-slate-400" />

//               </div>

//               <h3 className="mt-4 text-sm font-semibold text-slate-800">
//                 No deposits found
//               </h3>

//               <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500">
//                 Your submitted deposits will appear here once you make your first contribution.
//               </p>

//             </div>

//           ) : (

//             /* History Table */

//             <div className="overflow-x-auto">

//               <table className="w-full min-w-[1000px] border-collapse text-left text-sm">

//                 <thead>

//                   <tr className="border-b border-slate-200 bg-slate-50">

//                     <th className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
//                       Month
//                     </th>

//                     <th className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
//                       Year
//                     </th>

//                     <th className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
//                       Amount
//                     </th>

//                     <th className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
//                       Fine
//                     </th>

//                     <th className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
//                       Total
//                     </th>

//                     <th className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
//                       Status
//                     </th>

//                     <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
//                       Rejection Reason
//                     </th>

//                     <th className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
//                       Screenshot
//                     </th>

//                   </tr>

//                 </thead>

//                 <tbody className="divide-y divide-slate-100">

//                   {deposits.map((d) => {

//                     const monthName =
//                       monthNames[d.month - 1] || "Unknown";

//                     const statusConfig =
//                       getStatusConfig(d.status);

//                     const StatusIcon =
//                       statusConfig.icon;

//                     return (

//                       <tr
//                         key={d._id}
//                         className="transition-colors hover:bg-slate-50/80"
//                       >

//                         {/* Month */}

//                         <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-800">
//                           {monthName}
//                         </td>

//                         {/* Year */}

//                         <td className="whitespace-nowrap px-5 py-4 text-slate-600">
//                           {d.year}
//                         </td>

//                         {/* Amount */}

//                         <td className="whitespace-nowrap px-5 py-4 text-slate-700">
//                           ₹{d.amount ?? 500}
//                         </td>

//                         {/* Fine */}

//                         <td className="whitespace-nowrap px-5 py-4">

//                           {d.fine > 0 ? (

//                             <span className="font-semibold text-red-600">
//                               ₹{d.fine}
//                             </span>

//                           ) : (

//                             <span className="text-slate-500">
//                               ₹0
//                             </span>

//                           )}

//                         </td>

//                         {/* Total */}

//                         <td className="whitespace-nowrap px-5 py-4 font-bold text-slate-900">

//                           ₹
//                           {d.totalAmount ??
//                             ((d.amount ?? 500) +
//                               (d.fine ?? 0))}

//                         </td>

//                         {/* Status */}

//                         <td className="whitespace-nowrap px-5 py-4">

//                           <span
//                             className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${statusConfig.classes}`}
//                           >

//                             <StatusIcon className="h-3.5 w-3.5" />

//                             {statusConfig.label}

//                           </span>

//                         </td>

//                         {/* Rejection Reason */}

//                         <td className="px-5 py-4">

//                           {d.status === "rejected" ? (

//                             <div className="max-w-xs">

//                               <div className="rounded-xl border border-red-100 bg-red-50 px-3 py-2">

//                                 <p
//                                   className="line-clamp-2 text-xs leading-5 text-red-700"
//                                   title={
//                                     d.rejectionReason ||
//                                     "No reason provided"
//                                   }
//                                 >
//                                   {d.rejectionReason ||
//                                     "No reason provided"}
//                                 </p>

//                               </div>

//                             </div>

//                           ) : (

//                             <span className="text-slate-300">
//                               —
//                             </span>

//                           )}

//                         </td>

//                         {/* Screenshot */}

//                         <td className="whitespace-nowrap px-5 py-4">

//                           {d.filePath && d.fileUrl ? (

//                             <a
//                               href={d.fileUrl}
//                               target="_blank"
//                               rel="noreferrer"
//                               className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
//                             >

//                               <Eye className="h-4 w-4" />

//                               View

//                             </a>

//                           ) : (

//                             <span className="inline-flex items-center gap-1.5 text-xs italic text-slate-400">

//                               <FileText className="h-4 w-4" />

//                               No file

//                             </span>

//                           )}

//                         </td>

//                       </tr>

//                     );

//                   })}

//                 </tbody>

//               </table>

//             </div>

//           )}

//         </div>

//         {/* Mobile table hint */}

//         {!historyLoading && deposits.length > 0 && (

//           <p className="mt-3 text-center text-[11px] text-slate-400 sm:hidden">
//             Swipe horizontally to view all deposit details.
//           </p>

//         )}

//       </div>

//     </div>
//   );
// }



import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import {
  FileText,
  Upload,
  CheckCircle2,
  Clock3,
  XCircle,
  AlertCircle,
  IndianRupee,
  CalendarDays,
  ShieldCheck,
  Loader2,
  Eye,
  Trash2,
} from "lucide-react";

export default function Deposits() {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());

  const [screenshot, setScreenshot] = useState(null);

  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [deposits, setDeposits] = useState([]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // --------------------------------------------------
  // Fetch deposit history
  // --------------------------------------------------

  useEffect(() => {
    fetchDeposits();
  }, []);

  const fetchDeposits = async () => {
    try {
      setHistoryLoading(true);

      const res = await axiosClient.get("/deposit-proofs/history");

      setDeposits(res.data || []);
    } catch (err) {
      console.error("Error fetching deposits:", err);
    } finally {
      setHistoryLoading(false);
    }
  };

  // --------------------------------------------------
  // Calculate amount preview
  // --------------------------------------------------

  const getSelectedAmount = () => {
    if (!month || !year) {
      return null;
    }

    const selectedMonth = Number(month);
    const selectedYear = Number(year);

    const now = new Date();

    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    const currentDay = now.getDate();

    const contribution = 500;
    let fine = 0;

    // Previous year
    if (selectedYear < currentYear) {
      fine = 100;
    }

    // Previous month
    else if (
      selectedYear === currentYear &&
      selectedMonth < currentMonth
    ) {
      fine = 100;
    }

    // Current month after 12th
    else if (
      selectedYear === currentYear &&
      selectedMonth === currentMonth &&
      currentDay > 12
    ) {
      fine = 100;
    }

    return {
      contribution,
      fine,
      total: contribution + fine,
    };
  };

  const selectedAmount = getSelectedAmount();

  // --------------------------------------------------
  // Handle screenshot selection
  // --------------------------------------------------

  const handleScreenshotChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setScreenshot(null);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setMessage("Please upload an image file.");
      setMessageType("error");
      e.target.value = "";
      setScreenshot(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("Screenshot size must be less than 5 MB.");
      setMessageType("error");
      e.target.value = "";
      setScreenshot(null);
      return;
    }

    setMessage("");
    setMessageType("");
    setScreenshot(file);
  };

  // --------------------------------------------------
  // Remove screenshot
  // --------------------------------------------------

  const removeScreenshot = () => {
    setScreenshot(null);

    const fileInput = document.getElementById(
      "deposit-screenshot"
    );

    if (fileInput) {
      fileInput.value = "";
    }
  };

  // --------------------------------------------------
  // Submit deposit
  // --------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!month || !year || !screenshot) {
      setMessage(
        "Please select month, year and upload payment screenshot."
      );
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setMessageType("");

      const formData = new FormData();

      formData.append("month", Number(month));
      formData.append("year", Number(year));
      formData.append("screenshot", screenshot);

      const res = await axiosClient.post(
        "/deposit-proofs/submit",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const proof = res.data.proof;

      setMessage(res.data.message);
      setMessageType("success");

      console.log("Submitted proof:", proof);

      setMonth("");
      setYear(new Date().getFullYear());
      setScreenshot(null);

      const fileInput = document.getElementById(
        "deposit-screenshot"
      );

      if (fileInput) {
        fileInput.value = "";
      }

      await fetchDeposits();
    } catch (err) {
      console.error("Error submitting deposit proof:", err);

      setMessage(
        err.response?.data?.message ||
        "Error submitting deposit proof."
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // Status configuration
  // --------------------------------------------------

  const getStatusConfig = (status) => {
    switch (status) {
      case "approved":
        return {
          label: "Approved",
          icon: CheckCircle2,
          classes:
            "bg-emerald-50 text-emerald-700 border-emerald-200",
        };

      case "rejected":
        return {
          label: "Rejected",
          icon: XCircle,
          classes: "bg-red-50 text-red-700 border-red-200",
        };

      case "pending":
      default:
        return {
          label: "Pending",
          icon: Clock3,
          classes:
            "bg-amber-50 text-amber-700 border-amber-200",
        };
    }
  };

  // --------------------------------------------------
  // History statistics
  // --------------------------------------------------

  const approvedCount = deposits.filter(
    (d) => d.status === "approved"
  ).length;

  const pendingCount = deposits.filter(
    (d) => d.status === "pending"
  ).length;

  const rejectedCount = deposits.filter(
    (d) => d.status === "rejected"
  ).length;

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
                My Deposits
              </h1>

              <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500 sm:text-sm">
                Manage your monthly contributions and payment proofs.
              </p>
            </div>
          </div>
        </div>

        {/* ==================================================
            STATISTICS
        ================================================== */}

        {deposits.length > 0 && (
          <div className="mb-6 grid grid-cols-3 gap-2.5 sm:mb-8 sm:gap-4">

            {/* Approved */}

            <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:rounded-2xl sm:p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500 sm:text-xs">
                    Approved
                  </p>

                  <p className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                    {approvedCount}
                  </p>
                </div>

                <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 sm:flex">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
            </div>

            {/* Pending */}

            <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:rounded-2xl sm:p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500 sm:text-xs">
                    Pending
                  </p>

                  <p className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                    {pendingCount}
                  </p>
                </div>

                <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-amber-50 sm:flex">
                  <Clock3 className="h-5 w-5 text-amber-600" />
                </div>
              </div>
            </div>

            {/* Rejected */}

            <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:rounded-2xl sm:p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500 sm:text-xs">
                    Rejected
                  </p>

                  <p className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                    {rejectedCount}
                  </p>
                </div>

                <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-red-50 sm:flex">
                  <XCircle className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================
            DEPOSIT RULES
        ================================================== */}

        <div className="mb-6 overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm sm:mb-8 sm:rounded-2xl">

          <div className="border-b border-blue-100 bg-blue-50/70 px-4 py-4 sm:px-6">
            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <AlertCircle className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <h2 className="text-sm font-semibold text-blue-900 sm:text-base">
                  Monthly Deposit Rules
                </h2>

                <p className="mt-0.5 text-[11px] text-blue-600 sm:text-xs">
                  Please review the payment rules before submitting.
                </p>
              </div>

            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 p-4 sm:grid-cols-2 sm:gap-3 sm:p-6 lg:grid-cols-4">

            <div className="rounded-xl bg-slate-50 p-3 sm:p-4">
              <p className="text-[11px] font-medium text-slate-500 sm:text-xs">
                Monthly contribution
              </p>

              <p className="mt-1 text-base font-bold text-slate-900 sm:text-lg">
                ₹500
              </p>
            </div>

            <div className="rounded-xl bg-emerald-50 p-3 sm:p-4">
              <p className="text-[11px] font-medium text-emerald-600 sm:text-xs">
                Before / on 12th
              </p>

              <p className="mt-1 text-base font-bold text-emerald-700 sm:text-lg">
                ₹500
              </p>
            </div>

            <div className="rounded-xl bg-amber-50 p-3 sm:p-4">
              <p className="text-[11px] font-medium text-amber-600 sm:text-xs">
                After 12th
              </p>

              <p className="mt-1 text-base font-bold text-amber-700 sm:text-lg">
                ₹600
              </p>
            </div>

            <div className="rounded-xl bg-red-50 p-3 sm:p-4">
              <p className="text-[11px] font-medium text-red-600 sm:text-xs">
                Late fine
              </p>

              <p className="mt-1 text-base font-bold text-red-700 sm:text-lg">
                ₹100
              </p>
            </div>
          </div>

          <div className="border-t border-blue-100 px-4 py-3 sm:px-6">
            <p className="text-[11px] leading-5 text-slate-500 sm:text-xs">
              Previous unpaid months are charged ₹600 each.
            </p>
          </div>
        </div>

        {/* ==================================================
            SUBMIT FORM
        ================================================== */}

        <form
          onSubmit={handleSubmit}
          className="mb-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:mb-8 sm:rounded-2xl"
        >

          {/* Form Header */}

          <div className="border-b border-slate-200 px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Upload className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                  Submit Monthly Deposit
                </h2>

                <p className="mt-0.5 text-[11px] leading-5 text-slate-500 sm:text-xs">
                  Select the contribution period and upload your payment proof.
                </p>
              </div>

            </div>
          </div>

          <div className="space-y-5 p-4 sm:space-y-6 sm:p-6">

            {/* Month and Year */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">

              {/* Month */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Month <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  >
                    <option value="">
                      Select Month
                    </option>

                    {monthNames.map((m, i) => (
                      <option key={i} value={i + 1}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Year */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Year <span className="text-red-500">*</span>
                </label>

                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  min="2023"
                  max="2100"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </div>

            {/* Screenshot Upload */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Payment Screenshot{" "}
                <span className="text-red-500">*</span>
              </label>

              <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/70 p-4 transition hover:border-blue-400 hover:bg-blue-50/30 sm:p-6">

                <div className="flex flex-col items-center justify-center text-center">

                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 sm:h-12 sm:w-12">
                    <Upload className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>

                  <p className="text-sm font-semibold text-slate-700">
                    Upload payment screenshot
                  </p>

                  <p className="mt-1 max-w-xs text-[11px] leading-5 text-slate-500 sm:text-xs">
                    PNG, JPG, JPEG or other image formats. Maximum 5 MB
                  </p>

                  <label
                    htmlFor="deposit-screenshot"
                    className="mt-4 cursor-pointer rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
                  >
                    Choose Image
                  </label>

                  <input
                    id="deposit-screenshot"
                    type="file"
                    accept="image/*"
                    onChange={handleScreenshotChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Screenshot Preview */}

              {screenshot && (
                <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">

                  <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">

                    <div className="relative mx-auto shrink-0 sm:mx-0">

                      <img
                        src={URL.createObjectURL(screenshot)}
                        alt="Payment Preview"
                        className="h-24 w-24 rounded-xl border border-slate-200 object-cover sm:h-28 sm:w-28"
                      />

                      <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1 text-center sm:text-left">

                      <p
                        className="truncate text-sm font-semibold text-slate-800"
                        title={screenshot.name}
                      >
                        {screenshot.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {(screenshot.size / 1024 / 1024).toFixed(2)} MB
                      </p>

                      <p className="mt-2 text-xs font-medium text-emerald-600">
                        Payment screenshot ready to upload
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={removeScreenshot}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100 sm:w-auto sm:shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </button>

                  </div>
                </div>
              )}
            </div>

            {/* Amount Preview */}

            {selectedAmount && (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">

                <div className="border-b border-slate-200 px-4 py-4 sm:px-5">

                  <div className="flex items-center justify-between gap-3">

                    <div>
                      <h3 className="text-sm font-semibold text-slate-800 sm:text-base">
                        Deposit Amount
                      </h3>

                      <p className="mt-0.5 text-[11px] leading-5 text-slate-500 sm:text-xs">
                        Amount calculated based on the selected period.
                      </p>
                    </div>

                    <IndianRupee className="h-5 w-5 shrink-0 text-slate-400" />
                  </div>
                </div>

                <div className="space-y-3 p-4 text-sm sm:p-5">

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-slate-600">
                      Monthly Contribution
                    </span>

                    <span className="font-semibold text-slate-800">
                      ₹{selectedAmount.contribution}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-slate-600">
                      Late Fine
                    </span>

                    <span
                      className={
                        selectedAmount.fine > 0
                          ? "font-semibold text-red-600"
                          : "font-semibold text-emerald-600"
                      }
                    >
                      ₹{selectedAmount.fine}
                    </span>
                  </div>

                  <div className="border-t border-slate-200 pt-3">

                    <div className="flex items-center justify-between gap-4">

                      <span className="font-semibold text-slate-800">
                        Total Amount
                      </span>

                      <span className="text-lg font-bold text-blue-600 sm:text-xl">
                        ₹{selectedAmount.total}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className={
                    selectedAmount.fine > 0
                      ? "border-t border-red-100 bg-red-50 px-4 py-3 sm:px-5"
                      : "border-t border-emerald-100 bg-emerald-50 px-4 py-3 sm:px-5"
                  }
                >
                  {selectedAmount.fine > 0 ? (
                    <p className="flex items-start gap-2 text-[11px] font-medium leading-5 text-red-600 sm:text-xs">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>
                        A ₹100 late fine is applicable for this contribution.
                      </span>
                    </p>
                  ) : (
                    <p className="flex items-start gap-2 text-[11px] font-medium leading-5 text-emerald-600 sm:text-xs">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>
                        No late fine is applicable.
                      </span>
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Status Message */}

            {message && (
              <div
                className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm font-medium ${messageType === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : messageType === "error"
                      ? "border-red-200 bg-red-50 text-red-700"
                      : "border-amber-200 bg-amber-50 text-amber-700"
                  }`}
              >
                {messageType === "error" ? (
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
                ) : messageType === "success" ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                ) : (
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                )}

                <span className="leading-5">
                  {message}
                </span>
              </div>
            )}

            {/* Submit Button */}

            <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-end">

              <p className="text-[11px] text-slate-400 sm:mr-auto sm:text-xs">
                Fields marked with * are required.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Submit Deposit
                  </>
                )}
              </button>
            </div>

          </div>
        </form>

        {/* ==================================================
            DEPOSIT HISTORY
        ================================================== */}

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl">

          {/* History Header */}

          <div className="border-b border-slate-200 px-4 py-4 sm:px-6 sm:py-5">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div className="min-w-0">
                <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                  Deposit History
                </h2>

                <p className="mt-1 text-[11px] leading-5 text-slate-500 sm:text-xs">
                  View all submitted monthly payment proofs and their verification status.
                </p>
              </div>

              {deposits.length > 0 && (
                <div className="self-start rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 sm:self-auto">
                  {deposits.length}{" "}
                  {deposits.length === 1 ? "record" : "records"}
                </div>
              )}
            </div>
          </div>

          {/* History Loading */}

          {historyLoading ? (
            <div className="flex min-h-48 items-center justify-center px-5 py-10">

              <div className="flex flex-col items-center gap-3">

                <Loader2 className="h-7 w-7 animate-spin text-blue-600" />

                <p className="text-sm text-slate-500">
                  Loading deposit history...
                </p>
              </div>
            </div>
          ) : deposits.length === 0 ? (

            /* Empty State */

            <div className="flex min-h-56 flex-col items-center justify-center px-5 py-10 text-center">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                <FileText className="h-7 w-7 text-slate-400" />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-slate-800">
                No deposits found
              </h3>

              <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500">
                Your submitted deposits will appear here once you make your first contribution.
              </p>
            </div>
          ) : (
            <>
              {/* ==================================================
                  DESKTOP TABLE
              ================================================== */}

              <div className="hidden overflow-x-auto md:block">

                <table className="w-full min-w-[1000px] border-collapse text-left text-sm">

                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">

                      <th className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Month
                      </th>

                      <th className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Year
                      </th>

                      <th className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Amount
                      </th>

                      <th className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Fine
                      </th>

                      <th className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Total
                      </th>

                      <th className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Status
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Rejection Reason
                      </th>

                      <th className="whitespace-nowrap px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Screenshot
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">

                    {deposits.map((d) => {

                      const monthName =
                        monthNames[d.month - 1] || "Unknown";

                      const statusConfig =
                        getStatusConfig(d.status);

                      const StatusIcon =
                        statusConfig.icon;

                      return (
                        <tr
                          key={d._id}
                          className="transition-colors hover:bg-slate-50/80"
                        >

                          <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-800">
                            {monthName}
                          </td>

                          <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                            {d.year}
                          </td>

                          <td className="whitespace-nowrap px-5 py-4 text-slate-700">
                            ₹{d.amount ?? 500}
                          </td>

                          <td className="whitespace-nowrap px-5 py-4">
                            {d.fine > 0 ? (
                              <span className="font-semibold text-red-600">
                                ₹{d.fine}
                              </span>
                            ) : (
                              <span className="text-slate-500">
                                ₹0
                              </span>
                            )}
                          </td>

                          <td className="whitespace-nowrap px-5 py-4 font-bold text-slate-900">
                            ₹
                            {d.totalAmount ??
                              ((d.amount ?? 500) +
                                (d.fine ?? 0))}
                          </td>

                          <td className="whitespace-nowrap px-5 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${statusConfig.classes}`}
                            >
                              <StatusIcon className="h-3.5 w-3.5" />
                              {statusConfig.label}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            {d.status === "rejected" ? (
                              <div className="max-w-xs">
                                <div className="rounded-xl border border-red-100 bg-red-50 px-3 py-2">
                                  <p
                                    className="line-clamp-2 text-xs leading-5 text-red-700"
                                    title={
                                      d.rejectionReason ||
                                      "No reason provided"
                                    }
                                  >
                                    {d.rejectionReason ||
                                      "No reason provided"}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <span className="text-slate-300">
                                —
                              </span>
                            )}
                          </td>

                          <td className="whitespace-nowrap px-5 py-4">
                            {d.filePath && d.fileUrl ? (
                              <a
                                href={d.fileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
                              >
                                <Eye className="h-4 w-4" />
                                View
                              </a>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 text-xs italic text-slate-400">
                                <FileText className="h-4 w-4" />
                                No file
                              </span>
                            )}
                          </td>

                        </tr>
                      );
                    })}

                  </tbody>
                </table>
              </div>

              {/* ==================================================
                  MOBILE DEPOSIT CARDS
              ================================================== */}

              <div className="space-y-3 p-3 md:hidden">

                {deposits.map((d) => {

                  const monthName =
                    monthNames[d.month - 1] || "Unknown";

                  const statusConfig =
                    getStatusConfig(d.status);

                  const StatusIcon =
                    statusConfig.icon;

                  return (
                    <div
                      key={d._id}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                    >

                      {/* Card Header */}

                      <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-slate-50 px-4 py-3">

                        <div className="min-w-0">
                          <p className="text-sm font-bold text-slate-900">
                            {monthName}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            {d.year}
                          </p>
                        </div>

                        <span
                          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${statusConfig.classes}`}
                        >
                          <StatusIcon className="h-3.5 w-3.5" />
                          {statusConfig.label}
                        </span>

                      </div>

                      {/* Card Amount Details */}

                      <div className="grid grid-cols-2 gap-px bg-slate-100">

                        <div className="bg-white px-4 py-3">
                          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                            Amount
                          </p>

                          <p className="mt-1 text-sm font-semibold text-slate-800">
                            ₹{d.amount ?? 500}
                          </p>
                        </div>

                        <div className="bg-white px-4 py-3">
                          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                            Fine
                          </p>

                          <p
                            className={`mt-1 text-sm font-semibold ${d.fine > 0
                                ? "text-red-600"
                                : "text-slate-700"
                              }`}
                          >
                            ₹{d.fine ?? 0}
                          </p>
                        </div>

                        <div className="col-span-2 bg-white px-4 py-3">
                          <div className="flex items-center justify-between gap-3">

                            <p className="text-xs font-semibold text-slate-600">
                              Total Amount
                            </p>

                            <p className="text-lg font-bold text-blue-600">
                              ₹
                              {d.totalAmount ??
                                ((d.amount ?? 500) +
                                  (d.fine ?? 0))}
                            </p>

                          </div>
                        </div>

                      </div>

                      {/* Rejection Reason */}

                      {d.status === "rejected" && (
                        <div className="border-t border-red-100 bg-red-50 px-4 py-3">

                          <div className="flex items-start gap-2">

                            <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />

                            <div className="min-w-0">

                              <p className="text-xs font-semibold text-red-800">
                                Rejection Reason
                              </p>

                              <p className="mt-1 break-words text-xs leading-5 text-red-700">
                                {d.rejectionReason ||
                                  "No reason provided"}
                              </p>

                            </div>

                          </div>
                        </div>
                      )}

                      {/* Screenshot */}

                      <div className="border-t border-slate-100 px-4 py-3">

                        {d.filePath && d.fileUrl ? (
                          <a
                            href={d.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
                          >
                            <Eye className="h-4 w-4" />
                            View Payment Screenshot
                          </a>
                        ) : (
                          <div className="flex items-center justify-center gap-2 py-1 text-xs italic text-slate-400">
                            <FileText className="h-4 w-4" />
                            No payment screenshot
                          </div>
                        )}

                      </div>

                    </div>
                  );
                })}

              </div>
            </>
          )}
        </div>

        {/* Mobile history information */}

        {!historyLoading && deposits.length > 0 && (
          <p className="mt-3 px-2 text-center text-[11px] leading-5 text-slate-400 md:hidden">
            Deposit details are displayed as cards on mobile devices.
          </p>
        )}

      </div>
    </div>
  );
}


