require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use(require("./Routes/login.js"));
app.use(require("./Routes/weather.js"));

app.use((req, res, next) => {
  res.status(404).json("Not found");
});

let port = process.env.PORT || 3000;
app.set("port", port);
app.listen(app.get("port"), () => {
  console.log(`server is running on port ${port}`);
});
