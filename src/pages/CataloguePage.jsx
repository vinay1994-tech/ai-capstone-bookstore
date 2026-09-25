import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, X, ChevronDown } from "lucide-react";
import { books, categories, brands, orderHistory } from "../data/mockData";
import BookCard from "../components/BookCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "reviews", label: "Most Reviewed" },
];

export default function CataloguePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 25]);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const cat = searchParams.get("category");
    const s = searchParams.get("search");
    if (cat) setSelectedCategory(cat);
    if (s) setSearch(s);
  }, [searchParams]);

  const filtered = books
    .filter((b) => {
      if (selectedCategory !== "All" && b.category !== selectedCategory) return false;
      if (selectedBrand !== "All" && b.brand !== selectedBrand) return false;
      if (b.price < priceRange[0] || b.price > priceRange[1]) return false;
      if (
        search &&
        !b.title.toLowerCase().includes(search.toLowerCase()) &&
        !b.author.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "reviews") return b.reviews - a.reviews;
      return b.bestseller - a.bestseller;
    });

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedBrand("All");
    setPriceRange([0, 25]);
    setSearch("");
    setSearchParams({});
  };

  const activeFilters =
    (selectedCategory !== "All" ? 1 : 0) +
    (selectedBrand !== "All" ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 25 ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Page header */}
      <div className="bg-indigo-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Book Catalogue</h1>
          <p className="text-indigo-300 text-sm">Explore our collection of {books.length}+ books</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search + Sort bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or author…"
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <div className="flex gap-3">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-8 appearance-none bg-white"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 border rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                showFilters ? "bg-indigo-700 text-white border-indigo-700" : "bg-white border-gray-200 text-gray-700 hover:border-indigo-400"
              }`}
            >
              <Filter size={16} />
              Filters
              {activeFilters > 0 && (
                <span className="bg-amber-400 text-indigo-900 text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {activeFilters}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Category</label>
                <div className="flex flex-wrap gap-2">
                  {["All", ...categories.map((c) => c.name)].map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCategory(c)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                        selectedCategory === c
                          ? "bg-indigo-700 text-white border-indigo-700"
                          : "bg-white text-gray-600 border-gray-200 hover:border-indigo-400"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Publisher</label>
                <div className="flex flex-wrap gap-2">
                  {["All", ...brands.map((b) => b.name)].map((b) => (
                    <button
                      key={b}
                      onClick={() => setSelectedBrand(b)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                        selectedBrand === b
                          ? "bg-indigo-700 text-white border-indigo-700"
                          : "bg-white text-gray-600 border-gray-200 hover:border-indigo-400"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Price: up to ${priceRange[1]}
                </label>
                <input
                  type="range"
                  min={0}
                  max={25}
                  step={1}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                  className="w-full accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>$0</span><span>$25</span>
                </div>
              </div>
            </div>

            {activeFilters > 0 && (
              <button
                onClick={clearFilters}
                className="mt-4 flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-medium"
              >
                <X size={14} /> Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Order History section */}
        <div className="mb-6">
          <button
            onClick={() => setShowOrderHistory(!showOrderHistory)}
            className="flex items-center gap-2 text-indigo-700 font-semibold text-sm hover:underline"
          >
            {showOrderHistory ? "▲" : "▼"} My Order History
          </button>

          {showOrderHistory && (
            <div className="mt-4 bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800">Previous Orders</h3>
                <p className="text-xs text-gray-500">Quickly re-order your favourite books</p>
              </div>
              {orderHistory.map((order) => (
                <div key={order.id} className="p-4 border-b border-gray-50 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-sm font-medium text-gray-800">{order.id}</span>
                      <span className="text-xs text-gray-400 ml-2">{order.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">{order.status}</span>
                      <span className="text-sm font-semibold text-gray-800">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {order.items.map((item) => (
                      <span key={item.id} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-lg">{item.title}</span>
                    ))}
                    <button
                      onClick={() => order.items.forEach((i) => addToCart(i))}
                      className="ml-auto text-xs bg-indigo-700 text-white px-3 py-1 rounded-full hover:bg-indigo-800 transition-colors font-medium"
                    >
                      Buy Again
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {["All", ...categories.map((c) => c.name)].map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                selectedCategory === c
                  ? "bg-indigo-700 text-white border-indigo-700"
                  : "bg-white text-gray-600 border-gray-200 hover:border-indigo-400"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Publisher chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {["All", ...brands.map((b) => b.name)].map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBrand(b)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                selectedBrand === b
                  ? "bg-amber-400 text-indigo-900 border-amber-400"
                  : "bg-white text-gray-500 border-gray-200 hover:border-amber-300"
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-4">
          Showing <span className="font-semibold text-gray-800">{filtered.length}</span> results
          {selectedCategory !== "All" && <span> in <span className="text-indigo-700 font-medium">{selectedCategory}</span></span>}
          {search && <span> for "<span className="text-indigo-700 font-medium">{search}</span>"</span>}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No books found</h3>
            <p className="text-gray-500 text-sm mb-4">Try adjusting your filters or search query</p>
            <button onClick={clearFilters} className="bg-indigo-700 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-indigo-800">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
