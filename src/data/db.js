const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("./src/data/db.json", {
  defaultValue: { rewards: {}, alerts: {} },
});

const db = low(adapter);
const rewardsCollection = "rewards";
const alertsCollection = "alerts";

module.exports = { db, rewardsCollection, alertsCollection };
