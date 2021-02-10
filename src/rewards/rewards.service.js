const { db, rewardsCollection } = require("../data/db");

const findRewardsById = (id) => db.get(rewardsCollection).find({ id }).value();

module.exports = {
  findRewardsById,
};
