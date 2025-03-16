const express = require('express');
const app = express();
const port = 3000;

// Example route handler
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Another example route handler
app.get('/about', (req, res) => {
  res.send('This is the about page');
});

// Listen for incoming requests
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
