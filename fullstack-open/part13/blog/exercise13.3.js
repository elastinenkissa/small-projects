require('dotenv').config();
const { Sequelize, QueryTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const select = async () => {
  try {
    await sequelize.authenticate()
    const result = await sequelize.query('SELECT * FROM blogs', {
      type: QueryTypes.query,
    });
    console.log(result[0]);
    sequelize.close()
  } catch (error) {
    console.log(error);
    sequelize.close()
  }
};

select()