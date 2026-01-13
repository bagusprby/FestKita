import { Link } from 'react-router-dom';
import { Ticket, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="flex flex-col">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Ticket size={24} />
                </div>
                <span className="text-xl font-bold">FestKita</span>
              </Link>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">
                Platform tiket event terpercaya dan terlengkap di Indonesia. Temukan dan daftarkan dirimu di ribuan event menarik.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Menu Utama</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    className="text-primary-foreground/80 hover:text-white transition duration-200"
                  >
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link
                    to="/events"
                    className="text-primary-foreground/80 hover:text-white transition duration-200"
                  >
                    Jelajahi Events
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-primary-foreground/80 hover:text-white transition duration-200"
                  >
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <a
                    href="/admin/login"
                    className="text-primary-foreground/80 hover:text-white transition duration-200"
                  >
                    Admin Login
                  </a>
                </li>
              </ul>
            </div>


            {/* Contact Info */}
            <div>
              <h3 className="font-bold text-lg mb-4">Hubungi Kami</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Mail size={18} className="mt-0.5 flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-sm text-primary-foreground/80">Email</span>
                    <a
                      href="mailto:info@festkita.com"
                      className="hover:text-white transition duration-200"
                    >
                      Festkita@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={18} className="mt-0.5 flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-sm text-primary-foreground/80">Telepon</span>
                    <a
                      href="tel:+628123456789"
                      className="hover:text-white transition duration-200"
                    >
                      +62 812 5927 5313
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-sm text-primary-foreground/80">Lokasi</span>
                    <span className="text-sm">Yogyakarta, Indonesia</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
