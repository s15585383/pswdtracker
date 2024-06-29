const User = require('./User');
const Password = require('./Password');

User.hasMany(Password, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Password.belongsTo(User, {
  foreignKey: 'userId',
});

module.exports = { User, Password };
