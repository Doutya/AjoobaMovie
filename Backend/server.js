// const express = require('express');
// const mysql = require('mysql');
// const userRoutes = require('./routes/userRoutes');
// const db = require('./db/db');

// const app = express();
// const port = 3000;

// app.use(express.json());

// app.use('/api/users', userRoutes); // Define a base route for user-related routes

// app.get('/', (req, res) => {
//   // Example query to fetch data from MySQL
//   db.query('SELECT * FROM users_table', (error, results, fields) => {
//     if (error) {
//       res.status(500).send(error.message);
//     } else {
//       res.json(results);
//     }
//   });
// });

// app.post('/api/users/createUser', (req, res) => {
//     const userData = req.body;
//     return addData(userData)
// })

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

const express = require('express');
const userRoutes = require('./routes/userRoutes');
// const db = require('./db/db');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


