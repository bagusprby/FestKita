import { Button } from "./button";

export default function EventCard({ event }) {
  const handleBeli = () => {
    console.log("Beli tiket event:", event);
  };

  return (
    <div className="border rounded-lg p-4 shadow">
      <img
        src={event.image}
        alt={event.name}
        className="rounded mb-2"
      />

      <h3 className="text-lg font-bold">{event.name}</h3>
      <p>{event.location}</p>
      <p className="text-sm text-gray-500">{event.date}</p>
      <p className="font-semibold">Rp {event.price}</p>

      <Button
        className="mt-3 w-full"
        onClick={handleBeli}
      >
        Beli Tiket
      </Button>
    </div>
  );
}
