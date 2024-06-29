const router = require('express').Router();
const userRoutes = require('./userRoutes');
const passwordRoutes = require('./passwordRoutes');

router.use('/users', userRoutes);
router.use('/passwords', passwordRoutes);

module.exports = router;
