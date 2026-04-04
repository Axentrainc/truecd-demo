const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let tasks = [
  { id: 1, title: 'Review TrueCD pipeline', completed: false },
  { id: 2, title: 'Set up Azure DevOps', completed: false },
  { id: 3, title: 'Deploy to production', completed: false }
];

app.get('/', (req, res) => {
  res.json({ 
    message: 'TrueCD Task Manager', 
    tasks: tasks 
  });
});

app.post('/tasks', (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false
  };
  tasks.push(newTask);
  res.json({ message: 'Task added', task: newTask });
});

app.put('/tasks/:id/complete', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (task) {
    task.completed = true;
    res.json({ message: 'Task completed', task: task });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

app.listen(PORT, () => {
  console.log(`TrueCD Task Manager running on port ${PORT}`);
});

module.exports = app;