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

module.exports = router;
