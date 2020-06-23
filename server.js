const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const amazonWebScrapper = require('./amazon-web-scrapper')

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.post('/api/priceSearch', (req, res) => {
  console.log(req.body);
  console.log(req.body.post.isbn_13);
  const scrappingResponse = amazonWebScrapper.webscrapAmazon(req.body.post.isbn_13);
  res.send(
    `I received your POST request. This is what i scrapped: ${scrappingResponse}`,
  );
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
