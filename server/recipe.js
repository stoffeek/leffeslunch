const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('leffes.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
  });

const findProductId = 'SELECT id FROM products WHERE name = ?';
const findIngredientId = 'SELECT id FROM ingredients WHERE name = ?';
const insertRecipe = 'INSERT INTO recipe (product_id, ingredient_id, quantity_needed) values (?, ?, ?)';

const insertRecipeData = (productId, ingredientId, quantity) => {
  db.run(insertRecipe, [productId, ingredientId, quantity], (err) => {
    if (err) {
      console.error(`Error inserting recipe data: ${err.message}`);
    } else {
      console.log(`Inserted recipe data for product ${productId}, ingredient ${ingredientId}`);
    }
  });
}

Object.entries(products).forEach(([dishName, ingredients]) => {
  db.get(findProductId, [dishName], (err, productRow) => {
    if (err) {
      console.error(`Error finding product ID for ${dishName}: ${err.message}`);
    } else if (productRow) {
      const productId = productRow.id;

      ingredients.forEach(({ name: ingredientName, quantity }) => {
        db.get(findIngredientId, [ingredientName], (err, ingredientRow) => {
          if (err) {
            console.error(`Error finding ingredient ID for ${ingredientName}: ${err.message}`);
          } else if (ingredientRow) {
            const ingredientId = ingredientRow.id;

            insertRecipeData(productId, ingredientId, quantity);
          }
        });
      });
    }
  });
});