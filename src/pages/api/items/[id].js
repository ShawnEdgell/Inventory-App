// pages/api/items/[id].js
import connectToDatabase from '../../../lib/mongodb';
import Item from '../../../models/Item';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  await connectToDatabase();
  const { 
    query: { id },
    method 
  } = req;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid item ID.' });
  }

  switch (method) {
    case 'GET':
      try {
        const item = await Item.findById(id).populate('category');
        if (!item) {
          return res.status(404).json({ message: 'Item not found.' });
        }
        res.status(200).json(item);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    case 'PUT':
      try {
        const item = await Item.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!item) {
          return res.status(404).json({ message: 'Item not found.' });
        }
        res.status(200).json(item);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;

    case 'DELETE':
      try {
        const deletedItem = await Item.findByIdAndDelete(id);
        if (!deletedItem) {
          return res.status(404).json({ message: 'Item not found.' });
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
