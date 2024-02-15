const express = require('express');
const router = express.Router();
const createError = require('http-errors');

let tasks = [{title: 'John Doe', description: 'Teaching science'}];

router.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

router.get('/api/task/:id', (req, res, next) => {
    const task = tasks.find(
        (task, index) => String(index+1) === String(req.params.id)
        );

    if (!task) {
        return next(createError(404, 'Not Found'));
      }
    
      res.json(task);
});

router.post('/api/addtask', (req, res, next) => {
    const {title, description} = req.body;
    if(typeof title !== 'string' || typeof description !== 'string') {
        return next(createError(400, 'Validation Error'));
    }
    const newTask = {
        title,
        description
    }
    tasks.push(newTask);
    res.status(201).json(newTask);
})

router.put('/api/update/:id', (req, res, next) => {
    const {title, description} = req.body;
    if(typeof title !== 'string' || typeof description !== 'string' ) {
        return next(createError(400, 'Validation Error'));
    }
    const task = tasks.find(
        (task, index) => String(index+1) === String(req.params.id)
        );

    if (!task) {
        return next(createError(404, 'Not Found'));
      }

    const newTask = {
        title,
        description
    }
    tasks[req.params.id - 1] = newTask;
    res.status(201).json(newTask);
})

router.delete('/api/delete/:id', (req, res) => {
    tasks = tasks.filter((item, index) => (req.params.id - 1) !== index)
    res.json("Item Removed Successfully.");
});

module.exports = router;
