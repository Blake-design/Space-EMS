const router = require('express').Router();
const { parse } = require('dotenv');
const { Score, User } = require('../models');
const withAuth = require('../utils/auth');
var helpers = require('handlebars-helpers');
var array = helpers.array();

router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Score }],
    });

    const allUserData = await User.findAll({
      attributes: { exclude: ['password', 'email'] },
      include: [{ model: Score }],
    });

    const user = userData.get({ plain: true });
    const all = allUserData.map((some) => some.get({ plain: true }));

    // all.sort(function (a, b) {
    //   return b.Score.user_hiScore - a.Score.user_hiScore;
    // });

    res.render('dashboard', {
      name: user.name,

      players: {
        ...all,
      },
    });
  } catch (err) {
    console.log('hit err');
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;
