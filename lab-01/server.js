const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Node.js & Express.js Lab Server!');
});

app.get('/about', (req, res) => {
  res.status(200).json({
    name: 'Ganta Chaitanya Vardhan',
    registrationNumber: '252U1R5047',
    section: 'CSE (AI & DE)'
  });
});


app.get('/time', (req, res) => {
  res.status(200).json({
    currentTime: new Date().toISOString()
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: '404 Not Found',
    message: 'The requested path does not exist on this server.'
  });
});

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});