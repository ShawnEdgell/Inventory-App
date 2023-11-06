// pages/items/create.js
import ItemForm from '../../components/ItemForm';

const CreateItemPage = ({ categories }) => {
  return (
    <div>
      <h1>Create Item</h1>
      <ItemForm categories={categories} />
    </div>
  );
};

export const getServerSideProps = async () => {
  // Fetch categories to select from
};

export default CreateItemPage;
