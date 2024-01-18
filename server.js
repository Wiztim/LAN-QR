const express = require('express')
const app = express()
const port = 8080
//const localIP = '0.0.0.0'
//const localIP = '172.21.223.210'

app.use(express.static('frontend'));

app.post('/api/data', (req, res) => {
    const requestData = req.body;
    // Do something with the posted data (e.g., save it to a database)
    console.log('Received POST request with data:', requestData);
    res.json({ message: 'Data received successfully' });
  });

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});