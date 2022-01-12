//TA03 PLACEHOLDER
const express = require('express');
const router = express.Router();
const http = require('https');

var url = 'https://byui-cse.github.io/cse341-course/lesson03/items.json';

// // var options = {
// //     host: 'www.random.org',
// //     path: '/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new',
// // };
// }

function addAllTags(data) {
    const set = new Set();
    for (let item of data) {
        for (let tag of item.tags) {
            set.add(tag);
        }
    }
    return set;
}

router.get('/', (req, res, next) => {
    http.get(url, (responce) => {
        let str = '';
        responce.on('data', (chunk) => {
            str += chunk;
        });
        responce.on('end', () => {
            const data = JSON.parse(str);
            const set = addAllTags(data);

            const tag = req.query.tag;
            const tags = req.query.tags
                ? req.query.tags.replace(/\s/g, '')
                : '';
            const tagArray = tags === '' ? [] : tags.split(',');
            let itemsToShow = data;
            for (let tagItem of tagArray) {
                itemsToShow = filterItems(itemsToShow, tagItem);
            }

            res.render('pages/ta03', {
                title: 'Team Activity 03',
                path: '/ta03', // For pug, EJS
                activeTA03: true, // For HBS
                contentCSS: true, // For HBS\
                items: itemsToShow,
                tags: set,
            });
        });
        responce.on('error', (err) => {
            console.log(err);
        });
    });
});

function filterItems(items, tag) {
    const itemsToShow = items.filter((item) => {
        return item.tags.find((itemTag) => {
            return itemTag === tag;
        });
    });
    return itemsToShow;
}

module.exports = router;
