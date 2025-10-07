// src/pages/Rules.jsx
export default function Rules() {
  const rules = [
    "Every member must contribute ₹500 monthly.",
    "Loans of ₹5000 (till Dec 2024) and ₹10000 (from Jan 2025) are available.",
    "Repayment must be completed within 90 days, otherwise fines apply.",
    "A guarantor is required for each loan (only one active guarantee allowed).",
    "Late fines: ₹300 for ₹5000 loan, ₹500 for ₹10000 loan.",
    "Members must give 2 months' notice to leave the society.",
    "Core committee resolves disputes and ensures transparency."
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Society Rules</h2>
      <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
        {rules.map((rule, idx) => (
          <li key={idx}>{rule}</li>
        ))}
      </ul>
    </div>
  );
}
