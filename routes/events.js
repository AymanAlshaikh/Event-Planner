const express = require("express");
const router = express.Router();

const {
  list,
  deleteEvent,
  updateEvent,
  detailEvent,
  createEvent,
} = require("../controllers/eventController");

//list
router.get("/tasks", list);

//create
router.post("/tasks", createEvent);

//delete
router.delete("/tasks/:taskId", deleteEvent);
router.delete("/tasks", deleteEvent);
//detail
router.get("/tasks/:taskId", detailEvent);

//update
router.put("/tasks/:taskId", updateEvent);
module.exports = router;
