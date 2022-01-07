//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself!
const express = require('express');
const router = express.Router();

const usernames = [];

//requirement 2
router.post('/addUser', (req, res, next) =>{
  const newUser = req.body.newUser;

  usernames.push(newUser);

  res.redirect('/ta02/');
});

//requirement 3
router.post('/removeUser', (req, res, next) =>{
  const removeUser = req.body.removeUser;

  const list = usernames.indexOf(removeUser);
  if(list > -1) {
    usernames.splice(list, 1);
  }
  res.redirect('/ta02/');
});

router.get('/', (req, res, next) => {
  res.render('pages/ta02', {
    title: 'Team Activity 02',
    path: '/ta02', //ejs
    users: usernames
  });
});

module.exports = router;
