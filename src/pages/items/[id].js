// pages/items/[id].js
import { useRouter } from 'next/router';

const ItemDetailPage = ({ item }) => {
  const router = useRouter();

  // Handler for delete button
  const handleDelete = async () => {
    const res = await fetch(`/api/items/${item._id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      router.push('/items'); // Redirect to the list after delete
    }
  };

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      <button onClick={handleDelete}>Delete Item</button>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await fetch(`http://localhost:3000/api/items/${params.id}`);
  const item = await res.json();

  return {
    props: { item },
  };
};

export default ItemDetailPage;
