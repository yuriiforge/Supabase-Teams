interface Props {
  status: string;
  search: string;
  onStatusChange: (value: string) => void;
  onSearchChange: (value: string) => void;
}

const ProductFilter: React.FC<Props> = ({
  status,
  search,
  onStatusChange,
  onSearchChange,
}) => (
  <div className="flex gap-2 my-4">
    <select value={status} onChange={(e) => onStatusChange(e.target.value)}>
      <option value="">All</option>
      <option value="Draft">Draft</option>
      <option value="Active">Active</option>
      <option value="Deleted">Deleted</option>
    </select>

    <input
      placeholder="Search by title/description"
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  </div>
);

export default ProductFilter;
