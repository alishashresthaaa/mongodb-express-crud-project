const Task = require("../models/tasks");
const asyncWrapper = require("../middlewares/async");
const { createCustomError } = require("../errors/customErrors");

// const getAllTasks = async (req, res) => {
//     try {
//         const tasks = await Task.find({})
//         res.status(200).json({tasks})
//     } catch (error) {
//         res.status(500).json({msg:error})
//     }
// }

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

// const createTask = async (req, res) => {
//     try {
//         const task = await Task.create(req.body)
//         res.status(201).json({task})
//     } catch (error) {
//         res.status(500).json({msg:error})
//     }
// }

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

// const getTask = async (req, res) => {
//   try {
//     const task = await Task.findOne({ _id: req.params.id });
//     // If id has correct syntax but not in the list, then custom error
//     if (!task)
//       return res
//         .status(404)
//         .json({ msg: `Task not found with id : ${req.params.id}` });
//     res.status(200).json({ task });
//   } catch (error) {
//     // If syntax of id is incorrect then error from the promise
//     res.status(500).json({ msg: error });
//   }
// };

const getTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOne({ _id: req.params.id });
  // If id has correct syntax but not in the list, then custom error
  if (!task)
    return next(
      createCustomError(`Task not found with id : ${req.params.id}`, 404)
    );
  res.status(200).json({ task });
});

// PUT - replace the existing resource
// PATCH - partially update

// const updateTask = async (req, res) => {
//   try {
//     const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!task)
//       return res
//         .status(404)
//         .json({ msg: `Task not found with id : ${req.params.id}` });
//     res.status(200).json({ task });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

const updateTask = asyncWrapper(async (req, res) => {
  const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task)
  return next(
    createCustomError(`Task not found with id : ${req.params.id}`, 404)
  );
  res.status(200).json({ task });
});

// const deleteTask = async (req, res) => {
//   try {
//     const task = await Task.findOneAndDelete({ _id: req.params.id });
//     if (!task)
//       return res
//         .status(404)
//         .json({ msg: `Task not found with id : ${req.params.id}` });
//     res.status(200).json({ task });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

const deleteTask = asyncWrapper(async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id });
  if (!task)
  return next(
    createCustomError(`Task not found with id : ${req.params.id}`, 404)
  );
  res.status(200).json({ task });
});

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
