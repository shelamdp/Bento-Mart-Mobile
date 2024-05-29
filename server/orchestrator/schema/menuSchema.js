const axios = require('axios');
const redis = require('../config');
const BASE_URL_ITEM = 'http://app-services:4002';
const BASE_URL_USER = 'http://user-services:4001';

const typeDefs = `#graphql

type Menu {
        id: ID,
        name: String,
        description: String,
        price: Int,
        imgUrl: String,
        authorId: Int,
        categoryId: Int,
        mongoId: String,
        createdAt: String,
        updatedAt: String,
        Ingredients: [Ingredient]
}


type Ingredient {
        id: ID,
        name: String,
        itemId: Int,
        createdAt: String,
        updatedAt: String
}

type Category {
        id: ID,
        name:String,
        createdAt: String,
        updatedAt: String
}

type DetailMenu {
    id: ID,
    name: String,
    description: String,
    price: Int,
    imgUrl: String,
    authorId: Int,
    categoryId: Int,
    mongoId: String,
    Ingredients: [Ingredient],
    Category: Category,
    username: String,
    email: String
    createdAt: String,
    updatedAt: String
}


type Query {
    getAllMenus: [Menu]
    getAllCategories: [Category]
    getDetailMenu(id: ID): DetailMenu
}

type Mutation {
    addMenu( 
        name: String, 
        description: String, 
        price: Int, 
        imgUrl: String, 
        categoryId: Int, 
        ingredients: [String] 
    ): Menu

    updateMenu(
        id: ID
        name: String, 
        description: String, 
        price: Int, 
        imgUrl: String, 
        categoryId: Int, 
        ingredients: [String] 
    ): Menu

    destroyMenu(id: ID): Menu
}
`

const resolvers = {
    Query: {

        getAllMenus: async () => {
            try {
                const menusCache = await redis.get("menus");
                if (menusCache) {
                    const menusParsed = JSON.parse(menusCache);
                    // console.log(menusParsed)
                    return menusParsed
                }
                const { data } = await axios.get(BASE_URL_ITEM + "/menus");
                await redis.set("menus", JSON.stringify(data));
                // console.log(data)
                return data;
            } catch (error) {
                throw error;
            }
        },

        getAllCategories: async () => {
            try {
                const categoriesCache = await redis.get("categories")
                if (categoriesCache) {
                    const categoriesParsed = JSON.parse(categoriesCache)
                    // console.log(categoriesParsed)
                    return categoriesParsed
                }
                const { data } = await axios.get(BASE_URL_ITEM + "/categories")
                await redis.set("categories", JSON.stringify(data))
                // console.log(data)
                return data
            } catch (error) {
                throw (error)
            }
        },

        getDetailMenu: async (_, { id }) => {
            try {
                const { data } = await axios.get(BASE_URL_ITEM + "/menus/" + id)
                const user = await axios.get(BASE_URL_USER + "/users/" + data.mongoId)

                return ({
                    ...data,
                    username: user.data.username,
                    email: user.data.email
                })
            } catch (error) {
                throw (error)
            }
        },

       
    },

    Mutation: {
        addMenu: async (_, args) => {
            try {
                const { name, description, price, imgUrl, categoryId, ingredients } = args
                const { data } = await axios(BASE_URL_ITEM + "/menus", {
                    method: "POST",
                    data: { name, description, price, imgUrl, categoryId, ingredients }
                }
                )
                await redis.del("menus")
                return data
            } catch (error) {
                throw (error)
            }
        },


        updateMenu: async (_, {id, ...args}) =>  {
            try {
                const {name, description, price, imgUrl, categoryId, ingredients} = args
                const {data} = await axios.put(BASE_URL_ITEM + "/menus/" + id, {name, description, price, imgUrl, categoryId, ingredients})
                await redis.del("menus")
                return data
            } catch (error) {
                throw (error)
            }
        },


        destroyMenu: async (_, {id}) => {
            try {
                const {data} = await axios.delete(BASE_URL_ITEM + "/menus/" + id) 
                await redis.del("menus")
                return data
            } catch (error) {
                throw (error)
            }
        }
    }

};


module.exports = {typeDefs, resolvers}