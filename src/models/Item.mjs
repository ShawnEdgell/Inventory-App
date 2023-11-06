// src/models/Item.js
import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  price: { type: Number, required: true },
  numberInStock: { type: Number, required: true },
  url: {
    type: String,
    required: [false, 'URL not required'], // Make it not required
  },
});

// Compile model from schema
const Item = mongoose.models.Item || mongoose.model('Item', itemSchema);

export default Item;
