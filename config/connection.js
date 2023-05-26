const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// If the app is deployed on Heroku, use the JAWSDB_URL environment variable
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
    }
    // Otherwise, use the local database
    else {
      const sequelize = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USER,
            process.env.DB_PW,
            {
                host: process.env.DB_HOST,
                dialect: process.env.DB_DIALECT,
                port: 3306
            }
        );
    }
    module.exports = sequelize;