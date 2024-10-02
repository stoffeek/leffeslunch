const sqlite3 = require('sqlite3').verbose();

// all dishes and ingredients for inserting into db
const dishes = {
  "Kyckling Tikka Masala": [
    { name: "Kyckling", price: 50, quantity: 2 },
    { name: "Tikka Masala krydda", price: 15, quantity: 1 },
    { name: "Yoghurt", price: 10, quantity: 1 },
    { name: "Ris", price: 8, quantity: 2 },
    { name: "Gurka", price: 5, quantity: 1 },
    { name: "Paprika", price: 12, quantity: 1 },
    { name: "Salt", price: 1, quantity: 1 },
    { name: "Peppar", price: 2, quantity: 1 }
  ],
  "Fläskfilé med gräddsås och potatisgratäng": [
    { name: "Fläskfilé", price: 70, quantity: 1 },
    { name: "Gräddsås", price: 20, quantity: 1 },
    { name: "Potatis", price: 10, quantity: 4 },
    { name: "Ost", price: 25, quantity: 1 },
    { name: "Grädde", price: 15, quantity: 1 },
    { name: "Salt", price: 1, quantity: 1 },
    { name: "Peppar", price: 2, quantity: 1 }
  ],
  "Kyckling med couscous och fetaost": [
    { name: "Kyckling", price: 50, quantity: 1 },
    { name: "Couscous", price: 12, quantity: 2 },
    { name: "Fetaost", price: 20, quantity: 1 },
    { name: "Tomater", price: 8, quantity: 3 },
    { name: "Olja", price: 5, quantity: 1 },
    { name: "Citron", price: 3, quantity: 1 },
    { name: "Salt", price: 1, quantity: 1 },
    { name: "Peppar", price: 2, quantity: 1 }
  ],
  "Lax i ugn med citron och dillsås med kokt potatis": [
    { name: "Lax", price: 60, quantity: 2 },
    { name: "Citron", price: 3, quantity: 1 },
    { name: "Dill", price: 7, quantity: 1 },
    { name: "Smör", price: 10, quantity: 1 },
    { name: "Potatis", price: 10, quantity: 4 },
    { name: "Grädde", price: 15, quantity: 1 },
    { name: "Salt", price: 1, quantity: 1 },
    { name: "Peppar", price: 2, quantity: 1 }
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

//insert products(dishes) and their ingredients 
for (const[dish, ingredients] of Object.entries(dishes)) 
{
  let totalPrice = 0;

  ingredients.forEach(({ price }) => {
    totalPrice += price;
  });

  //inserting products and their ingredients
  insertProduct.run(dish, totalPrice, (err) => {
    if (err) {
      if (err.message.includes("UNIQUE CONSTRAINT failed")){
        console.log(`Product ${dish} already exists, skipping`);
      } else {
        console.error(err.message);
      }
    } else {
      console.log(`Inserted product: ${dish} with total price ${totalPrice}`);
    }
  })
}

const uniqueIngredients = new Map();

//looping through all ingredients in the dishes, not saving any duplicates
for (const [dish, ingredients] of Object.entries(dishes)) {
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