export const calculateIngredients = (dishes, ingredientsMap) => {
    const calculatedIngredients = {};
  
    for (const [dish, quantity] of Object.entries(dishes)) {
      if (quantity > 0) {
        const ingredients = ingredientsMap[dish];
        for (const [ingredient, amount] of Object.entries(ingredients)) {
          calculatedIngredients[ingredient] = (calculatedIngredients[ingredient] || 0) + amount * quantity;
        }
      }
    }
  
    return calculatedIngredients;
  };
  