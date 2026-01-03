export default function EventRow({ event, onDetail, onEdit, onDelete }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-purple-200 hover:shadow-2xl transition-all duration-300">
      <div className="relative overflow-hidden">
        <div className="h-52 bg-gradient-to-br from-gray-100 to-gray-50">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-gray-700 text-xs font-medium rounded-lg shadow-lg">
            {event.category}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 leading-tight">
          {event.name}
        </h3>
        
        <div className="space-y-2 mb-5">
          <div className="flex items-center gap-2.5 text-sm text-gray-600">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-gray-600">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="line-clamp-1">{event.location}</span>
          </div>
          <div className="pt-1">
            <p className="text-xl font-bold text-purple-600">{formatPrice(event.price)}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onDetail(event)}
            className="flex-1 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-lg transition-colors"
          >
            Detail
          </button>
          <button
            onClick={() => onEdit(event)}
            className="flex-1 px-4 py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-700 text-sm font-medium rounded-lg transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(event)}
            className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded-lg transition-colors"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}