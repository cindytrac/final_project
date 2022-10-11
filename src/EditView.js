import React from "react";
import Navbar from "./NavBar";
import ScheduleSelector from "react-schedule-selector";

class EditView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            schedule: [] //need to have this be the imported schedule of the user
        }

      this.handleDisplay = this.handleDisplay.bind(this);
      this.handleState = this.handleState.bind(this);
      this.handleDateChange = this.handleDateChange.bind(this);
      this.submitCalendar = this.submitCalendar.bind(this);

    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="col-md-6 themed-grid-col">
                    <p className="text-center">Click and Drag to Toggle; Saved Immediately</p>
                    <ScheduleSelector
                        selection={this.state.schedule}
                        startDate={this.state.selectedOption.startDate}
                        numDays={this.state.selectedOption.numDays}
                        minTime={8}
                        maxTime={22}
                        hourlyChunks={4}
                        dateFormat={this.state.selectedOption.dateFormat}
                        timeFormat={"h:mm a"}
                        unselectedColor={"#FA3D24"}
                        selectedColor={"rgba(80, 182, 51, 1)"}
                        hoveredColor={"#ADB2AE"}
                        onChange={this.handleState}
                    />
                </div>
                <div className="col-md-3 themed-grid-col">
                    <form action="/create" method="PUT">
                        <div className="d-grid d-sm-block text-center">
                            <button type="submit" className="btn btn-primary">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default EditView;