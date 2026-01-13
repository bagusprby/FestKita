import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventService } from '../../services/eventService';
import { Calendar, MapPin, Clock, Shield, MessageCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import Footer from '../../components/ui/Footer';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ticketQuantity, setTicketQuantity] = useState(1);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        setLoading(true);
        const response = await eventService.getById(id);
        setEvent(response.data);
      } catch (error) {
        console.error('Error loading event:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price).replace('IDR', 'Rp');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleWhatsAppBooking = () => {
    const message = `Halo, saya ingin memesan ${ticketQuantity} tiket untuk event *${event.name}*`;
    const phoneNumber = '6281259275313'; 
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4db8a8]"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-background">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Event tidak ditemukan</h2>
        <button onClick={() => navigate('/')} className="text-[#4db8a8] hover:underline cursor-pointer">
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  const subtotal = event.price * ticketQuantity;
  const serviceFee = 0; 
  const total = subtotal + serviceFee;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition cursor-pointer"
        >
          <ArrowLeft size={20} />
          Kembali
        </button>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative h-96 rounded-2xl overflow-hidden bg-muted mb-6">
              <img
                src={event.image || 'https://via.placeholder.com/800x400?text=Event+Image'}
                alt={event.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-[#4db8a8] text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {event.category || 'Event'}
                </span>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-foreground mb-6">
              {event.name}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-[#e8f5f3] rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-[#4db8a8] p-2 rounded-lg">
                    <Calendar className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Tanggal & Waktu</p>
                    <p className="font-semibold text-gray-900">
                      {formatDate(event.date)}
                    </p>
                    <p className="text-sm text-gray-600">pukul {formatTime(event.date)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#e8f5f3] rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-[#4db8a8] p-2 rounded-lg">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Lokasi</p>
                    <p className="font-semibold text-gray-900">{event.location}</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#e8f5f3] rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-[#4db8a8] p-2 rounded-lg">
                    <Clock className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Durasi</p>
                    <p className="font-semibold text-gray-900">3-4 Jam</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-card-foreground">Tentang Event</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-xl p-4 text-center">
                <Shield className="mx-auto text-[#4db8a8] mb-2" size={32} />
                <h3 className="font-semibold mb-1">Tiket Resmi</h3>
                <p className="text-sm text-muted-foreground">Dijamin asli & valid</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4 text-center">
                <MessageCircle className="mx-auto text-[#4db8a8] mb-2" size={32} />
                <h3 className="font-semibold mb-1">Dukungan 24/7</h3>
                <p className="text-sm text-muted-foreground">Siap membantu Anda</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4 text-center">
                <CheckCircle className="mx-auto text-[#4db8a8] mb-2" size={32} />
                <h3 className="font-semibold mb-1">Konfirmasi Instan</h3>
                <p className="text-sm text-muted-foreground">E-ticket langsung dikirim</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl shadow-lg p-6 sticky top-6">
              <div className="mb-6">
                <p className="text-muted-foreground text-sm mb-2">Harga mulai dari</p>
                <p className="text-4xl font-bold text-[#4db8a8]">
                  {formatPrice(event.price)}
                </p>
                <p className="text-sm text-muted-foreground">per tiket</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-card-foreground mb-3">
                  Jumlah Tiket
                </label>
                <div className="flex items-center justify-between bg-accent rounded-xl p-2">
                  <button
                    onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                    className="w-12 h-12 rounded-lg bg-card hover:bg-muted border border-border transition flex items-center justify-center text-xl font-semibold cursor-pointer"
                  >
                    −
                  </button>
                  <span className="text-2xl font-bold text-foreground">{ticketQuantity}</span>
                  <button
                    onClick={() => setTicketQuantity(ticketQuantity + 1)}
                    className="w-12 h-12 rounded-lg bg-card hover:bg-muted border border-border transition flex items-center justify-center text-xl font-semibold cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="border-t border-border pt-4 mb-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal ({ticketQuantity} tiket)</span>
                  <span className="font-semibold text-foreground">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Biaya layanan</span>
                  <span className="font-semibold text-[#4db8a8]">Gratis</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="font-bold text-2xl text-[#4db8a8]">{formatPrice(total)}</span>
                </div>
              </div>

              <button
                onClick={handleWhatsAppBooking}
                className="w-full bg-[#ff6b6b] hover:bg-[#ff5252] text-white py-4 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <MessageCircle size={20} />
                Pesan via WhatsApp
              </button>

              <div className="mt-4 text-center">
                <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                  <Shield size={14} />
                  Pembayaran aman & terjamin
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventDetail;