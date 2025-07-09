const { Product } = require("../../../models/product_schema.js");

// const createProductController = async (req, res) => {
//   // console.log("Creating product.......");
//   // console.log(req.body);

//   try {
//     const data = req.body;
//     console.log("creating Product...", data);
//     let newproduct = null;
//     try {
//       newproduct = await Product.create(data);
//     } catch (err) {
//       console.log("Error while creating product...");
//       res.status(400);
//       res.json({
//         isSuccess: false,
//         message: `Err ${err.message}`,
//         data: {},
//       });
//       return;
//     }
//     res.status(201);
//     res.json({
//       isSuccess: true,
//       message: "Product Created...",
//       data: {
//         product: newproduct,
//       },
//     });
//   } catch (err) {
//     console.log("Error in createProductController");
//     res.status(501);
//     res.json({
//       isSuccess: false,
//       message: "Internal Server error",
//       data: {},
//     });
//   }
// };
// module.exports = { createProductController };

// --------------------------------------------------------------

const createProductController = async (req, res) => {
  try {
    const data = req.body;
    console.log("creating product...", data);

    Object.keys(data).forEach((key) => {
      if (key == null || key == "") {
        delete data.key;
      }
    });

    let newProduct = await Product.create(data);
    res.status(201).json({
      isSuccess: true,
      message: `Product created`,
      data: {
        product: newProduct,
      },
    });
  } catch (err) {
    if (err.name === "ValidationError" || err.code == "11000") {
      res
        .status(400)
        .json({ isSuccess: false, message: `Err: ${err.message}`, data: {} });
    }
    console.log("🔴 Error in createProductController");
    res
      .status(501)
      .json({ isSuccess: false, message: "Internal Server Error", data: {} });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(201);
    res.json({
      isSuccess: true,
      message: "Product List fetched!",
      data: {
        products: allProducts,
      },
    });
  } catch (err) {
    console.log("Error in getAllProducts");
    res.status(501);
    res.json({
      isSuccess: false,
      message: "Internal Error",
      data: {},
    });
  }
};

const updateProductContriller = async (req, res) => {
  try {
    const { productId } = req.params;
    const newData = req.body;

    const newProduct = await Product.findByIdAndUpdate(productId, newData, {
      new: true,
      runValidation: true,
    });

    if (newProduct == null) {
      res.status(400);
      res.json({
        isSuccess: false,
        message: "Invalid product Id",
        data: {},
      });
    }

    res.status(200);
    res.json({
      isSuccess: true,
      message: "Product update",
      data: {
        product: newProduct,
      },
    });
  } catch (err) {
    console.log("Error in updateProductController", err.message);
    res.status(500);
    res.json({
      isSuccess: false,
      message: "Internal Error",
      data: {},
    });
  }
};

const deleteProductController = async (req, res) => {
  const { productId } = req.params;

  const newProduct = await Product.findByIdAndDelete(productId);

  try {
    res.status(204);
    res.json({
      isSuccess: true,
      message: "Product is delected ",
      data: {
        product: newProduct,
      },
    });
  } catch (err) {
    res.status(404);
    res.json({
      isSuccess: false,
      message: "Error Invalid",
      data: {},
    });
  }
};

module.exports = {
  createProductController,
  getAllProducts,
  updateProductContriller,
  deleteProductController,
};
