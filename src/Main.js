import React from "react";
import { hot } from 'react-hot-loader/root';
import { Routes, Route, Link } from "react-router-dom";
import CalendarView from "./CalendarView";
import Home from "./Home";

class Main extends React.Component {
    render() {
      return (
          <Routes>
              <Route exact path='/'></Route>
              <Route exact path='/home' element={<Home />}></Route>
              <Route exact path='/calendar' element={<CalendarView />}></Route>
          </Routes>
      );
    }
}

export default Main;
