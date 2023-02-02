const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

const typeDefs = require('./shema');
const resolvers = require('./resolvers');

const Client = require('./models/Client');
const Delivery = require('./models/Delivery');

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
      Client,
      Delivery,
    },
  });

  server.applyMiddleware({ app });

  await mongoose.connect(
    'mongodb://localhost:27017/delivery-app',
    { useNewUrlParser: true }
  );

  app.listen(8002, () => console.log("Rodando no port 8002"));
};

startServer();

