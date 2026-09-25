import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, CreditCard, ChevronRight, Plus, Gift } from "lucide-react";
import { useCart } from "../context/CartContext";
import { addresses, paymentMethods, giftPoints } from "../data/mockData";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const STEPS = ["Address", "Payment", "Review"];

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(addresses[0].id);
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0].id);
  const [useGiftPoints, setUseGiftPoints] = useState(false);

  const shipping = cartTotal >= 25 ? 0 : 3.99;
  const tax = cartTotal * 0.08;
  const pointsDiscount = useGiftPoints ? Math.min(giftPoints / 100, cartTotal * 0.2) : 0;
  const total = cartTotal + shipping + tax - pointsDiscount;

  const selectedAddr = addresses.find((a) => a.id === selectedAddress);
  const selectedPay = paymentMethods.find((p) => p.id === selectedPayment);

  const handlePlaceOrder = () => {
    navigate("/payment");
  };

  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>

        {/* Stepper */}
        <div className="flex items-center mb-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    i <= step
                      ? "bg-indigo-700 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <span
                  className={`text-sm font-medium hidden sm:block ${
                    i <= step ? "text-indigo-700" : "text-gray-400"
                  }`}
                >
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-3 ${i < step ? "bg-indigo-700" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left panel */}
          <div className="lg:col-span-2 space-y-5">
            {/* STEP 0: Address */}
            {step === 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                  <MapPin size={20} className="text-indigo-600" />
                  Select Delivery Address
                </h2>
                <div className="space-y-3">
                  {addresses.map((addr) => (
                    <label
                      key={addr.id}
                      className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${
                        selectedAddress === addr.id
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-gray-200 hover:border-indigo-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="address"
                        checked={selectedAddress === addr.id}
                        onChange={() => setSelectedAddress(addr.id)}
                        className="mt-1 accent-indigo-600"
                      />
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">
                          {addr.name}
                          {addr.default && (
                            <span className="ml-2 bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full">Default</span>
                          )}
                        </p>
                        <p className="text-sm text-gray-500 mt-0.5">
                          {addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}, {addr.city}, {addr.state} {addr.zip}
                        </p>
                        <p className="text-xs text-gray-400">{addr.country}</p>
                      </div>
                    </label>
                  ))}
                  <button className="flex items-center gap-2 text-sm text-indigo-600 font-medium hover:underline mt-2">
                    <Plus size={16} /> Add new address
                  </button>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="mt-5 w-full bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  Continue to Payment <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* STEP 1: Payment */}
            {step === 1 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
                  <CreditCard size={20} className="text-indigo-600" />
                  Payment Method
                </h2>
                <div className="space-y-3 mb-5">
                  {paymentMethods.map((pm) => (
                    <label
                      key={pm.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${
                        selectedPayment === pm.id
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-gray-200 hover:border-indigo-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={selectedPayment === pm.id}
                        onChange={() => setSelectedPayment(pm.id)}
                        className="accent-indigo-600"
                      />
                      <div className="flex-1">
                        {pm.type === "PayPal" ? (
                          <p className="text-sm font-medium text-gray-800">
                            PayPal — <span className="text-gray-500">{pm.email}</span>
                          </p>
                        ) : (
                          <p className="text-sm font-medium text-gray-800">
                            {pm.brand} ending in {pm.last4}{" "}
                            <span className="text-gray-400 text-xs">Exp {pm.expiry}</span>
                          </p>
                        )}
                      </div>
                      <span className="text-2xl">
                        {pm.type === "PayPal" ? "🅿️" : pm.brand === "Visa" ? "💳" : "🏦"}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Gift points */}
                <div className={`p-4 rounded-xl border ${useGiftPoints ? "border-amber-400 bg-amber-50" : "border-gray-200"}`}>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useGiftPoints}
                      onChange={(e) => setUseGiftPoints(e.target.checked)}
                      className="w-4 h-4 accent-amber-500"
                    />
                    <Gift size={18} className="text-amber-500" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        Redeem Gift Points
                        <span className="ml-2 text-amber-600 font-bold">{giftPoints} pts</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        Redeem up to ${pointsDiscount.toFixed(2)} off this order
                      </p>
                    </div>
                  </label>
                </div>

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => setStep(0)}
                    className="flex-1 border border-gray-200 text-gray-600 font-medium py-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    Review Order <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Review */}
            {step === 2 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-bold text-gray-800 text-lg mb-5">Review Your Order</h2>

                {/* Delivery address */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Deliver to</p>
                    <button onClick={() => setStep(0)} className="text-xs text-indigo-600 hover:underline">Change</button>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-700">
                    <p className="font-medium">{selectedAddr.name}</p>
                    <p className="text-gray-500">
                      {selectedAddr.line1}{selectedAddr.line2 ? `, ${selectedAddr.line2}` : ""},{" "}
                      {selectedAddr.city}, {selectedAddr.state} {selectedAddr.zip}
                    </p>
                  </div>
                </div>

                {/* Payment */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Payment</p>
                    <button onClick={() => setStep(1)} className="text-xs text-indigo-600 hover:underline">Change</button>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-700">
                    {selectedPay.type === "PayPal"
                      ? `PayPal — ${selectedPay.email}`
                      : `${selectedPay.brand} ending in ${selectedPay.last4}`}
                    {useGiftPoints && (
                      <span className="ml-2 text-amber-600 font-medium">+ Gift Points (-${pointsDiscount.toFixed(2)})</span>
                    )}
                  </div>
                </div>

                {/* Items */}
                <div className="mb-5">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Items</p>
                  <div className="space-y-2">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-sm bg-gray-50 rounded-xl px-3 py-2">
                        <span className="text-gray-700">{item.title} × {item.qty}</span>
                        <span className="font-semibold text-gray-800">${(item.price * item.qty).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 border border-gray-200 text-gray-600 font-medium py-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    Place Order <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-24">
              <h3 className="font-bold text-gray-800 mb-4">Order Summary</h3>
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
                {useGiftPoints && (
                  <div className="flex justify-between text-amber-600">
                    <span>Gift Points</span>
                    <span>-${pointsDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-4 space-y-1 text-xs text-gray-400">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="truncate mr-2">{item.title}</span>
                    <span>×{item.qty}</span>
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
