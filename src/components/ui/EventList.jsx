import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';

const EventList = ({ events }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (!events || events.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground text-lg">No events found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <div
          key={event.id}
          onClick={() => navigate(`/event/${event.id}`)}
          className="bg-card border border-border rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition group"
        >
          {/* Event Image */}
          <div className="relative h-48 overflow-hidden bg-muted">
            <img
              src={event.image || 'https://via.placeholder.com/400x200?text=Event+Image'}
              alt={event.name || 'Event'}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
              }}
            />
            <div className="absolute top-3 right-3">
              <span className="bg-background/90 text-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-md border border-border">
                {event.category || 'Event'}
              </span>
            </div>
          </div>

          {/* Event Details */}
          <div className="p-5">
            <h3 className="text-xl font-bold text-card-foreground mb-3 line-clamp-2 group-hover:text-primary transition">
              {event.name || 'Untitled Event'}
            </h3>

            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-2 text-muted-foreground text-sm">
                <Calendar size={16} className="mt-0.5 shrink-0" />
                <span>{event.date ? formatDate(event.date) : 'Date TBA'}</span>
              </div>
              <div className="flex items-start gap-2 text-muted-foreground text-sm">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span className="line-clamp-1">{event.location || 'Location TBA'}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground">Starting from</p>
                <p className="text-lg font-bold text-primary">
                  {event.price ? formatPrice(event.price) : 'Price TBA'}
                </p>
              </div>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition text-sm font-medium">
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;