import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from './ProductForm';
import { useProductContext } from '../context/ProductContext';
import { Product } from '../types/Product';

const AddProduct = () => {
  const { dispatch } = useProductContext();
  const navigate = useNavigate();

  const handleAdd = (product: Product) => {
    const newProduct = { ...product, id: Date.now() };
    dispatch({ type: 'ADD', payload: newProduct });
    navigate('/');
  };

  return (
    <div>
      <h2>Thêm sản phẩm mới</h2>
      <ProductForm
        initialValues={{ id: 0, ten: '', danhMuc: '', gia: 0, soLuong: 0, moTa: '' }}
        onSubmit={handleAdd}
      />
    </div>
  );
};
export default AddProduct;
