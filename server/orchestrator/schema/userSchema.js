const axios = require('axios');
const redis = require('../config');
const BASE_URL_USER = 'http://user-services:4001';

const typeDefs = `#graphql

type User {
    _id: String
    username: String
    email: String
    password: String
    role: String
    phoneNumber: String
    address: String
}

type Query {
    getAllUsers: User
    getUser(_id: String): User
}
type Mutation {
    addUser(
      username: String
      email: String
      password: String
      role: String
      phoneNumber: String
      address: String
    ): User

    deleteUser(_id: String): User
}
`

const resolvers = {
    Query: {

        getAllUsers: async () => {
            try {
                const usersCache = await redis.get('users');
                if (usersCache) {
                    return JSON.parse(usersCache);
                }
                const { data } = await axios.get(BASE_URL_USER + '/users');
                await redis.set('users', JSON.stringify(data));
                return data;
            } catch (error) {
                throw error;
            }
        },

        getUser: async (_, { _id }) => {
            try {
                const { data } = await axios.get(BASE_URL_USER + '/users/' + _id);
                return data;
            } catch (error) {
                throw error;
            }
        },


    },

    Mutation: {
        addUser: async (_, args) => {
            try {
                const { data } = await axios.post(BASE_URL_USER + '/users', args);
                await redis.del('users');
                return { msg: 'success add user' };
            } catch (error) {
                throw error;
            }
        },


        deleteUser: async (_, { _id }) => {
            try {
                const { data } = await axios.delete(BASE_URL_USER + '/users/' + _id);
                await redis.del('users');
                return data;
            } catch (error) {
                throw error;
            }
        },
    }

};


module.exports = { typeDefs, resolvers }