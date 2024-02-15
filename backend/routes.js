const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const tasks = [{title: 'John Doe', description: 'Teaching science'}];

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

module.exports = router;
