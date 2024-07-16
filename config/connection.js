require('dotenv').config();
const express = require('express');
const { Sequelize } = require('sequelize');

const app = express();
// const port = process.env.PORT || 3000;

let sequelize;

if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    logging: false,
  });
}
// } else {
//   sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//       host: 'localhost',
//       dialect: 'postgres',
//       port: '5432',
//     }
//   );
// }

// sequelize
//   .sync()
//   .then(() => {
//     console.log('Database connected');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

// app.listen(port, () => {
//   console.log(`listening at http://localhost:${port}`);
// });

module.exports = sequelize;
