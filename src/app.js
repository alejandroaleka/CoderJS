const express = require("express");

const productsRouter = require("./routers/productsRouter");
const cartRouter = require("./routers/cartRouter");

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* app.use("/static", express.static("public"));

app.use((req, res, next) => {
  console.log("Middleware a nivel aplicación");

  return next();
});

app.use((err, req, res, next) => {
  console.log("Middleware para manejo de errores");

  return next();
}); */

app.use("/api/products", productsRouter);

app.use("/api/carts", cartRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
