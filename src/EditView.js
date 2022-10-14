import React from "react";
import Navbar from "./NavBar";
import ScheduleSelector from "react-schedule-selector";
<<<<<<< HEAD
import axios from "axios";
=======
import 'url-search-params-polyfill';

let currentUser = null;
>>>>>>> e5680e84f2a2c6d9924fdaaa9d1476fe6b5ab248

class EditView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
<<<<<<< HEAD
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
=======
            // startDate: null,
            // numDays: null,
            // dateFormat: null, 
            // creator: null,
            // availableTime: null,
            // users: null,
            // youFreeID: null
>>>>>>> e5680e84f2a2c6d9924fdaaa9d1476fe6b5ab248
        }

      this.handleState = this.handleState.bind(this);
      this.handleLoad = this.handleLoad.bind(this);
    }

    // handleNewUser = (newUser) => {
    //     this.setState({users: []})
    // }

    handleState = (newSchedule) => {
        this.setState({schedule: newSchedule});
        console.log(this.state.schedule);
    }

<<<<<<< HEAD
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
=======
    handleLoad = async () => {
    const params = new URLSearchParams(window.location.search);

    const youFreeID = params.get("id");

        const param = {
            youFreeID: youFreeID
        }

    let body = JSON.stringify(param)

    const res =  await fetch("/grabTemplate", {
        method:"POST",
        body,
        headers: {
            "Content-Type": "application/json"
        }
    }
    )
    const json = await res.json()

    currentUser = json.currentUser;
    this.setState({ schedule: json.schedule })
    this.setState({ startDate: json.startDate})
    this.setState({ numDays: json.numDays})
    this.setState({ dateFormat: json.dateFormat})
    this.setState({ creator: json.creator})
    this.setState({ availableTime: json.availableTime})
    this.setState({ users: json.users})
    this.setState({ youFreeID: json.youFreeID})

    console.log("hello")
    console.log(this.state.numDays)
    console.log("Im here now")
    this.setState({ready:true})


        // const id = props.location.youFreeID
        // const creator = rops.location.creator

        // const props = {
        //     id: id,
        //     creator:creator
        // }

        // let body = JSON.stringify(props)

        // fetch("/grabAvail", {
        //     method:'POST',
        //     body,
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        // .then(res => res.json())
        // .then(json => {
        //     console.log(json.schedule)
        //     this.setState({ schedule: json.schedule })
        //     this.setState({ready:true})
        // })
    }

    componentDidMount() {
        this.handleLoad()
    }

    render() {
        if (this.state.ready) {
            if (this.state.creator === currentUser) {
>>>>>>> e5680e84f2a2c6d9924fdaaa9d1476fe6b5ab248
                return (
                    <div>
                        <Navbar />
                        <div className="col-md-6 themed-grid-col">
                            <p className="text-center">Click and Drag to Toggle; Saved Immediately</p>
                            <ScheduleSelector
                                selection={this.state.schedule}
                                startDate={this.state.startDate}
                                numDays={this.state.numDays}
                                minTime={8}
                                maxTime={22}
                                hourlyChunks={4}
                                dateFormat={this.state.dateFormat}
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
                );
            }
<<<<<<< HEAD
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
=======
            else {
                return (
                    <div>
                        <Navbar />
                        <div className="col-md-6 themed-grid-col">
                            <p className="text-center">Click and Drag to Toggle; Saved Immediately</p>
                            <ScheduleSelector
                                selection={this.state.schedule}
                                startDate={this.state.startDate}
                                numDays={this.state.numDays}
                                minTime={8}
                                maxTime={22}
                                hourlyChunks={4}
                                dateFormat={this.state.dateFormat}
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
>>>>>>> e5680e84f2a2c6d9924fdaaa9d1476fe6b5ab248
    }

export default EditView;