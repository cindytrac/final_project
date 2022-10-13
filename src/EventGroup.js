import React from "react";
import EventCalendar from "./EventCalendar";

class EventGroup extends React.Component {
    render() {
        return (
            <div className="mb-5">
                <h1 className="mb-3">{this.props.title}</h1>
                {this.props.events.map( (event, index) => 
                    <EventCalendar 
                      key={index} 
                      id={index} 
                      event={event}/>
                )}
            </div>
        )
    }
}

export default EventGroup;