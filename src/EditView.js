import React from "react";
import Navbar from "./NavBar";
import ScheduleSelector from "react-schedule-selector";
import 'url-search-params-polyfill';

let currentUser = null;

class EditView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: null,
            numDays: null,
            dateFormat: null, 
            creator: null,
            availableTime: null,
            users: null,
            youFreeID: null,
            ready: false
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

    console.log(currentUser)
    console.log(this.state.creator)
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

    handleAddUser = selectedOption => {
        this.setState({users: users.append(addedUser)})
    }

    render() {
        if (this.state.ready) {
            // if (this.state.creator === currentUser) {
                return (
                    <div>
                        <Navbar />
                        <h1>hello this kinda works</h1>
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
                        
                        <div className="mb-5 m-auto">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="addedUser">Invite Users to This youFree:</label>
                                    <input className="form-control" type="text" name="addedUser" id="addedUser" onChange={this.handleAddUser} required/>
                                <div className="invalid-feedback">Please provide an existing username for your youFree.</div> 
                                </div>
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
            // }
            // else {
            //     return (
            //         <div>
            //             <Navbar />
            //             <div className="col-md-6 themed-grid-col">
            //                 <p className="text-center">Click and Drag to Toggle; Saved Immediately</p>
            //                 <ScheduleSelector
            //                     selection={this.state.schedule}
            //                     startDate={this.state.startDate}
            //                     numDays={this.state.numDays}
            //                     minTime={8}
            //                     maxTime={22}
            //                     hourlyChunks={4}
            //                     dateFormat={this.state.dateFormat}
            //                     timeFormat={"h:mm a"}
            //                     unselectedColor={"#FA3D24"}
            //                     selectedColor={"rgba(80, 182, 51, 1)"}
            //                     hoveredColor={"#ADB2AE"}
            //                     onChange={this.handleState}
            //                 />
            //             </div>
            //             <div className="col-md-3 themed-grid-col">
            //                 <form action="/create" method="PUT">
            //                     <div className="d-grid d-sm-block text-center">
            //                         <button type="submit" className="btn btn-primary">Update</button>
            //                     </div>
            //                 </form>
            //             </div>
            //         </div>
                // )
            }
        }
    
}

export default EditView;