// pages/items/index.js
import Link from 'next/link';

const ItemsPage = ({ items }) => {
  return (
    <div>
      <h1>Items</h1>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            <Link href={`/items/${item._id}`}>
              <a>{item.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/items');
  const items = await res.json();

  return {
    props: { items },
  };
};

export default ItemsPage;
