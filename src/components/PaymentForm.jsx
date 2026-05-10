import { useState } from "react";
import "./PaymentForm.css";

function PaymentForm({ method, errors, onSubmit, processing }) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [upiId, setUpiId] = useState("");

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length > 2) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  const maskedCardDisplay = () => {
    const digits = cardNumber.replace(/\s/g, "");
    if (digits.length >= 4) {
      return "•••• •••• •••• " + digits.slice(-4);
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (method === "card") {
      onSubmit({ cardNumber, expiry: formatExpiry(expiry), cvv, cardHolder });
    } else if (method === "upi") {
      onSubmit({ upiId });
    } else {
      onSubmit({});
    }
  };

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      {method === "card" && (
        <div className="form-fields">
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              id="cardNumber"
              type="text"
              placeholder="1234 5678 9012 3456"
              value={formatCardNumber(cardNumber)}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
              maxLength={19}
            />
            {cardNumber.length >= 4 && (
              <span className="masked-card">{maskedCardDisplay()}</span>
            )}
            {errors.cardNumber && <span className="field-error">{errors.cardNumber}</span>}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expiry">Expiry (MM/YY)</label>
              <input
                id="expiry"
                type="text"
                placeholder="MM/YY"
                value={formatExpiry(expiry)}
                onChange={(e) => setExpiry(e.target.value.replace(/\D/g, "").slice(0, 4))}
                maxLength={5}
              />
              {errors.expiry && <span className="field-error">{errors.expiry}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                id="cvv"
                type="password"
                placeholder="•••"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                maxLength={3}
              />
              {errors.cvv && <span className="field-error">{errors.cvv}</span>}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="cardHolder">Cardholder Name</label>
            <input
              id="cardHolder"
              type="text"
              placeholder="John Doe"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
            />
            {errors.cardHolder && <span className="field-error">{errors.cardHolder}</span>}
          </div>
        </div>
      )}

      {method === "upi" && (
        <div className="form-fields">
          <div className="form-group">
            <label htmlFor="upiId">UPI ID</label>
            <input
              id="upiId"
              type="text"
              placeholder="yourname@upi"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
            {errors.upiId && <span className="field-error">{errors.upiId}</span>}
          </div>
        </div>
      )}

      {method === "cod" && (
        <div className="cod-message">
          <span className="cod-icon">📦</span>
          <p>Pay with cash when your order is delivered.</p>
          <p className="cod-note">Please keep exact change ready for a smooth delivery experience.</p>
        </div>
      )}

      <button
        type="submit"
        className="pay-now-btn"
        disabled={processing}
      >
        {processing ? "Processing..." : method === "cod" ? "Confirm Order" : "Pay Now"}
      </button>
    </form>
  );
}

export default PaymentForm;
