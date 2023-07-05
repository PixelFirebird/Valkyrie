const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const TaskSchema = mongoose.Schema({
  name: String,
  description: String
}, {
  timestamps: true
});

const Task = mongoose.model('Task', TaskSchema);

// Create new task
app.post('/tasks', (req, res) => {
  const task = new Task({
    name: req.body.name,
    description: req.body.description
  });

  task.save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Task."
      });
    });
});

// Retrieve all tasks
app.get('/tasks', (req, res) => {
  Task.find()
    .then(tasks => {
      res.send(tasks);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tasks."
      });
    });
});

// Retrieve a single task with taskId
app.get('/tasks/:taskId', (req, res) => {
  Task.findById(req.params.taskId)
    .then(task => {
      if (!task) {
        return res.status(404).send({
          message: "Task not found with id " + req.params.taskId
        });
      }
      res.send(task);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Task not found with id " + req.params.taskId
        });
      }
      return res.status(500).send({
        message: "Error retrieving task with id " + req.params.taskId
      });
    });
});

// Update a task with taskId
app.put('/tasks/:taskId', (req, res) => {
  Task.findByIdAndUpdate(req.params.taskId, {
    name: req.body.name,
    description: req.body.description
  }, { new: true })
    .then(task => {
      if (!task) {
        return res.status(404).send({
          message: "Task not found with id " + req.params.taskId
        });
      }
      res.send(task);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Task not found with id " + req.params.taskId
        });
      }
      return res.status(500).send({
        message: "Error updating task with id " + req.params.taskId
      });
    });
});

// Delete a task with taskId
app.delete('/tasks/:taskId', (req, res) => {
  Task.findByIdAndRemove(req.params.taskId)
    .then(task => {
      if (!task) {
        return res.status(404).send({
          message: "Task not found with id " + req.params.taskId
        });
      }
      res.send({ message: "Task deleted successfully!" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "Task not found with id " + req.params.taskId
        });
      }
      return res.status(500).send({
        message: "Could not delete task with id " + req.params.taskId
      });
    });
});

mongoose.connect('mongodb://localhost:27017/taskdb', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once('open', function () {
  console.log("Connected to MongoDB successfully!");
});

app.listen(8090, function () {
  console.log("Server is running on port 8090");
});
