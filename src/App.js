
import React from "react";
import { hot } from 'react-hot-loader/root';
import EventCalendar from "./EventCalendar";

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

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg mb-4">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">youFree?</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" href="#">Create</a>
                </li>
              </ul>
              <form className="nav-item d-flex">
                <a className="nav-link" href="#">Log out</a>
              </form>
            </div>
          </div>
        </nav>
        {calendars.map( (calendar, index) => <EventCalendar key={index} id={index} title={calendar.title} />)}
      </div>
    );
  }
}

export default hot(App);
