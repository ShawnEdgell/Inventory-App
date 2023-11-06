import { useState } from 'react';
import { useRouter } from 'next/router';

function CreateCategory() {
  const router = useRouter();
  const [category, setCategory] = useState({
    name: '',
    description: '',
    url: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    // POST request to add the category
    const response = await fetch(`/api/categories`, {
      method: 'POST',
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

      <button type="submit">Create Category</button>
    </form>
  );
}

export default CreateCategory;
