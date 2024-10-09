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

// Hämta ordrar från databasen baserat på order_id
app.get('/api/orders/:id', (req, res) => {
  const orderId = req.params.id;
  const ordersQuery = 'SELECT * FROM orders WHERE order_id = ?';
  
  db.all(ordersQuery, [orderId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(rows);
  });
});


// Lägg till ny order
app.post('/api/orders', (req, res) => {
  const { totalIngredients } = req.body;
  if (!totalIngredients || Object.keys(totalIngredients).length === 0) {
    return res.status(400).json({ error: 'No ingredients provided in the order' });
  }

  // Get the current maximum order_id from the orders table
  db.get(`SELECT MAX(order_id) as maxOrderId FROM orders`, (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Error retrieving maximum order_id: ' + err.message });
    }

    const newOrderId = (row.maxOrderId || 0) + 1; // If no orders exist yet, start with 1

    // Insert each ingredient into the orders table with the new order_id
    const insertOrderPromises = Object.entries(totalIngredients).map(([ingredient, quantity]) => {
      return new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO orders (order_id, ingredient_name, quantity, date) VALUES (?, ?, ?, ?)`,
          [newOrderId, ingredient, quantity, new Date().toISOString()],
          function (err) {
            if (err) {
              console.error('Error inserting into orders table:', err); // Log the error
              reject('Error inserting into orders table: ' + err.message);
            } else {
              resolve();
            }
          }
        );
      });
    });

    // Wait for all inserts to finish
    Promise.all(insertOrderPromises)
      .then(() => res.status(200).json({ message: 'Order placed successfully!', order_id: newOrderId }))
      .catch((error) => {
        console.error('Error placing order:', error); // Log the error
        res.status(500).json({ error });
      });
  });
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