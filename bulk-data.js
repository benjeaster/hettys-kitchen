// Bulk Order pricing (per litre / per plate), structured for the Quotation
// builder. Keep in sync with the Bulk Orders section of index.html.
// Each item has a `tiers` array of { label, price } - price is a plain number (euros).
const BULK_MENU_DATA = {
  "Soups & Swallow (Bulk)": [
    { name: "Egusi Soup", note: "Includes one swallow", desc: "Rich melon seed soup with leafy greens and spices", tiers: [{ label: "1L", price: 25 }] },
    { name: "Ogbono Soup", note: "Includes one swallow", desc: "Ground ogbono seed soup with a smooth, thick texture", tiers: [{ label: "1L", price: 25 }] },
    { name: "Okra Soup", note: "Includes one swallow", desc: "Okra-based soup, light with a soft, silky texture", tiers: [{ label: "1L", price: 25 }] },
    { name: "Vegetable Soup", note: "Includes one swallow", desc: "Leafy greens simmered in a savoury peppered broth", tiers: [{ label: "1L", price: 25 }] },
    { name: "Eru (Vegetable)", note: "Includes one swallow", desc: "Traditional Cameroonian-style vegetable soup, rich and savoury", tiers: [{ label: "1L", price: 27 }] },
    { name: "Nsala Soup", note: "Includes one swallow", desc: "White soup, light broth without palm oil", tiers: [{ label: "1L", price: 27 }] },
    { name: "Bitterleaf Soup", note: "Includes one swallow", desc: "Bitterleaf-based soup with a distinctive, savoury bite", tiers: [{ label: "1L", price: 27 }] },
    { name: "Banga Soup", note: "Includes one swallow", desc: "Palm nut soup with a deep, rich, spiced flavour", tiers: [{ label: "1L", price: 27 }] }
  ],
  "Hetty's Specials (Bulk)": [
    { name: "Nkwobi", desc: "Spiced cow foot in a rich palm oil sauce", tiers: [{ label: "Plate", price: 20 }, { label: "1L", price: 30 }] },
    { name: "Isi Ewu", desc: "Spiced goat head delicacy in a peppery sauce", tiers: [{ label: "Plate", price: 20 }, { label: "1L", price: 30 }] },
    { name: "Asun", desc: "Smoky, spicy grilled goat meat chunks", tiers: [{ label: "Plate", price: 20 }, { label: "1L", price: 30 }] },
    { name: "Peppered Goat Meat", desc: "Tender goat meat sautéed in a peppery sauce", tiers: [{ label: "Plate", price: 20 }, { label: "1L", price: 30 }] },
    { name: "Peppered Pomo (Cow Skin)", desc: "Spiced, chewy cow skin in a peppery sauce", tiers: [{ label: "Plate", price: 15 }, { label: "1L", price: 25 }] },
    { name: "Peppered Cow Leg", desc: "Tender cow leg in a spicy pepper sauce", tiers: [{ label: "Plate", price: 18 }, { label: "1L", price: 28 }] },
    { name: "Gizzard", desc: "Peppered gizzard, chewy and full of spice", tiers: [{ label: "Plate", price: 15 }, { label: "1L", price: 25 }] },
    { name: "Abacha", desc: "African salad of shredded cassava, garnished and spiced", tiers: [{ label: "Plate", price: 20 }, { label: "1L", price: 25 }] },
    { name: "Peppered Turkey Wings", desc: "Turkey wings tossed in a spicy pepper sauce", tiers: [{ label: "Plate", price: 20 }, { label: "1L", price: 30 }] },
    { name: "Grilled Fish", note: "With one side", desc: "Whole fish grilled and lightly spiced, served with a side", tiers: [{ label: "Order", price: 15 }] },
    { name: "Pepper Soup", note: "Fish, Chicken or Cow Assorted", desc: "Light, spicy broth with your choice of protein", tiers: [{ label: "Order", price: 25 }] },
    { name: "Noodles in Pepper Soup", desc: "Noodles served in a spicy, savoury pepper soup broth", tiers: [{ label: "Order", price: 25 }] },
    { name: "Suya", desc: "Skewered, spiced grilled beef, a Nigerian street food favourite", tiers: [{ label: "Portion", price: 15 }] },
    { name: "White Rice", note: "Served separately", desc: "Plain steamed rice, served separately", tiers: [{ label: "Order", price: 3 }] }
  ],
  "Tomato Stew & Sauces (Bulk)": [
    { name: "Tomato Stew", note: "With Chicken or Turkey", desc: "Rich tomato stew, slow-cooked and full of flavour", tiers: [{ label: "1L", price: 25 }] },
    { name: "Tomato Stew", note: "With Beef", desc: "Rich tomato stew, slow-cooked and full of flavour", tiers: [{ label: "1L", price: 28 }] },
    { name: "Tomato Stew", note: "With Goat Meat", desc: "Rich tomato stew, slow-cooked and full of flavour", tiers: [{ label: "Plate", price: 20 }, { label: "1L", price: 30 }, { label: "2L", price: 60 }, { label: "4L", price: 118 }] },
    { name: "Tomato Stew", note: "With Assorted Meat", desc: "Rich tomato stew, slow-cooked and full of flavour", tiers: [{ label: "1L", price: 30 }] },
    { name: "Ofada / Ayamase Sauce", desc: "Spicy green pepper sauce (Ayamase), a Nigerian favourite", tiers: [{ label: "1L", price: 25 }] }
  ],
  "Rice Dishes (Bulk)": [
    { name: "Jollof Rice", desc: "Smoky tomato rice, a West African classic", tiers: [{ label: "Plate", price: 20 }, { label: "1L", price: 30 }, { label: "2L", price: 60 }, { label: "4L", price: 118 }] },
    { name: "Fried Rice", desc: "Stir-fried rice with mixed vegetables and light seasoning", tiers: [{ label: "Plate", price: 22 }, { label: "1L", price: 33 }, { label: "2L", price: 66 }, { label: "4L", price: 130 }] },
    { name: "Coconut Rice", desc: "Rice simmered in coconut milk for a subtly sweet flavour", tiers: [{ label: "Plate", price: 22 }, { label: "1L", price: 33 }, { label: "2L", price: 66 }, { label: "4L", price: 130 }] },
    { name: "Village Rice", desc: "Rustic rice cooked with local spices and vegetables", tiers: [{ label: "Plate", price: 22 }, { label: "1L", price: 33 }, { label: "2L", price: 66 }, { label: "4L", price: 130 }] },
    { name: "Ofada Rice & Ayamase", desc: "Local rice served with spicy green pepper sauce", tiers: [{ label: "Plate", price: 23 }, { label: "1L", price: 35 }, { label: "2L", price: 70 }, { label: "4L", price: 138 }] }
  ],
  "Pasta & Noodles (Bulk)": [
    { name: "Jollof Spaghetti", desc: "Spaghetti cooked in a smoky Jollof-style tomato sauce", tiers: [{ label: "Plate", price: 18 }, { label: "1L", price: 27 }, { label: "2L", price: 54 }, { label: "4L", price: 106 }] },
    { name: "Spaghetti with Beef", desc: "Spaghetti tossed with seasoned beef in a savoury sauce", tiers: [{ label: "Plate", price: 18 }, { label: "1L", price: 27 }, { label: "2L", price: 54 }, { label: "4L", price: 106 }] },
    { name: "Spaghetti with Chicken", desc: "Spaghetti tossed with seasoned chicken in a savoury sauce", tiers: [{ label: "Plate", price: 18 }, { label: "1L", price: 27 }, { label: "2L", price: 54 }, { label: "4L", price: 106 }] },
    { name: "Spaghetti with Shrimps", desc: "Spaghetti tossed with shrimp in a savoury sauce", tiers: [{ label: "Plate", price: 22 }, { label: "1L", price: 33 }, { label: "2L", price: 66 }, { label: "4L", price: 130 }] },
    { name: "Nigerian Noodles with Egg", desc: "Stir-fried noodles with scrambled egg and light spice", tiers: [{ label: "Plate", price: 15 }, { label: "1L", price: 23 }, { label: "2L", price: 46 }, { label: "4L", price: 90 }] },
    { name: "Noodles with Chicken or Beef", desc: "Stir-fried noodles with your choice of chicken or beef", tiers: [{ label: "Plate", price: 18 }, { label: "1L", price: 27 }, { label: "2L", price: 54 }, { label: "4L", price: 106 }] },
    { name: "Spaghetti with Goat Meat", desc: "Spaghetti tossed with tender goat meat in a savoury sauce", tiers: [{ label: "Plate", price: 20 }, { label: "1L", price: 30 }, { label: "2L", price: 60 }, { label: "4L", price: 118 }] }
  ],
  "Porridge (Bulk)": [
    { name: "Beans Porridge", desc: "Beans slow-cooked in a rich, spiced porridge", tiers: [{ label: "Order", price: 15 }] },
    { name: "Yam Porridge", desc: "Yam slow-cooked in a rich, spiced porridge", tiers: [{ label: "Order", price: 15 }] },
    { name: "Plantain Porridge", desc: "Plantain slow-cooked in a rich, spiced porridge", tiers: [{ label: "Order", price: 16 }] },
    { name: "Porridge with Fish", desc: "Hearty porridge cooked with fish", tiers: [{ label: "Order", price: 20 }] },
    { name: "Porridge with Chicken", desc: "Hearty porridge cooked with chicken", tiers: [{ label: "Order", price: 20 }] },
    { name: "Porridge with Turkey", desc: "Hearty porridge cooked with turkey", tiers: [{ label: "Order", price: 20 }] },
    { name: "Porridge with Beef", desc: "Hearty porridge cooked with beef", tiers: [{ label: "Order", price: 22 }] },
    { name: "Porridge with Goat Meat", desc: "Hearty porridge cooked with goat meat", tiers: [{ label: "Order", price: 24 }] },
    { name: "Porridge with Assorted Meat", desc: "Hearty porridge cooked with assorted meats", tiers: [{ label: "Order", price: 25 }] }
  ],
  "Wings (Bulk)": [
    { name: "Wings", note: "Suya, Peppered, BBQ, Peri-Peri or Honey Glaze", desc: "Chicken wings glazed in your choice of bold, spiced flavours", tiers: [
      { label: "4 Wings", price: 12 }, { label: "6 Wings", price: 16 }, { label: "10 Wings", price: 24 },
      { label: "15 Wings", price: 34 }, { label: "20 Wings", price: 44 }
    ] }
  ],
  "Sides (Bulk)": [
    { name: "Coleslaw", desc: "Fresh, creamy shredded cabbage and carrot salad", tiers: [{ label: "1L", price: 15 }, { label: "2L", price: 30 }, { label: "4L", price: 58 }] },
    { name: "Extra Coleslaw", note: "Add-on to a meal", desc: "Additional portion of coleslaw", tiers: [{ label: "Add-on", price: 4 }] },
    { name: "Fried Plantain", desc: "Sweet ripe plantain, fried until golden", tiers: [{ label: "1L", price: 15 }, { label: "2L", price: 30 }, { label: "4L", price: 58 }] },
    { name: "Extra Plantain", note: "Add-on to a meal", desc: "Additional portion of fried plantain", tiers: [{ label: "Add-on", price: 5 }] },
    { name: "Moi Moi", desc: "Steamed bean pudding, soft and lightly spiced", tiers: [{ label: "10pc", price: 35 }, { label: "20pc", price: 68 }, { label: "50pc", price: 165 }] },
    { name: "Moi Moi & Pap (Akamu)", desc: "Steamed bean pudding served with smooth pap", tiers: [{ label: "Order", price: 10 }] },
    { name: "Moi Moi & Custard", desc: "Steamed bean pudding served with sweet custard", tiers: [{ label: "Order", price: 10 }] },
    { name: "Moi Moi with Jollof or Fried Rice", note: "Add-on to the rice price", desc: "Steamed bean pudding added to your rice order", tiers: [{ label: "Add-on", price: 4 }] },
    { name: "Egg Sauce", desc: "Scrambled eggs cooked in a light tomato pepper sauce", tiers: [{ label: "1L", price: 12 }, { label: "2L", price: 24 }, { label: "4L", price: 46 }] },
    { name: "Boiled Yam", desc: "Soft boiled yam, a simple hearty side", tiers: [{ label: "1L", price: 9 }, { label: "2L", price: 18 }, { label: "4L", price: 34 }] },
    { name: "Fried Yam", desc: "Golden fried yam, crisp outside and soft inside", tiers: [{ label: "1L", price: 9 }, { label: "2L", price: 18 }, { label: "4L", price: 34 }] }
  ],
  "Protein Add-Ons (Bulk)": [
    { name: "Beef", desc: "Extra beef added to your order", tiers: [{ label: "Add-on", price: 5 }] },
    { name: "Fish", desc: "Extra fish added to your order", tiers: [{ label: "Add-on", price: 5 }] },
    { name: "Chicken", desc: "Extra chicken added to your order", tiers: [{ label: "Add-on", price: 5 }] },
    { name: "Turkey", desc: "Extra turkey added to your order", tiers: [{ label: "Add-on", price: 5 }] },
    { name: "Goat Meat", desc: "Extra goat meat added to your order", tiers: [{ label: "Add-on", price: 5 }] },
    { name: "Snail", desc: "Extra snail added to your order", tiers: [{ label: "Add-on", price: 5 }] },
    { name: "Assorted Meat", desc: "Extra assorted meat added to your order", tiers: [{ label: "Add-on", price: 5 }] },
    { name: "Cow Leg", desc: "Extra cow leg added to your order", tiers: [{ label: "Add-on", price: 3 }] },
    { name: "Lamb Chops", desc: "Extra lamb chops added to your order", tiers: [{ label: "Add-on", price: 15 }] },
    { name: "Small Turkey Wing", desc: "Extra small turkey wing added to your order", tiers: [{ label: "Add-on", price: 3 }] },
    { name: "Large Turkey Wing", desc: "Extra large turkey wing added to your order", tiers: [{ label: "Add-on", price: 5 }] }
  ]
};

if (typeof module !== 'undefined') { module.exports = BULK_MENU_DATA; }
