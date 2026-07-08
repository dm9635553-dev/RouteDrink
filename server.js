const express = require("express");

const app = express();

app.use(express.json());
app.use(express.static("public"));

const locationController = require("./controllers/location-controller");
const orderController = require("./controllers/order-controller");

app.get("/", (req, res) => {
  res.send("RouteDrink backend works!");
});

app.use("/location", locationController);
app.use("/order", orderController);
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
