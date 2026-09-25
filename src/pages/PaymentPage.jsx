import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Lock, ChevronLeft } from "lucide-react";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PaymentPage() {
  const { cartTotal, cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    cardNumber: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [payMethod, setPayMethod] = useState("card");

  const shipping = cartTotal >= 25 ? 0 : 3.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  const formatCard = (val) => {
    return val
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const formatExpiry = (val) => {
    const cleaned = val.replace(/\D/g, "").slice(0, 4);
    if (cleaned.length >= 3) return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    return cleaned;
  };

  const validate = () => {
    const e = {};
    if (payMethod === "card") {
      if (!form.cardNumber || form.cardNumber.replace(/\s/g, "").length < 16)
        e.cardNumber = "Enter a valid 16-digit card number";
      if (!form.name.trim()) e.name = "Cardholder name is required";
      if (!form.expiry || form.expiry.length < 5)
        e.expiry = "Enter expiry MM/YY";
      if (!form.cvv || form.cvv.length < 3) e.cvv = "Enter 3-digit CVV";
    }
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setProcessing(true);
    setTimeout(() => {
      clearCart();
      navigate("/confirmation");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate("/checkout")}
          className="flex items-center gap-1 text-sm text-indigo-600 hover:underline mb-6"
        >
          <ChevronLeft size={16} /> Back to Checkout
        </button>

        <h1 className="text-2xl font-bold text-gray-800 mb-6">Complete Payment</h1>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Payment form */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              {/* Secure badge */}
              <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium mb-5 p-3 bg-emerald-50 rounded-xl">
                <Lock size={16} />
                Secure & encrypted payment
              </div>

              {/* Payment method tabs */}
              <div className="flex gap-3 mb-6">
                {[
                  { id: "card", label: "💳 Card" },
                  { id: "paypal", label: "🅿️ PayPal" },
                  { id: "wallet", label: "📱 Wallet" },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setPayMethod(m.id)}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-colors ${
                      payMethod === m.id
                        ? "bg-indigo-700 text-white border-indigo-700"
                        : "border-gray-200 text-gray-600 hover:border-indigo-300"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {payMethod === "card" && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Card number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <div className="relative">
                      <CreditCard size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={form.cardNumber}
                        onChange={(e) => {
                          setForm((f) => ({ ...f, cardNumber: formatCard(e.target.value) }));
                          setErrors((er) => ({ ...er, cardNumber: undefined }));
                        }}
                        placeholder="1234 5678 9012 3456"
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.cardNumber ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                      />
                    </div>
                    {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                  </div>

                  {/* Cardholder */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => {
                        setForm((f) => ({ ...f, name: e.target.value }));
                        setErrors((er) => ({ ...er, name: undefined }));
                      }}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* Expiry + CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        value={form.expiry}
                        onChange={(e) => {
                          setForm((f) => ({ ...f, expiry: formatExpiry(e.target.value) }));
                          setErrors((er) => ({ ...er, expiry: undefined }));
                        }}
                        placeholder="MM/YY"
                        className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.expiry ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                      />
                      {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input
                        type="text"
                        value={form.cvv}
                        onChange={(e) => {
                          setForm((f) => ({ ...f, cvv: e.target.value.replace(/\D/g, "").slice(0, 3) }));
                          setErrors((er) => ({ ...er, cvv: undefined }));
                        }}
                        placeholder="123"
                        className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${errors.cvv ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                      />
                      {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors mt-2 disabled:opacity-70"
                  >
                    {processing ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing…
                      </>
                    ) : (
                      <>
                        <Lock size={18} />
                        Pay ${total.toFixed(2)}
                      </>
                    )}
                  </button>
                </form>
              )}

              {payMethod === "paypal" && (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🅿️</div>
                  <p className="text-gray-600 text-sm mb-6">You'll be redirected to PayPal to complete payment.</p>
                  <button
                    onClick={handleSubmit}
                    disabled={processing}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-colors disabled:opacity-70"
                  >
                    {processing ? "Processing…" : `Pay with PayPal — $${total.toFixed(2)}`}
                  </button>
                </div>
              )}

              {payMethod === "wallet" && (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">📱</div>
                  <p className="text-gray-600 text-sm mb-6">Use Apple Pay or Google Pay.</p>
                  <div className="flex gap-4">
                    <button
                      onClick={handleSubmit}
                      disabled={processing}
                      className="flex-1 bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-900 transition-colors disabled:opacity-70"
                    >
                       Pay
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={processing}
                      className="flex-1 bg-white border-2 border-gray-200 text-gray-800 font-bold py-4 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-70"
                    >
                      G Pay
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order total */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-24">
              <h3 className="font-bold text-gray-800 mb-4">Order Total</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="text-emerald-600">FREE</span> : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900 text-base">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 space-y-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-2 text-xs text-gray-400">
                    <span>📚</span>
                    <span className="truncate">{item.title} ×{item.qty}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
