const dotEnv = require("dotenv");
dotEnv.config();

const express = require("express");

const app = express();

app.use(express.json()); //read the body dat   in json formate

app.use((req, res, next) => {
  console.log("----------");
  console.log(new Date(), req.method, req.url);
  console.log("---------");
  next();
});

app.get("/", (req, res) => {
  res.json({
    isSuccess: true,
    message: "Server is Stated",
    data: {},
  });
});

app.use((req, res, next) => {
  console.log("---!!!!---");
  next();
});

app.listen(2900, () => {
  console.log("----server is running----");
});
