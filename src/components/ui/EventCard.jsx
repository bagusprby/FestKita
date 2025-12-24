import { Button } from "./button";

export default function EventCard({ event }) {
  const handleBooking = () => {
    console.log("Booking event:", event);
  };

  return (
    <div className="border rounded-lg p-4 shadow">
      <img src={event.image} alt={event.name} className="rounded mb-2" />
      <h3 className="font-bold text-lg">{event.name}</h3>
      <p>{event.location}</p>
      <p className="text-sm text-gray-500">{event.date}</p>

      <Button onClick={handleBooking} className="mt-2">
        Booking via WA
      </Button>
    </div>
  );
}
