import React from "react";
import EventCalendar from "./EventCalendar";

class EventGroup extends React.Component {
<<<<<<< HEAD
=======
  constructor(props) {
    super(props)
    this.state = {
      events: this.props.events
    }
  }
>>>>>>> 74c5f47e0f9786c89b45061db8dfa96a3f64d55e
    render() {
        return (
            <div className="mb-5">
                <h1 className="mb-3">{this.props.title}</h1>
<<<<<<< HEAD
                {calendars.map( (calendar, index) => 
                    this.props.owner === calendar.owner &&
                    <EventCalendar key={index} id={index} title={calendar.title} owner={calendar.owner} />
=======
                {this.state.events.map( (event, index) => 
                    <EventCalendar 
                      key={index} 
                      id={index} 
                      name={event.name}
                      users={event.users}
                      creator={event.creator}
                      youFreeID={event.youFreeID}
                      dateFormat={event.dateFormat}
                      numDays={event.numDays}
                      startDate={event.startDate}
                      availableTimes={event.availableTimes}/>
>>>>>>> 74c5f47e0f9786c89b45061db8dfa96a3f64d55e
                )}
            </div>
        )
    }
}

export default EventGroup;
