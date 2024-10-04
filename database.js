const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('leffes.db', (err) => {
  if (err) {
    console.error('Error opening database: ' + err.message);
  } else {
    console.log('Connected to the sqlite database');

    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS products(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price INTEGER NOT NULL
      );`, (err) => {
        if (err) {
          console.error('Error creating products table: ' + err.message);
        }
      });

      db.run(`CREATE TABLE IF NOT EXISTS ingredients(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price INTEGER NOT NULL,
        quantity INTEGER NOT NULL
      );`, (err) => {
        if (err) {
          console.error('Error creating ingredients table: ' + err.message);
        }
      });

      db.run(`CREATE TABLE IF NOT EXISTS sales(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        total_price INTEGER NOT NULL,
        profit INTEGER NOT NULL,
        date DATETIME,
        leftovers_sold INTEGER NOT NULL
      );`, (err) => {
        if (err) {
          console.error('Error creating sales table: ' + err.message);
        }
      });

      db.run(`CREATE TABLE IF NOT EXISTS orders(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        receipt INTEGER NOT NULL,
        price INTEGER NOT NULL,
        date DATETIME,
        leftover_quantity INTEGER NOT NULL,
        sales_id INTEGER NOT NULL,
        FOREIGN KEY (sales_id) REFERENCES sales(id)
      );`, (err) => {
        if (err) {
          console.error('Error creating orders table: ' + err.message);
        }
      });

      db.run(`CREATE TABLE IF NOT EXISTS order_items(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
      );`, (err) => {
        if (err) {
          console.error('Error creating order_items table: ' + err.message);
        }
      });

      db.run(`CREATE TABLE IF NOT EXISTS recipe(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER NOT NULL,
        ingredient_id INTEGER NOT NULL,
        quantity_needed INTEGER,
        FOREIGN KEY (product_id) REFERENCES products(id),
        FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
      );`, (err) => {
        if (err) {
          console.error('Error creating recipe table: ' + err.message);
        }
      });
    });
  }
});

module.exports = db;
