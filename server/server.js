const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

// Skapa en instans av Express
const app = express();

// Port för servern
const PORT = 5001; 

const db = new sqlite3.Database('leffes.db', (err) => {
  if (err) {
    console.error('Error opening database: ' + err.message);
  } else {
    console.log('Connected to the sqlite database');
  }
})

// Middleware
app.use(cors({ origin: 'http://localhost:3000'})); // Tillåter cross-origin-requests (ex. från din frontend till backend)
app.use(express.json()); // Gör så att servern kan tolka inkommande JSON-begäran

// En enkel test-rutt för att verifiera att servern fungerar
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Express server!' });
});

// Hämta rätter från databasen
app.get('/api/products', (req, res) => {
  const productsQuery = 'SELECT * FROM products';
  db.all(productsQuery, [], (err, rows) => {
    if (err){
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get('/api/ingredients', (req, res) => {
  const ingredientsQuery = 'SELECT * FROM ingredients';
  db.all(ingredientsQuery, [], (err, rows) => {
    if (err){
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get('/api/recipe', (req, res) => {
  const ingredientsQuery = 'SELECT * FROM recipe';
  db.all(ingredientsQuery, [], (err, rows) => {
    if (err){
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get('/api/sales', (req, res) => {
  const ingredientsQuery = 'SELECT * FROM sales';
  db.all(ingredientsQuery, [], (err, rows) => {
    if (err){
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get('/api/products/:productId/ingredients', (req, res) => {
  const productId = req.params.productId;

  const joinQuery = `
    select i.id, i.name, i.price, r.quantity_needed
    from ingredients i
    JOIN recipe r ON i.id = r.ingredient_id
    WHERE r.product_id = ?
  `;

  db.all(joinQuery, [productId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
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


app.put('/api/products/update', (req, res) => {
  const products = req.body.products;

  db.serialize(() => {
    db.run("BEGIN TRANSACTION");
    try {
      products.forEach(product => {
          db.run('UPDATE products SET current_stock = ? WHERE id = ?', [product.current_stock, product.id]);
      });
      db.run("COMMIT");
      res.status(200).json({ message: 'Product stock updated successfully' });
    } catch (error){
      db.run("ROLLBACK");
      res.status(500).json ({ error: 'Error updating product stock' });
    }
  });
});

app.post('/api/sales', (req, res) => {
    const salesData = req.body;

    const { total_price, profit, date } = salesData;

    const insertQuery = `INSERT INTO sales (total_price, profit, date) VALUES (?, ?, ?)`;
    db.run(insertQuery, [total_price, profit, date], function (err) {
      if (err) {
        console.error("error inserting sale", err)
        return res.status(500).json ({ error: err.message });
      }
      res.status(201).json({ message: 'Sale recorded successfully', id: this.lastID });
    });
});



// Starta servern
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
