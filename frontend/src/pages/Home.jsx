// src/pages/Home.jsx
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4 sm:px-6">
      <div className="max-w-3xl w-full text-center p-6 sm:p-10 bg-white rounded-2xl shadow-lg">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="Azhari-United society"
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-full shadow-xl border-4 border-blue-100 hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-snug">
          Welcome to <span className="text-blue-600">Azhari-United Society</span>
        </h1>

      
        

        {/* Paragraph */}
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          At <span className="font-semibold text-blue-600">Azhari-United Society</span>,
          we believe in creating a transparent and trustworthy financial system
          for our members. Our platform makes it easier than ever to manage
          deposits, apply for loans, and track contributions — all in one secure
          and user-friendly application. Together, we aim to build a stronger
          community through accountability and shared growth.
        </p>

        {/* CTA Button */}
        <div className="mt-8">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-semibold rounded-xl shadow-md transition-all duration-300" onClick={() => navigate("/login")}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
