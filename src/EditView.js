import React from "react";
import Navbar from "./NavBar";
import ScheduleSelector from "react-schedule-selector";
import axios from "axios";

class EditView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            schedule: [],
            // startDate: props.location.startDate,
            // numDays: props.location.numDays,
            // dateFormat: props.location.dateFormat,
            // creator: props.location.creator,
            // availableTime: props.location.availableTime,
            // users: props.location.users,
            // youFreeID: props.location.youFreeID,
            // availableTime: props.location.availableTime,
            // ready: false
        }

      this.handleState = this.handleState.bind(this);
    }

    // handleNewUser = (newUser) => {
    //     this.setState({users: []})
    // }

    handleState = (newSchedule) => {
        this.setState({schedule: newSchedule});
        console.log(this.state.schedule);
    }

    componentDidMount() {
        // e.preventDefault();

        // const id = this.props.location.youFreeID
        // const creator = this.props.location.creator
        // const id = this.props.location.youFreeID
        // const creator = this.props.location.creator

        // const json = {
        //     id: id,
        //     creator:creator
        // }

        // axios.post("/getAvail", {json} )
        // .then(res => {
        //     console.log(res.data.schedule)
        //     this.setState({ schedule: res.data.schedule })
        // })
        // .then(res=> this.setState({ready:true}))
    }

    render() {
        this.componentDidMount()
        // if (this.state.ready) {
            // if (this.props.location.creator === currentUser) {
                return (
                    <div>
                        <Navbar />
                        <div className="col-md-6 themed-grid-col">
                            <p className="text-center">Click and Drag to Toggle; Saved Immediately</p>
                            {/* <ScheduleSelector
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
                            /> */}
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
                );
            }
            // else {
            //     return (
            //         <div>
            //             <Navbar />
            //             <div className="col-md-6 themed-grid-col">
            //                 <p className="text-center">Click and Drag to Toggle; Saved Immediately</p>
            //                 {/* <ScheduleSelector
            //                     selection={this.state.schedule}
            //                     startDate={props.location.startDate}
            //                     numDays={props.location.numDays}
            //                     minTime={8}
            //                     maxTime={22}
            //                     hourlyChunks={4}
            //                     dateFormat={props.location.dateFormat}
            //                     timeFormat={"h:mm a"}
            //                     unselectedColor={"#FA3D24"}
            //                     selectedColor={"rgba(80, 182, 51, 1)"}
            //                     hoveredColor={"#ADB2AE"}
            //                     onChange={this.handleState}
            //                 /> */}
            //             </div>
            //             <div className="col-md-3 themed-grid-col">
            //                 <form action="/create" method="PUT">
            //                     <div className="d-grid d-sm-block text-center">
            //                         <button type="submit" className="btn btn-primary">Update</button>
            //                     </div>
            //                 </form>
            //             </div>
            //         </div>
            //     )
            // }
        // }
    }

export default EditView;