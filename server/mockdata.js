const db = require('./database'); // I

db.run(`INSERT INTO products (name, price) VALUES (?, ?)`, ['Product1', 100], function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log(`A row has been inserted with rowid ${this.lastID}`);
});

db.run(`INSERT INTO ingredients (name, price, quantity) VALUES (?, ?, ?)`, ['Ingredient1', 50, 10], function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log(`A row has been inserted with rowid ${this.lastID}`);
});

db.run(`INSERT INTO sales (total_price, profit, date, leftovers_sold) VALUES (?, ?, ?, ?)`, [500, 200, '2024-10-01', 5], function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log(`A row has been inserted with rowid ${this.lastID}`);
});

db.run(`INSERT INTO orders (receipt, price, date, leftover_quantity, sales_id) VALUES (?, ?, ?, ?, ?)`, [12345, 300, '2024-10-01', 2, 1], function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log(`A row has been inserted with rowid ${this.lastID}`);
});

db.run(`INSERT INTO order_items (order_id, product_id) VALUES (?, ?)`, [1, 1], function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log(`A row has been inserted with rowid ${this.lastID}`);
});

db.run(`INSERT INTO recipe (product_id, ingredient_id, quantity_needed) VALUES (?, ?, ?)`, [1, 1, 2], function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log(`A row has been inserted with rowid ${this.lastID}`);
});

// Kontrollera datan
db.all(`SELECT * FROM products`, [], (err, rows) => {
  if (err) {
    throw err;
  }
  console.log('Products:', rows);
});
