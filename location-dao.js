const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../storage/locations.json");

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
  return readData().find((location) => location.id === id);
}

function create(location) {
  const locations = readData();
  locations.push(location);
  writeData(locations);
  return location;
}

function update(location) {
  const locations = readData();
  const index = locations.findIndex((item) => item.id === location.id);

  if (index === -1) return null;

  locations[index] = location;
  writeData(locations);
  return location;
}

function remove(id) {
  const locations = readData();
  const filteredLocations = locations.filter((location) => location.id !== id);

  if (locations.length === filteredLocations.length) return false;

  writeData(filteredLocations);
  return true;
}

module.exports = {
  list,
  get,
  create,
  update,
  remove,
};