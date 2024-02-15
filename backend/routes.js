const express = require('express');
const router = express.Router();

const tasks = [];

router.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

module.exports = router;
