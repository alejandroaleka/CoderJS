const express = require("express");
const ProductManager = require("./product/ProductManager");
const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
const manager = new ProductManager("./src/product/products.json");

app.get("/products", async (req, res) => {
  const products = await manager.getProducts();
  const limit = req.query.limit;

  if (!limit) {
    return res.send(products);
  } else {
    const limitedProducts = products.slice(0, limit);
    return res.send(limitedProducts);
  }
});

app.get("/products/:pid", async (req, res) => {
  const pid = parseInt(req.params.pid, 10);
  const prod = await manager.getProductById(pid);
  console.log(prod);
  if (!prod) {
    return res
      .status(404)
      .send("No se encontro un producto con la información provista");
  }
  console.log(prod);
  return res.send(prod);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
