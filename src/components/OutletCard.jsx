import "./OutletCard.css";

function OutletCard({ outlet, onSelect }) {
  return (
    <div className="outlet-card" onClick={() => onSelect(outlet.id)}>
      <div className="outlet-image">
        <img src={outlet.image} alt={outlet.name} loading="lazy" />
        <div className="outlet-overlay">
          <span className="outlet-delivery">{outlet.deliveryTime}</span>
        </div>
      </div>
      <div className="outlet-info">
        <h3>{outlet.name}</h3>
        <p className="outlet-location">📍 {outlet.location}</p>
        <div className="outlet-meta">
          <span className="outlet-rating">⭐ {outlet.rating}</span>
          <button className="view-menu-btn">View Menu →</button>
        </div>
      </div>
    </div>
  );
}

export default OutletCard;
