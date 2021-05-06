const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const amazonWebScrapper = require('./amazonWebScrapper')

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.post('/api/priceSearch', async (req, res) => {
  console.log(req.body);
  console.log(req.body.post.isbn_13);
  const scrappingResponse = await amazonWebScrapper.webscrapAmazon(req.body.post.isbn_13);
  res.send(
    scrappingResponse
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
