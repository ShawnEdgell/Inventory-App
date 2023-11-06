// src/models/Category.js
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true }  // Assuming this is the URL for the image
});

// Compile model from schema
const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

export default Category;
