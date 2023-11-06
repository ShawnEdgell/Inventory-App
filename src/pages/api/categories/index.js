// pages/api/categories/index.js
import connectToDatabase from '../../../lib/mongodb';
import Category from '../../../models/Category';

export default async function handler(req, res) {
  await connectToDatabase();

  switch (req.method) {
    case 'GET':
      try {
        const categories = await Category.find({});
        res.status(200).json(categories);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    case 'POST':
      try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).json(category);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
