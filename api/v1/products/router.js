const express = require("express");

const {
  createProductController,
  getAllProducts,
  updateProductContriller,
  deleteProductController,
} = require("./controllers.js");
const productRouter = express.Router();

productRouter.get("/", getAllProducts);

productRouter.post("/", createProductController);

productRouter.patch("/:productId", updateProductContriller);

productRouter.delete("/:productId", deleteProductController);

module.exports = { productRouter };
