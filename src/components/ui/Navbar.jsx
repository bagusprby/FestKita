import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Ticket, Search, User } from 'lucide-react';
import SearchBar from './SearchBar';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (q) => {
    const trimmed = (q || '').trim();

    if (!trimmed) return;

    const target = `/events?q=${encodeURIComponent(trimmed)}`;
    const params = new URLSearchParams(location.search);
    const currentQ = params.get('q') || '';

    if (location.pathname !== '/events' || currentQ !== trimmed) {
      navigate(target, { replace: true });
    }
  };

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-[#4db8a8] p-2 rounded-lg">
              <Ticket size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-[#4db8a8]">FestKita</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className="text-foreground hover:text-[#4db8a8] font-medium transition"
            >
              Beranda
            </Link>
            <Link 
              to="/events" 
              className="text-foreground hover:text-[#4db8a8] font-medium transition"
            >
              Events
            </Link>
            <Link 
              to="/about" 
              className="text-foreground hover:text-[#4db8a8] font-medium transition"
            >
              Tentang
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block w-64">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Cari event..."
                debounceMs={300}
              />
            </div>

            <button onClick={() => navigate('/events')} className="md:hidden p-2 hover:bg-accent rounded-lg transition">
              <Search size={20} className="text-foreground" />
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;