import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

function EditCategory() {
  const router = useRouter();
  const { id } = router.query;
  const [category, setCategory] = useState({
    name: '',
    description: '',
    url: '',
  });

  useEffect(() => {
    // Fetch the current category data from the API
    const fetchData = async () => {
      const response = await fetch(`/api/categories/${id}`);
      const data = await response.json();
      setCategory(data);
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // PUT request to update the category
    const response = await fetch(`/api/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    });

    if (response.ok) {
      router.push('/categories');
    } else {
      // Handle errors here
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={category.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        value={category.description}
        onChange={handleChange}
        required
      />

      <label htmlFor="url">Image URL (optional)</label>
      <input
        type="text"
        id="url"
        name="url"
        value={category.url}
        onChange={handleChange}
      />

      <button type="submit">Update Category</button>
    </form>
  );
}

export default EditCategory;
