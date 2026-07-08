const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../storage/orders.json");

function readData() {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function list() {
  return readData();
}

function get(id) {
  return readData().find((order) => order.id === id);
}

function create(order) {
  const orders = readData();
  orders.push(order);
  writeData(orders);
  return order;
}

function update(order) {
  const orders = readData();
  const index = orders.findIndex((item) => item.id === order.id);

  if (index === -1) return null;

  orders[index] = order;
  writeData(orders);

  return order;
}

function remove(id) {
  const orders = readData();

  const filteredOrders = orders.filter(
    (order) => order.id !== id
  );

  if (orders.length === filteredOrders.length) {
    return false;
  }

  writeData(filteredOrders);

  return true;
}

module.exports = {
  list,
  get,
  create,
  update,
  remove,
};