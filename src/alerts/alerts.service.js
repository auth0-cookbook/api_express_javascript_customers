const { db, alertsCollection } = require("../data/db");

const findAlertsById = (id) => db.get(alertsCollection).find({ id }).value();

module.exports = {
  findAlertsById,
};
