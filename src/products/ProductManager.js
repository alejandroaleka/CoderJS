const fs = require("fs");
const file = "./products.json";

class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  async addProduct(data) {
    if (
      !data.title ||
      !data.description ||
      !data.price ||
      !data.thumbnail ||
      !data.code ||
      !data.stock ||
      !(typeof data.status == "boolean")
    ) {
      return "Error: Todos los campos son obligatorios";
    }

    const currentProducts = await this.getProducts(this.path);

    const productExistence = currentProducts.findIndex(
      (product) => product.code === data.code
    );

    if (productExistence !== -1) {
      console.log("El código de producto ya fue utilizado.");
      return "El código de producto ya fue utilizado.";
    } else {
      const product = {
        id: currentProducts.length + 1,
        title: data.title,
        description: data.description,
        price: data.price,
        thumbnail: data.thumbnail,
        code: data.code,
        stock: data.stock,
        status: data.status,
      };

      currentProducts.push(product);

      const productsString = JSON.stringify(currentProducts, null, 2);

      fs.promises
        .writeFile(this.path, productsString, "utf-8")
        .then(() => {
          console.log("Se almacena la información recibida");
        })
        .catch((err) => {
          console.log({ err });
        });
    }
  }

  async getProducts() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      if (!data) {
        throw new Error("El archivo JSON está vacío");
      }
      const json = JSON.parse(data.replace(/\n/g, ""));
      return json;
    } catch (error) {
      console.error(error);
    }
  }

  async getProductById(id) {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      if (!data) {
        throw new Error("El archivo JSON está vacío");
      }
      const json = JSON.parse(data.replace(/\n/g, ""));
      const product = json.find((product) => product.id === id);
      if (!product) {
        throw new Error(`No se encontró ningún producto con el id ${id}`);
      }
      return product;
    } catch (error) {
      console.error(error);
    }
  }

  async updateProduct(id, data) {
    try {
      const products = await this.getProducts();
      const index = products.findIndex((product) => product.id === id);
      if (index === -1) {
        throw new Error(`No se encontró ningún producto con el id ${id}`);
      }
      const product = products[index];
      const updatedProduct = { ...product, ...data, id };
      products.splice(index, 1, updatedProduct);
      const productsString = JSON.stringify(products, null, 2);
      await fs.promises.writeFile(this.path, productsString, "utf-8");
      console.log("Producto actualizado correctamente");
    } catch (error) {
      console.error(error);
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProducts();
      const index = products.findIndex((product) => product.id === id);
      if (index === -1) {
        throw new Error(`No se encontró ningún producto con el id ${id}`);
      }
      products.splice(index, 1);
      const productsString = JSON.stringify(products, null, 2);
      await fs.promises.writeFile(this.path, productsString, "utf-8");
      console.log("Producto eliminado correctamente");
    } catch (error) {
      console.error(error);
    }
  }
}

//const manager = new ProductManager(file);

module.exports = ProductManager;

/* const body = {
  title: "Ryzen 5800X3D",
  description: "AMD CPU",
  price: 399,
  thumbnail: "https://cdn.videocardz.com/1/2022/04/AMD-5800X3D-1-768x577.jpg",
  code: "BCDEF",
  stock: 25,
};

const body2 = {
  title: "NVIDIA 4070TI",
  description: "NVIDIA GPU",
  price: 1400,
  thumbnail:
    "https://dlcdnwebimgs.asus.com/gain/32d8b7ad-5b28-485b-b440-54813c57e4cb/w692",
  code: "AB221",
  stock: 10,
};

const body3 = {
  title: "test",
  description: "test",
  price: 1400,
  thumbnail:
    "https://dlcdnwebimgs.asus.com/gain/32d8b7ad-5b28-485b-b440-54813c57e4cb/w692",
  code: "AAA22",
  stock: 10,
};

const body4 = {
  title: "NVIDIA 4070",
  description: "NVIDIA",
  price: 1300,
  thumbnail:
    "https://dlcdnwebimgs.asus.com/gain/32d8b7ad-5b28-485b-b440-54813c57e4cb/w692",
  code: "AABB2",
  stock: 5,
};

manager.addProduct(body);
manager.addProduct(body2);
manager.addProduct(body3);

manager.getProductById(1);

manager.updateProduct(2, body4);

manager.deleteProduct(3);

manager.getProductById(3);
 */
