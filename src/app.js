const express = require("express");
const ProductManager = require("./product/ProductManager");
const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
const manager = new ProductManager("./product/products.json");

app.get("/products", async (req, res) => {
  const products = await manager.getProducts();
  const limit = req.query.limit;

  if (!limit) {
    console.log(products);
    return res.send(products);
  } else {
    const limitedProducts = products.slice(0, limit);
    console.log(limitedProducts);
    return res.send(limitedProducts);
  }
});

app.get("/products/:pid", async (req, res) => {
  const products = await manager.getProducts();
  const pid = req.params.pid;
  const product = products.find((p) => p.id === pid);

  if (!product) {
    return res
      .status(404)
      .send("No se encontro un producto con la información provista");
  }
  console.log(product);
  return res.send(product);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
