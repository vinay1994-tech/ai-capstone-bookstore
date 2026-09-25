import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { books } from "../data/mockData";
import BookCard from "../components/BookCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQty, cartTotal } = useCart();
  const navigate = useNavigate();

  // Recommendations: books not in cart
  const cartIds = new Set(cartItems.map((i) => i.id));
  const recommendations = books
    .filter((b) => !cartIds.has(b.id) && b.inStock)
    .slice(0, 4);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-24 text-center">
          <div className="text-7xl mb-6">🛒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added any books yet.</p>
          <button
            onClick={() => navigate("/catalogue")}
            className="bg-indigo-700 hover:bg-indigo-800 text-white font-semibold px-8 py-3 rounded-full transition-colors"
          >
            Browse Books
          </button>
        </div>
        {/* Recommendations when empty */}
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <h3 className="text-xl font-bold text-gray-800 mb-5">Recommended for You</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {books.slice(0, 4).map((b) => <BookCard key={b.id} book={b} />)}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const savings = cartItems.reduce(
    (sum, i) => sum + (i.originalPrice - i.price) * i.qty,
    0
  );
  const shipping = cartTotal >= 25 ? 0 : 3.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Shopping Cart <span className="text-gray-400 font-normal text-lg">({cartItems.length} items)</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-5"
              >
                {/* Cover thumbnail */}
                <div
                  className="w-20 h-24 rounded-xl flex items-center justify-center shrink-0 cursor-pointer text-2xl"
                  style={{ background: `hsl(${(item.id * 60) % 360}, 70%, 93%)` }}
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  📚
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3
                        className="font-semibold text-gray-800 text-sm line-clamp-2 cursor-pointer hover:text-indigo-700"
                        onClick={() => navigate(`/product/${item.id}`)}
                      >
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">{item.author}</p>
                      <p className="text-xs text-gray-400">{item.brand}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-300 hover:text-rose-500 transition-colors shrink-0"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Qty */}
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="px-2 py-1 hover:bg-gray-50 text-gray-600"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3 py-1 text-sm font-medium">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="px-2 py-1 hover:bg-gray-50 text-gray-600"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-bold text-indigo-700">${(item.price * item.qty).toFixed(2)}</p>
                      <p className="text-xs text-gray-400">${item.price.toFixed(2)} each</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-gray-800 text-lg mb-4">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.reduce((s, i) => s + i.qty, 0)} items)</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-emerald-600">
                  <span>Savings</span>
                  <span>-${savings.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="text-emerald-600 font-medium">FREE</span> : `$${shipping.toFixed(2)}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-gray-400">Add ${(25 - cartTotal).toFixed(2)} more for free shipping</p>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900 text-base">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="mt-5 w-full bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingBag size={18} />
                Proceed to Checkout
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => navigate("/catalogue")}
                className="mt-3 w-full border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium py-2.5 rounded-xl text-sm transition-colors"
              >
                Continue Shopping
              </button>
            </div>

            {/* Gift points notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm">
              <p className="font-semibold text-amber-800 mb-1">🎁 Gift Points</p>
              <p className="text-amber-700 text-xs">
                You'll earn <strong>{cartItems.reduce((s, i) => s + i.points * i.qty, 0)}</strong> points on this order.
                Redeem them at checkout!
              </p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-gray-800 mb-5">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {recommendations.map((b) => <BookCard key={b.id} book={b} />)}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}
