const router = require('express').Router();
const { Password, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  console.log('Homepage');
  res.render('homepage', {
    logged_in: req.session.logged_in,
  });
});

router.get('/password/:id', async (req, res) => {
  try {
    const passwordData = await Password.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const password = passwordData.get({ plain: true });

    res.render('password', {
      ...password,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Password }],
    });

    const user = userData.get({ plain: true });
    console.log('PROFILE', user);
    res.render('profile', {
      ...user,
      logged_in: true,
      name: req.session.username,
      email: req.session.email,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile', {
      name: req.session.username,
      email: req.session.email,
    });
    return;
  }

  res.render('login');
});
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile', {
      name: req.session.username,
      email: req.session.email,
    });
    return;
  }

  res.render('register');
});
module.exports = router;
