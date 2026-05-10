import { useState } from "react";
import PaymentForm from "./PaymentForm";
import "./PaymentPage.css";

const DELIVERY_FEE = 40;
const GST_RATE = 0.05;

function PaymentPage({ cartItems, onPaymentSuccess, onBackToCart }) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const taxes = Math.round(subtotal * GST_RATE);
  const grandTotal = subtotal + DELIVERY_FEE + taxes;

  const validateCard = (form) => {
    const errs = {};
    const cardNum = form.cardNumber.replace(/\s/g, "");
    if (!/^\d{16}$/.test(cardNum)) errs.cardNumber = "Enter a valid 16-digit card number";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) errs.expiry = "Use MM/YY format";
    if (!/^\d{3}$/.test(form.cvv)) errs.cvv = "Enter a valid 3-digit CVV";
    if (!form.cardHolder.trim()) errs.cardHolder = "Cardholder name is required";
    return errs;
  };

  const validateUPI = (form) => {
    const errs = {};
    if (!/^[\w.-]+@[\w]+$/.test(form.upiId)) errs.upiId = "Enter a valid UPI ID (e.g., user@upi)";
    return errs;
  };

  const handlePayNow = (formData) => {
    let validationErrors = {};
    if (paymentMethod === "card") {
      validationErrors = validateCard(formData);
    } else if (paymentMethod === "upi") {
      validationErrors = validateUPI(formData);
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setProcessing(true);

    const orderId = `ORD-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    setTimeout(() => {
      setProcessing(false);
      onPaymentSuccess({
        orderId,
        paymentMethod,
        totalAmount: grandTotal,
        estimatedDelivery: "30-45 min",
      });
    }, 1500);
  };

  const methodLabels = { card: "Credit/Debit Card", upi: "UPI", cod: "Cash on Delivery" };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <button className="back-to-cart-btn" onClick={onBackToCart}>
          ← Back to Cart
        </button>

        <h2 className="payment-title">Payment</h2>

        <div className="payment-layout">
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-items">
              {cartItems.map((item) => (
                <div key={item.id} className="summary-item">
                  <div className="summary-item-info">
                    <span className={`summary-badge ${item.isVeg ? "veg" : "non-veg"}`}></span>
                    <span className="summary-item-name">{item.name}</span>
                    <span className="summary-item-qty">x{item.quantity}</span>
                  </div>
                  <span className="summary-item-total">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="summary-breakdown">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee</span>
                <span>₹{DELIVERY_FEE}</span>
              </div>
              <div className="summary-row">
                <span>GST (5%)</span>
                <span>₹{taxes}</span>
              </div>
              <div className="summary-row grand-total">
                <span>Grand Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>
          </div>

          <div className="payment-methods-section">
            <h3>Payment Method</h3>
            <div className="payment-method-tabs">
              {Object.entries(methodLabels).map(([key, label]) => (
                <button
                  key={key}
                  className={`method-tab ${paymentMethod === key ? "active" : ""}`}
                  onClick={() => {
                    setPaymentMethod(key);
                    setErrors({});
                  }}
                >
                  <span className="method-icon">
                    {key === "card" ? "💳" : key === "upi" ? "📱" : "💵"}
                  </span>
                  {label}
                </button>
              ))}
            </div>

            <PaymentForm
              method={paymentMethod}
              errors={errors}
              onSubmit={handlePayNow}
              processing={processing}
            />
          </div>
        </div>
      </div>

      {processing && (
        <div className="processing-overlay">
          <div className="processing-modal">
            <div className="spinner"></div>
            <p>Processing your payment...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentPage;
