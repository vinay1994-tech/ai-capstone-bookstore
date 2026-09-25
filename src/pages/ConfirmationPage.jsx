import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Package, Home, ShoppingBag, X } from "lucide-react";
import { books } from "../data/mockData";
import BookCard from "../components/BookCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Generate a mock order number
const ORDER_NO = `ORD-${Date.now().toString().slice(-6)}`;

export default function ConfirmationPage() {
  const navigate = useNavigate();
  const [cancelled, setCancelled] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const recommendations = books.filter((b) => b.inStock).slice(0, 4);

  if (cancelled) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-24 text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Cancelled</h2>
          <p className="text-gray-500 mb-8">
            Your order <span className="font-semibold">{ORDER_NO}</span> has been cancelled. No payment was taken.
          </p>
          <button
            onClick={() => navigate("/home")}
            className="bg-indigo-700 hover:bg-indigo-800 text-white font-semibold px-8 py-3 rounded-full transition-colors"
          >
            Return to Home
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Cancel modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Cancel this order?</h3>
            <p className="text-sm text-gray-500 mb-6">
              You can cancel within 48 hours of purchase. After that, cancellations are not accepted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 border border-gray-200 text-gray-600 font-medium py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Keep Order
              </button>
              <button
                onClick={() => { setShowCancelModal(false); setCancelled(true); }}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2.5 rounded-xl transition-colors"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Success card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center mb-8">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={44} className="text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-500 text-sm mb-1">Thank you for your purchase 🎉</p>
          <p className="text-indigo-700 font-semibold text-sm">
            Order #{ORDER_NO}
          </p>

          {/* Delivery info */}
          <div className="mt-6 p-4 bg-indigo-50 rounded-xl text-sm text-indigo-800 flex items-center gap-3 text-left">
            <Package size={22} className="shrink-0 text-indigo-600" />
            <div>
              <p className="font-semibold">Estimated Delivery: Jun 20–22, 2025</p>
              <p className="text-indigo-600 text-xs mt-0.5">We'll email you when your order ships.</p>
            </div>
          </div>

          {/* Points earned */}
          <div className="mt-4 p-4 bg-amber-50 rounded-xl text-sm text-amber-800 flex items-center gap-3 text-left">
            <span className="text-2xl">🎁</span>
            <div>
              <p className="font-semibold">You earned 320 gift points!</p>
              <p className="text-amber-600 text-xs mt-0.5">Points added to your account. Use them on your next order.</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              onClick={() => navigate("/home")}
              className="flex-1 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Home size={18} />
              Back to Home
            </button>
            <button
              onClick={() => navigate("/catalogue")}
              className="flex-1 border border-indigo-200 text-indigo-700 hover:bg-indigo-50 font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <ShoppingBag size={18} />
              Continue Shopping
            </button>
          </div>

          {/* Cancel order */}
          <button
            onClick={() => setShowCancelModal(true)}
            className="mt-4 flex items-center gap-1 text-xs text-rose-500 hover:text-rose-600 mx-auto font-medium"
          >
            <X size={14} /> Cancel Order (within 48 hrs)
          </button>
        </div>

        {/* What happens next */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
          <h2 className="font-bold text-gray-800 mb-4">What happens next?</h2>
          <div className="space-y-4">
            {[
              { icon: "📧", title: "Confirmation email sent", desc: "Check your inbox for your order details." },
              { icon: "📦", title: "Order being prepared", desc: "Our team is packing your books." },
              { icon: "🚚", title: "Shipping notification", desc: "We'll send tracking info when your books ship." },
              { icon: "🏠", title: "Delivery", desc: "Your books arrive at your door by Jun 20–22." },
            ].map((s) => (
              <div key={s.title} className="flex items-start gap-4">
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <p className="font-semibold text-sm text-gray-800">{s.title}</p>
                  <p className="text-xs text-gray-500">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <h2 className="text-xl font-bold text-gray-800 mb-5">Recommended for You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {recommendations.map((b) => <BookCard key={b.id} book={b} />)}
        </div>
      </div>

      <Footer />
    </div>
  );
}
