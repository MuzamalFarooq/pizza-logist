// Centralized pizza/menu data for search functionality
const pizzaData = [
  // Best Deals
  { name: "DEAL FOR 2", price: 2599.00, category: "Best Deals", description: "1 Medium Pizza (Classic) 2pcs Garlic Bread + 2 Small Drink" },
  { name: "DEAL FOR 3", price: 1899.00, category: "Best Deals", description: "1 Lrg Pizza (Classic) + 8pcs Wings + 1 Lrg Drink" },
  { name: "Family Deal", price: 3999.00, category: "Best Deals", description: "2 Medium Pizza (Classic) + 4 pcs Garlic Bread + 1 Lrg Drink" },
  { name: "FAMILY DEAL LARGE", price: 4999.00, category: "Best Deals", description: "2 Lrg Pizza (Classic) + 6pcs Garlic Bread + 1 Lrg Drink" },

  // Explore Deals
  { name: "Ramdan Deal", price: 3900.00, category: "Explore Deals", description: "Special Ramdan combo deal" },
  { name: "Jazz Deal", price: 2299.00, category: "Jazz Deals", description: "Jazz special combo deal" },
  { name: "Midnight Deal", price: 4999.00, category: "Midnight Deals", description: "Late night special combo" },
  { name: "Hut Deal", price: 2999.00, category: "Explore Deals", description: "Hut special combo deal" },

  // Best Sellers
  { name: "Chicken Fagita", price: 2299.00, category: "Best Seller", description: "Classic Chicken Fagita pizza with spicy chicken and green peppers" },
  { name: "Spicy Chicken Ranch", price: 2199.00, category: "Best Seller", description: "Tender spicy chicken fajita paired with ranch sauce" },
  { name: "Very Veggie", price: 1999.00, category: "Best Seller", description: "Fresh veggie pizza with assorted vegetables" },

  // Discount Deals / Appetizers
  { name: "Appetizer Platter", price: 1999.00, category: "Appetizers", description: "12 Wedges, 6 Chicken Wings, 4 Bihari Spin Rolls, 1 Dip" },
  { name: "Bihari Chicken Spin Roll", price: 1999.00, category: "Appetizers", description: "Bihari Chicken Spin Rolls 2pcs" },
  { name: "Dynamite Wings", price: 1999.00, category: "Appetizers", description: "Zesty dynamite sauce at the bottom and top" },
  { name: "Potato Wedges", price: 999.00, category: "Appetizers", description: "Crispy potato wedges" },

  // Drinks
  { name: "AquaFina", price: 99.00, category: "Drinks", description: "AquaFina water bottle" },
  { name: "Pepsi", price: 99.00, category: "Drinks", description: "Pepsi bottle" },
  { name: "7 UP", price: 99.00, category: "Drinks", description: "7 UP bottle" },
  { name: "Mirinda", price: 99.00, category: "Drinks", description: "Mirinda bottle" },
];

export default pizzaData;
