import React from "react";

class EventCalendar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            youFreeID: this.props.youFreeID
        }
    }

    render() {
        return (
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title d-inline">{this.props.title}</h5>
                    <div className="d-md-flex justify-content-md-end">
                        <button className="btn btn-primary view-button" type="submit">View</button>
                        <button className="btn btn-danger ms-1">Delete</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default EventCalendar;
