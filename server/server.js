const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

// Skapa en instans av Express
const app = express();
const PORT = 5001; // Port för servern

// Anslut till SQLite-databasen
const db = new sqlite3.Database('leffes.db', (err) => {
  if (err) {
    console.error('Error opening database: ' + err.message);
  } else {
    console.log('Connected to the sqlite database');
  }
});

// Middleware
app.use(cors());
app.use(express.json()); // Gör så att servern kan tolka inkommande JSON-begäran

// En enkel test-rutt för att verifiera att servern fungerar
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Express server!' });
});

// Hämta rätter från databasen
app.get('/api/products', (req, res) => {
  const productsQuery = 'SELECT * FROM products';
  db.all(productsQuery, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Hämta ingredienser från databasen
app.get('/api/ingredients', (req, res) => {
  const ingredientsQuery = 'SELECT * FROM ingredients';
  db.all(ingredientsQuery, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log('Ingrediensdata:', rows); 
    res.json(rows);
  });
});

// Hämta recept från databasen
app.get('/api/recipe', (req, res) => {
  const recipeQuery = 'SELECT * FROM recipe';
  db.all(recipeQuery, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log('Receptdata:', rows); 
    res.json(rows);
  });
});

// Lägg till ny order
app.post('/api/orders', (req, res) => {
  const { totalIngredients } = req.body;
  if (!totalIngredients || Object.keys(totalIngredients).length === 0) {
    return res.status(400).json({ error: 'No ingredients provided in the order' });
  }

  const total_price = calculateTotalPrice(totalIngredients);

  db.run(
    `INSERT INTO sales (total_price, profit, date, leftovers_sold) VALUES (?, ?, ?, ?)`,
    [total_price, total_price * 0.2, new Date().toISOString(), 0],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Error creating sale: ' + err.message });
      }

      const saleId = this.lastID;
      db.run(
        `INSERT INTO orders (receipt, price, date, leftover_quantity, sales_id) VALUES (?, ?, ?, ?, ?)`,
        [saleId, total_price, new Date().toISOString(), 0, saleId],
        function (err) {
          if (err) {
            return res.status(500).json({ error: 'Error creating order: ' + err.message });
          }

          const orderId = this.lastID;

          
          const orderItemsPromises = Object.entries(totalIngredients).map(([ingredient, quantity]) => {
            return new Promise((resolve, reject) => {
              db.get(`SELECT id FROM ingredients WHERE name = ?`, [ingredient], (err, row) => {
                if (err || !row) return reject('Ingredient not found');
                db.run(`INSERT INTO order_items (order_id, product_id) VALUES (?, ?)`, [orderId, row.id], (err) => {
                  if (err) return reject('Error inserting order item');
                  resolve();
                });
              });
            });
          });

          Promise.all(orderItemsPromises)
            .then(() => res.status(200).json({ message: 'Order placed successfully!' }))
            .catch((error) => res.status(500).json({ error }));
        }
      );
    }
  );
});

// Kalkylering av totalpriset baserat på ingrediensernas pris och kvantitet
const calculateTotalPrice = (totalIngredients) => {
  let totalPrice = 0;
  Object.entries(totalIngredients).forEach(([ingredient, quantity]) => {
    db.get(`SELECT price FROM ingredients WHERE name = ?`, [ingredient], (err, row) => {
      if (row && !err) {
        totalPrice += row.price * (quantity / 1000); // Antar att priset är per kilo
      }
    });
  });
  return totalPrice;
};

// Starta servern
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});