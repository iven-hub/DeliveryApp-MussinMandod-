import mongoose from "mongoose";

const DeliverySchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  deliveryStatus: {
    type: String,
    required: true,
  },
});

export const Delivery = mongoose.model('Delivery', DeliverySchema);

//module.exports = Delivery;
