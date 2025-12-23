import { useEffect, useState } from "react";
import Navbar from "../../components/ui/Navbar";
import EventCard from "../../components/ui/EventCard";
import { eventService } from "../../services/eventService";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    eventService.getAll()
      .then(res => {
        setEvents(res.data);
        console.log("Data event (user):", res.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </>
  );
}
