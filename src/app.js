const express = require('express');
const app = express();
const emailRoutes = require('./routes/emailRoutes');

app.use(express.json());
app.use('/email', emailRoutes);

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Resilient Email Service is running 🚀');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



