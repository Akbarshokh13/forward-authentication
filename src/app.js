const express = require('express');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Forward authentication route
app.post('/auth', (req, res) => {
  // Perform your forward authentication logic hSere
  // Access the request body using req.body
  const { username, password } = req.body; 

  // Perform authentication checks or any other processing

  // Return the appropriate response
  if (username === 'Akbarshokh' && password === '12345678') {
    res.status(200).json({ message: 'Authentication successful' });
  } else {
    res.status(401).json({ message: 'Authentication failed' });
  }
});

// Start the server
const port = 80;
app.listen(port, () => {  
  console.log(`Server is running on port ${port}`);
});