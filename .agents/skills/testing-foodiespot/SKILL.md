---
name: testing-foodiespot
description: Test the FoodieSpot food ordering app end-to-end. Use when verifying UI changes to tabs, outlets, cart, or food items.
---

# Testing FoodieSpot

## Dev Server Setup

```bash
cd /home/ubuntu/food-app
npm install
npm run dev
# App runs at http://localhost:5173
```

## Lint & Build

```bash
npm run lint
npm run build
```

## What to Test

### 1. Tab Filtering (All / Veg / Non-Veg)
- **All tab**: Should show all 12 dishes (6 veg + 6 non-veg)
- **Veg tab**: Should show exactly 6 items with green "Veg" badges. Expected items: Paneer Butter Masala (₹249), Masala Dosa (₹149), Veg Biryani (₹199), Chole Bhature (₹179), Dal Makhani (₹219), Aloo Gobi (₹169)
- **Non-Veg tab**: Should show exactly 6 items with red "Non-Veg" badges. Expected items: Butter Chicken (₹329), Chicken Biryani (₹299), Mutton Rogan Josh (₹399), Tandoori Chicken (₹349), Fish Curry (₹279), Prawn Masala (₹359)
- Verify wrong items are NOT shown (e.g., no non-veg on Veg tab)

### 2. Outlets Page & Filtering
- **Outlets tab**: Should show 3 outlet cards: Spice Garden (Bangalore, 4.5), Royal Kitchen (Delhi, 4.7), Coastal Flavors (Mumbai, 4.3)
- **Click an outlet**: Should switch to food grid filtered to that outlet's items. E.g., Spice Garden (outletId=1) shows 4 items: Paneer Butter Masala, Masala Dosa, Butter Chicken, Chicken Biryani
- **"Show All Outlets ✕" button**: Should clear the filter and show all 12 items

### 3. Cart Operations
- **Add item**: Click "Add +" → button becomes quantity controls showing "1", cart badge increments
- **Increase quantity**: Click "+" → quantity increments, badge updates
- **Open cart**: Click cart icon → slide-out panel shows items with names, prices, quantities
- **Verify total**: Total should be sum of (price × quantity) for each item
- **Decrease quantity**: Click "−" → quantity decrements, total updates
- **Remove item**: Decrease to 0 → item removed from cart
- **Place Order**: Click "Place Order" → cart clears, green success banner appears for ~3 seconds, badge resets to 0

## Data Source

All food and outlet data is in `src/data/foodData.js`. No backend — changes to items require editing this file.

## Devin Secrets Needed

None — this is a fully static frontend app with no authentication or API keys required.
