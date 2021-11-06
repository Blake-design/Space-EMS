const router = require('express').Router();
const { parse } = require('dotenv');
const { Score, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all scores and JOIN with user data
    const scoreData = await Score.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const score = scoreData.map((score) => score.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      score,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/score/:id', async (req, res) => {
//   try {
//     const scoreData = await Score.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const score = scoreData.get({ plain: true });

//     res.render('Score', {
//       ...score,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Score }],
    });

    // const scoreData = await Score.findAll({
    //   raw: true,
    // });

    const allUserData = await User.findAll({
      attributes: { exclude: ['password', 'email'] },
      include: [{ model: Score }],
      raw: true,
    });

    var cleanData = JSON.parse(JSON.stringify(allUserData));
    // console.log(allUserData);
    const user = userData.get({ plain: true });
    // console.log(user);
    const data = {
      leaderboardnumber: user.id,
      // name: user.name,
      score: user[Score.user_hiScore],

      // ['Score.id','Score.user_hiScore':]
      logged_in: true,
    };

    //

    console.log('this is our data', cleanData);
    res.render('dashboard', {
      name: user.name,
      // data,

      scores: {
        ...cleanData,
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
