import { useEffect, useState } from "react";
import { eventService } from "../../services/eventService";

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    eventService.getAll()
      .then(res => {
        setEvents(res.data);
        console.log("Data event (admin):", res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (event) => {
    console.log("Hapus event:", event);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Admin Dashboard
      </h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Nama Event</th>
            <th className="border p-2">Tanggal</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {events.map(event => (
            <tr key={event.id}>
              <td className="border p-2">{event.name}</td>
              <td className="border p-2">{event.date}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(event)}
                  className="text-red-600 font-semibold"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
