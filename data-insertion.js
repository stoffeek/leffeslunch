const sqlite3 = require('sqlite3').verbose();

// all products and ingredients for inserting into db
const products = {
  "Kyckling Tikka Masala": [
    { name: "Kyckling", price: 31.8, quantity: 200 },
    { name: "Tikka Masala krydda", price: 0.5, quantity: 2.5 },
    { name: "Yoghurt", price: 1.25, quantity: 50 },
    { name: "Ris", price: 2, quantity: 60 },
    { name: "Gurka", price: 2, quantity: 50 },
    { name: "Paprika", price: 4, quantity: 50 },
    { name: "Salt", price: 0.05, quantity: 4 },
    { name: "Peppar", price: 0.25, quantity: 1.5 }
  ],
  "Fläskfilé med gräddsås och potatisgratäng": [
    { name: "Fläskfilé", price: 67, quantity: 200 },
    { name: "Gräddsås", price: 30, quantity: 100 },
    { name: "Potatis", price: 3.8, quantity: 200 },
    { name: "Ost", price: 5, quantity: 100 },
    { name: "Grädde", price: 3.4, quantity: 100 },
    { name: "Salt", price: 0.05, quantity: 4 },
    { name: "Peppar", price: 0.25, quantity: 1.5 }
  ],
  "Kyckling med couscous och fetaost": [
    { name: "Kyckling", price: 31.8, quantity: 200 },
    { name: "Couscous", price: 2.55, quantity: 75 },
    { name: "Fetaost", price: 12, quantity: 75 },
    { name: "Tomater", price: 5.8, quantity: 50 },
    { name: "Olja", price: 3.2, quantity: 25 },
    { name: "Citron", price: 7.95, quantity: 125 },
    { name: "Salt", price: 0.05, quantity: 4 },
    { name: "Peppar", price: 0.25, quantity: 1.5 }
  ],
  "Lax i ugn med citron och dillsås med kokt potatis": [
    { name: "Lax", price: 25, quantity: 125 },
    { name: "Citron", price: 7.95, quantity: 125 },
    { name: "Dill", price: 0.5, quantity: 2.5 },
    { name: "Smör", price: 2.6, quantity: 20 },
    { name: "Potatis", price: 3.8, quantity: 200 },
    { name: "Salt", price: 0.05, quantity: 4 },
    { name: "Peppar", price: 0.25, quantity: 1.5 }
  ],
  "Spaghetti Carbonara": [
    { name: "Spaghetti", price: 12, quantity: 1 },
    { name: "Bacon", price: 25, quantity: 2 },
    { name: "Grädde", price: 15, quantity: 1 },
    { name: "Ägg", price: 10, quantity: 3 },
    { name: "Parmesan", price: 30, quantity: 1 },
    { name: "Svartpeppar", price: 2, quantity: 1 },
    { name: "Salt", price: 1, quantity: 1 }
  ],
  "Biff med rödvinssås och rostad potatis": [
    { name: "Biff", price: 80, quantity: 2 },
    { name: "Rödvinssås", price: 20, quantity: 1 },
    { name: "Potatis", price: 10, quantity: 4 },
    { name: "Vitlök", price: 5, quantity: 2 },
    { name: "Salt", price: 1, quantity: 1 },
    { name: "Peppar", price: 2, quantity: 1 },
    { name: "Smör", price: 10, quantity: 1 },
    { name: "Timjan", price: 3, quantity: 1 }
  ],
  "Kokt potatis med gräddsås, köttbullar och lingonsylt": [
    { name: "Potatis", price: 10, quantity: 4 },
    { name: "Gräddsås", price: 20, quantity: 1 },
    { name: "Lingonsylt", price: 15, quantity: 1 },
    { name: "Salt", price: 1, quantity: 1 },
    { name: "Peppar", price: 2, quantity: 1 },
    { name: "Köttbullar", price: 30, quantity: 2 }
  ]
};
//database connection
const db = new sqlite3.Database('leffes.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});
//preparing queries for inserting values
const insertProduct = db.prepare('INSERT INTO products (name, price) VALUES (?, ?)');
const insertIngredient = db.prepare('INSERT INTO ingredients (name, price, quantity) VALUES (?, ?, ?)');

//insert products and their ingredients 
for (const[product, ingredients] of Object.entries(products)) {

  let totalPrice = 0;

  ingredients.forEach(({ price }) => {
    totalPrice += price;
  });

    //inserting products and their ingredients
  insertProduct.run(product, totalPrice, (err) => {
    if (err) {
      if (err.message.includes("UNIQUE CONSTRAINT failed")){
        console.log(`Product ${product} already exists, skipping`);
      } else {
        console.error(err.message);
      }
    } else {
      console.log(`Inserted product: ${product} with total price ${totalPrice}`);
    }
  })
}

const uniqueIngredients = new Map();
  //looping through all ingredients in the products, not saving any duplicates
for (const [product, ingredients] of Object.entries(products)) {
  ingredients.forEach(({ name, price, quantity }) => {

    if (!uniqueIngredients.has(name)) {
      uniqueIngredients.set(name, { price, quantity });
    }
  });
}
  //insert unique ingredients, to avoid duplicates
uniqueIngredients.forEach(({price, quantity}, name) => {
  insertIngredient.run(name, price, quantity, (err) => {
    if (err) {
      if (err.message.includes("UNIQUE constraint failed")) {
        console.log(`Ingredient ${name} already exists, skipping.`);
      } else {
        console.error(err.message);
      }
    } else {
      console.log(`Inserted ingredient: ${name} with price ${price}, and quantity ${quantity}`);
    }
  });
});

// finalize prepared statements
insertProduct.finalize();
insertIngredient.finalize();

const runAsync = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
};

const getAsync = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) reject (err);
      else resolve(row);
    });
  });
};

async function fillRecipeTable() {
  try {
    const insertRecipeData = async (productId, ingredientId, quantity) => {
      await runAsync('INSERT INTO recipe (product_id, ingredient_id, quantity_needed) VALUES (?, ?, ?)', [productId, ingredientId, quantity]);
      console.log(`Inserted recipe data for product: ${productId}, ingredient: ${ingredientId}, quantity needed: ${quantity}`);
    };

    for (const [productName, ingredients] of Object.entries(products)) {
      const productRow = await getAsync('SELECT id FROM products WHERE name = ?', [productName]);

      if (!productRow) {
        console.error(`No product found for ${productName}`);
        continue;
      }

      const productId = productRow.id;

      for (const { name: ingredientName, quantity } of ingredients) {
        const ingredientRow = await getAsync('SELECT id FROM ingredients WHERE name = ?', [ingredientName]);

        if (!ingredientRow) {
          console.error(`No ingredient found for ${ingredientName}`);
          continue;
        }

        const ingredientId = ingredientRow.id;

        await insertRecipeData(productId, ingredientId, quantity);
      }
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

fillRecipeTable();