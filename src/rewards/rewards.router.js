const express = require("express");
const { checkJwt } = require("../authz/check-jwt");

const { findRewardsById } = require("./rewards.service");

const rewardsRouter = express.Router();

rewardsRouter.use(checkJwt);

// GET /api/customers/rewards/:id

rewardsRouter.get("/:id", async (request, response) => {
  const id = request.params.id;

  const rewardsRecord = findRewardsById(id);

  if (rewardsRecord === undefined) {
    response.sendStatus(404);
    return;
  }

  response.json(rewardsRecord);
});

module.exports = { rewardsRouter };
