const {Task} = require('../models/task')
const jwt = require('jsonwebtoken')

module.exports = {
  addTask: function (req, res) {
    const token = req.body.token
    const decoded = jwt.verify(token, process.env.SECRET)
    const task = new Task ()
    task.owner = decoded._id
    task.taskName = req.body.taskName
    task.date = req.body.date
    task.place = req.body.place
    task.done = req.body.done
    task.save()
    .then(data => {
      res.status(201).json({
        message: 'Task Create',
        data
      })
    })
    .catch(err => {
      console.log(err)
    })
  },
  getAllTask: function (req, res) {
    let token = req.headers.token
    let decoded = jwt.verify(token, process.env.SECRET)
    Task.find({owner: decoded._id})
    .then(task => {
      res.status(200).json({
        message: 'List All Task',
        task
      })
    })
    .catch(err => {
      console.log(err)
    })
  },
  deleteTask: function (req, res) {
    Task.remove({_id: req.headers.id})
    .then(task => {
      res.status(201).json({
        message: 'Task Deleted'
      })
    })
  },
  toggleDone: function (req, res) {
    Task.findOne({_id: req.headers.id})
    .then(data => {
      res.status(201).json({
        message: 'This Task',
        data
      })
      if (data) {
        data.done = !data.done
        Task.update({
          _id: req.headers.id
        }, {
          $set: {done: data.done}
        }).then(() => {
          res.status(200).json({
            message: 'This Task is Done',
          })
        }).catch(err => {
          res.status(500).json({
            message: 'error bos'
          })
        })
      }
    })
  }
}