const { getDb } = require("../config/mongo")
const User = require("../models/user")

class UserController {
    static async getAll(req, res, next) {
        try {
            const users = await User.findAll()
            res.status(200).json({users})
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async getById(req, res, next) {
        try {
            const {id} = req.params
            const user = await User.findById(id)
            res.status(200).json(user)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async create(req, res, next) {
        try {
            const {username, email, password, role, phoneNumber, address} = req.body
            const user = await User.create({username, email, password, role, phoneNumber, address})
            res.status(201).json({user})
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async destroy(req, res, next) {
        try {
            const {id} = req.params
            const user = await User.destroy(id)
            res.status(200).json({user})

        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async update(req, res, next) {
        try {
            const {id} = req.params
            const {username, email, password, role, phoneNumber, address} = req.body
            const user = await User.update(id, {username, email, password, role, phoneNumber, address} )
            res.status(200).json({user})

        } catch (error) {
            console.log(error)
            next(error)
        }
    }

}

module.exports = UserController