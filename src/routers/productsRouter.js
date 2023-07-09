const { Router } = require("express");

const productsRouter = Router();

const ProductManager = require("../products/ProductManager");

const manager = new ProductManager("./src/products/products.json");

productsRouter.get("/", async (req, res) => {
  const products = await manager.getProducts();
  const limit = req.query.limit;

  if (!limit) {
    return res.send(products);
  } else {
    const limitedProducts = products.slice(0, limit);
    return res.status(200).json(limitedProducts);
  }
});

productsRouter.get("/:pid", async (req, res) => {
  const pid = parseInt(req.params.pid, 10);
  const prod = await manager.getProductById(pid);

  if (!prod) {
    return res
      .status(404)
      .send("No se encontro un producto con la información provista");
  }
  //console.log(prod);
  return res.status(200).json(prod);
});

productsRouter.post("/", async (req, res) => {
  const prod = req.body;

  manager.addProduct(prod);

  return res.status(201).json(prod);
});

productsRouter.put("/:pid", async (req, res) => {
  const pid = parseInt(req.params.pid, 10);
  const prod = req.body;

  manager.updateProduct(pid, prod);

  if (!pid || !prod) {
    return res
      .status(500)
      .send("Input insuficiente, por favor, verifique el id y el body");
  }
  return res.status(200).json(prod);
});

productsRouter.delete("/:pid", async (req, res) => {
  const pid = parseInt(req.params.pid, 10);

  manager.deleteProduct(pid);

  if (!pid) {
    return res.status(500).send("Por favor, verifique el id enviado");
  }
  return res.status(200).json(prod);
});

module.exports = productsRouter;
