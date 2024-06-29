const router = require('express').Router();
const { Password } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  console.log('Create pass', req.body);
  try {
    const newPassword = await Password.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPassword);
  } catch (err) {
    console.log('Err', err);
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const passwordData = await Password.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!passwordData) {
      res.status(404).json({ message: 'No password found with this id!' });
      return;
    }

    res.status(200).json(passwordData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
