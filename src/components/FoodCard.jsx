import { outlets } from "../data/foodData";
import "./FoodCard.css";

function FoodCard({ item, onAddToCart, cartQuantity }) {
  const outlet = outlets.find((o) => o.id === item.outletId);

  return (
    <div className="food-card">
      <div className="food-card-image">
        <img src={item.image} alt={item.name} loading="lazy" />
        <span className={`food-badge ${item.isVeg ? "veg" : "non-veg"}`}>
          <span className={`badge-dot ${item.isVeg ? "veg-dot" : "non-veg-dot"}`}></span>
          {item.isVeg ? "Veg" : "Non-Veg"}
        </span>
      </div>
      <div className="food-card-content">
        <div className="food-card-header">
          <h3>{item.name}</h3>
          <span className="food-rating">⭐ {item.rating}</span>
        </div>
        <p className="food-description">{item.description}</p>
        <p className="food-outlet">📍 {outlet?.name}</p>
        <div className="food-card-footer">
          <span className="food-price">₹{item.price}</span>
          {cartQuantity > 0 ? (
            <div className="quantity-controls">
              <button onClick={() => onAddToCart(item, -1)}>−</button>
              <span>{cartQuantity}</span>
              <button onClick={() => onAddToCart(item, 1)}>+</button>
            </div>
          ) : (
            <button className="add-btn" onClick={() => onAddToCart(item, 1)}>
              Add +
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
