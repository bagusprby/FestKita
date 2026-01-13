import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { eventService } from '../../services/eventService';
import { Calendar, MapPin, SlidersHorizontal, Grid, List } from 'lucide-react';
import SearchBar from '../../components/ui/SearchBar';
import Footer from '../../components/ui/Footer';

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [sortBy, setSortBy] = useState('terbaru');
  const [viewMode, setViewMode] = useState('grid'); 

  const [categories, setCategories] = useState(['Semua']);

  useEffect(() => {
    loadEvents();
  }, []);

  // Sync search query with URL param 'q'
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const q = searchParams.get('q') || '';
    setSearchQuery(q);
  }, [searchParams]);

  useEffect(() => {
    if (searchQuery) {
      setSearchParams({ q: searchQuery });
    } else {
      setSearchParams({});
    }
  }, [searchQuery]);

  useEffect(() => {
    filterAndSortEvents();
  }, [searchQuery, selectedCategory, sortBy, events]);

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
      setCategories(['Semua', ...cats]);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortEvents = () => {
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

    if (sortBy === 'terbaru') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'terlama') {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === 'termurah') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'termahal') {
      filtered.sort((a, b) => b.price - a.price);
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
      <div className="bg-gradient-to-br from-[#4db8a8] to-[#3a9d8f] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Semua Event</h1>
          <p className="text-lg opacity-90">
            Temukan event favorit kamu dari berbagai kategori
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-card border border-border rounded-2xl p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5">
              <SearchBar onSearch={setSearchQuery} placeholder="Cari event atau lokasi..." debounceMs={300} />
            </div>

            <div className="md:col-span-4">
              <div className="relative">
                <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4db8a8] appearance-none cursor-pointer"
                >
                  <option value="terbaru">Terbaru</option>
                  <option value="terlama">Terlama</option>
                  <option value="termurah">Termurah</option>
                  <option value="termahal">Termahal</option>
                </select>
              </div>
            </div>

            {/* View Mode */}
            <div className="md:col-span-3 flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex-1 py-3 rounded-xl font-medium transition cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#4db8a8] text-white'
                    : 'bg-background border border-input text-foreground hover:bg-accent'
                }`}
              >
                <Grid className="inline-block" size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex-1 py-3 rounded-xl font-medium transition cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-[#4db8a8] text-white'
                    : 'bg-background border border-input text-foreground hover:bg-accent'
                }`}
              >
                <List className="inline-block" size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-6 sticky top-6">
              <h3 className="text-lg font-bold mb-4 text-foreground">Kategori</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(prev => prev === category ? 'Semua' : category)}
                    className={`w-full text-left px-4 py-3 rounded-xl font-medium transition cursor-pointer ${
                      selectedCategory === category
                        ? 'bg-[#4db8a8] text-white'
                        : 'text-foreground hover:bg-accent'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">Total Event</p>
                <p className="text-3xl font-bold text-[#4db8a8]">{filteredEvents.length}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4db8a8]"></div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {selectedCategory === 'Semua' ? 'Semua Event' : selectedCategory}
                    </h2>
                    <p className="text-muted-foreground mt-1">
                      Menampilkan {filteredEvents.length} event
                    </p>
                  </div>
                </div>

                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredEvents.map((event) => (
                      <div
                        key={event.id}
                        onClick={() => navigate(`/event/${event.id}`)}
                        className="bg-card border border-border rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition group"
                      >
                        <div className="relative h-48 overflow-hidden bg-muted">
                          <img
                            src={event.image || 'https://via.placeholder.com/400x300?text=Event'}
                            alt={event.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                            }}
                          />
                          <div className="absolute top-4 left-4">
                            <span className="bg-[#ffd97d] text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                              {event.category || 'Event'}
                            </span>
                          </div>
                          <div className="absolute bottom-4 right-4">
                            <span className="bg-white text-[#4db8a8] px-3 py-2 rounded-xl text-base font-bold shadow-lg">
                              {event.price ? formatPrice(event.price) : 'Gratis'}
                            </span>
                          </div>
                        </div>

                        <div className="p-5">
                          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                            <Calendar size={14} />
                            <span>{event.date ? formatDate(event.date) : 'Date TBA'}</span>
                          </div>

                          <h3 className="text-xl font-bold text-card-foreground mb-2 line-clamp-2 group-hover:text-[#4db8a8] transition">
                            {event.name || 'Untitled Event'}
                          </h3>

                          <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <MapPin size={14} />
                            <span className="line-clamp-1">{event.location || 'Location TBA'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredEvents.map((event) => (
                      <div
                        key={event.id}
                        onClick={() => navigate(`/event/${event.id}`)}
                        className="bg-card border border-border rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition group"
                      >
                        <div className="flex flex-col md:flex-row">
                          <div className="relative md:w-64 h-48 md:h-auto overflow-hidden bg-muted flex-shrink-0">
                            <img
                              src={event.image || 'https://via.placeholder.com/400x300?text=Event'}
                              alt={event.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                              }}
                            />
                            <div className="absolute top-4 left-4">
                              <span className="bg-[#ffd97d] text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                                {event.category || 'Event'}
                              </span>
                            </div>
                          </div>

                          <div className="flex-1 p-6 flex flex-col justify-between">
                            <div>
                              <h3 className="text-2xl font-bold text-card-foreground mb-3 group-hover:text-[#4db8a8] transition">
                                {event.name || 'Untitled Event'}
                              </h3>

                              <div className="flex flex-wrap gap-4 mb-3">
                                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                  <Calendar size={16} />
                                  <span>{event.date ? formatDate(event.date) : 'Date TBA'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                  <MapPin size={16} />
                                  <span>{event.location || 'Location TBA'}</span>
                                </div>
                              </div>

                              <p className="text-muted-foreground text-sm line-clamp-2">
                                {event.description || 'No description available'}
                              </p>
                            </div>

                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Mulai dari</p>
                                <p className="text-2xl font-bold text-[#4db8a8]">
                                  {event.price ? formatPrice(event.price) : 'Gratis'}
                                </p>
                              </div>
                              <button className="px-6 py-3 bg-[#4db8a8] hover:bg-[#3a9d8f] text-white rounded-xl font-semibold transition cursor-pointer cursor-pointer">
                                Lihat Detail
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {filteredEvents.length === 0 && (
                  <div className="text-center py-20">
                    <div className="mb-4">
                      <Calendar size={64} className="mx-auto text-muted-foreground opacity-50" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Tidak ada event ditemukan
                    </h3>
                    <p className="text-muted-foreground">
                      Coba ubah filter atau kata kunci pencarian
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Events;