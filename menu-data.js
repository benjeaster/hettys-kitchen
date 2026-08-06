// Shared menu data - used by admin.html to build the daily menu.
// Keep this in sync with index.html's Restaurant Menu tab if the main menu ever changes.
const MENU_DATA = {
  "Starters & Small Chops": [
    { name: "Mini Meat Pie (1 piece)", price: "€3.99", desc: "Flaky pastry filled with seasoned minced beef" },
    { name: "Large Meat Pie (1 piece)", price: "€5.00", desc: "A bigger flaky pastry with seasoned minced beef" },
    { name: "Chicken Pie (1 piece)", price: "€2.50", desc: "Flaky pastry filled with peppered shredded chicken" },
    { name: "Samosa (1 piece)", price: "€1.00", desc: "Crispy pastry triangle with spiced vegetable filling" },
    { name: "Spring Roll (1 piece)", price: "€1.00", desc: "Crispy rolled pastry with spiced vegetable filling" },
    { name: "Egg Roll (1 piece)", price: "€5.00", desc: "Boiled egg wrapped in seasoned dough, deep-fried" },
    { name: "Puff Puff (10 pieces)", price: "€5.00", desc: "Sweet, fluffy deep-fried dough balls" },
    { name: "Chin Chin (Small)", price: "€3.00", desc: "Crunchy, sweet fried dough bites" },
    { name: "Chin Chin (Large)", price: "€5.00", desc: "Crunchy, sweet fried dough bites, bigger portion" },
    { name: "Akara (15 pieces)", price: "€15.00", desc: "Deep-fried bean fritters, soft and spiced inside" },
    { name: "Crispy Shrimp (1 piece)", price: "€1.50", desc: "Battered, fried shrimp, crispy outside" },
    { name: "Crispy Shrimp (6 pieces)", price: "€9.00", desc: "Battered, fried shrimp, crispy outside" },
    { name: "Snack Box", price: "€4.00", note: "1 Samosa, 1 Spring Roll, 3 Puff Puff", desc: "A mix of our best small chops to share" },
    { name: "Deluxe Snack Box", price: "€7.00", note: "1 Samosa, 1 Spring Roll, 2 Crispy Shrimp, 3 Puff Puff", desc: "A generous mix of our best small chops to share" }
  ],
  "Rice Dishes": [
    { name: "Jollof Rice", price: "€20", desc: "Smoky tomato rice, a West African classic" },
    { name: "Fried Rice", price: "€22", desc: "Stir-fried rice with mixed vegetables and light seasoning" },
    { name: "Coconut Rice", price: "€22", desc: "Rice simmered in coconut milk for a subtly sweet flavour" },
    { name: "Village Rice", price: "€22", desc: "Rustic rice cooked with local spices and vegetables" },
    { name: "Ofada Rice & Ayamase", price: "€23", desc: "Local rice served with spicy green pepper sauce" }
  ],
  "Soups & Swallow": [
    { name: "Egusi Soup", price: "€20", desc: "Rich melon seed soup with leafy greens and spices" },
    { name: "Ogbono Soup", price: "€20", desc: "Ground ogbono seed soup with a smooth, thick texture" },
    { name: "Okra Soup", price: "€20", desc: "Okra-based soup, light with a soft, silky texture" },
    { name: "Vegetable Soup", price: "€20", desc: "Leafy greens simmered in a savoury peppered broth" },
    { name: "Eru (Vegetable)", price: "€22", desc: "Traditional Cameroonian-style vegetable soup, rich and savoury" },
    { name: "Nsala Soup", price: "€22", desc: "White soup, light broth without palm oil" },
    { name: "Banga Soup", price: "€22", desc: "Palm nut soup with a deep, rich, spiced flavour" },
    { name: "Bitterleaf Soup", price: "€22", desc: "Bitterleaf-based soup with a distinctive, savoury bite" }
  ],
  "Hetty's Specials": [
    { name: "Nkwobi", price: "€20", desc: "Spiced cow foot in a rich palm oil sauce" },
    { name: "Isi Ewu", price: "€20", desc: "Spiced goat head delicacy in a peppery sauce" },
    { name: "Asun", price: "€20.00", desc: "Smoky, spicy grilled goat meat chunks" },
    { name: "Peppered Goat Meat", price: "€20", desc: "Tender goat meat sautéed in a peppery sauce" },
    { name: "Goat Meat Pepper Soup", price: "€20", desc: "Hearty pepper soup with tender goat meat" },
    { name: "Pepper Soup", price: "€18", note: "Fish, Chicken or Cow Assorted", desc: "Light, spicy broth with your choice of protein" },
    { name: "Noodles in Pepper Soup", price: "€18", desc: "Noodles served in a spicy, savoury pepper soup broth" },
    { name: "Peppered Turkey Wings", price: "€20", desc: "Turkey wings tossed in a spicy pepper sauce" },
    { name: "Grilled Fish", price: "€20", note: "With one side", desc: "Whole fish grilled and lightly spiced, served with a side" },
    { name: "Portion of Suya", price: "€12", desc: "Skewered, spiced grilled beef, a Nigerian street food favourite" },
    { name: "Gizdodo", price: "€15", desc: "Diced gizzard and plantain sautéed in a spicy sauce" },
    { name: "Tomato Stew with Goat Meat", price: "€25", desc: "Rich tomato stew slow-cooked with tender goat meat" },
    { name: "Ofada Sauce", price: "€20", desc: "Spicy green pepper sauce (Ayamase), a Nigerian favourite" },
    { name: "White Rice", price: "€3", note: "Served separately", desc: "Plain steamed rice, served separately" }
  ],
  "Pasta & Noodles": [
    { name: "Jollof Spaghetti", price: "€18", desc: "Spaghetti cooked in a smoky Jollof-style tomato sauce" },
    { name: "Spaghetti with Beef", price: "€18", desc: "Spaghetti tossed with seasoned beef in a savoury sauce" },
    { name: "Spaghetti with Chicken", price: "€18", desc: "Spaghetti tossed with seasoned chicken in a savoury sauce" },
    { name: "Spaghetti with Shrimps", price: "€22", desc: "Spaghetti tossed with shrimp in a savoury sauce" },
    { name: "Nigerian Noodles with Egg", price: "€15", desc: "Stir-fried noodles with scrambled egg and light spice" },
    { name: "Noodles with Chicken or Beef", price: "€18", desc: "Stir-fried noodles with your choice of chicken or beef" },
    { name: "Spaghetti with Goat Meat", price: "€20", desc: "Spaghetti tossed with tender goat meat in a savoury sauce" }
  ],
  "Wings": [
    { name: "Peppered Chicken Wings (4 pieces)", price: "€6", desc: "Chicken wings tossed in a spicy pepper glaze" },
    { name: "Peppered Chicken Wings (6 pieces)", price: "€10", desc: "Chicken wings tossed in a spicy pepper glaze" },
    { name: "Peppered Chicken Wings (10 pieces)", price: "€15", desc: "Chicken wings tossed in a spicy pepper glaze" },
    { name: "Suya Chicken Wings (4 pieces)", price: "€6", desc: "Chicken wings coated in smoky suya spice" },
    { name: "Suya Chicken Wings (6 pieces)", price: "€10", desc: "Chicken wings coated in smoky suya spice" },
    { name: "Suya Chicken Wings (10 pieces)", price: "€15", desc: "Chicken wings coated in smoky suya spice" }
  ],
  "Sides": [
    { name: "Egg Sauce", price: "€8", desc: "Scrambled eggs cooked in a light tomato pepper sauce" },
    { name: "Boiled Yam", price: "€6", desc: "Soft boiled yam, a simple hearty side" },
    { name: "Fried Yam", price: "€6", desc: "Golden fried yam, crisp outside and soft inside" },
    { name: "Plantain (Fried)", price: "€5", desc: "Sweet ripe plantain, fried until golden" },
    { name: "Coleslaw", price: "€5", desc: "Fresh, creamy shredded cabbage and carrot salad" }
  ],
  "Desserts": [
    { name: "Banana Bread", price: "€6", desc: "Moist homemade banana bread" },
    { name: "Banana Bread & Coconut Ice Cream", price: "€8", desc: "Moist banana bread paired with coconut ice cream" },
    { name: "Cinnamon Roll", price: "€6", desc: "Soft, sweet roll swirled with cinnamon" },
    { name: "Cinnamon Roll & Coconut Ice Cream", price: "€8", desc: "Soft cinnamon roll paired with coconut ice cream" }
  ],
  "Wines": [
    { name: "Monte Velho", price: "€15.00", note: "Bottle", desc: "Smooth, easy-drinking Portuguese red blend" },
    { name: "Monte Velho", price: "€4.00", note: "Glass", desc: "Smooth, easy-drinking Portuguese red blend" },
    { name: "Papa Figos", price: "€18.00", note: "Bottle", desc: "Full-bodied Portuguese red with dark fruit notes" },
    { name: "Papa Figos", price: "€5.00", note: "Glass", desc: "Full-bodied Portuguese red with dark fruit notes" },
    { name: "Moscatel", price: "€5.00", note: "Glass", desc: "Sweet, aromatic Portuguese dessert wine" },
    { name: "Port Wine", price: "€5.00", note: "Glass", desc: "Rich, sweet fortified Portuguese wine" },
    { name: "Mateus Rosé", price: "€12.00", desc: "Light, semi-sparkling Portuguese rosé" },
    { name: "Fita Azul", price: "€12.00", desc: "Crisp, refreshing Portuguese white wine" }
  ],
  "Beer & Cider": [
    { name: "Super Bock", price: "€3.00", desc: "Portugal's classic crisp lager" },
    { name: "Somersby", price: "€4.00", desc: "Light, fruity apple cider" },
    { name: "Palmwine", price: "€5.00", desc: "Traditional, lightly fermented palm sap" }
  ],
  "Spirits": [
    { name: "Hennessy", price: "€6.00", note: "25ml shot", desc: "Smooth French cognac" },
    { name: "Jack Daniel's", price: "€5.00", note: "25ml shot", desc: "Classic Tennessee whiskey" },
    { name: "Smirnoff", price: "€5.00", note: "25ml shot", desc: "Clean, crisp vodka" },
    { name: "Tequila", price: "€5.00", note: "25ml shot", desc: "Classic agave spirit" },
    { name: "Amarula", price: "€5.00", note: "50ml serve", desc: "Creamy South African fruit liqueur" },
    { name: "Orijin", price: "€10.00", desc: "Bold Nigerian herbal bitters blend" },
    { name: "Martini", price: "€20.00", desc: "Classic Italian vermouth" },
    { name: "Campari", price: "€25.00", desc: "Bold, bitter Italian aperitif" }
  ],
  "Soft Drinks": [
    { name: "Coca-Cola / Coke Zero / Pepsi / Fanta / 7UP / Sumol", price: "€2.50", desc: "Classic chilled soft drink, your choice" },
    { name: "Red Bull", price: "€3.50", desc: "Energy drink to keep you going" },
    { name: "Water (50cl)", price: "€1.50", desc: "Still bottled water" },
    { name: "Water (1.5L)", price: "€3.00", desc: "Still bottled water, large size" },
    { name: "Sparkling Water", price: "€2.00", desc: "Chilled sparkling water" },
    { name: "Malt", price: "€3.00", desc: "Rich, non-alcoholic malt drink" },
    { name: "Zobo", price: "€4.00", desc: "Refreshing hibiscus flower drink" },
    { name: "Kunu", price: "€4.00", desc: "Traditional spiced millet drink" },
    { name: "Fresh Juice (Seasonal)", price: "€4.50", desc: "Freshly pressed juice, seasonal selection" }
  ],
  "Kids' Drinks": [
    { name: "Bongo", price: "€2.50", desc: "Fruity juice drink for kids" },
    { name: "Capri-Sun", price: "€2.50", desc: "Kids' favourite fruit pouch drink" }
  ],
  "Extra Proteins": [
    { name: "Small Turkey Wing", price: "€3", desc: "Extra turkey wing added to your meal" },
    { name: "Large Turkey Wing", price: "€5", desc: "Extra large turkey wing added to your meal" },
    { name: "Beef", price: "€4", desc: "Extra beef added to your meal" },
    { name: "Chicken", price: "€4", desc: "Extra chicken added to your meal" },
    { name: "Fish", price: "€4", desc: "Extra fish added to your meal" },
    { name: "Goat Meat", price: "€5", desc: "Extra goat meat added to your meal" },
    { name: "Assorted Meat", price: "€5", desc: "Extra assorted meat added to your meal" },
    { name: "Cow Leg", price: "€5", desc: "Extra cow leg added to your meal" },
    { name: "Snail", price: "€5", desc: "Extra snail added to your meal" },
    { name: "Lamb Chops", price: "€15", desc: "Extra lamb chops added to your meal" }
  ]
};

if (typeof module !== 'undefined') { module.exports = MENU_DATA; }
