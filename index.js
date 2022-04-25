const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + '/public'));
const port = 8000;

app.post('/add_item', (req, res) => {
    console.log(`item name: ${req?.body?.item}`);
    if(!req?.body?.item) {
        res.send('failed');
    }else{
        res.send('success');
    }
});

app.listen(port);

console.log(`Running on localhost:${port}`);
