import { useState, useEffect } from 'react';
import { eventService } from '../../services/eventService';
import { Calendar, MapPin, Users, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/ui/SearchBar';

const Home = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const [categories, setCategories] = useState([{ name: 'Semua', icon: Sparkles }]);

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [searchQuery, selectedCategory, events]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const response = await eventService.getAll();
      setEvents(response.data);
      setFilteredEvents(response.data);

      const catSet = new Set();
      response.data.forEach(e => {
        const c = e.category;
        if (Array.isArray(c)) {
          c.forEach(x => { if (x) catSet.add(x.toString().trim()); });
        } else if (c) {
          catSet.add(c.toString().trim());
        }
      });
      const cats = Array.from(catSet).sort((a,b) => a.localeCompare(b, 'id'));
      setCategories([{ name: 'Semua', icon: Sparkles }, ...cats.map(name => ({ name, icon: null }))]);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  }; 

  const filterEvents = () => {
    let filtered = [...events];

    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== 'Semua') {
      const sc = selectedCategory.toString().trim().toLowerCase();
      filtered = filtered.filter(event => {
        const c = event.category;
        if (Array.isArray(c)) {
          return c.some(x => x && x.toString().trim().toLowerCase() === sc);
        }
        return (c || '').toString().trim().toLowerCase() === sc;
      });
    }

    setFilteredEvents(filtered);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price).replace('IDR', 'Rp');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-[#4db8a8] to-[#3a9d8f] text-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full flex items-center gap-2">
              <Sparkles size={18} />
              <span className="text-sm font-medium">Platform Tiket Event #1 di Indonesia</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-center mb-4">
            Temukan Event
          </h1>
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">
            <span className="relative inline-block">
              Impianmu
              <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 300 8">
                <path d="M0 4 Q150 8 300 4" stroke="#ffd97d" strokeWidth="6" fill="none" />
              </svg>
            </span>
          </h1>

          <p className="text-center text-lg mb-8 opacity-90 max-w-3xl mx-auto">
            Pesan tiket konser, festival, workshop, dan berbagai event seru lainnya dengan mudah dan aman
          </p>

          <div className="max-w-4xl mx-auto">
            <SearchBar onSearch={setSearchQuery} placeholder="Cari event, artis, atau lokasi..." debounceMs={300} />
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-12">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="text-white/80" size={32} />
              </div>
              <div className="text-3xl font-bold mb-1">500+</div>
              <div className="text-sm opacity-80">Event Aktif</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <MapPin className="text-white/80" size={32} />
              </div>
              <div className="text-3xl font-bold mb-1">50+</div>
              <div className="text-sm opacity-80">Kota</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="text-white/80" size={32} />
              </div>
              <div className="text-3xl font-bold mb-1">100K+</div>
              <div className="text-sm opacity-80">Pengguna</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.name;
            
            return (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(prev => prev === category.name ? 'Semua' : category.name)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium whitespace-nowrap transition cursor-pointer ${
                  isSelected
                    ? 'bg-[#4db8a8] text-white shadow-md'
                    : 'bg-card text-card-foreground hover:bg-accent border border-border'
                }`}
              >
                {Icon && <Icon size={18} />}
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-foreground mb-2">{selectedCategory} Event</h2>
          <p className="text-muted-foreground">Ditemukan {filteredEvents.length} event</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4db8a8]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => navigate(`/event/${event.id}`)}
                className="bg-card border border-border rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition group"
              >
                <div className="relative h-64 overflow-hidden bg-muted">
                  <img
                    src={event.image || 'https://via.placeholder.com/600x400?text=Event+Image'}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/600x400?text=No+Image';
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#ffd97d] text-gray-800 px-4 py-2 rounded-full text-sm font-semibold">
                      {event.category || 'Event'}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="bg-white text-[#4db8a8] px-4 py-2 rounded-xl text-lg font-bold shadow-lg">
                      {event.price ? formatPrice(event.price) : 'Gratis'}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                    <Calendar size={16} />
                    <span>{event.date ? formatDate(event.date) : 'Date TBA'}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-card-foreground mb-3 group-hover:text-[#4db8a8] transition">
                    {event.name || 'Untitled Event'}
                  </h3>

                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                    <MapPin size={16} />
                    <span>{event.location || 'Location TBA'}</span>
                  </div>

                  <button className="w-full bg-[#4db8a8] hover:bg-[#3a9d8f] text-white py-3 rounded-xl font-semibold transition cursor-pointer">
                    Lihat Detail
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">Tidak ada event yang ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;