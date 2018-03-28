const express = require('express')
const router = express.Router()
const {addTask, getAllTask, toggleDone, deleteTask} = require('../controllers/task.controller')

router.get('/', getAllTask)
router.post('/', addTask)
router.get('/toggle', toggleDone)
router.delete('/delete', deleteTask)

module.exports = router