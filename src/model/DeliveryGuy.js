import mongoose from 'mongoose';

const deliveryGuySchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const deliveryGuyModel = mongoose.model('delivery', deliveryGuySchema);

export default deliveryGuyModel;
