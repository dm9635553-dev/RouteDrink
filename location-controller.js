const express = require("express");
const router = express.Router();

const locationDao = require("../dao/location-dao");

router.get("/list", (req, res) => {
  const locations = locationDao.list();

  res.json({
    itemList: locations,
  });
});

router.get("/get/:id", (req, res) => {
  const location = locationDao.get(req.params.id);

  if (!location) {
    return res.status(404).json({
      error: "locationNotFound",
      message: "Location was not found.",
    });
  }

  res.json(location);
});

router.post("/create", (req, res) => {
  const location = req.body;

  if (!location.id || !location.name || !location.drinkOffer) {
    return res.status(400).json({
      error: "dtoInIsNotValid",
      message: "Location id, name and drinkOffer are required.",
    });
  }

  const existingLocation = locationDao.get(location.id);

  if (existingLocation) {
    return res.status(400).json({
      error: "locationAlreadyExists",
      message: "Location with this id already exists.",
    });
  }

  const createdLocation = locationDao.create(location);

  res.json(createdLocation);
});

router.post("/update", (req, res) => {
  const location = req.body;

  if (!location.id) {
    return res.status(400).json({
      error: "dtoInIsNotValid",
      message: "Location id is required.",
    });
  }

  const updatedLocation = locationDao.update(location);

  if (!updatedLocation) {
    return res.status(404).json({
      error: "locationNotFound",
      message: "Location was not found.",
    });
  }

  res.json(updatedLocation);
});

router.post("/delete", (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      error: "dtoInIsNotValid",
      message: "Location id is required.",
    });
  }

  const removed = locationDao.remove(id);

  if (!removed) {
    return res.status(404).json({
      error: "locationNotFound",
      message: "Location was not found.",
    });
  }

  res.json({
    message: "Location was deleted.",
  });
});

module.exports = router;