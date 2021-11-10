const router = require('express').Router();
const { Score } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
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
router.put('/', (req, res) => {
  console.log(req.body.hiScore);
  Score.update(
    {
      user_hiScore: req.body.hiScore,
    },
    {
      where: { user_id: req.session.user_id },
    }
  )
    .then((updateScore) => {
      res.json(updateScore);
    })

    .catch((err) => res.json(err));
});

module.exports = router;
