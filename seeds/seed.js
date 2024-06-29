const sequelize = require('../config/connection');
const { User, Password } = require('../models');

const userData = require('./userData.json');
const passwordData = require('./passwordData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const password of passwordData) {
    await Password.create({
      ...password,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
