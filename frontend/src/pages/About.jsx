import React from "react";

export default function About() {
  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          🏠 About Ahlan Society App
        </h1>

        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Welcome to the <span className="font-semibold">Ahlan Society App</span>,
          a digital platform designed to make society management{" "}
          <span className="text-green-600 font-medium">
            simpler, faster, and transparent
          </span>.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">
          ✨ Our Mission
        </h2>
        <p className="text-gray-700 mb-6">
          To empower our society members with{" "}
          <span className="font-medium">financial transparency</span> and{" "}
          <span className="font-medium">easy access</span> to their records, while
          helping the management committee run operations smoothly.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">
          🚀 Key Features
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>💰 <b>Deposits Management</b> – Track monthly deposits with complete history.</li>
          <li>🏦 <b>Loan System</b> – Apply, approve, and manage loans with clear eligibility rules.</li>
          <li>📊 <b>Fines & Repayments</b> – Automatic fine calculations and repayment tracking.</li>
          <li>🔔 <b>Notifications</b> – Get updates when your deposits, loans, or repayments are approved or rejected.</li>
          <li>👨‍👩‍👧‍👦 <b>Member Dashboard</b> – Every member can view their contributions, loans, and activities.</li>
          <li>📈 <b>Transparency First</b> – Ensuring all financial activities are clear and accessible.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">
          🤝 Why Ahlan Society App?
        </h2>
        <p className="text-gray-700 mb-6">
          We believe in <span className="font-medium">community-driven growth</span>. 
          This app helps members stay informed, ensures accountability, 
          and reduces manual work for the committee.
        </p>

        

        <p className="mt-8 text-gray-600 italic text-center">
          📌 Together, we are building a stronger and more connected community.
        </p>
      </div>
    </div>
  );
}

