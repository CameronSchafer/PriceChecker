const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + '/public'));
const port = 8000;

const cleanItem = item => item.replace(' ', '%20');
const woolies = item => `https://www.woolworths.com.au/shop/search/products?searchTerm=${cleanItem(item)}`;
const coles = item => `https://shop.coles.com.au/a/national/everything/search/${cleanItem(item)}?pageNumber=1`;

let itemList = [];

app.post('/add_item', (req, res) => {
    console.log(`item name: ${req?.body?.item}`);
    const item = req?.body?.item;
    if (!item) {
        res.json({ error: 'Missing Item' });
    } else {
        itemList.push(item);
        console.log(itemList);
        res.json({
            item: {
                itemName: item,
                woolies: woolies(item),
                coles: coles(item)
            }
        });
    }
});

app.post('/remove_item', (req, res) => {
    console.log(`item name: ${req?.body?.itemName}`);
    const itemName= req?.body?.itemName;
    if (!itemName) {
        res.json({ error: 'Missing Item' });
    } else {
        itemList = itemList.filter(item => item !== itemName);
        console.log(itemList);
        res.json({ itemName: itemName});
    }
});

app.get('/get_saved_items', (_, res) => {
    console.log(`itemList: ${itemList}`);
    const list = itemList.map(item => {
        return {
            itemName: item,
            woolies: woolies(item),
            coles: coles(item)
        }
    });
    res.json({ items: list });
});

app.listen(port);

console.log(`Running on localhost:${port}`);
