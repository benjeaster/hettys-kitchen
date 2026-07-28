// Bulk Order pricing (per litre / per plate), structured for the Quotation
// builder. Keep in sync with the Bulk Orders section of index.html.
// Each item has a `tiers` array of { label, price } — price is a plain number (euros).
const BULK_MENU_DATA = {
  "Soups & Swallow (Bulk)": [
    { name: "Egusi Soup", note: "Includes one swallow", tiers: [{ label: "1L", price: 25 }] },
    { name: "Ogbono Soup", note: "Includes one swallow", tiers: [{ label: "1L", price: 25 }] },
    { name: "Okra Soup", note: "Includes one swallow", tiers: [{ label: "1L", price: 25 }] },
    { name: "Vegetable Soup", note: "Includes one swallow", tiers: [{ label: "1L", price: 25 }] },
    { name: "Eru (Vegetable)", note: "Includes one swallow", tiers: [{ label: "1L", price: 27 }] },
    { name: "Nsala Soup", note: "Includes one swallow", tiers: [{ label: "1L", price: 27 }] },
    { name: "Bitterleaf Soup", note: "Includes one swallow", tiers: [{ label: "1L", price: 27 }] },
    { name: "Banga Soup", note: "Includes one swallow", tiers: [{ label: "1L", price: 27 }] }
  ],
  "Hetty's Specials (Bulk)": [
    { name: "Nkwobi", tiers: [{ label: "Plate", price: 20 }, { label: "1L", price: 30 }] },
    { name: "Isi Ewu", tiers: [{ label: "Plate", price: 20 }, { label: "1L", price: 30 }] },
    { name: "Asun", tiers: [{ label: "Plate", price: 20 }, { label: "1L", price: 30 }] },
    { name: "Peppered Goat Meat", tiers: [{ label: "Plate", price: 20 }, { label: "1L", price: 30 }] },
    { name: "Peppered Pomo (Cow Skin)", tiers: [{ label: "Plate", price: 15 }, { label: "1L", price: 25 }] },
    { name: "Peppered Cow Leg", tiers: [{ label: "Plate", price: 18 }, { label: "1L", price: 28 }] },
    { name: "Gizzard", tiers: [{ label: "Plate", price: 15 }, { label: "1L", price: 25 }] },
    { name: "Abacha", tiers: [{ label: "Plate", price: 20 }, { label: "1L", price: 25 }] },
    { name: "Peppered Turkey Wings", tiers: [{ label: "Plate", price: 20 }, { label: "1L", price: 30 }] },
    { name: "Grilled Fish", note: "With one side", tiers: [{ label: "Order", price: 15 }] },
    { name: "Pepper Soup", note: "Fish, Chicken or Cow Assorted", tiers: [{ label: "Order", price: 25 }] },
    { name: "Noodles in Pepper Soup", tiers: [{ label: "Order", price: 25 }] },
    { name: "Suya", tiers: [{ label: "Portion", price: 15 }] },
    { name: "White Rice", note: "Served separately", tiers: [{ label: "Order", price: 3 }] }
  ],
  "Tomato Stew & Sauces (Bulk)": [
    { name: "Tomato Stew", note: "With Chicken or Turkey", tiers: [{ label: "1L", price: 25 }] },
    { name: "Tomato Stew", note: "With Beef", tiers: [{ label: "1L", price: 28 }] },
    { name: "Tomato Stew", note: "With Goat Meat", tiers: [{ label: "Plate", price: 20 }, { label: "1L", price: 30 }, { label: "2L", price: 60 }, { label: "4L", price: 118 }] },
    { name: "Tomato Stew", note: "With Assorted Meat", tiers: [{ label: "1L", price: 30 }] },
    { name: "Ofada / Ayamase Sauce", tiers: [{ label: "1L", price: 25 }] }
  ],
  "Rice Dishes (Bulk)": [
    { name: "Jollof Rice", tiers: [{ label: "Plate", price: 20 }, { label: "1L", price: 30 }, { label: "2L", price: 60 }, { label: "4L", price: 118 }] },
    { name: "Fried Rice", tiers: [{ label: "Plate", price: 22 }, { label: "1L", price: 33 }, { label: "2L", price: 66 }, { label: "4L", price: 130 }] },
    { name: "Coconut Rice", tiers: [{ label: "Plate", price: 22 }, { label: "1L", price: 33 }, { label: "2L", price: 66 }, { label: "4L", price: 130 }] },
    { name: "Village Rice", tiers: [{ label: "Plate", price: 22 }, { label: "1L", price: 33 }, { label: "2L", price: 66 }, { label: "4L", price: 130 }] },
    { name: "Ofada Rice & Ayamase", tiers: [{ label: "Plate", price: 23 }, { label: "1L", price: 35 }, { label: "2L", price: 70 }, { label: "4L", price: 138 }] }
  ],
  "Pasta & Noodles (Bulk)": [
    { name: "Jollof Spaghetti", tiers: [{ label: "Plate", price: 18 }, { label: "1L", price: 27 }, { label: "2L", price: 54 }, { label: "4L", price: 106 }] },
    { name: "Spaghetti with Beef", tiers: [{ label: "Plate", price: 18 }, { label: "1L", price: 27 }, { label: "2L", price: 54 }, { label: "4L", price: 106 }] },
    { name: "Spaghetti with Chicken", tiers: [{ label: "Plate", price: 18 }, { label: "1L", price: 27 }, { label: "2L", price: 54 }, { label: "4L", price: 106 }] },
    { name: "Spaghetti with Shrimps", tiers: [{ label: "Plate", price: 22 }, { label: "1L", price: 33 }, { label: "2L", price: 66 }, { label: "4L", price: 130 }] },
    { name: "Nigerian Noodles with Egg", tiers: [{ label: "Plate", price: 15 }, { label: "1L", price: 23 }, { label: "2L", price: 46 }, { label: "4L", price: 90 }] },
    { name: "Noodles with Chicken or Beef", tiers: [{ label: "Plate", price: 18 }, { label: "1L", price: 27 }, { label: "2L", price: 54 }, { label: "4L", price: 106 }] },
    { name: "Spaghetti with Goat Meat", tiers: [{ label: "Plate", price: 20 }, { label: "1L", price: 30 }, { label: "2L", price: 60 }, { label: "4L", price: 118 }] }
  ],
  "Porridge (Bulk)": [
    { name: "Beans Porridge", tiers: [{ label: "Order", price: 15 }] },
    { name: "Yam Porridge", tiers: [{ label: "Order", price: 15 }] },
    { name: "Plantain Porridge", tiers: [{ label: "Order", price: 16 }] },
    { name: "Porridge with Fish", tiers: [{ label: "Order", price: 20 }] },
    { name: "Porridge with Chicken", tiers: [{ label: "Order", price: 20 }] },
    { name: "Porridge with Turkey", tiers: [{ label: "Order", price: 20 }] },
    { name: "Porridge with Beef", tiers: [{ label: "Order", price: 22 }] },
    { name: "Porridge with Goat Meat", tiers: [{ label: "Order", price: 24 }] },
    { name: "Porridge with Assorted Meat", tiers: [{ label: "Order", price: 25 }] }
  ],
  "Wings (Bulk)": [
    { name: "Wings", note: "Suya, Peppered, BBQ, Peri-Peri or Honey Glaze", tiers: [
      { label: "4 Wings", price: 12 }, { label: "6 Wings", price: 16 }, { label: "10 Wings", price: 24 },
      { label: "15 Wings", price: 34 }, { label: "20 Wings", price: 44 }
    ] }
  ],
  "Sides (Bulk)": [
    { name: "Coleslaw", tiers: [{ label: "1L", price: 15 }, { label: "2L", price: 30 }, { label: "4L", price: 58 }] },
    { name: "Extra Coleslaw", note: "Add-on to a meal", tiers: [{ label: "Add-on", price: 4 }] },
    { name: "Fried Plantain", tiers: [{ label: "1L", price: 15 }, { label: "2L", price: 30 }, { label: "4L", price: 58 }] },
    { name: "Extra Plantain", note: "Add-on to a meal", tiers: [{ label: "Add-on", price: 5 }] },
    { name: "Moi Moi", tiers: [{ label: "10pc", price: 35 }, { label: "20pc", price: 68 }, { label: "50pc", price: 165 }] },
    { name: "Moi Moi & Pap (Akamu)", tiers: [{ label: "Order", price: 10 }] },
    { name: "Moi Moi & Custard", tiers: [{ label: "Order", price: 10 }] },
    { name: "Moi Moi with Jollof or Fried Rice", note: "Add-on to the rice price", tiers: [{ label: "Add-on", price: 4 }] },
    { name: "Egg Sauce", tiers: [{ label: "1L", price: 12 }, { label: "2L", price: 24 }, { label: "4L", price: 46 }] },
    { name: "Boiled Yam", tiers: [{ label: "1L", price: 9 }, { label: "2L", price: 18 }, { label: "4L", price: 34 }] },
    { name: "Fried Yam", tiers: [{ label: "1L", price: 9 }, { label: "2L", price: 18 }, { label: "4L", price: 34 }] }
  ],
  "Protein Add-Ons (Bulk)": [
    { name: "Beef", tiers: [{ label: "Add-on", price: 5 }] },
    { name: "Fish", tiers: [{ label: "Add-on", price: 5 }] },
    { name: "Chicken", tiers: [{ label: "Add-on", price: 5 }] },
    { name: "Turkey", tiers: [{ label: "Add-on", price: 5 }] },
    { name: "Goat Meat", tiers: [{ label: "Add-on", price: 5 }] },
    { name: "Snail", tiers: [{ label: "Add-on", price: 5 }] },
    { name: "Assorted Meat", tiers: [{ label: "Add-on", price: 5 }] },
    { name: "Cow Leg", tiers: [{ label: "Add-on", price: 3 }] },
    { name: "Lamb Chops", tiers: [{ label: "Add-on", price: 15 }] },
    { name: "Small Turkey Wing", tiers: [{ label: "Add-on", price: 3 }] },
    { name: "Large Turkey Wing", tiers: [{ label: "Add-on", price: 5 }] }
  ]
};

if (typeof module !== 'undefined') { module.exports = BULK_MENU_DATA; }
