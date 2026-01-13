import { Info, Target, Heart } from 'lucide-react';
import Footer from '../../components/ui/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#4db8a8] to-[#3a9d8f] text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tentang FestKita</h1>
          <p className="text-lg text-white/90 max-w-2xl">
            Temukan dan pesan tiket untuk event favorit Anda dengan mudah
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        {/* Main Card */}
        <div className="bg-card border border-border rounded-lg shadow-md p-8 mb-12">
          <div className="flex items-start gap-4">
            <Info className="text-[#4db8a8] shrink-0" size={28} />
            <div>
              <h2 className="text-2xl font-bold text-card-foreground mb-3">Apa itu FestKita?</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                FestKita adalah platform pemesanan tiket yang memudahkan Anda menemukan dan memesan tiket untuk konser, festival, workshop, dan acara lokal lainnya. Temukan event berdasarkan kategori, lihat informasi lengkap seperti lokasi, tanggal, dan harga, lalu pesan tiket dengan cepat melalui antarmuka yang sederhana dan sistem pembayaran yang aman.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-card border border-border rounded-lg shadow-md p-6 hover:shadow-xl transition">
            <div className="bg-[#4db8a8]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Target className="text-[#4db8a8]" size={24} />
            </div>
            <h3 className="text-xl font-bold text-card-foreground mb-3">Misi Kami</h3>
            <p className="text-muted-foreground">
              Memberikan akses mudah dan terpercaya untuk semua orang dalam menemukan dan memesan tiket event di Indonesia.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-card border border-border rounded-lg shadow-md p-6 hover:shadow-xl transition">
            <div className="bg-[#4db8a8]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Heart className="text-[#4db8a8]" size={24} />
            </div>
            <h3 className="text-xl font-bold text-card-foreground mb-3">Visi Kami</h3>
            <p className="text-muted-foreground">
              Menjadi platform nomor satu untuk pemesanan tiket event yang dipercaya oleh jutaan pengguna di seluruh Indonesia.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-card border border-border rounded-lg shadow-md p-6 hover:shadow-xl transition">
            <div className="bg-[#4db8a8]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Info className="text-[#4db8a8]" size={24} />
            </div>
            <h3 className="text-xl font-bold text-card-foreground mb-3">Komitmen Kami</h3>
            <p className="text-muted-foreground">
              Memberikan layanan terbaik dengan interface yang user-friendly dan sistem keamanan pembayaran yang terjamin.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
