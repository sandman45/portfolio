const express = require('express');

const path = require('path');
const indexPath = path.join(__dirname, '../');

const app = express();
const port = 3000;

app.use(express.static(indexPath));

app.get('/', function(req,res) {
  console.log('index path:' + indexPath);
  res.sendFile('index.html',{root: indexPath});
});


app.listen(port, (err) => {
    if (err) {
        console.log(`error - ${err}`);
    }
    console.log(`server running on port: ${port}`);
});
