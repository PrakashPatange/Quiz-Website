const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Middleware
app.use(express.json());
app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Your MySQL username
  password: 'root',  // Your MySQL password
  database: 'quiz_app',  // Your database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Routes
// Register Route
app.post('/api/auth/register', (req, res) => {
  const { username, password } = req.body;
  
  // Hash password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).send('Error hashing password');
    }
    
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).send('Error registering user');
      }
      res.status(201).send('User registered successfully');
    });
  });
});

// Login Route
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, result) => {
    if (err) {
      return res.status(500).send('Error fetching user');
    }
    if (result.length === 0) {
      return res.status(404).send('User not found');
    }
    
    const user = result[0];
    
    // Compare password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).send('Error comparing password');
      }
      if (!isMatch) {
        return res.status(401).send('Invalid credentials');
      }
      
      // Generate JWT token
      const token = jwt.sign({ id: user.id, username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });
      res.json({ token });
    });
  });
});

// Store Quiz Score Route
app.post('/api/quiz/score', (req, res) => {
  const { userId, score } = req.body;

  // Insert quiz score into database
  const query = 'INSERT INTO quiz_results (user_id, score) VALUES (?, ?)';
  db.query(query, [userId, score], (err, result) => {
    if (err) {
      console.error('Error storing quiz score:', err);
      return res.status(500).send('Error storing quiz score');
    }
    res.status(200).send('Quiz score stored successfully');
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
