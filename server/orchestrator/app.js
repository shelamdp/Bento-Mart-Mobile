require("dotenv").config()
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const {typeDefs, resolvers} = require("./schema/menuSchema")
const {typeDefs: userDefs, resolvers: resolversUsers} = require("./schema/userSchema")

const server = new ApolloServer({
    typeDefs: [typeDefs, userDefs],
    resolvers: [resolvers, resolversUsers],
});

startStandaloneServer(server, {
    listen: { port: process.env.PORT || 4000 },
})
    .then(({ url }) => {
        console.log("connected to " + url)
    })
    .catch((err) => {
        console.log(err)
    })