// pages/api/categories/[id].js
import connectToDatabase from '../../../lib/mongodb';
import Category from '../../../models/Category';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  await connectToDatabase();
  const { 
    query: { id },
    method 
  } = req;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid category ID.' });
  }

  switch (method) {
    case 'GET':
      try {
        const category = await Category.findById(id);
        if (!category) {
          return res.status(404).json({ message: 'Category not found.' });
        }
        res.status(200).json(category);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    case 'PUT':
      try {
        const category = await Category.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!category) {
          return res.status(404).json({ message: 'Category not found.' });
        }
        res.status(200).json(category);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;

    case 'DELETE':
      try {
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
          return res.status(404).json({ message: 'Category not found.' });
        }
        res.status(204).end();
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
