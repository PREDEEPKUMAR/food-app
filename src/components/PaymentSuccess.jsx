import "./PaymentSuccess.css";

function PaymentSuccess({ orderDetails, onBackToMenu }) {
  const methodLabels = {
    card: "Credit/Debit Card",
    upi: "UPI",
    cod: "Cash on Delivery",
  };

  return (
    <div className="payment-success-page">
      <div className="success-container">
        <div className="success-checkmark">
          <div className="check-circle">
            <svg viewBox="0 0 52 52" className="check-svg">
              <circle className="check-circle-bg" cx="26" cy="26" r="25" fill="none" />
              <path className="check-path" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>
        </div>

        <h2 className="success-title">Payment Successful!</h2>
        <p className="success-subtitle">Your order has been placed and is being prepared.</p>

        <div className="order-details-card">
          <div className="detail-row">
            <span className="detail-label">Order ID</span>
            <span className="detail-value order-id">{orderDetails.orderId}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Payment Method</span>
            <span className="detail-value">{methodLabels[orderDetails.paymentMethod]}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Amount Paid</span>
            <span className="detail-value amount">₹{orderDetails.totalAmount}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Estimated Delivery</span>
            <span className="detail-value delivery">{orderDetails.estimatedDelivery}</span>
          </div>
        </div>

        <button className="back-to-menu-btn" onClick={onBackToMenu}>
          Back to Menu
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccess;
