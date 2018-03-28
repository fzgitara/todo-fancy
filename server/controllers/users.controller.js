const {User} = require('../models/users')

module.exports = {
    getAllUser (req, res) {
        User.find()
        .exec()
        .then(users => {
            res.status(200).json({
                message: 'List User',
                users
            })
        })
    },
    addUser (req, res) {
        const {username, email, password} = req.body
        const user = new User()
        user.username = username
        user.email = email
        user.password = password
        user.save()
        .then(userData => {
            res.status(201).json({
                message: 'New User added',
                userData
            })
        })
        .catch(err => {
            res.status(400).json({
                message: 'Failed add new User',
                err
            })
        })
    },
    editUser (req, res) {
        User.findOneAndUpdate({_id : req.params._id}, {$set: req.body}, {upsert: true}, (err, r) => {
            if(err){
                res.status(400).json({
                    message: 'Edit failed',
                    err
                })
            } else {
                res.status(200).json({
                    message: 'Edit successfull',
                    data: req.body
                })
            }
        })
    },
    deleteUser (req, res) {
        User.remove({_id : req.params._id}, (err, r) => {
            if(err){
                res.status(400).json({
                    message: 'Delete failed',
                    err
                })
            } else {
                res.status(200).json({
                    message: 'Delete successfull'
                })
            }
        })
    }
}