import { useParams, useNavigate } from "react-router-dom";
import { Star, ShoppingCart, Package, ChevronLeft, Heart } from "lucide-react";
import { books } from "../data/mockData";
import BookCard from "../components/BookCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useState } from "react";

const COLORS = [
  "bg-indigo-100 text-indigo-700",
  "bg-amber-100 text-amber-700",
  "bg-emerald-100 text-emerald-700",
  "bg-rose-100 text-rose-700",
  "bg-violet-100 text-violet-700",
  "bg-sky-100 text-sky-700",
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  const book = books.find((b) => b.id === Number(id));

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32">
          <div className="text-5xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Book not found</h2>
          <button
            onClick={() => navigate("/catalogue")}
            className="mt-4 bg-indigo-700 text-white px-5 py-2 rounded-full hover:bg-indigo-800"
          >
            Back to Catalogue
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const related = books
    .filter((b) => b.id !== book.id && b.category === book.category)
    .slice(0, 4);

  const colorClass = COLORS[book.id % COLORS.length];
  const discount = Math.round(
    ((book.originalPrice - book.price) / book.originalPrice) * 100
  );

  const handleAddToCart = () => {
    addToCart(book, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-indigo-600 hover:underline mb-6"
        >
          <ChevronLeft size={16} /> Back
        </button>

        {/* Main product section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          {/* Cover */}
          <div className={`${colorClass} rounded-2xl flex flex-col items-center justify-center p-10 relative min-h-64`}>
            <div className="text-8xl mb-4">📚</div>
            <p className="font-bold text-lg text-center leading-tight">{book.title}</p>
            <p className="text-sm mt-1 opacity-70">{book.author}</p>
            {book.bestseller && (
              <span className="absolute top-3 left-3 bg-amber-400 text-indigo-900 text-xs font-bold px-2 py-0.5 rounded-full">
                Bestseller
              </span>
            )}
            {discount > 0 && (
              <span className="absolute top-3 right-3 bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                -{discount}%
              </span>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{book.category}</span>
                <h1 className="text-2xl font-bold text-gray-900 mt-2 mb-1">{book.title}</h1>
                <p className="text-gray-500 text-sm">by <span className="font-medium text-gray-700">{book.author}</span></p>
                <p className="text-xs text-gray-400 mt-0.5">Publisher: {book.brand}</p>
              </div>
              <button
                onClick={() => setWishlisted(!wishlisted)}
                className={`p-2 rounded-full border transition-colors ${
                  wishlisted ? "bg-rose-50 border-rose-300 text-rose-500" : "border-gray-200 text-gray-400 hover:border-rose-300"
                }`}
              >
                <Heart size={20} fill={wishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < Math.floor(book.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-200"
                    }
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-800">{book.rating}</span>
              <span className="text-sm text-gray-400">({book.reviews.toLocaleString()} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mt-5">
              <span className="text-3xl font-extrabold text-indigo-700">${book.price.toFixed(2)}</span>
              <span className="text-lg text-gray-400 line-through">${book.originalPrice.toFixed(2)}</span>
              {discount > 0 && (
                <span className="bg-rose-100 text-rose-600 text-sm font-bold px-2 py-0.5 rounded-lg">Save {discount}%</span>
              )}
            </div>

            {/* Delivery */}
            <div className="flex items-center gap-2 mt-4 text-sm text-emerald-600 font-medium">
              <Package size={16} />
              Estimated delivery: <span className="font-semibold">{book.deliveryDate}</span>
            </div>

            {/* Points */}
            <div className="flex items-center gap-2 mt-2 text-sm text-amber-600">
              🎁 Earn <span className="font-bold">{book.points}</span> gift points on this purchase
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mt-5 leading-relaxed">{book.description}</p>

            {/* Qty + Add to cart */}
            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-50 font-bold"
                >
                  −
                </button>
                <span className="px-4 py-2 font-semibold text-gray-800 min-w-12 text-center">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-50 font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!book.inStock}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-colors ${
                  !book.inStock
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : added
                    ? "bg-emerald-600 text-white"
                    : "bg-indigo-700 hover:bg-indigo-800 text-white"
                }`}
              >
                <ShoppingCart size={18} />
                {!book.inStock ? "Out of Stock" : added ? "Added to Cart ✓" : "Add to Cart"}
              </button>
            </div>

            <button
              onClick={() => { addToCart(book, qty); navigate("/cart"); }}
              disabled={!book.inStock}
              className="mt-3 w-full border-2 border-indigo-700 text-indigo-700 hover:bg-indigo-50 font-semibold py-3 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-5">Related Books</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((b) => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}
