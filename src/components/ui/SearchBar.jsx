import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch, placeholder = 'Cari event atau lokasi...', debounceMs = 300 }) => {
  const [query, setQuery] = useState('');
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onSearch(query);
    }, debounceMs);

    return () => clearTimeout(timerRef.current);
  }, [query, onSearch, debounceMs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (timerRef.current) clearTimeout(timerRef.current);
    onSearch(query);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full px-6 py-4 pr-12 rounded-lg bg-background text-foreground border border-input placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground transition"
        >
          <Search size={24} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;