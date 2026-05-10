import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h2>Craving Something Delicious?</h2>
        <p>
          Explore the finest Veg & Non-Veg dishes from our 3 premium outlets.
          Fresh ingredients, authentic flavors, delivered to your doorstep.
        </p>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">3</span>
            <span className="stat-label">Outlets</span>
          </div>
          <div className="stat">
            <span className="stat-number">12+</span>
            <span className="stat-label">Dishes</span>
          </div>
          <div className="stat">
            <span className="stat-number">4.5</span>
            <span className="stat-label">Avg Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
