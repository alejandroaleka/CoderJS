class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(data) {
    if (
      data.title == ("" || null) ||
      data.description == ("" || null) ||
      data.price == ("" || null) ||
      data.thumbnail == ("" || null) ||
      data.code == ("" || null) ||
      data.stock == ("" || null)
    ) {
      return "Todos los campos son obligatorios";
    }

    const productExistence = this.products.findIndex(
      (product) => product.code === data.code
    );

    if (productExistence !== -1) {
      console.log("El código de producto ya fue utilizado.");
      return "El código de producto ya fue utilizado.";
    }

    const product = {
      id: this.products.length + 1,
      title: data.title,
      description: data.description,
      price: data.price,
      thumbnail: data.thumbnail,
      code: data.code,
      stock: data.stock,
    };

    this.products.push(product);

    return product;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const productExistence = this.products.find((product) => product.id === id);

    if (!productExistence) {
      const error = "Product Not Found";
      console.log(error);
      return error;
    }
    return productExistence;
  }
}

const manager = new ProductManager();

const body = {
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
  code: "BCDEF",
  stock: 10,
};

manager.addProduct(body);

manager.addProduct(body2);

console.log(manager.getProducts());

const prod1 = manager.getProductById(1);
const prod2 = manager.getProductById(2);
const prod3 = manager.getProductById(3);

console.log({
  prod1,
  prod2,
  prod3,
});
