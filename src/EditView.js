import React from "react";
import Navbar from "./NavBar";
import ScheduleSelector from "react-schedule-selector";

class EditView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
<<<<<<< HEAD
            schedule: [], //need to have this be the imported schedule of the user
            creator: null
=======
            schedule: [],
            startDate: props.location.startDate,
            numDays: props.location.numDays,
            dateFormat: props.location.dateFormat,
            creator: props.location.creator,
            availableTime: props.location.availableTime,
            users: props.location.users,
            youFreeID: props.location.youFreeID,
            availableTime: props.location.availableTime,
            ready: false
>>>>>>> 74c5f47e0f9786c89b45061db8dfa96a3f64d55e
        }

    //   this.handleDisplay = this.handleDisplay.bind(this);
    //   this.handleState = this.handleState.bind(this);
    //   this.handleDateChange = this.handleDateChange.bind(this);
    //   this.submitCalendar = this.submitCalendar.bind(this);

    }
    render() {

        if (creator == false) {

    }
<<<<<<< HEAD
        return (
            <div>
                <Navbar />
                <div className="col-md-6 themed-grid-col">
                    <p className="text-center">Click and Drag to Toggle; Saved Immediately</p>
                    {/* <ScheduleSelector
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
                    /> */}
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
=======

    componentDidMount() {
        e.preventDefault();

        const id = props.location.youFreeID
        const creator = rops.location.creator

        const json = {
            id: id,
            creator:creator
        }
        
        axios.post("/getAvail", {json} )
        .then(res => {
            console.log(res.data.schedule)
            this.setState({ schedule: res.data.schedule })
        })
        .then(res=> this.setState({ready:true}))
    }

    render() {
        this.componentDidMount()
        if (this.state.ready) {
            if (props.location.creator === currentUser) {
                return (
                    <div>
                        <Navbar />
                        <div className="col-md-6 themed-grid-col">
                            <p className="text-center">Click and Drag to Toggle; Saved Immediately</p>
                            <ScheduleSelector
                                selection={this.state.schedule}
                                startDate={props.location.startDate}
                                numDays={props.location.numDays}
                                minTime={8}
                                maxTime={22}
                                hourlyChunks={4}
                                dateFormat={props.location.dateFormat}
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
                        <h1>Available times:</h1>
                    </div>
                )
            }
            else {
                return (
                    <div>
                        <Navbar />
                        <div className="col-md-6 themed-grid-col">
                            <p className="text-center">Click and Drag to Toggle; Saved Immediately</p>
                            <ScheduleSelector
                                selection={this.state.schedule}
                                startDate={props.location.startDate}
                                numDays={props.location.numDays}
                                minTime={8}
                                maxTime={22}
                                hourlyChunks={4}
                                dateFormat={props.location.dateFormat}
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
>>>>>>> 74c5f47e0f9786c89b45061db8dfa96a3f64d55e
    }
}

export default EditView;