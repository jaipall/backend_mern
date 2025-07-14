const { UserModel } = require("../../../models/user_schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  // console.log(req.body);
  const data = req.body;
  if (!data.email || !data.password) {
    res.status(400).json({
      isSuccess: false,
      message: "Email and password is required",
      data: {},
    });
    return;
  }

  const user = await UserModel.findOne({
    // find--> querySelectorAll , findOne--> querySelector
    email: data.email,
  });

  if (user == null) {
    res.status(400).json({
      isSuccess: false,
      message: "User doesn't exist Please register!",
      data: {},
    });
    return;
  }

  const hashedPassword = user.password;
  const isCorrect = await bcrypt.compare(data.password, hashedPassword);
  if (!isCorrect) {
    res.status(400).json({
      isSuccess: false,
      message: "Incorrect Password!",
      data: {},
    });
    return;
  }

  const token = jwt.sign(
    { _id: user._id, email: user.email },
    "my_jaysecretrdvudndn#kjdnnuehj"
  );
  res.cookie("authorisation", token, {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    secure: true,
    samesite: "strict",
  });
  res.status(200);
  res.json({
    isSuccess: true,
    message: "Login Successfully",
    data: {
      user: {
        email: user.email,
      },
    },
  });
};

module.exports = { userRegistrationController, userLoginController };
