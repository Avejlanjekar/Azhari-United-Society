// import { useState, useEffect } from "react";
// import axiosClient from "../../api/axiosClient";

// export default function Repayment() {
//   const [activeLoan, setActiveLoan] = useState(null);
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");
//   const [screenshot, setScreenshot] = useState(null);

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
//     if (!screenshot) {
//       setMessage("⚠️ Please upload repayment screenshot before submitting.");
//       return;
//     }

//     try {
//       setMessage("⏳ Uploading repayment screenshot...");

//       const formData = new FormData();
//       formData.append("screenshot", screenshot);

//       const res = await axiosClient.post(
//         `/loan/${loanId}/request-repayment`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       setMessage(res.data.message);
//       setScreenshot(null);

//       // Refresh data after repayment request
//       const activeRes = await axiosClient.get("/loan/activeloan");
//       setActiveLoan(activeRes.data.length > 0 ? activeRes.data[0] : null);

//       const historyRes = await axiosClient.get("/loan/repaymenthistory");
//       setHistory(historyRes.data || []);
//     } catch (err) {
//       setMessage(err.response?.data?.message || "⚠️ Error submitting repayment request");
//     }
//   };

//   if (loading) return <p className="p-4 sm:p-6 text-gray-600">Loading repayment data...</p>;

//   return (
//     <div className="p-4 sm:p-6 max-w-full sm:max-w-3xl mx-auto bg-white shadow-lg rounded-2xl">
//       <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-indigo-700 text-center sm:text-left">
//         💰 Loan Repayment
//       </h1>

//       {message && (
//         <div className="mb-4 sm:mb-5 p-3 rounded-lg text-sm sm:text-base font-medium 
//                         bg-blue-50 text-blue-700 border border-blue-200">
//           {message}
//         </div>
//       )}

//       {/* Active Loan */}
//       <section className="mb-8 sm:mb-10">
//         <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800">📌 Active Loan</h2>
//         {activeLoan ? (
//           <div className="p-4 sm:p-5 border rounded-xl shadow-sm bg-gray-50 hover:bg-gray-100 transition">
//             <p className="text-gray-700"><strong>Amount:</strong> <span className="text-green-700 font-semibold">₹{activeLoan.amount}</span></p>
//             <p className="text-gray-700"><strong>Status:</strong> <span className="text-indigo-600">{activeLoan.status}</span></p>
//             <p className="text-gray-700"><strong>Issue Date:</strong> <span className="text-red-600">{new Date(activeLoan.issueDate).toLocaleDateString()}</span></p>
//             <p className="text-gray-700"><strong>Due Date:</strong> <span className="text-red-600">{new Date(activeLoan.repaymentDue).toLocaleDateString()}</span></p>

//             {/* File Upload */}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setScreenshot(e.target.files[0])}
//               className="mt-3 block w-full text-sm text-gray-600 border rounded-lg cursor-pointer focus:outline-none"
//             />

//             <button
//               onClick={() => handleRepaymentRequest(activeLoan._id)}
//               className="mt-4 w-full sm:w-auto px-5 py-2 bg-green-600 text-white font-medium rounded-lg shadow hover:bg-green-700 transition"
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
//         <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800">📜 Repayment History</h2>
//         {history.length > 0 ? (
//           <div className="space-y-3 sm:space-y-4">
//             {history.map((loan) => (
//               <div key={loan._id} className="p-4 sm:p-5 border rounded-xl shadow-sm bg-gray-50 hover:bg-gray-100 transition">
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

