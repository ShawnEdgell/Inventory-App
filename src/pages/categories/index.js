// pages/categories/index.js
import Link from 'next/link';

const CategoriesPage = ({ categories }) => {
  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map(category => (
          <li key={category._id}>
            <Link href={`/categories/${category._id}`}>
              <a>{category.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/categories');
  const categories = await res.json();

  return {
    props: { categories },
  };
};

export default CategoriesPage;
