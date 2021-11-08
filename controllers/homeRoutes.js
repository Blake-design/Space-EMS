const router = require('express').Router();
const { parse } = require('dotenv');
const { Score, User } = require('../models');
const withAuth = require('../utils/auth');

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
      raw: true,
    });
    console.log(allUserData);
    const user = userData.get({ plain: true });

    res.render('dashboard', {
      name: user.name,

      players: {
        ...allUserData,
      },
    });
  } catch (err) {
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
