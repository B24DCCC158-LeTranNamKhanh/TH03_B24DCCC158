import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { state } = useProductContext();
  const navigate = useNavigate();
  const product = state.products.find(p => p.id === Number(id));

  if (!product) return <div>Sản phẩm không tồn tại.</div>;

  return (
    <div>
      <h2>{product.ten}</h2>
      <p>Danh mục: {product.danhMuc}</p>
      <p>Giá: {product.gia.toLocaleString()} VNĐ</p>
      <p>Số lượng: {product.soLuong}</p>
      <p>Mô tả: {product.moTa}</p>
      <button onClick={() => navigate('/')}>Quay về danh sách</button>
    </div>
  );
};
export default ProductDetail;
