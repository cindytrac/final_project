import React from "react";

class EventCalendar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "Holder", 
            ready: false
        }
    }

    handleClick( e ) {
        // e.preventDefault()

        const json = {
            "youFreeID": this.props.event.youFreeID
        }

        let body = JSON.stringify(json)
        fetch('/view', {
            method:'POST',
            body,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        // .then(response => response.json())
        // .then(json => {
            
        // })
        window.location.href = "http://localhost:8080/edit-calendar"
    }

    componentDidMount( e ) {
        // e.preventDefault()
        const json = {
            "youFreeID": this.props.event.youFreeID
        }

        let body = JSON.stringify(json)
        fetch("/grabName", {
            method:'POST',
            body,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(json => {
            this.setState({ name: json.name })
            this.setState({ ready: true})
        })
    }

    render() {
        this.componentDidMount()
        if (this.state.ready) {
            return (
                <div className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title d-inline">{this.state.name}</h5>
                        <div className="d-md-flex justify-content-md-end">
                        <button className="btn btn-primary view-button" type="submit" onClick={this.handleClick}>View</button>
                            <button className="btn btn-danger ms-1">Delete</button>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default EventCalendar;
