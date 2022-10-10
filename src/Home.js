import React from "react";
import EventCalendar from "./EventCalendar";
import Navbar from "./NavBar";

const calendars = [
    {
      title: "Webware Final Project"
    },
    {
      title: "CS 1101 Homework"
    },
    {
      title: "Exec Meeting"
    }
  ]

class Home extends React.Component {
    render() {
        return (
            <div className="container">
                <Navbar />
                {calendars.map( (calendar, index) => <EventCalendar key={index} id={index} title={calendar.title} />)}
            </div>
        );
    }
}

export default Home;
