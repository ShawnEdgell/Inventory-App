import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const EditItemPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [itemData, setItemData] = useState({
    name: '',
    description: '',
    price: '',
    numberInStock: '',
    imageUrl: '',
  });

  useEffect(() => {
    // Fetch the current item data
    const fetchData = async () => {
      const res = await fetch(`/api/items/${id}`);
      const data = await res.json();
      setItemData(data);
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // PUT request to update the item
    const res = await fetch(`/api/items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemData),
    });

    if (res.ok) {
      router.push(`/items/${id}`); // Redirect to the item detail page
    } else {
      // Handle errors here
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData({ ...itemData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Item</h1>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={itemData.name}
        onChange={handleChange}
        required
      />
      
      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        value={itemData.description}
        onChange={handleChange}
        required
      />

      <label htmlFor="price">Price:</label>
      <input
        type="number"
        id="price"
        name="price"
        value={itemData.price}
        onChange={handleChange}
        required
      />

      <label htmlFor="numberInStock">Number in Stock:</label>
      <input
        type="number"
        id="numberInStock"
        name="numberInStock"
        value={itemData.numberInStock}
        onChange={handleChange}
        required
      />

      <label htmlFor="imageUrl">Image URL:</label>
      <input
        type="text"
        id="imageUrl"
        name="imageUrl"
        value={itemData.imageUrl}
        onChange={handleChange}
      />

      <button type="submit">Update Item</button>
      <Link href={`/items/${id}`}>
        <a>Cancel</a>
      </Link>
    </form>
  );
};

export default EditItemPage;
