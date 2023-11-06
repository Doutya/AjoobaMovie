const express = require('express');
const mysql = require('mysql');
const db = require('../db/db');

const userRoutes = express.Router();

userRoutes.post('/api/users/createUser', (req, res) => {
  const userData = req.body; // Process user data here and insert it into the database
  // ...

  // Example of inserting data into the database
  db.query('INSERT INTO USERS_TABLE (Name, Gender, Phone, DOB, Country, State) VALUES (?, ?, ?, ?, ?, ?)',
    [userData.Name, userData.Gender, userData.Phone_Number, userData.selectedDate, userData.Country, userData.State],
    (error, results, fields) => {
      if (error) {
        console.error('Error:', error);
        res.status(500).send(error.message);
      } else {
        res.status(201).send('User data inserted successfully');
      }
    });
});

module.exports = userRoutes;
