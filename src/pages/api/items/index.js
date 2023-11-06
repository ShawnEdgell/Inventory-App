// pages/api/items/index.js
import connectToDatabase from '../../../lib/mongodb';
import Item from '../../../models/Item';

export default async function handler(req, res) {
  await connectToDatabase();

  switch (req.method) {
    case 'GET':
      try {
        const items = await Item.find({}).populate('category');
        res.status(200).json(items);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    case 'POST':
      try {
        const item = new Item(req.body);
        await item.save();
        res.status(201).json(item);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
