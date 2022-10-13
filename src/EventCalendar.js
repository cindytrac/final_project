import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

// const view = function(e) {
//     e.preventDefault()
//     let json = {
//         name: this.props.name,
//         users: this.props.users,
//         creator: this.props.creator,
//         availableTimes: this.props.availableTimes,
//         youFreeID: this.props.youFreeID,
//         dateFormat: this.props.dateFormat,
//         numDays: this.props.numDays,
//         startDate: this.props.startDate
//       }
//       let body = JSON.stringify(json)
//       fetch( '/view', {
//         method:'GET',
//         body 
//       })
// }

// const view = function(e) {
//     e.preventDefault()
//     let json = {
//         name: this.props.name,
//         users: this.props.users,
//         creator: this.props.creator,
//         availableTimes: this.props.availableTimes,
//         youFreeID: this.props.youFreeID,
//         dateFormat: this.props.dateFormat,
//         numDays: this.props.numDays,
//         startDate: this.props.startDate
//       }
//       let body = JSON.stringify(json)
//       fetch( '/view', {
//         method:'GET',
//         body 
//       })
// }

// window.onload = function() {
//     const button = document.getElementById( "viewButton" )
//     button.onclick = view
// }

class EventCalendar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "", 
            ready: false
        }
    }

    handleClick( e ) {
        e.preventDefault()
        fetch('/view', {
            method:'POST',
            body: {
                youFreeID: this.props.event.youFreeID
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
        // .then(response => response.json())
        // .then(json => {
            
        // })
        window.location.href = "http://localhost:8080/edit-calendar"
    }

    componentDidMount() {
        axios.post("/grabName", {youFreeID: this.props.event.youFreeID})
        .then(res => {
            this.setState({ name: res.data.name })
        })
        .then(res => this.setState({ ready: true}))
    }

    render() {
        // this.componentDidMount()
        if (this.state.ready) {
            return (
                <div className="card mb-3">
                    <div className="card-body">
                        {/* <h5 className="card-title d-inline">{this.state.name}</h5> */}
                        <div className="d-md-flex justify-content-md-end">
                        <button className="btn btn-primary view-button" type="submit" onClick={this.handleClick}>View</button>
                            <button className="btn btn-danger ms-1">Delete</button>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            <h1>HI</h1>
        }
    }
}


export default EventCalendar;
