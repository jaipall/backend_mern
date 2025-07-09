const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_DB_URL, {
    dbName: "day17", //in the pormise we have only one parametre
  })
  .then(() => {
    console.log("------DB connected---------");
  })
  .catch((err) => {
    console.log("-------DB connection Error-------");
    console.log(err.message);
    console.log("------  ----------  ------------");
  });
