import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { Loader2, Calendar, FileSpreadsheet } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function PendingDeposits() {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM
  const [message, setMessage] = useState("");

  const fetchPending = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get(`/deposit-proofs/pending?month=${month}`);
      setPending(res.data.pendingMembers);
      setMessage(`Total Pending: ${res.data.pendingCount}`);
    } catch (err) {
      setMessage("⚠️ Error fetching pending deposits");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, [month]);

  // ✅ Export to Excel
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
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pending Deposits");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileName = `PendingDeposits_${month}.xlsx`;
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, fileName);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Title */}
      <h2 className="text-2xl font-extrabold mb-4 flex items-center gap-2 text-indigo-700">
        <Calendar className="w-6 h-6" /> Pending Deposits
      </h2>

      {/* Month Selector + Export Button */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Select Month:</label>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {pending.length > 0 && (
          <button
            onClick={exportToExcel}
            className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition-all"
          >
            <FileSpreadsheet className="w-5 h-5" /> Export Excel
          </button>
        )}
      </div>

      {/* Status Message */}
      {message && <p className="mb-3 text-gray-700 font-medium">{message}</p>}

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex items-center justify-center py-6">
          <Loader2 className="w-7 h-7 animate-spin text-indigo-600" />
        </div>
      ) : pending.length === 0 ? (
        <p className="text-green-600 font-semibold text-lg">
          ✅ All members deposited this month!
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full border border-gray-200 bg-white">
            <thead>
              <tr className="bg-indigo-100 text-black text-left">
                <th className="border p-3 text-center font-semibold">#</th>
                <th className="border p-3 font-semibold">Name</th>
                <th className="border p-3 font-semibold">Phone</th>
              </tr>
            </thead>
            <tbody>
              {pending.map((m, i) => (
                <tr
                  key={m.memberId}
                  className="hover:bg-indigo-50 transition-colors text-black"
                >
                  <td className="border p-3 text-center">{i + 1}</td>
                  <td className="border p-3">{m.name}</td>
                  <td className="border p-3">{m.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
