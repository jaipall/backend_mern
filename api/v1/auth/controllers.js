const { UserModel } = require("../../../models/user_schema");

const userRegistrationController = async (req, res) => {
  const data = req.body;
  if (!data.email || !data.password) {
    res.status(400).json({
      IsSuccess: false,
      message: "Email & Password is reuired",
      data: {},
    });
    return;
  }

  const newUser = await UserModel.create(data);
  console.log("=>", newUser._doc);
  //   delete newUser.password;
  const { password, ...safeData } = newUser._doc;
  console.log("-->", safeData);

  res.status(201);
  res.json({
    isSuccess: true,
    message: "User Create",
    data: {
      user: safeData,
    },
  });
};

const userLoginController = async (req, res) => {
  //to be continoued
};

module.exports = { userRegistrationController, userLoginController };
