import { Link } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import { AlertCircle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-20">
        <div className="text-center max-w-2xl px-4">
          <AlertCircle size={120} className="mx-auto mb-6 text-[#4db8a8] opacity-95" aria-hidden="true" />
          <span className="sr-only">404 Not Found</span>
          <h1 className="text-6xl font-extrabold text-foreground mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-6">Halaman yang Anda cari tidak ditemukan.</p>
          <div className="flex gap-3 justify-center">
            <Link to="/" className="px-5 py-3 bg-[#4db8a8] text-white rounded-lg font-semibold hover:bg-[#3a9d8f] transition cursor-pointer">
              Kembali ke Beranda
            </Link>
            <Link to="/events" className="px-5 py-3 bg-card text-card-foreground border border-border rounded-lg hover:bg-accent transition cursor-pointer">
              Lihat Events
            </Link>
            <Link to="/about" className="px-5 py-3 bg-card text-card-foreground border border-border rounded-lg hover:bg-accent transition cursor-pointer">
              Tentang
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
