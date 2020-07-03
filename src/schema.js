const { mergeSchemas, makeExecutableSchema } = require('apollo-server-cloudflare')
const { remoteExecutableSchema } = require('./remote-schema')
const resolvers = require('./resolvers')
const typeDefs = require('./typedefs')

const firstSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
})


module.exports = mergeSchemas({
  schemas: [
    firstSchema,
    remoteExecutableSchema,
  ],
})
