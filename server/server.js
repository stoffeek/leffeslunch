const express = require('express');
const cors = require('cors');

// Skapa en instans av Express
const app = express();

// Port för servern
const PORT = 5001; 

// Middleware
app.use(cors()); // Tillåter cross-origin-requests (ex. från din frontend till backend)
app.use(express.json()); // Gör så att servern kan tolka inkommande JSON-begäran

// En enkel test-rutt för att verifiera att servern fungerar
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Express server!' });
});



// Starta servern
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
