const express = require("express");
const {
  getAllTask,
  deleteTask,
  updateTask,
  getTask,
  createTask,
} = require("../controllers/task");
const router = express.Router();

router.route("/").get(getAllTask).post(createTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
