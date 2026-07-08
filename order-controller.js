const express = require("express");
const router = express.Router();

const orderDao = require("../dao/order-dao");

router.get("/list", (req, res) => {
  const orders = orderDao.list();

  res.json({
    itemList: orders,
  });
});

router.get("/get/:id", (req, res) => {
  const order = orderDao.get(req.params.id);

  if (!order) {
    return res.status(404).json({
      error: "orderNotFound",
      message: "Order was not found.",
    });
  }

  res.json(order);
});

router.post("/create", (req, res) => {
  const order = req.body;

if (
  !order.id ||
  !order.customerName ||
  !order.locationId ||
  !order.pickupDate ||
  !order.pickupTime
) {
  return res.status(400).json({
    error: "dtoInIsNotValid",
    message:
      "Order id, customerName, locationId, pickupDate and pickupTime are required.",
  });
}

  const existingOrder = orderDao.get(order.id);

  if (existingOrder) {
    return res.status(400).json({
      error: "orderAlreadyExists",
      message: "Order with this id already exists.",
    });
  }

  const createdOrder = orderDao.create(order);

  res.json(createdOrder);
});

router.post("/update", (req, res) => {
  const order = req.body;

  if (!order.id) {
    return res.status(400).json({
      error: "dtoInIsNotValid",
      message: "Order id is required.",
    });
  }

  const updatedOrder = orderDao.update(order);

  if (!updatedOrder) {
    return res.status(404).json({
      error: "orderNotFound",
      message: "Order was not found.",
    });
  }

  res.json(updatedOrder);
});

router.post("/delete", (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      error: "dtoInIsNotValid",
      message: "Order id is required.",
    });
  }

  const removed = orderDao.remove(id);

  if (!removed) {
    return res.status(404).json({
      error: "orderNotFound",
      message: "Order was not found.",
    });
  }

  res.json({
    message: "Order was deleted.",
  });
});

module.exports = router;