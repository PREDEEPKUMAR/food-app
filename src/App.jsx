import { useState, useCallback } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import FoodCard from "./components/FoodCard";
import OutletCard from "./components/OutletCard";
import Cart from "./components/Cart";
import PaymentPage from "./components/PaymentPage";
import PaymentSuccess from "./components/PaymentSuccess";
import { outlets, vegItems, nonVegItems } from "./data/foodData";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [orderDetails, setOrderDetails] = useState(null);

  const handleAddToCart = useCallback((item, delta) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        const newQty = existing.quantity + delta;
        if (newQty <= 0) {
          return prev.filter((c) => c.id !== item.id);
        }
        return prev.map((c) =>
          c.id === item.id ? { ...c, quantity: newQty } : c
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const handleUpdateQuantity = useCallback((id, delta) => {
    setCart((prev) => {
      const item = prev.find((c) => c.id === id);
      if (!item) return prev;
      const newQty = item.quantity + delta;
      if (newQty <= 0) {
        return prev.filter((c) => c.id !== id);
      }
      return prev.map((c) =>
        c.id === id ? { ...c, quantity: newQty } : c
      );
    });
  }, []);

  const handleCheckout = () => {
    setShowCart(false);
    setCurrentPage("payment");
  };

  const handlePaymentSuccess = (details) => {
    setOrderDetails(details);
    setCart([]);
    setCurrentPage("success");
  };

  const handleBackToMenu = () => {
    setOrderDetails(null);
    setCurrentPage("home");
  };

  const handleBackToCart = () => {
    setCurrentPage("home");
    setShowCart(true);
  };

  const handleOutletSelect = (outletId) => {
    setSelectedOutlet(outletId);
    setActiveTab("all");
  };

  const getFilteredItems = () => {
    let items;
    if (activeTab === "veg") {
      items = vegItems;
    } else if (activeTab === "nonveg") {
      items = nonVegItems;
    } else {
      items = [...vegItems, ...nonVegItems];
    }
    if (selectedOutlet) {
      return items.filter((item) => item.outletId === selectedOutlet);
    }
    return items;
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const filteredItems = getFilteredItems();
  const selectedOutletData = outlets.find((o) => o.id === selectedOutlet);

  if (currentPage === "payment") {
    return (
      <div className="app">
        <Header
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            if (tab !== "outlets") setSelectedOutlet(null);
            setCurrentPage("home");
          }}
          cartCount={cartCount}
          onCartClick={() => {
            setCurrentPage("home");
            setShowCart(true);
          }}
        />
        <PaymentPage
          cartItems={cart}
          onPaymentSuccess={handlePaymentSuccess}
          onBackToCart={handleBackToCart}
        />
      </div>
    );
  }

  if (currentPage === "success" && orderDetails) {
    return (
      <PaymentSuccess
        orderDetails={orderDetails}
        onBackToMenu={handleBackToMenu}
      />
    );
  }

  return (
    <div className="app">
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab !== "outlets") setSelectedOutlet(null);
        }}
        cartCount={cartCount}
        onCartClick={() => setShowCart(true)}
      />

      {activeTab === "outlets" ? (
        <section className="section">
          <div className="section-header">
            <h2>Our Outlets</h2>
            <p>Choose from our 3 premium dining locations</p>
          </div>
          <div className="outlets-grid">
            {outlets.map((outlet) => (
              <OutletCard
                key={outlet.id}
                outlet={outlet}
                onSelect={handleOutletSelect}
              />
            ))}
          </div>
        </section>
      ) : (
        <>
          <Hero />
          <section className="section">
            <div className="section-header">
              {selectedOutlet ? (
                <>
                  <div className="selected-outlet-header">
                    <h2>Menu from {selectedOutletData?.name}</h2>
                    <button
                      className="clear-filter"
                      onClick={() => setSelectedOutlet(null)}
                    >
                      Show All Outlets ✕
                    </button>
                  </div>
                  <p>📍 {selectedOutletData?.location}</p>
                </>
              ) : (
                <>
                  <h2>
                    {activeTab === "veg"
                      ? "🥬 Vegetarian Delights"
                      : activeTab === "nonveg"
                        ? "🍗 Non-Vegetarian Specials"
                        : "🍽️ All Dishes"}
                  </h2>
                  <p>
                    {activeTab === "veg"
                      ? "Fresh and flavorful vegetarian cuisine"
                      : activeTab === "nonveg"
                        ? "Premium meats and seafood dishes"
                        : "Browse our complete menu"}
                  </p>
                </>
              )}
            </div>
            <div className="food-grid">
              {filteredItems.map((item) => (
                <FoodCard
                  key={item.id}
                  item={item}
                  onAddToCart={handleAddToCart}
                  cartQuantity={
                    cart.find((c) => c.id === item.id)?.quantity || 0
                  }
                />
              ))}
            </div>
          </section>
        </>
      )}

      <footer className="footer">
        <p>© 2025 FoodieSpot. All rights reserved.</p>
        <p>Made with ❤️ for food lovers</p>
      </footer>

      {showCart && (
        <Cart
          items={cart}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={handleUpdateQuantity}
          onCheckout={handleCheckout}
        />
      )}
    </div>
  );
}

export default App;
