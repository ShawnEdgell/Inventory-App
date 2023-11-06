import { useRouter } from 'next/router';
import Link from 'next/link';

const CategoryDetailPage = ({ category }) => {
  const router = useRouter();

  // Handler for delete button
  const handleDelete = async () => {
    const res = await fetch(`/api/categories/${category._id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      router.push('/categories'); // Redirect to the list after delete
    } else {
      // Handle errors, perhaps show a message
    }
  };

  // If the page is still loading data (fallback)
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{category.name}</h1>
      <p>{category.description}</p>
      {/* Link to edit page */}
      <Link href={`/categories/edit/${category._id}`}>
        <a>Edit</a>
      </Link>
      <button onClick={handleDelete}>Delete Category</button>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await fetch(`http://localhost:3000/api/categories/${params.id}`);
  const category = await res.json();

  // Handle the case where the category does not exist
  if (!category) {
    return {
      notFound: true,
    };
  }

  return {
    props: { category },
  };
};

export default CategoryDetailPage;
