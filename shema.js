const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Client {
    id: ID!
    name: String!
    email: String!
    phone: String!
  }

  type Delivery {
    id: ID!
    client: Client!
    orderId: String!
    deliveryAddress: String!
    deliveryStatus: String!
  }

  type Query {
    deliveries: [Delivery]
    delivery(id: ID!): Delivery
    clients: [Client]
    client(id: ID!): Client
  }

  type Mutation {
    addClient(name: String!, email: String!, phone: String!): Client
    updateClient(id: ID!, name: String, email: String, phone: String): Client
    addDelivery(clientId: ID!, orderId: String!, deliveryAddress: String!, deliveryStatus: String!): Delivery
    updateDelivery(id: ID!, deliveryStatus: String!): Delivery
  }
`;

module.exports = typeDefs;
