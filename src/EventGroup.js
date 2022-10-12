import React from "react";
import EventCalendar from "./EventCalendar";

const calendars = [
    {
      title: "Webware Final Project",
      owner: true
    },
    {
      title: "CS 1101 Homework",
      owner: false
    },
    {
      title: "Exec Meeting",
      owner: false
    }
  ]

class EventGroup extends React.Component {
    render() {
        return (
            <div className="mb-5">
                <h1 className="mb-3">{this.props.title}</h1>
                {calendars.map( (calendar, index) => 
                    this.props.owner === calendar.owner &&
                    <EventCalendar key={index} id={index} title={calendar.title} owner={calendar.owner} />
                )}
            </div>
        )
    }
}

export default EventGroup;
