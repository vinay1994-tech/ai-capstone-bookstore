import { Star, ShoppingCart, Package } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const COLORS = [
  "bg-indigo-100 text-indigo-700",
  "bg-amber-100 text-amber-700",
  "bg-emerald-100 text-emerald-700",
  "bg-rose-100 text-rose-700",
  "bg-violet-100 text-violet-700",
  "bg-sky-100 text-sky-700",
];

export default function BookCard({ book, showCategory = true }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const colorClass = COLORS[book.id % COLORS.length];

  const discount = Math.round(
    ((book.originalPrice - book.price) / book.originalPrice) * 100
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col overflow-hidden group">
      {/* Book cover */}
      <div
        className={`relative ${colorClass} flex items-center justify-center h-44 cursor-pointer`}
        onClick={() => navigate(`/product/${book.id}`)}
      >
        <div className="text-center px-4">
          <div className="text-4xl mb-2">📚</div>
          <p className="font-bold text-sm leading-tight line-clamp-2">{book.title}</p>
          <p className="text-xs mt-1 opacity-70">{book.author}</p>
        </div>
        {book.bestseller && (
          <span className="absolute top-2 left-2 bg-amber-400 text-indigo-900 text-xs font-bold px-2 py-0.5 rounded-full">
            Bestseller
          </span>
        )}
        {!book.inStock && (
          <span className="absolute top-2 right-2 bg-gray-400 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            Out of Stock
          </span>
        )}
        {discount > 0 && book.inStock && (
          <span className="absolute top-2 right-2 bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            -{discount}%
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3
          className="font-semibold text-gray-800 text-sm leading-tight line-clamp-2 cursor-pointer hover:text-indigo-700"
          onClick={() => navigate(`/product/${book.id}`)}
        >
          {book.title}
        </h3>
        <p className="text-xs text-gray-500 mt-1">{book.author}</p>

        {showCategory && (
          <span className="text-xs text-indigo-600 font-medium mt-1">{book.category}</span>
        )}

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={12}
              className={
                i < Math.floor(book.rating)
                  ? "fill-amber-400 text-amber-400"
                  : "text-gray-300"
              }
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">({book.reviews.toLocaleString()})</span>
        </div>

        {/* Delivery */}
        <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2">
          <Package size={12} />
          <span>Delivery by {book.deliveryDate}</span>
        </div>

        {/* Price */}
        <div className="flex items-end gap-2 mt-3">
          <span className="text-indigo-700 font-bold text-lg">${book.price.toFixed(2)}</span>
          <span className="text-gray-400 text-xs line-through">${book.originalPrice.toFixed(2)}</span>
        </div>

        {/* Add to cart */}
        <button
          onClick={() => addToCart(book)}
          disabled={!book.inStock}
          className={`mt-3 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-semibold transition-colors ${
            book.inStock
              ? "bg-indigo-700 text-white hover:bg-indigo-800"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          <ShoppingCart size={16} />
          {book.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}
