interface Props {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number; // optional, default to 5
}

const Pagination = ({
  page,
  pageSize,
  total,
  onPageChange,
  maxVisiblePages = 5,
}: Props) => {
  const totalPages = Math.ceil(total / pageSize);

  if (totalPages === 0) return null;

  const getPageNumbers = () => {
    const pages: number[] = [];
    let start = Math.max(page - Math.floor(maxVisiblePages / 2), 1);
    let end = start + maxVisiblePages - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        onClick={() => onPageChange(1)}
        disabled={page === 1}
      >
        First
      </button>

      <button
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Prev
      </button>

      {getPageNumbers().map((p) => (
        <button
          key={p}
          className={`px-3 py-1 rounded ${
            p === page
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}

      <button
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>

      <button
        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        onClick={() => onPageChange(totalPages)}
        disabled={page === totalPages}
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
