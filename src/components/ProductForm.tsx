import React, { useState } from 'react';
import { Product } from '../types/Product';

type Props = {
  initialValues: Product;
  onSubmit: (values: Product) => void;
};

const categories = ['Điện tử', 'Quần áo', 'Đồ ăn', 'Sách', 'Khác'];

function validate(values: Product) {
  const errors: any = {};
  if (!values.ten || values.ten.length < 3)
    errors.ten = 'Tên sản phẩm tối thiểu 3 ký tự';
  if (!values.gia || values.gia <= 0)
    errors.gia = 'Giá phải là số dương';
  if (!values.soLuong || values.soLuong < 1 || !Number.isInteger(values.soLuong))
    errors.soLuong = 'Số lượng phải là số nguyên dương';
  if (!values.danhMuc)
    errors.danhMuc = 'Phải chọn danh mục';
  return errors;
}

const ProductForm: React.FC<Props> = ({ initialValues, onSubmit }) => {
  const [values, setValues] = useState<Product>(initialValues);
  const [errors, setErrors] = useState<any>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: name === 'gia' || name === 'soLuong' ? Number(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length === 0) onSubmit(values);
  };

  return (
    <form className="form-sp" onSubmit={handleSubmit}>
      <div>
        <label>Tên sản phẩm</label>
        <input
          name="ten"
          value={values.ten}
          onChange={handleChange}
          placeholder="Tên sản phẩm"
        />
        {errors.ten && <div className="error">{errors.ten}</div>}
      </div>

      <div>
        <label>Danh mục</label>
        <select
          name="danhMuc"
          value={values.danhMuc}
          onChange={handleChange}
        >
          <option value="">--Chọn danh mục--</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        {errors.danhMuc && <div className="error">{errors.danhMuc}</div>}
      </div>

      <div>
        <label>Giá</label>
        <input
          name="gia"
          type="number"
          value={values.gia}
          onChange={handleChange}
          placeholder="Giá"
        />
        {errors.gia && <div className="error">{errors.gia}</div>}
      </div>

      <div>
        <label>Số lượng</label>
        <input
          name="soLuong"
          type="number"
          value={values.soLuong}
          onChange={handleChange}
          placeholder="Số lượng"
        />
        {errors.soLuong && <div className="error">{errors.soLuong}</div>}
      </div>

      <div>
        <label>Mô tả</label>
        <textarea
          name="moTa"
          value={values.moTa}
          onChange={handleChange}
          placeholder="Mô tả sản phẩm"
        />
      </div>

      <button type="submit">
        Lưu
      </button>
    </form>
  );
};

export default ProductForm;
