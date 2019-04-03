const express = require('express');

const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('test'));

app.get('/', function(req,res) {
  const indexPath = path.join(__dirname, '../');
  console.log('index path:' + indexPath);
  res.sendFile('index.html',{root: indexPath});
});


app.listen(port, (err) => {
    if (err) {
        console.log(`error - ${err}`);
    }
    console.log(`server running on port: ${port}`);
});
