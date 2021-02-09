const { Task, sequelize } = require("../db/models");
const db = require("../db/models");
const queryInterface = db.sequelize.getQueryInterface();
const { Op } = require("sequelize");

exports.list = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      const tasks = await Task.findAll({
        order: [
          ["date", "ASC"],
          ["name", "ASC"],
        ],
        attributes: ["id", "name", "image"],
      });
      res.json(tasks);
    } else {
      const tasks = await Task.findAll({
        where: { date: { [Op.gt]: req.body.date } },
        order: [
          ["date", "ASC"],
          ["name", "ASC"],
        ],
        attributes: ["id", "name", "image"],
      });
      res.json(tasks);
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

//create
exports.createEvent = async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      const newTask = await Task.bulkCreate(req.body);
      res.json(newTask);
      res.status(201);
      //res.end();
    } else {
      const newTask = await Task.create(req.body);
      res.json(newTask);
      res.status(201);
    }
  } catch (error) {
    res.status(500);
    res.json({ message: error.message });
  }
};

//delete
exports.deleteEvent = async (req, res) => {
  const { taskId } = req.params;

  try {
    if (Array.isArray(req.body)) {
      queryInterface.bulkDelete("Tasks", { id: { [Op.in]: req.body } }, {});
      res.status(204);
      res.end();
    } else {
      found = await Task.findByPk(taskId);
      if (found) {
        await found.destroy();
        res.json(found);
        res.status(204);
        res.end();
      } else {
        res.status(404);
        res.json("nothing to delete");
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//detail
exports.detailEvent = async (req, res) => {
  const { taskId } = req.params;
  try {
    found = await Task.findByPk(taskId);
    if (found) {
      res.json(found);
      res.status(204);
      res.end();
    } else {
      res.status(404);
      res.json("No event to show");
    }
  } catch (error) {
    res.status(500);
    res.json({ message: error.message });
  }
};

//update

exports.updateEvent = async (req, res) => {
  const { taskId } = req.params;
  try {
    found = await Task.findByPk(taskId);
    if (found) {
      found.update(req.body);
      res.status(204);
      res.end();
    } else {
      res.status(404);
      res.json("No event to update");
    }
  } catch (error) {
    res.status(500);
    res.json({ message: error.message });
  }
};
