import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

<<<<<<< HEAD
=======
const view = function(e) {
    e.preventDefault()
    let json = {
        name: this.props.name,
        users: this.props.users,
        creator: this.props.creator,
        availableTimes: this.props.availableTimes,
        youFreeID: this.props.youFreeID,
        dateFormat: this.props.dateFormat,
        numDays: this.props.numDays,
        startDate: this.props.startDate
      }
      let body = JSON.stringify(json)
      fetch( '/view', {
        method:'GET',
        body 
      })
}

window.onload = function() {
    const button = document.getElementById( "viewButton" )
    button.onclick = view
}

>>>>>>> 74c5f47e0f9786c89b45061db8dfa96a3f64d55e
class EventCalendar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name,
            users: this.props.users,
            creator: this.props.creator,
            youFreeID: this.props.youFreeID,
            dateFormat: this.props.dateFormat,
            numDays: this.props.numDays,
            startDate: this.props.startDate,
            availableTimes: this.props.availableTimes
        }
    }

    handleClick( e ) {
        e.preventDefault()
        fetch('/view', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        // .then(response => response.json())
        // .then(json => {
            
        // })
        window.location.href = "http://localhost:8080/edit-calendar"
    }

    render() {
        return (
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title d-inline">{this.props.title}</h5>
                    <div className="d-md-flex justify-content-md-end">
<<<<<<< HEAD
                        <button className="btn btn-primary view-button" type="submit">View</button>
=======
                    <button className="btn btn-primary view-button" type="submit" onClick={this.handleClick}>View</button>
>>>>>>> 74c5f47e0f9786c89b45061db8dfa96a3f64d55e
                        <button className="btn btn-danger ms-1">Delete</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default EventCalendar;
