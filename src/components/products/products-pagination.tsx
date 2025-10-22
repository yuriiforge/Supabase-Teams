interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  pageSize,
  total,
  onPageChange,
}) => (
  <div className="flex justify-between mt-4">
    <button
      onClick={() => onPageChange(Math.max(page - 1, 1))}
      disabled={page === 1}
    >
      Prev
    </button>
    <span>Page {page}</span>
    <button
      onClick={() => onPageChange(page + 1)}
      disabled={page * pageSize >= total}
    >
      Next
    </button>
  </div>
);

export default Pagination;
