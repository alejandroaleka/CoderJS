const { Router } = require("express");

const cartRouter = Router();

const cart = [];

cartRouter.post("/", async (req, res) => {
  const prod = req.body;

  return res.status(201).json(prod);
});

module.exports = cartRouter;
