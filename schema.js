import {
  GraphQLInt,
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql'
import mongoose from 'mongoose'

import {Client } from './models/Client.js';
import {Delivery} from './models/Delivery.js';


const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
      id: {type: GraphQLID},
      name: {type: GraphQLString},
      email: {type: GraphQLString},
      phone: {type: GraphQLString},
  }
  )
});

const DeliveryType = new GraphQLObjectType({
  name: 'Delivery',
  fields: () => ({
    id: {type: GraphQLID},
    client: {type: ClientType, resolve(parent, args){
      return Client.findById(parent.client)
    }},
    orderId: {type: GraphQLID},
    deliveryAddress: {type: GraphQLString},
    deliveryStatus: {type: GraphQLString},
  }
  )
});


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    deliveries: {
      type: new GraphQLList( DeliveryType),
      async resolve(parent, args) {
        return await Delivery.find();
    },
  },

  delivery: {
    type: DeliveryType,
    args: {id: {type: GraphQLID}},
    async resolve(parent, args) {
      return await Delivery.findById(args.id)
  },
},

  clients: {
    type: new GraphQLList( ClientType),
    async resolve(parent, args) {
      return await Client.find();
    },
  },

  client: {
    type: ClientType,
    args: {id: {type: GraphQLID}},
    async resolve(parent, args) {
      return await Client.findById(args.id);
    },
  },

}});


const TypeMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addClient: { 
      type: ClientType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLString },
        phone: {type: GraphQLString}
      },
      resolve(parent, args) {
        const newClient = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone
        })
        return newClient.save()
    },
    },

    updateClient: { 
      type: ClientType,
      args: {
        id: {type: GraphQLID},
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLString },
        phone: {type: GraphQLString}
      },
      async resolve(parent, args) {

        const updateClient = await Client.findByIdAndUpdate(
            args.id
          ,
          {
            name: args.name,
            email: args.email,
            phone: args.phone
          },
          { new: true },
        )

        return updateClient
      },
    },

    deleteclient: {
      type: ClientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent,args) {
        return Client.findByIdAndRemove(args.id)
      },
    },
    

    addDelivery: { 
      type: DeliveryType,
      args: {
        client: { type: new GraphQLNonNull(GraphQLString) },
        orderId: { type: GraphQLString },
        deliveryAddress: {type: GraphQLString},
        deliveryStatus: {type: GraphQLString}
      },
      resolve(parent, args) {
        const addDelivery = new Delivery({
          client: args.client,
          orderId: args.orderId,
          deliveryAddress: args.deliveryAddress,
          deliveryStatus: args.deliveryStatus
        })
        return addDelivery.save()
    },
    },

    updateDelivery: { 
      type: DeliveryType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        orderId: { type: GraphQLString },
        deliveryAddress: {type: GraphQLString},
        deliveryStatus: {type: GraphQLString}
      },
      async resolve(parent, args) {

        const updateDelivery = await Delivery.findByIdAndUpdate(
            args.id,
          {
            orderId: args.orderId,
            deliveryAddress: args.deliveryAddress,
            deliveryStatus: args.deliveryStatus
          },
          { new: true },
        )

        return updateDelivery
      },
    },

    deleteDelivery: {
      type: DeliveryType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent,args) {
        return Delivery.findByIdAndRemove(args.id)
      },
    },
}});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: TypeMutation,
})
