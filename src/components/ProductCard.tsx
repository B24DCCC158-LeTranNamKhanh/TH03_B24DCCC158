import React from 'react';
import { Product } from '../types/Product';
import { useNavigate } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';

type Props = { product: Product };

const ProductCard: React.FC<Props> = ({ product }) => {
  const { dispatch } = useProductContext();
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm('Bạn chắc chắn muốn xoá?'))
      dispatch({ type: 'DELETE', payload: product.id });
  };

  return (
    <div className="product-card">
      <h3>{product.ten}</h3>
      <p>Danh mục: {product.danhMuc}</p>
      <p>Giá: {product.gia.toLocaleString()} VNĐ</p>
      <p>Số lượng: {product.soLuong}</p>
      <div className="card-actions">
        <button className="sp-action-btn" onClick={() => navigate(`/products/${product.id}`)}>Xem chi tiết</button>
        <button className="sp-action-btn" onClick={() => navigate(`/edit/${product.id}`)}>Chỉnh sửa</button>
        <button className="sp-action-btn" onClick={handleDelete}>Xoá</button>
      </div>
    </div>
  );
};
export default ProductCard;
