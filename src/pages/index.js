// pages/index.js
import fetch from 'node-fetch'; // Make sure to install node-fetch if not available globally
import Link from 'next/link';

export default function Home({ categories }) {
  return (
    <div className="container mx-auto px-4">
      <div className="hero bg-gray-100 p-10 text-center rounded">
        <h1 className="text-5xl font-bold mb-4">Welcome to the Inventory App</h1>
        <p className="text-xl">Manage your inventory with ease.</p>
      </div>

      {/* Categories section */}
      <div className="mt-10">
        <h2 className="text-3xl font-semibold mb-4">Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Map through the fetched categories and display them */}
          {categories.map((category) => (
            <div key={category._id} className="category-card bg-white p-6 rounded shadow-lg hover:shadow-xl transition duration-200">
              <h3 className="text-2xl font-semibold mb-2">{category.name}</h3>
              <p className="text-gray-700 mb-4">{category.description}</p>
              {/* Link to the category detail page */}
              <Link href={`/categories/${category._id}`}>
                <button className="text-indigo-500 hover:underline">Shop now</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// This function runs on the server for each request
export async function getServerSideProps() {
  // Fetch data from your API
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
  const categories = await res.json();

  // Pass the fetched categories to the page via props
  return { props: { categories } };
}
