import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm';
import { useProductContext } from '../context/ProductContext';
import { Product } from '../types/Product';

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useProductContext();
  const navigate = useNavigate();

  const product = state.products.find(p => p.id === Number(id));
  if (!product) return <div>Không tìm thấy sản phẩm!</div>;

  const handleEdit = (editProduct: Product) => {
    dispatch({ type: 'UPDATE', payload: editProduct });
    navigate('/');
  };

  return (
    <div>
      <h2>Cập nhật sản phẩm</h2>
      <ProductForm initialValues={product} onSubmit={handleEdit} />
    </div>
  );
};
export default EditProduct;
