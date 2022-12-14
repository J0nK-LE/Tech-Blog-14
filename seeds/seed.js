const sequelize = require('../config/connection');
const { User, Comment, Child } = require('../models');

const userData = require('./userData.json');
const commentData = require('./commentData.json');
const childData = require('./childData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  const child = await Child.bulkCreate(childData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
