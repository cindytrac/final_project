import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CalendarView from "./CalendarView";
import Home from "./Home";
import Login from "./Login";
import NoPage from "./NoPage";
import Layout from "./Layout"

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="calendar" element={<CalendarView />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    );
  }
}

export default App;
