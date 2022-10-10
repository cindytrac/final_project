import React from "react";

class EventCalendar extends React.Component {
    render() {
        return (
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title d-inline">{this.props.title}</h5>
                    <div className="d-md-flex justify-content-md-end">
                        <button className="btn btn-primary me-1">View</button>
                        <button className="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default EventCalendar;
