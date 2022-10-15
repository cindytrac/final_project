import React from "react";
import EventCalendar from "./EventCalendar";

class EventGroup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            events: this.props.events,
        }
    }
    render() {
        return (
            <div className="mb-5">
                <h1 className="mb-3">{this.props.title}</h1>
                {this.props.events.length > 0 &&
                this.props.events.map( (event, index) => 
                    <EventCalendar 
                      key={index} 
                      id={index} 
                      event={event}/>
                )}
                {this.props.events.length === 0 &&
                <i>{this.props.message}</i>}
            </div>
        )
    }
}

export default EventGroup;
