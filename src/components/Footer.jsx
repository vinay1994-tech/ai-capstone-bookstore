import { BookOpen, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-indigo-900 text-indigo-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-xl mb-3">
              <BookOpen className="text-amber-400" size={24} />
              <span><span className="text-amber-400">Page</span>Turner</span>
            </div>
            <p className="text-sm leading-relaxed">
              Your one-stop destination for books across every genre. Discover your next great read today.
            </p>
            <div className="flex gap-4 mt-4 text-lg">
              <span className="cursor-pointer hover:text-amber-400 transition-colors" title="Facebook">📘</span>
              <span className="cursor-pointer hover:text-amber-400 transition-colors" title="Twitter">🐦</span>
              <span className="cursor-pointer hover:text-amber-400 transition-colors" title="Instagram">📸</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/home" className="hover:text-amber-400 transition-colors">Home</Link></li>
              <li><Link to="/catalogue" className="hover:text-amber-400 transition-colors">Browse Books</Link></li>
              <li><Link to="/cart" className="hover:text-amber-400 transition-colors">My Cart</Link></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Order History</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-3">Categories</h4>
            <ul className="space-y-2 text-sm">
              {["Fiction", "Non-Fiction", "Science & Tech", "Self-Help", "History", "Children"].map((c) => (
                <li key={c}>
                  <Link to={`/catalogue?category=${c}`} className="hover:text-amber-400 transition-colors">{c}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-3">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <MapPin size={14} /> 123 Book Street, New York, NY
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} /> +1 (800) 555-BOOK
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} /> support@pageturner.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-indigo-700 mt-10 pt-6 text-center text-xs text-indigo-400">
          © 2025 PageTurner Books. All rights reserved. | Privacy Policy | Terms of Service
        </div>
      </div>
    </footer>
  );
}
