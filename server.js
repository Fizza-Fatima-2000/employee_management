
const express_apollo = require('apollo-server-express')
const { ApolloServer } = require('apollo-server')
require('dotenv').config()
const bodyParser = require('body-parser')
const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()
PORT = process.env.PORT

var express = require('express')
var server = express()
const typeDefs = require('./app/graphql/typeDefs/indexTypeDefs')
const resolvers = require('./app/graphql/resolvers/indexResolvers')
server.use(express.static('app'))
server.listen(3000, () => {
  console.log(`🚀 GRAPHQL Server is running at http://localhost:3000`)
})


const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
  disable: 'x-Powered-by'
})
apolloServer.listen(PORT, () => {
  console.log(
    `🚀 GRAPHQL Server is running at http://localhost:${PORT}`
  )
})
