import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, BookOpen, User, LogOut, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function Navbar() {
  const { cartCount, user, setUser } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalogue?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="bg-indigo-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-2 font-bold text-xl">
            <BookOpen className="text-amber-400" size={28} />
            <span className="hidden sm:block">
              <span className="text-amber-400">Page</span>Turner
            </span>
          </Link>

          {/* Search bar — desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 mx-8 max-w-lg"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search books, authors, genres…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 rounded-full bg-indigo-800 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-300 hover:text-amber-400"
              >
                <Search size={18} />
              </button>
            </div>
          </form>

          {/* Nav links — desktop */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/home" className="hover:text-amber-400 transition-colors">Home</Link>
            <Link to="/catalogue" className="hover:text-amber-400 transition-colors">Catalogue</Link>

            {/* Cart */}
            <Link to="/cart" className="relative hover:text-amber-400 transition-colors">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-400 text-indigo-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User */}
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-indigo-300 text-xs">Hi, {user.name}</span>
                <button onClick={handleLogout} className="hover:text-amber-400 transition-colors" title="Logout">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="hover:text-amber-400 transition-colors">
                <User size={22} />
              </Link>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center gap-4">
            <Link to="/cart" className="relative">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-400 text-indigo-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden mt-3 pb-3 border-t border-indigo-700 pt-3 flex flex-col gap-3 text-sm">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Search books…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 pl-3 pr-2 py-2 rounded-l-full bg-indigo-800 placeholder-indigo-300 focus:outline-none text-sm"
              />
              <button type="submit" className="bg-amber-400 text-indigo-900 px-3 rounded-r-full">
                <Search size={16} />
              </button>
            </form>
            <Link to="/home" onClick={() => setMenuOpen(false)} className="hover:text-amber-400">Home</Link>
            <Link to="/catalogue" onClick={() => setMenuOpen(false)} className="hover:text-amber-400">Catalogue</Link>
            {user ? (
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="text-left hover:text-amber-400">
                Logout ({user.name})
              </button>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:text-amber-400">Login</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
