// src/components/calendar/CalendarPage.jsx

import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalandarPage.css'

// Sample events data
const events = [
  {
    title: 'Meeting with Team',
    start: new Date(),
    end: new Date(moment().add(1, 'hour').toDate()),
    allDay: false,
  },
  {
    title: 'Project Deadline',
    start: new Date(moment().add(1, 'days').toDate()),
    end: new Date(moment().add(1, 'days').toDate()),
    allDay: true,
  }
];

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [eventsData, setEventsData] = useState(events);

  const handleSelectSlot = ({ start, end }) => {
    const title = prompt('New Event Name');
    if (title) {
      const newEvent = {
        title,
        start,
        end,
        allDay: false,
      };
      setEventsData([...eventsData, newEvent]);
    }
  };

  const handleSelectEvent = event => {
    const isDelete = window.confirm(`Would you like to delete the event '${event.title}'?`);
    if (isDelete) {
      setEventsData(eventsData.filter(e => e !== event));
    }
  };

  return (
    <div className="calendar-page">
      <Calendar
        localizer={localizer}
        events={eventsData}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
};

export default CalendarPage;
