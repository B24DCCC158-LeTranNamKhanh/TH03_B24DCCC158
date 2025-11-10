import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import Filter from './Filter';
import Pagination from './Pagination';

const ITEMS_PER_PAGE = 6;

const ProductList: React.FC = () => {
  const { state } = useProductContext();
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('');
  const [price, setPrice] = useState<{ min: number; max: number }>({ min: 0, max: Infinity });
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  // Tìm kiếm & lọc
  const filtered = state.products.filter(p =>
    p.ten.toLowerCase().includes(search.toLowerCase()) &&
    (!cat || p.danhMuc === cat) &&
    p.gia >= price.min &&
    p.gia <= price.max
  );

  // Phân trang
  const start = (page - 1) * ITEMS_PER_PAGE;
  const products = filtered.slice(start, start + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  return (
    <div className="product-list-container">
      <button
        className="sp-action-btn"
        onClick={() => navigate('/add')}
      >
        Thêm sản phẩm
      </button>

      <SearchBar value={search} onChange={setSearch} />
      <Filter
        categories={['Điện tử', 'Quần áo', 'Đồ ăn', 'Sách', 'Khác']}
        selected={cat}
        onCategoryChange={setCat}
        price={price}
        onPriceChange={setPrice}
      />
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        currentPage={page}
        total={filtered.length}
        totalPages={totalPages}
        onPageChange={setPage}
      />
      <div className="list-summary">
        {filtered.length === 0 && <p>Không tìm thấy sản phẩm.</p>}
        <p>Tổng: {filtered.length} sản phẩm. Trang {page}/{totalPages}</p>
      </div>
    </div>
  );
};
export default ProductList;
