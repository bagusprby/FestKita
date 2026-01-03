import EventRow from "./EventRow";

export default function EventTable({ events, onDetail, onEdit, onDelete }) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <EventRow
            key={event.id}
            event={event}
            onDetail={onDetail}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {events.length === 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <p className="text-gray-400 text-xl">Tidak ada event ditemukan</p>
        </div>
      )}
    </div>
  );
}