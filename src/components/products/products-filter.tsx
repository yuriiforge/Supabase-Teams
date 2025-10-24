import { useState } from 'react';
import type { TeamMember } from '../../lib/types/team';

interface Props {
  status: string;
  search: string;
  authors?: TeamMember[];
  onStatusChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onAuthorChange: (value: string) => void;
  onApply: () => void;
}

const ProductFilter = ({
  status,
  search,
  authors,
  onStatusChange,
  onSearchChange,
  onAuthorChange,
  onApply,
}: Props) => {
  const [selectedAuthor, setSelectedAuthor] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedAuthor(value);
    onAuthorChange(value);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 my-6 items-center">
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="
        px-4 py-2
        border border-gray-300
        rounded-lg
        shadow-sm
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
        transition
        text-gray-700
        cursor-pointer
      "
      >
        <option value="">All Statuses</option>
        <option value="Draft">Draft</option>
        <option value="Active">Active</option>
        <option value="Deleted">Deleted</option>
      </select>

      {authors && (
        <select
          value={selectedAuthor}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-700 cursor-pointer"
        >
          <option value="">All Authors</option>
          {authors.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      )}
      <input
        type="text"
        placeholder="Search by title or description"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="
        flex-1
        px-4 py-2
        border border-gray-300
        rounded-lg
        shadow-sm
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
        transition
        text-gray-700
      "
      />
      <button
        onClick={onApply}
        className="
        px-6 py-2
        bg-indigo-500 text-white
        rounded-lg
        shadow-md
        hover:bg-indigo-600
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1
        transition
      "
      >
        Apply
      </button>
    </div>
  );
};

export default ProductFilter;
