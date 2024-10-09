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
