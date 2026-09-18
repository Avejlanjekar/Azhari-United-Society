import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import {
  Loader2,
  Calendar,
  FileSpreadsheet,
  Users,
  Mail,
  Phone,
  CheckCircle2,
  Clock3,
  FileText,
} from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function PendingDeposits() {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const [message, setMessage] = useState("");

  // --------------------------------------------------
  // Fetch pending deposits
  // --------------------------------------------------

  const fetchPending = async () => {
    try {
      setLoading(true);

      const res = await axiosClient.get(
        `/deposit-proofs/pending?month=${month}`
      );

      setPending(res.data.pendingMembers);

      setMessage(
        `Total Pending: ${res.data.pendingCount}`
      );
    } catch (err) {
      setMessage("Error fetching pending deposits");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, [month]);

  // --------------------------------------------------
  // Export to Excel
  // --------------------------------------------------

  const exportToExcel = () => {
    if (pending.length === 0) return;

    const worksheet = XLSX.utils.json_to_sheet(
      pending.map((m, i) => ({
        "S.No": i + 1,
        Name: m.name,
        Email: m.email,
        Phone: m.phone,
      }))
    );

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Pending Deposits"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileName = `PendingDeposits_${month}.xlsx`;

    const data = new Blob(
      [excelBuffer],
      {
        type: "application/octet-stream",
      }
    );

    saveAs(data, fileName);
  };

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="mx-auto w-full max-w-6xl px-3 py-5 sm:px-6 sm:py-6 lg:px-8">

        {/* ==================================================
            PAGE HEADER
        ================================================== */}

        <div className="mb-6 sm:mb-8">

          <div className="flex items-start gap-3 sm:items-center">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm sm:h-11 sm:w-11 sm:rounded-2xl">
              <Clock3 className="h-5 w-5" />
            </div>

            <div className="min-w-0">

              <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Pending Deposits
              </h1>

              <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500 sm:text-sm">
                View members who have not yet submitted their deposit for the selected month.
              </p>

            </div>

          </div>

        </div>

        {/* ==================================================
            FILTER / ACTION CARD
        ================================================== */}

        <div className="mb-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:mb-8 sm:rounded-2xl">

          <div className="border-b border-slate-100 px-4 py-4 sm:px-5">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Calendar className="h-4.5 w-4.5" />
              </div>

              <div>

                <h2 className="text-sm font-semibold text-slate-900">
                  Deposit Period
                </h2>

                <p className="mt-0.5 text-[11px] text-slate-500">
                  Select a month to view pending members.
                </p>

              </div>

            </div>

          </div>

          <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-end sm:justify-between sm:p-5">

            {/* Month Selector */}

            <div className="w-full sm:max-w-xs">

              <label className="mb-1.5 block text-xs font-medium text-slate-600">
                Select Month
              </label>

              <div className="relative">

                <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="month"
                  value={month}
                  onChange={(e) =>
                    setMonth(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

              </div>

            </div>

            {/* Export Button */}

            {pending.length > 0 && (
              <button
                type="button"
                onClick={exportToExcel}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.99] sm:w-auto"
              >

                <FileSpreadsheet className="h-4 w-4" />

                Export Excel

              </button>
            )}

          </div>

        </div>

        {/* ==================================================
            STATUS SUMMARY
        ================================================== */}

        {message && (
          <div
            className={`mb-5 flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium ${message.startsWith("Error")
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-blue-200 bg-blue-50 text-blue-700"
              }`}
          >

            {message.startsWith("Error") ? (
              <FileText className="h-4 w-4 shrink-0" />
            ) : (
              <Users className="h-4 w-4 shrink-0" />
            )}

            <span>{message}</span>

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
                Loading pending deposits...
              </p>

            </div>

          </div>

        ) : pending.length === 0 ? (

          /* ==================================================
             EMPTY STATE
          ================================================== */

          <div className="rounded-xl border border-emerald-200 bg-white shadow-sm sm:rounded-2xl">

            <div className="flex min-h-64 flex-col items-center justify-center px-5 py-10 text-center">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50">

                <CheckCircle2 className="h-7 w-7 text-emerald-600" />

              </div>

              <h2 className="mt-4 text-base font-bold text-slate-800 sm:text-lg">
                All deposits are complete
              </h2>

              <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500 sm:text-sm">
                All members have deposited for the selected month.
              </p>

            </div>

          </div>

        ) : (

          <>
            {/* ==================================================
                DESKTOP TABLE
            ================================================== */}

            <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">

              <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-sm font-semibold text-slate-900">
                      Members With Pending Deposits
                    </h2>

                    <p className="mt-0.5 text-xs text-slate-500">
                      The following members have not submitted their deposit.
                    </p>

                  </div>

                  <div className="rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                    {pending.length}{" "}
                    {pending.length === 1
                      ? "member"
                      : "members"}
                  </div>

                </div>

              </div>

              <div className="overflow-x-auto">

                <table className="w-full border-collapse text-sm">

                  <thead>

                    <tr className="border-b border-slate-200">

                      <th className="w-20 px-5 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                        #
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Member
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Phone
                      </th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-slate-100">

                    {pending.map((m, i) => (

                      <tr
                        key={m.memberId}
                        className="transition-colors hover:bg-slate-50/80"
                      >

                        {/* Number */}

                        <td className="px-5 py-4 text-center">

                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-xs font-semibold text-slate-600">
                            {i + 1}
                          </span>

                        </td>

                        {/* Member */}

                        <td className="px-5 py-4">

                          <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                              <Users className="h-4 w-4" />
                            </div>

                            <div className="min-w-0">

                              <p className="font-semibold text-slate-800">
                                {m.name}
                              </p>

                              {m.email && (
                                <p className="mt-0.5 truncate text-xs text-slate-400">
                                  {m.email}
                                </p>
                              )}

                            </div>

                          </div>

                        </td>

                        {/* Phone */}

                        <td className="px-5 py-4">

                          <div className="flex items-center gap-2 text-slate-600">

                            <Phone className="h-4 w-4 text-slate-400" />

                            <span>
                              {m.phone || "Not available"}
                            </span>

                          </div>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

            {/* ==================================================
                MOBILE CARDS
            ================================================== */}

            <div className="space-y-3 md:hidden">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-sm font-semibold text-slate-900">
                    Pending Members
                  </h2>

                  <p className="mt-0.5 text-[11px] text-slate-500">
                    Members who have not deposited yet.
                  </p>

                </div>

                <div className="rounded-lg bg-amber-50 px-2.5 py-1.5 text-[11px] font-semibold text-amber-700">
                  {pending.length}
                </div>

              </div>

              {pending.map((m, i) => (

                <div
                  key={m.memberId}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >

                  {/* Card Header */}

                  <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50 px-4 py-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Users className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1">

                      <p className="truncate text-sm font-bold text-slate-900">
                        {m.name}
                      </p>

                      <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-amber-600">
                        Pending Deposit
                      </p>

                    </div>

                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-semibold text-slate-500 shadow-sm">
                      {i + 1}
                    </span>

                  </div>

                  {/* Member Details */}

                  <div className="space-y-3 px-4 py-4">

                    {m.email && (
                      <div className="flex items-center gap-3">

                        <Mail className="h-4 w-4 shrink-0 text-slate-400" />

                        <div className="min-w-0">

                          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                            Email
                          </p>

                          <p className="mt-0.5 truncate text-xs font-medium text-slate-700">
                            {m.email}
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
                          {m.phone || "Not available"}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>
          </>
        )}

      </div>
    </div>
  );
}
