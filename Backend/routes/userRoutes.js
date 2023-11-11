const express = require('express');
const mysql = require('mysql'); // Use mysql2 with Promises
const db = require('../db/db');
// const { messaging } = require('../firebaseconfig.js'); // Removed the alias for db

const userRoutes = express.Router();

userRoutes.post('/createUser', async (req, res) => {
  const userData = req.body; 
  console.log(userData)
  try {
    
    const results = db.query(
      'INSERT INTO USERS_TABLE (Token, Name, Gender, Phone, DOB, Country, State) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [userData.Token, userData.Name, userData.Gender, userData.Phone_Number, userData.selectedDate, userData.Country, userData.State]
    );
    res.status(201).send('User data inserted successfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send(error.message);
  }
});

module.exports = userRoutes;
