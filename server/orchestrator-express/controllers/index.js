const axios = require("axios")
const redis = require("../config")
const BASE_URL_ITEM = "http://localhost:4002"
const BASE_URL_USER = "http://localhost:4001"

class Controller {
    static async getAllMenu(req, res, next) {
        try {
            const menusCache = await redis.get("menus")
            if(menusCache) {
                const menusParsed = JSON.parse(menusCache)
                return res.status(200).json(menusParsed)
            }
            const { data } = await axios.get(BASE_URL_ITEM + "/menus")
            await redis.set("menus", JSON.stringify(data))
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async getAllCategories(req, res, next) {
        try {
            const categoriesCache = await redis.get("categories")
            if(categoriesCache) {
                const categoriesParsed = JSON.parse(categoriesCache)
                return res.status(200).json(categoriesParsed)
            }
            const { data } = await axios.get(BASE_URL_ITEM + "/categories")
            await redis.set("categories", JSON.stringify(data))
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async getDetailMenu(req, res, next) {
        try {
            const { id } = req.params
            const { data } = await axios.get(BASE_URL_ITEM + "/menus/" + id)
            const user = await axios.get(BASE_URL_USER + "/users/" + data.mongoId)

            res.status(200).json({
                ...data,
                username: user.data.username,
                email: user.data.email
            })
        } catch (error) {
            next(error)
        }
    }

    static async addMenu(req, res, next) {
        try {
            const { name, description, price, imgUrl, categoryId, ingredients } = req.body
            const { data } = await axios(BASE_URL_ITEM + "/menus", {
                method: "POST",
                data: { name, description, price, imgUrl, categoryId, ingredients }
            }
            )
            await redis.del("menus")
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async getUser(req, res, next) {
        try {
            const { id } = req.params
            const { data } = await axios.get(BASE_URL_USER + "/users/" + id)
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async addUser(req, res, next) {
        try {
            const { username, email, password, role, phoneNumber, address } = req.body
            const { data } = await axios.post(BASE_URL_USER + "/users", { username, email, password, role, phoneNumber, address })
            await redis.del("users")
            res.status(201).json({ msg: "success add user" })
        } catch (error) {
            next(error)
        }
    }

    static async destroyUser(req, res, next) {
        try {
            const { id } = req.params
            const { data } = await axios.delete(BASE_URL_USER + "/users/" + id)
            await redis.del("users")
            res.status(200).json({msg: "success delete user"})
        } catch (error) {
            console.log(error)
        }
    }

    static async getAllUser(req, res, next) {
        try {
            const usersCache = await redis.get("users")
            if(usersCache) {
                const usersParsed = JSON.parse(usersCache)
                return res.status(200).json(usersParsed)
            }
            const { data } = await axios.get(BASE_URL_USER + "/users")
            await redis.set("users", JSON.stringify(data))
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
        }
    }

    static async updateMenu(req, res, next) {
        try {
            const {id} = req.params
            const {name, description, price, imgUrl, categoryId, ingredients} = req.body
            const {data} = await axios.put(BASE_URL_ITEM + "/menus/" + id, {name, description, price, imgUrl, categoryId, ingredients})
            await redis.del("menus")
            res.status(200).json({msg: "success edit menu", data})
        } catch (error) {
            next(error)
        }
    }

    static async destroyMenu(req, res, next) {
        try {
            const {id} = req.params
            const {data} = await axios.delete(BASE_URL_ITEM + "/menus/" + id) 
            await redis.del("menus")
            res.status(200).json({msg: "success delete menu"})
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Controller