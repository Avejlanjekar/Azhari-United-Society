// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Ahlan Society</h3>
          <p className="text-sm leading-relaxed">
            Building a transparent and trustworthy financial system for our
            members through accountability and shared growth.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
            <li><Link to="/about" className="hover:text-blue-400">About</Link></li>
            <li><Link to="/founders" className="hover:text-blue-400">Founders</Link></li>
            <li><Link to="/rules" className="hover:text-blue-400">Rules</Link></li>
            <li><Link to="/login" className="hover:text-blue-400">Login</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Contact</h3>
          <p>Email: <a href="mailto:info@ahlanrazanagar.org" className="hover:text-blue-400">info@ahlanrazanagar.org</a></p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-blue-400"><Facebook /></a>
            <a href="#" className="hover:text-blue-400"><Twitter /></a>
            <a href="#" className="hover:text-blue-400"><Instagram /></a>
            <a href="mailto:info@ahlanrazanagar.org" className="hover:text-blue-400"><Mail /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Ahlan Razanagar Society. All rights reserved.
      </div>
    </footer>
  );
}
