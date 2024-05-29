const { ObjectId } = require("mongodb");
const { getDb } = require("../config/mongo");
const bcrypt = require("bcryptjs")

class User {
    static async getCollection() {
        const collection = getDb().collection("Users")
        return collection
    }
    static async findAll() {
        try {
            const collection = await this.getCollection()
            const users = await collection.find().toArray()
            return users
        } catch (error) {
            throw error
        }
    }

    static async findById(id) {
        try {
            const collection = await this.getCollection()
            const user = await collection.findOne({
                _id: new ObjectId(id)
            })
            return user
        } catch (error) {
            throw error
        }
    }

    static async create(object) {
        try {
            const collection = await this.getCollection()
            const hashedPassword = await bcrypt.hash(object.password, 10)

            const objectInsert = {
                ...object,
                password: hashedPassword,
            };

            const user = await collection.insertOne(objectInsert)
            return user
        } catch (error) {
            throw error
        }
    }

    static async destroy(id) {
        try {
            const collection = await this.getCollection()
            const user = await collection.deleteOne({
                _id: new ObjectId(id)
            })
            return user
        } catch (error) {
            throw error
        }
    }

    static async update(id, obj) {
        try {
            const collection = await this.getCollection()
            const user = await collection.updateOne({
                _id: new ObjectId(id)
            }, { $set: obj })
            return user
        } catch (error) {
            throw error
        }
    }

}

module.exports = User