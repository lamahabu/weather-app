// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware */
// Configure express to use body-parser as middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('website'));

const PORT = 3000;


app.post('/add', (req, res) => {
    projectData.date = req.body.date;
    projectData.temp = req.body.temp;
    projectData.feel = req.body.feel;
    res.json({ success: true, message: 'Data added successfully' });
});

app.get('/all', (req, res) => {
    res.json(projectData); 
});
  
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
