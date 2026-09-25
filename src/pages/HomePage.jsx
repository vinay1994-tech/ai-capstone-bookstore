import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Star, TrendingUp, Gift, Truck } from "lucide-react";
import { books, categories } from "../data/mockData";
import BookCard from "../components/BookCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function HomePage() {
  const navigate = useNavigate();
  const featured = books.filter((b) => b.bestseller).slice(0, 4);
  const newArrivals = books.slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <span className="bg-amber-400 text-indigo-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              New arrivals every week
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mt-4 mb-4 leading-tight">
              Discover Your Next<br />
              <span className="text-amber-400">Favourite Book</span>
            </h1>
            <p className="text-indigo-200 text-lg mb-8 max-w-md">
              Explore thousands of titles across every genre. From bestsellers to hidden gems — your perfect read is just a click away.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => navigate("/catalogue")}
                className="bg-amber-400 hover:bg-amber-500 text-indigo-900 font-bold px-6 py-3 rounded-full flex items-center gap-2 transition-colors"
              >
                Browse Catalogue <ArrowRight size={18} />
              </button>
              <button
                onClick={() => navigate("/catalogue")}
                className="border border-white text-white hover:bg-white hover:text-indigo-900 font-semibold px-6 py-3 rounded-full transition-colors"
              >
                View Deals
              </button>
            </div>
          </div>
          <div className="hidden md:flex gap-4">
            {books.slice(0, 3).map((book, i) => {
              const colors = ["bg-amber-100", "bg-rose-100", "bg-emerald-100"];
              return (
                <div
                  key={book.id}
                  className={`${colors[i]} rounded-2xl p-5 w-36 flex flex-col items-center text-center cursor-pointer hover:scale-105 transition-transform`}
                  style={{ marginTop: i === 1 ? "2rem" : 0 }}
                  onClick={() => navigate(`/product/${book.id}`)}
                >
                  <div className="text-5xl mb-2">📚</div>
                  <p className="text-xs font-semibold text-gray-800 line-clamp-2">{book.title}</p>
                  <p className="text-xs text-gray-500 mt-1">${book.price}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Truck size={22} className="text-indigo-600" />, title: "Free Shipping", desc: "On orders over $25" },
            { icon: <Gift size={22} className="text-amber-500" />, title: "Gift Points", desc: "Earn on every purchase" },
            { icon: <Star size={22} className="text-emerald-600" />, title: "Top Rated", desc: "Curated bestsellers" },
            { icon: <TrendingUp size={22} className="text-rose-500" />, title: "Weekly Deals", desc: "New discounts every week" },
          ].map((v) => (
            <div key={v.title} className="flex items-center gap-3 p-3">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                {v.icon}
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-800">{v.title}</p>
                <p className="text-xs text-gray-500">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Browse by Category</h2>
          <Link to="/catalogue" className="text-indigo-600 text-sm font-medium hover:underline flex items-center gap-1">
            See all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/catalogue?category=${cat.name}`}
              className="bg-white rounded-2xl border border-gray-100 p-4 text-center hover:border-indigo-300 hover:shadow-sm transition-all group"
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <p className="font-semibold text-sm text-gray-800 group-hover:text-indigo-700">{cat.name}</p>
              <p className="text-xs text-gray-400 mt-1">{cat.count} books</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">⭐ Bestsellers</h2>
          <Link to="/catalogue" className="text-indigo-600 text-sm font-medium hover:underline flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featured.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* New arrivals */}
      <section className="bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">🆕 New Arrivals</h2>
            <Link to="/catalogue" className="text-indigo-600 text-sm font-medium hover:underline flex items-center gap-1">
              See all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {newArrivals.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-indigo-900 text-white">
        <div className="max-w-2xl mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-2">Stay in the loop</h2>
          <p className="text-indigo-300 text-sm mb-6">Get weekly recommendations and exclusive deals in your inbox.</p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full bg-indigo-800 text-white placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
            />
            <button className="bg-amber-400 hover:bg-amber-500 text-indigo-900 font-bold px-5 py-3 rounded-full transition-colors text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
