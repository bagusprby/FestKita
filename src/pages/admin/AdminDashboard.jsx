import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventService } from '../../services/eventService';
import { Plus, Calendar, DollarSign, Users, TrendingUp, Edit, Trash2, Eye, LogOut } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalRevenue: 0,
    totalUsers: 0,
    growthRate: 0
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const response = await eventService.getAll();
      setEvents(response.data);
      calculateStats(response.data);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (eventData) => {
    const totalRevenue = eventData.reduce((sum, event) => sum + (event.price || 0), 0);
    setStats({
      totalEvents: eventData.length,
      totalRevenue: totalRevenue,
      totalUsers: 1250, // Mock data
      growthRate: 23.5 // Mock data
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus event ini?')) {
      try {
        await eventService.remove(id);
        loadEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Gagal menghapus event');
      }
    }
  };

  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin logout?')) {
      localStorage.removeItem('isAdminLoggedIn');
      navigate('/admin/login');
    }
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
      {/* Header */}
      <div className="bg-gradient-to-br from-[#4db8a8] to-[#3a9d8f] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard Admin</h1>
              <p className="opacity-90">Kelola event dan monitor performa platform</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/admin/event/create')}
                className="bg-white text-[#4db8a8] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition flex items-center gap-2"
              >
                <Plus size={20} />
                Tambah Event
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition flex items-center gap-2"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Calendar className="text-blue-600" size={24} />
              </div>
              <span className="text-xs text-green-600 font-semibold">+12%</span>
            </div>
            <p className="text-muted-foreground text-sm mb-1">Total Event</p>
            <p className="text-3xl font-bold text-foreground">{stats.totalEvents}</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <DollarSign className="text-green-600" size={24} />
              </div>
              <span className="text-xs text-green-600 font-semibold">+{stats.growthRate}%</span>
            </div>
            <p className="text-muted-foreground text-sm mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-foreground">{formatPrice(stats.totalRevenue)}</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-xl">
                <Users className="text-purple-600" size={24} />
              </div>
              <span className="text-xs text-green-600 font-semibold">+8%</span>
            </div>
            <p className="text-muted-foreground text-sm mb-1">Total Users</p>
            <p className="text-3xl font-bold text-foreground">{stats.totalUsers}</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-xl">
                <TrendingUp className="text-orange-600" size={24} />
              </div>
              <span className="text-xs text-green-600 font-semibold">+{stats.growthRate}%</span>
            </div>
            <p className="text-muted-foreground text-sm mb-1">Growth Rate</p>
            <p className="text-3xl font-bold text-foreground">{stats.growthRate}%</p>
          </div>
        </div>

        {/* Events Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Daftar Event</h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4db8a8]"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Event</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Kategori</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Tanggal</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Lokasi</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Harga</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event, index) => (
                    <tr key={event.id} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={event.image || 'https://via.placeholder.com/80x80?text=Event'}
                            alt={event.name}
                            className="w-12 h-12 rounded-lg object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                            }}
                          />
                          <div>
                            <p className="font-semibold text-foreground line-clamp-1">{event.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-[#4db8a8]/10 text-[#4db8a8] px-3 py-1 rounded-full text-sm font-medium">
                          {event.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {formatDate(event.date)}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {event.location}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-foreground">
                        {formatPrice(event.price)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => navigate(`/event/${event.id}`)}
                            className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition"
                            title="Lihat Detail"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => navigate(`/admin/event/edit/${event.id}`)}
                            className="p-2 hover:bg-green-100 text-green-600 rounded-lg transition"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(event.id)}
                            className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition"
                            title="Hapus"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && events.length === 0 && (
            <div className="text-center py-12">
              <Calendar size={48} className="mx-auto text-muted-foreground opacity-50 mb-4" />
              <p className="text-muted-foreground">Belum ada event yang ditambahkan</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;