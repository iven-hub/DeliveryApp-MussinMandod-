const resolvers = {
    Query: {
      deliveries: async (root, args, { Delivery }) => {
        return await Delivery.find();
      },
      delivery: async (root, { id }, { Delivery }) => {
        return await Delivery.findById(id);
      },
      clients: async (root, args, { Client }) => {
        return await Client.find();
      },
      client: async (root, { id }, { Client }) => {
        return await Client.findById(id);
      },
    },
    Mutation: {
      addClient: async (root, args, { Client }) => {
        const client = await new Client(args).save();
        return client;
      },
      updateClient: async (root, args, { Client }) => {
        return await Client.findByIdAndUpdate(args.id, args, { new: true });
      },
      addDelivery: async (root, args, { Delivery, Client }) => {
        const client = await Client.findById(args.clientId);
        if (!client) {
          throw new Error('Client not found');
        }
        const delivery = await new Delivery({ ...args, client: client._id }).save();
        return delivery;
      },
      updateDelivery: async (root, { id, deliveryStatus }, { Delivery }) => {
        return await Delivery.findByIdAndUpdate(id, { deliveryStatus }, { new: true });
      },
    },
    Delivery: {
      client: async ({ client }, args, { Client }) => {
        return await Client.findById(client);
      },
    },
  };
  
  module.exports = resolvers;
  
  