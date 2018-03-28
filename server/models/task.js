const mongoose = require('mongoose');

const Schema = mongoose.Schema

const taskSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    taskName: String,
    date: Date,
    place: String,
    done: {
        type: Boolean,
        default: false
    }
})

const Task = mongoose.model('Task', taskSchema)

module.exports = {Task}