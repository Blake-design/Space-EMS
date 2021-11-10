const router = require('express').Router();
const { Score } = require('../../models');
const withAuth = require('../../utils/auth');

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
