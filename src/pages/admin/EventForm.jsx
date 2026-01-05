import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { eventService } from '../../services/eventService';
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react';

const EventForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Musik',
    date: '',
    price: '',
    location: '',
    description: '',
    image: ''
  });

  const categories = [
    'Musik',
    'Seni',
    'Stand Up',
    'Festival',
    'Workshop',
    'Olahraga',
    'Bisnis',
    'Komunitas'
  ];

  useEffect(() => {
    if (isEdit) {
      loadEvent();
    }
  }, [id]);

  const loadEvent = async () => {
    try {
      setLoading(true);
      const response = await eventService.getById(id);
      setFormData(response.data);
    } catch (error) {
      console.error('Error loading event:', error);
      alert('Gagal memuat data event');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.category || !formData.date || !formData.price || !formData.location) {
      alert('Mohon lengkapi semua field yang wajib diisi');
      return;
    }

    try {
      setLoading(true);
      
      if (isEdit) {
        await eventService.update(id, formData);
        alert('Event berhasil diupdate!');
      } else {
        await eventService.create(formData);
        alert('Event berhasil ditambahkan!');
      }
      
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Gagal menyimpan event');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4db8a8]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#4db8a8] to-[#3a9d8f] text-white py-8">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-2 mb-4 opacity-90 hover:opacity-100 transition"
          >
            <ArrowLeft size={20} />
            Kembali ke Dashboard
          </button>
          <h1 className="text-3xl font-bold">
            {isEdit ? 'Edit Event' : 'Tambah Event Baru'}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-8">
            {/* Image Preview */}
            {formData.image && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Preview Gambar
                </label>
                <div className="relative h-64 rounded-xl overflow-hidden bg-muted">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/800x400?text=Invalid+Image+URL';
                    }}
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nama Event */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Nama Event <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Contoh: Jazz Gunung 2025"
                  required
                  className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4db8a8]"
                />
              </div>

              {/* Kategori */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Kategori <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4db8a8]"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Tanggal */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Tanggal <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4db8a8]"
                />
              </div>

              {/* Harga */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Harga (Rp) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="750000"
                  required
                  min="0"
                  className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4db8a8]"
                />
              </div>

              {/* Lokasi */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Lokasi <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Contoh: Bromo Amphitheater"
                  required
                  className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4db8a8]"
                />
              </div>

              {/* URL Gambar */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-foreground mb-2">
                  URL Gambar
                </label>
                <div className="relative">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full pl-12 pr-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4db8a8]"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Gunakan URL gambar dari Unsplash, Pexels, atau upload ke hosting gambar
                </p>
              </div>

              {/* Deskripsi */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Deskripsi
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Tuliskan deskripsi lengkap tentang event..."
                  className="w-full px-4 py-3 bg-background border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4db8a8] resize-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-8 pt-6 border-t border-border">
              <button
                type="button"
                onClick={() => navigate('/admin/dashboard')}
                className="flex-1 px-6 py-3 border border-border rounded-xl font-semibold hover:bg-accent transition"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-[#4db8a8] hover:bg-[#3a9d8f] text-white rounded-xl font-semibold transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Save size={20} />
                    {isEdit ? 'Update Event' : 'Simpan Event'}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;