import React from 'react';

type Props = {
  currentPage: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};
const Pagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => (
  <div className="pagination-area">
    <button
      className="sp-action-btn"
      disabled={currentPage === 1}
      onClick={() => onPageChange(currentPage - 1)}
    >
      Prev
    </button>
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i + 1}
        className="sp-action-btn"
        onClick={() => onPageChange(i + 1)}
        style={{ fontWeight: currentPage === i + 1 ? 'bold' : undefined }}
      >
        {i + 1}
      </button>
    ))}
    <button
      className="sp-action-btn"
      disabled={currentPage === totalPages}
      onClick={() => onPageChange(currentPage + 1)}
    >
      Next
    </button>
  </div>
);
export default Pagination;
