const { Router } = require("express");

const cartRouter = Router();

const carts = [];

cartRouter.post("/", async (req, res) => {
  const cart = {
    id: cart.products.length,
    products: [],
  };

  carts.push(cart);

  if (req.body) {
    res.status(500).send({ error: "uso incorrecto" });
  }
  return res.status(201).json(carts);
});

cartRouter.get("/:cid", async (req, res) => {
  const cid = parseInt(req.params.cid, 10);
  const cart = carts.map(cid === carts.id);
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {});

module.exports = cartRouter;