import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import {
  Landmark,
  IndianRupee,
  CalendarDays,
  Clock3,
  Upload,
  Send,
  History,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileImage,
} from "lucide-react";

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

        // Fetch active loan
        const activeRes = await axiosClient.get("/loan/activeloan");
        setActiveLoan(
          activeRes.data.length > 0 ? activeRes.data[0] : null
        );

        // Fetch repayment history
        const historyRes = await axiosClient.get(
          "/loan/repaymenthistory"
        );
        setHistory(historyRes.data || []);
      } catch (err) {
        console.error("Error fetching repayment data", err);
        setMessage("Failed to load repayment data");
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  const handleRepaymentRequest = async (loanId) => {
    if (!screenshot) {
      setMessage(
        "Please upload repayment screenshot before submitting."
      );
      return;
    }

    try {
      setMessage("Uploading repayment screenshot...");

      const formData = new FormData();
      formData.append("screenshot", screenshot);

      const res = await axiosClient.post(
        `/loan/${loanId}/request-repayment`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(res.data.message);
      setScreenshot(null);

      // Refresh data after repayment request
      const activeRes = await axiosClient.get(
        "/loan/activeloan"
      );

      setActiveLoan(
        activeRes.data.length > 0 ? activeRes.data[0] : null
      );

      const historyRes = await axiosClient.get(
        "/loan/repaymenthistory"
      );

      setHistory(historyRes.data || []);
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
          "Error submitting repayment request"
      );
    }
  };

  const formatDate = (date) => {
    return date
      ? new Date(date).toLocaleDateString()
      : "-";
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
        return {
          className:
            "border-emerald-200 bg-emerald-50 text-emerald-700",
          icon: CheckCircle2,
        };

      case "repaid":
        return {
          className:
            "border-blue-200 bg-blue-50 text-blue-700",
          icon: CheckCircle2,
        };

      case "rejected":
        return {
          className:
            "border-red-200 bg-red-50 text-red-700",
          icon: AlertCircle,
        };

      default:
        return {
          className:
            "border-amber-200 bg-amber-50 text-amber-700",
          icon: Clock3,
        };
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4">
        <div className="flex flex-col items-center text-center">
          <Loader2
            size={30}
            className="animate-spin text-blue-600"
          />

          <p className="mt-3 text-sm font-medium text-slate-600">
            Loading repayment data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-5xl px-3 py-5 sm:px-6 sm:py-8 lg:px-8">

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
                Loan Repayment
              </h1>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Submit your repayment proof and track repayment history.
              </p>
            </div>

          </div>

        </div>

        {/* ==================================================
            MESSAGE
        ================================================== */}

        {message && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700 sm:mb-6">

            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0"
            />

            <p className="leading-5">
              {message}
            </p>

          </div>
        )}

        {/* ==================================================
            ACTIVE LOAN
        ================================================== */}

        <section className="mb-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:mb-8 sm:rounded-2xl">

          {/* Section Header */}

          <div className="border-b border-slate-200 bg-slate-50/70 px-4 py-4 sm:px-6 sm:py-5">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Landmark size={19} />
              </div>

              <div>
                <h2 className="text-base font-bold text-slate-900 sm:text-lg">
                  Active Loan
                </h2>

                <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                  Complete your repayment using the payment proof.
                </p>
              </div>

            </div>

          </div>

          {/* Active Loan Content */}

          <div className="p-4 sm:p-6">

            {activeLoan ? (
              <>
                {/* Amount */}

                <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4 sm:p-5">

                  <p className="text-xs font-medium text-blue-600">
                    Outstanding Loan Amount
                  </p>

                  <div className="mt-1 flex items-center gap-1">

                    <IndianRupee
                      size={22}
                      className="text-slate-900"
                    />

                    <span className="text-2xl font-bold text-slate-900 sm:text-3xl">
                      {activeLoan.amount?.toLocaleString("en-IN")}
                    </span>

                  </div>

                </div>

                {/* Loan Details */}

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">

                  <div className="rounded-xl border border-slate-200 bg-white p-4">

                    <div className="flex items-center gap-2 text-slate-400">
                      <CheckCircle2 size={17} />

                      <span className="text-xs font-medium uppercase tracking-wide">
                        Status
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-semibold capitalize text-slate-800">
                      {activeLoan.status}
                    </p>

                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-4">

                    <div className="flex items-center gap-2 text-slate-400">
                      <CalendarDays size={17} />

                      <span className="text-xs font-medium uppercase tracking-wide">
                        Issue Date
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-semibold text-slate-800">
                      {formatDate(activeLoan.issueDate)}
                    </p>

                  </div>

                  <div className="rounded-xl border border-red-100 bg-red-50/50 p-4">

                    <div className="flex items-center gap-2 text-red-400">
                      <Clock3 size={17} />

                      <span className="text-xs font-medium uppercase tracking-wide">
                        Due Date
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-semibold text-red-700">
                      {formatDate(activeLoan.repaymentDue)}
                    </p>

                  </div>

                </div>

                {/* Upload Section */}

                <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 sm:p-5">

                  <div className="flex items-start gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                      <FileImage size={19} />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        Payment Screenshot
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Upload a screenshot showing your repayment transaction.
                      </p>
                    </div>

                  </div>

                  <label
                    htmlFor="repaymentScreenshot"
                    className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-6 text-center transition hover:border-blue-300 hover:bg-blue-50/30"
                  >

                    <Upload
                      size={22}
                      className="text-blue-600"
                    />

                    <p className="mt-2 text-sm font-semibold text-slate-700">
                      Choose payment screenshot
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Image files only
                    </p>

                    <input
                      id="repaymentScreenshot"
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setScreenshot(e.target.files[0])
                      }
                      className="hidden"
                    />

                  </label>

                  {/* Selected File */}

                  {screenshot && (
                    <div className="mt-3 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-3">

                      <CheckCircle2
                        size={18}
                        className="shrink-0 text-emerald-600"
                      />

                      <p className="min-w-0 flex-1 truncate text-sm font-medium text-emerald-700">
                        {screenshot.name}
                      </p>

                    </div>
                  )}

                </div>

                {/* Request Button */}

                <button
                  type="button"
                  onClick={() =>
                    handleRepaymentRequest(activeLoan._id)
                  }
                  disabled={!screenshot}
                  className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-sm transition sm:w-auto ${
                    screenshot
                      ? "bg-emerald-600 hover:bg-emerald-700 hover:shadow-md"
                      : "cursor-not-allowed bg-slate-300"
                  }`}
                >
                  <Send size={18} />
                  Request Repayment
                </button>
              </>
            ) : (
              <div className="py-8 text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <Landmark size={22} />
                </div>

                <p className="mt-3 text-sm font-medium text-slate-600">
                  No active loan available for repayment.
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Your active loan will appear here when available.
                </p>

              </div>
            )}

          </div>

        </section>

        {/* ==================================================
            REPAYMENT HISTORY
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
                  Repayment History
                </h2>

                <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                  View your previous repayment requests.
                </p>
              </div>

            </div>

          </div>

          {/* History */}

          <div className="p-4 sm:p-6">

            {history.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">

                {history.map((loan) => {
                  const status = getStatusStyle(loan.status);
                  const StatusIcon = status.icon;

                  return (
                    <div
                      key={loan._id}
                      className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-300"
                    >

                      {/* Card Header */}

                      <div className="flex flex-col gap-3 border-b border-slate-100 bg-slate-50/70 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                          <p className="text-xs font-medium text-slate-500">
                            Loan Amount
                          </p>

                          <p className="mt-0.5 text-lg font-bold text-slate-900">
                            ₹{loan.amount?.toLocaleString("en-IN")}
                          </p>
                        </div>

                        <span
                          className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${status.className}`}
                        >
                          <StatusIcon size={14} />

                          {loan.status
                            ? loan.status.charAt(0).toUpperCase() +
                              loan.status.slice(1)
                            : "Pending"}
                        </span>

                      </div>

                      {/* Card Details */}

                      <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">

                        {/* Status */}

                        <div className="flex items-center gap-3 px-4 py-3 sm:px-5">

                          <CheckCircle2
                            size={17}
                            className="shrink-0 text-slate-400"
                          />

                          <div>
                            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                              Status
                            </p>

                            <p className="mt-0.5 text-sm font-medium capitalize text-slate-700">
                              {loan.status || "Pending"}
                            </p>
                          </div>

                        </div>

                        {/* Repaid Date */}

                        <div className="flex items-center gap-3 px-4 py-3 sm:px-5">

                          <CalendarDays
                            size={17}
                            className="shrink-0 text-slate-400"
                          />

                          <div>
                            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                              Repaid On
                            </p>

                            <p className="mt-0.5 text-sm font-medium text-slate-700">
                              {formatDate(loan.repaidDate)}
                            </p>
                          </div>

                        </div>

                        {/* Fine */}

                        <div className="flex items-center gap-3 px-4 py-3 sm:px-5">

                          <IndianRupee
                            size={17}
                            className="shrink-0 text-slate-400"
                          />

                          <div>
                            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                              Fine
                            </p>

                            <p
                              className={`mt-0.5 text-sm font-semibold ${
                                loan.fine > 0
                                  ? "text-red-600"
                                  : "text-slate-700"
                              }`}
                            >
                              ₹{loan.fine || 0}
                            </p>
                          </div>

                        </div>

                      </div>

                    </div>
                  );
                })}

              </div>
            ) : (
              <div className="py-8 text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <History size={22} />
                </div>

                <p className="mt-3 text-sm font-medium text-slate-600">
                  No repayment history found.
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Your repayment records will appear here.
                </p>

              </div>
            )}

          </div>

        </section>

      </div>
    </div>
  );
}
