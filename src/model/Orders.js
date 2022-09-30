import mongoose from 'mongoose';

const ordersSchema = new mongoose.Schema({
  client_name: {
    type: String,
    required: true,
  },
  client_address: {
    type: String,
    required: true,
  },
  order: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const ordersModel = mongoose.model('orders', ordersSchema);

export default ordersModel;
