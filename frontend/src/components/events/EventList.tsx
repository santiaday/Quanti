import React, { useEffect, useState } from 'react';
import { IBaseEvent } from '@frontendTypes/events/event';
import { getEvents } from '@services/events/eventService';

const EventList: React.FC = () => {
  const [events, setEvents] = useState<IBaseEvent[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchData();
  }, []);

  const renderEventDetails = (event: IBaseEvent) => {
    switch (event.eventType) {
      case 'PageView':
        return (
          <>
            <p>
              <strong>URL:</strong> {event.url}
            </p>
            {event.referrer && (
              <p>
                <strong>Referrer:</strong> {event.referrer}
              </p>
            )}
          </>
        );
      case 'CustomEvent':
        return (
          <>
            <p>
              <strong>Event Name:</strong> {event.eventName}
            </p>
            {event.properties && (
              <p>
                <strong>Properties:</strong> {JSON.stringify(event.properties)}
              </p>
            )}
          </>
        );
      default:
        return <p>Unknown event type.</p>;
    }
  };

  return (
    <div>
      <h2>Event List</h2>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <p>
              <strong>Type:</strong> {event.eventType}
            </p>
            <p>
              <strong>Timestamp:</strong> {new Date(event.createdAt).toLocaleString()}
            </p>
            {renderEventDetails(event)}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
