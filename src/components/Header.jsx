import { useState } from "react";
import "./Header.css";

function Header({ activeTab, onTabChange, cartCount, onCartClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <span className="logo-icon">🍽️</span>
          <h1>FoodieSpot</h1>
        </div>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
          <button
            className={`nav-btn ${activeTab === "all" ? "active" : ""}`}
            onClick={() => {
              onTabChange("all");
              setMenuOpen(false);
            }}
          >
            All
          </button>
          <button
            className={`nav-btn veg ${activeTab === "veg" ? "active" : ""}`}
            onClick={() => {
              onTabChange("veg");
              setMenuOpen(false);
            }}
          >
            <span className="veg-dot"></span> Veg
          </button>
          <button
            className={`nav-btn non-veg ${activeTab === "nonveg" ? "active" : ""}`}
            onClick={() => {
              onTabChange("nonveg");
              setMenuOpen(false);
            }}
          >
            <span className="non-veg-dot"></span> Non-Veg
          </button>
          <button
            className={`nav-btn ${activeTab === "outlets" ? "active" : ""}`}
            onClick={() => {
              onTabChange("outlets");
              setMenuOpen(false);
            }}
          >
            Outlets
          </button>
        </nav>

        <button className="cart-btn" onClick={onCartClick}>
          🛒 <span className="cart-count">{cartCount}</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
