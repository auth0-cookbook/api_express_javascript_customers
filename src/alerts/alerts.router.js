const express = require("express");
const { checkJwt } = require("../authz/check-jwt");
const { findAlertsById } = require("./alerts.service");

const alertsRouter = express.Router();

alertsRouter.use(checkJwt);

// GET /api/customers/alerts/:id

alertsRouter.get("/:id", async (request, response) => {
  const id = request.params.id;

  const alertsRecord = findAlertsById(id);

  if (alertsRecord === undefined) {
    response.sendStatus(404);
    return;
  }

  response.json(alertsRecord);
});

module.exports = { alertsRouter };
