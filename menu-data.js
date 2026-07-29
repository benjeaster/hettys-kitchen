// Shared menu data - used by admin.html to build the daily menu.
// Keep this in sync with index.html's Restaurant Menu tab if the main menu ever changes.
const MENU_DATA = {
  "Starters & Small Chops": [
    { name: "Mini Meat Pie (1 piece)", price: "€3.99" },
    { name: "Large Meat Pie (1 piece)", price: "€5.00" },
    { name: "Chicken Pie (1 piece)", price: "€2.50" },
    { name: "Samosa (1 piece)", price: "€1.00" },
    { name: "Spring Roll (1 piece)", price: "€1.00" },
    { name: "Egg Roll (1 piece)", price: "€5.00" },
    { name: "Puff Puff (10 pieces)", price: "€5.00" },
    { name: "Chin Chin (Small)", price: "€3.00" },
    { name: "Chin Chin (Large)", price: "€5.00" },
    { name: "Akara (15 pieces)", price: "€15.00" },
    { name: "Crispy Shrimp (1 piece)", price: "€1.50" },
    { name: "Crispy Shrimp (6 pieces)", price: "€9.00" },
    { name: "Snack Box", price: "€4.00", note: "1 Samosa, 1 Spring Roll, 3 Puff Puff" },
    { name: "Deluxe Snack Box", price: "€7.00", note: "1 Samosa, 1 Spring Roll, 2 Crispy Shrimp, 3 Puff Puff" }
  ],
  "Rice Dishes": [
    { name: "Jollof Rice", price: "€20" },
    { name: "Fried Rice", price: "€22" },
    { name: "Coconut Rice", price: "€22" },
    { name: "Village Rice", price: "€22" },
    { name: "Ofada Rice & Ayamase", price: "€23" }
  ],
  "Soups & Swallow": [
    { name: "Egusi Soup", price: "€20" },
    { name: "Ogbono Soup", price: "€20" },
    { name: "Okra Soup", price: "€20" },
    { name: "Vegetable Soup", price: "€20" },
    { name: "Eru (Vegetable)", price: "€22" },
    { name: "Nsala Soup", price: "€22" },
    { name: "Banga Soup", price: "€22" },
    { name: "Bitterleaf Soup", price: "€22" }
  ],
  "Hetty's Specials": [
    { name: "Nkwobi", price: "€20" },
    { name: "Isi Ewu", price: "€20" },
    { name: "Asun", price: "€20.00" },
    { name: "Peppered Goat Meat", price: "€20" },
    { name: "Goat Meat Pepper Soup", price: "€20" },
    { name: "Pepper Soup", price: "€18", note: "Fish, Chicken or Cow Assorted" },
    { name: "Noodles in Pepper Soup", price: "€18" },
    { name: "Peppered Turkey Wings", price: "€20" },
    { name: "Grilled Fish", price: "€20", note: "With one side" },
    { name: "Portion of Suya", price: "€12" },
    { name: "Gizdodo", price: "€15" },
    { name: "Tomato Stew with Goat Meat", price: "€25" },
    { name: "Ofada Sauce", price: "€20" },
    { name: "White Rice", price: "€3", note: "Served separately" }
  ],
  "Pasta & Noodles": [
    { name: "Jollof Spaghetti", price: "€18" },
    { name: "Spaghetti with Beef", price: "€18" },
    { name: "Spaghetti with Chicken", price: "€18" },
    { name: "Spaghetti with Shrimps", price: "€22" },
    { name: "Nigerian Noodles with Egg", price: "€15" },
    { name: "Noodles with Chicken or Beef", price: "€18" },
    { name: "Spaghetti with Goat Meat", price: "€20" }
  ],
  "Wings": [
    { name: "Peppered Chicken Wings (4 pieces)", price: "€6" },
    { name: "Peppered Chicken Wings (6 pieces)", price: "€10" },
    { name: "Peppered Chicken Wings (10 pieces)", price: "€15" },
    { name: "Suya Chicken Wings (4 pieces)", price: "€6" },
    { name: "Suya Chicken Wings (6 pieces)", price: "€10" },
    { name: "Suya Chicken Wings (10 pieces)", price: "€15" }
  ],
  "Sides": [
    { name: "Egg Sauce", price: "€8" },
    { name: "Boiled Yam", price: "€6" },
    { name: "Fried Yam", price: "€6" },
    { name: "Plantain (Fried)", price: "€5" },
    { name: "Coleslaw", price: "€5" }
  ],
  "Desserts": [
    { name: "Banana Bread", price: "€6" },
    { name: "Banana Bread & Coconut Ice Cream", price: "€8" },
    { name: "Cinnamon Roll", price: "€6" },
    { name: "Cinnamon Roll & Coconut Ice Cream", price: "€8" }
  ],
  "Wines": [
    { name: "Monte Velho", price: "€15.00", note: "Bottle" },
    { name: "Monte Velho", price: "€4.00", note: "Glass" },
    { name: "Papa Figos", price: "€18.00", note: "Bottle" },
    { name: "Papa Figos", price: "€5.00", note: "Glass" },
    { name: "Moscatel", price: "€5.00", note: "Glass" },
    { name: "Port Wine", price: "€5.00", note: "Glass" },
    { name: "Mateus Rosé", price: "€12.00" },
    { name: "Fita Azul", price: "€12.00" }
  ],
  "Beer & Cider": [
    { name: "Super Bock", price: "€3.00" },
    { name: "Somersby", price: "€4.00" },
    { name: "Palmwine", price: "€5.00" }
  ],
  "Spirits": [
    { name: "Hennessy", price: "€6.00", note: "25ml shot" },
    { name: "Jack Daniel's", price: "€5.00", note: "25ml shot" },
    { name: "Smirnoff", price: "€5.00", note: "25ml shot" },
    { name: "Tequila", price: "€5.00", note: "25ml shot" },
    { name: "Amarula", price: "€5.00", note: "50ml serve" },
    { name: "Orijin", price: "€10.00" },
    { name: "Martini", price: "€20.00" },
    { name: "Campari", price: "€25.00" }
  ],
  "Soft Drinks": [
    { name: "Coca-Cola / Coke Zero / Pepsi / Fanta / 7UP / Sumol", price: "€2.50" },
    { name: "Red Bull", price: "€3.50" },
    { name: "Water (50cl)", price: "€1.50" },
    { name: "Water (1.5L)", price: "€3.00" },
    { name: "Sparkling Water", price: "€2.00" },
    { name: "Malt", price: "€3.00" },
    { name: "Zobo", price: "€4.00" },
    { name: "Kunu", price: "€4.00" },
    { name: "Fresh Juice (Seasonal)", price: "€4.50" }
  ],
  "Kids' Drinks": [
    { name: "Bongo", price: "€2.50" },
    { name: "Capri-Sun", price: "€2.50" }
  ],
  "Extra Proteins": [
    { name: "Small Turkey Wing", price: "€3" },
    { name: "Large Turkey Wing", price: "€5" },
    { name: "Beef", price: "€4" },
    { name: "Chicken", price: "€4" },
    { name: "Fish", price: "€4" },
    { name: "Goat Meat", price: "€5" },
    { name: "Assorted Meat", price: "€5" },
    { name: "Cow Leg", price: "€5" },
    { name: "Snail", price: "€5" },
    { name: "Lamb Chops", price: "€15" }
  ]
};

if (typeof module !== 'undefined') { module.exports = MENU_DATA; }
