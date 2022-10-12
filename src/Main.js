import React from "react";
import { hot } from 'react-hot-loader/root';
import { Routes, Route, Link } from "react-router-dom";
import CalendarView from "./CalendarView";
import EditView from "./EditView";
import Home from "./Home";
import Login from "./Login";

class Main extends React.Component {
    render() {
      return (
          <Routes>
              <Route exact path='/' element={<Login />}></Route>
              <Route exact path='/home' element={<Home />}></Route>
              <Route exact path='/create-calendar' element={<CalendarView />}></Route>
              <Route exact path='/edit-calendar' element={<EditView />}></Route>
          </Routes>
      );
    }
}

export default Main;
