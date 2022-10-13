import React, { useState} from "react";
import ScheduleSelector from "react-schedule-selector";
import Select from "react-select";
import Navbar from "./NavBar";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

const values = [
    {label: "Custom Week", weekType: 0, dateFormat:"M/D"},
    {label: "Blank Week", weekType: 1, dateFormat: "ddd"},
]

class Template extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            schedule: []
        }

    this.handleState = this.handleState.bind(this);

    }

    handleState = (newSchedule) => {
        this.setState({schedule: newSchedule});
    }

    render() {
        return(
            <div>
                <ScheduleSelector
                    selection={this.state.schedule}
                    startDate={this.props.startDate}
                    numDays={this.props.numDays}
                    minTime={8}
                    maxTime={22}
                    dateFormat={this.props.dateFormat}
                    timeFormat={"h:mm a"}
                    hourlyChunks={1}
                    unselectedColor={"#FA3D24"}
                    selectedColor={"rgba(80, 182, 51, 1)"}
                    hoveredColor={"#ADB2AE"}
                    onChange={this.handleState}
                    />
            </div>
        )
    }
}

class CalendarView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            weekType: 0,
            name: "Hello",
            schedule: [],
            dateFormat: "M/D",
            label: null,
            startDate: new Date(),
            numDays: 7, 
            minTime: 8,
            maxTime: 22,
            ready: false
        }

      this.handleDisplay = this.handleDisplay.bind(this);
      this.handleUpdate = this.handleUpdate.bind(this);
      this.handleCallBack = this.handleCallBack.bind(this);
      this.handleDateChange = this.handleDateChange.bind(this);
      this.handleDaysChange = this.handleDaysChange.bind(this);
      this.handleNumChange = this.handleNumChange.bind(this);
    //   this.handleMinChange = this.handleMinChange.bind(this);
    //   this.handleMaxChange = this.handleMaxChange.bind(this);
      this.submitCalendar = this.submitCalendar.bind(this);
    }
      
    handleDisplay = selectedOption => {
        this.setState({ready: false});
        this.setState({ weekType: selectedOption.weekType});
        this.setState({ label: selectedOption.label});
        this.setState({ dateFormat: selectedOption.dateFormat})
    };

    handleCallBack = (newSchedule) => {
        this.setState({ schedule: newSchedule })
    }

    handleUpdate = () => {
        this.setState({ ready: true });
    }

    handleNameChange = newName => {
        this.setState({ready: false});
        this.setState({name: newName.target.value});
    }

    handleDateChange = newDate => {
        this.setState({ready: false});
        const date = newDate.target.value;
        if(date.length == 10) {
            this.setState({startDate: new Date(date)}
            )
        }
    }

    handleCreate = event => {
        const json = {
            schedule:this.state.schedule,
            name:this.state.name,
            dateFormat: this.state.dateFormat,
            startDate: this.state.startDate,
            numDays: this.state.numDays, 
        }
        
        axios.post("/create", {json} )
        .then(res => {
            console.log(res.data)
        })
    }

    submitCalendar = submit => {
        for (let i = 0; i < this.state.schedule.length; i++) {
            // console.log((typeof (this.state.schedule[0])));
        }
      }

    // handleMinChange = newMin => {
    //     this.setState({ready: false})
    //     console.log("newMin: " + newMin.minTime);
    //     this.setState({minTime: newMin.target.value});
    //     console.log("state minTime: " + this.state.minTime);
    // }

    // handleMaxChange = newMax => {
    //     this.setState({ready: false});
    //     console.log("newMax: " + newMax);
    //     this.setState({maxTime: newMax.target.value})
    //     console.log("state maxTime: " + this.state.maxTime);
    // }

    handleNumChange = newNum => {
        this.setState({ready: false});
        this.setState({numDays: newNum.target.value})
    }

    handleDaysChange = newDay => {
        this.setState({ready: false});
        const day = newDay.target.value;
        switch (day) {
            case "Sun": 
                this.setState({startDate: new Date("10-09-2022")})
                break;
            case "Mon": 
                this.setState({startDate: new Date("10-10-2022")})
                break;
            case "Tue": 
                this.setState({startDate: new Date("10-11-2022")})
                break;
            case "Wed": 
                this.setState({startDate: new Date("10-12-2022")})
                break;
            case "Thu": 
                this.setState({startDate: new Date("10-13-2022")})
                break;
            case "Fri": 
                this.setState({startDate: new Date("10-14-2022")})
                break;
            case "Sat": 
                this.setState({startDate: new Date("10-15-2022")})
                break;
        }
    }

    render() {
        if (this.state.ready === false) {
            if (this.state.weekType === 0) {
            return (
                <div>
                    <Navbar />
                    <div className="row justify-content-evenly">
                        <div className="col-md-3 themed-grid-col">
                            <div className="mb-5 mt-5m-auto">
                                <p>Select the type of youFree you wish to create.</p>
                                <Select
                                    // value={this.state.label} 
                                    options={values} 
                                    placeholder={this.state.label}
                                    onChange={this.handleDisplay}
                                />
                            </div>
                            <p>Enter the information for your youFree below.</p>
                            <div className="mb-5 m-auto">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="youFreeName">Please enter a name:</label>
                                    <input className="form-control" type="text" name="youFreeName" id="youFreeName" onChange={this.handleNameChange} required/>
                                <div className="invalid-feedback">Please provide a name for your youFree.</div> 
                                </div>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="startDate">Start Date (mm-dd-yyyy):</label>
                                        <input className="form-control" type="text" name="startDate" id="startDate" onChange={this.handleDateChange} required/>
                                    <div className="invalid-feedback">Please provide a start date.</div> 
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="numberDays">Number of Days:</label>
                                            <input className="form-control" type="text" name="numberDays" id="numberDays" onChange={this.handleNumChange} required/>
                                            <div className="invalid-feedback">Please provide a number of days.</div> 
                                    </div>
                                    {/* <div className="mb-3">
                                        <label className="form-label" htmlFor="minTime">Min Time (1,2,etc):</label>
                                        <input className="form-control" type="text" name="minTime" id="minTime" onChange={this.handleMinChange} required/>
                                        <div className="invalid-feedback">Please provide a minimum time.</div> 
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="maxTime">Max Time (20,21,etc):</label>
                                        <input className="form-control" type="text" name="maxTime" id="maxTime" onChange={this.handleMaxChange} required/>
                                        <div className="invalid-feedback">Please provide a maximum time.</div> 
                                    </div> */}
                                <div className="d-grid d-sm-block text-center">
                                    <button type="submit" className="btn btn-primary" onClick={this.handleUpdate}>Update Template</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 themed-grid-col">
                            <div className="ms-5">
                                <h1 className="text-center">{this.state.name}</h1>
                                <p className="text-center">Click and Drag to Toggle; Saved Immediately</p>
                            </div>
                            <div className="mb-5 m-auto">
                                <div className="d-grid d-sm-block text-center">
                                    <button type="submit" className="btn btn-primary" onClick={this.handleCreate}>Create youFree?</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
            }
            else if (this.state.weekType == 1) {
                return (
                    <div>
                        <Navbar />
                        <div className="row justify-content-evenly">
                            <div className="col-md-3 themed-grid-col">
                                <div className="mb-5 mt-5m-auto">
                                    <p>Select the type of youFree you wish to create.</p>
                                    <Select
                                        // value={this.state.label} 
                                        options={values} 
                                        placeholder={this.state.label}
                                        onChange={this.handleDisplay}
                                    />
                                </div>
                                <p>Enter the information for your youFree below.</p>
                                <div className="mb-5 m-auto">
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="youFreeName">Please enter a name:</label>
                                        <input className="form-control" type="text" name="youFreeName" id="youFreeName" onChange={this.handleNameChange} required/>
                                        <div className="invalid-feedback">Please provide a name for your youFree.</div> 
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="startDate">Choose Starting Day (Mon,Tue,etc):</label>
                                        <input className="form-control" type="text" name="startDate" id="startDate" onChange={this.handleDaysChange} required/>
                                        <div className="invalid-feedback">Please provide a day of the week.</div> 
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="numberDays">Number of Days:</label>
                                        <input className="form-control" type="text" name="numberDays" id="numberDays" onChange={this.handleNumChange} required/>
                                        <div className="invalid-feedback">Please provide a number of days.</div> 
                                    </div>
                                    {/* <div className="mb-3">
                                        <label className="form-label" htmlFor="minTime">Min Time (1,2,etc):</label>
                                        <input className="form-control" type="text" name="minTime" id="minTime" onChange={this.handleMinChange} required/>
                                        <div className="invalid-feedback">Please provide a minimum time.</div> 
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="maxTime">Max Time (20,21,etc):</label>
                                        <input className="form-control" type="text" name="maxTime" id="maxTime" onChange={this.handleMaxChange} required/>
                                        <div className="invalid-feedback">Please provide a maximum time.</div> 
                                    </div> */}
                                    <div className="d-grid d-sm-block text-center">
                                        <button type="submit" className="btn btn-primary" onClick={this.handleUpdate}>Update Template</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 themed-grid-col">
                                <div className="ms-5">
                                    <h1 className="text-center">{this.state.name}</h1>
                                    <p className="text-center">Click and Drag to Toggle; Saved Immediately</p>
                                </div>
                                <div className="mb-5 m-auto">
                                    <form action="/create" method="POST">
                                        <div className="d-grid d-sm-block text-center">
                                            <button type="submit" className="btn btn-primary">Create youFree?</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        }
        else {
            if (this.state.weekType === 0) {
                return (
                    <div>
                        <Navbar />
                        <div className="row justify-content-evenly">
                            <div className="col-md-3 themed-grid-col">
                                <div className="mb-5 mt-5m-auto">
                                    <p>Select the type of youFree you wish to create.</p>
                                    <Select
                                        // value={this.state.label} 
                                        options={values} 
                                        placeholder={this.state.label}
                                        onChange={this.handleDisplay}
                                    />
                                </div>
                                <p>Enter the information for your youFree below.</p>
                                <div className="mb-5 m-auto">
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="youFreeName">Please enter a name:</label>
                                        <input className="form-control" type="text" name="youFreeName" id="youFreeName" onChange={this.handleNameChange} required/>
                                    <div className="invalid-feedback">Please provide a name for your youFree.</div> 
                                    </div>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="startDate">Start Date (mm-dd-yyyy):</label>
                                            <input className="form-control" type="text" name="startDate" id="startDate" onChange={this.handleDateChange} required/>
                                        <div className="invalid-feedback">Please provide a start date.</div> 
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="numberDays">Number of Days:</label>
                                                <input className="form-control" type="text" name="numberDays" id="numberDays" onChange={this.handleNumChange} required/>
                                                <div className="invalid-feedback">Please provide a number of days.</div> 
                                        </div>
                                        {/* <div className="mb-3">
                                            <label className="form-label" htmlFor="minTime">Min Time (1,2,etc):</label>
                                            <input className="form-control" type="text" name="minTime" id="minTime" onChange={this.handleMinChange} required/>
                                            <div className="invalid-feedback">Please provide a minimum time.</div> 
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="maxTime">Max Time (20,21,etc):</label>
                                            <input className="form-control" type="text" name="maxTime" id="maxTime" onChange={this.handleMaxChange} required/>
                                            <div className="invalid-feedback">Please provide a maximum time.</div> 
                                        </div> */}
                                    <div className="d-grid d-sm-block text-center">
                                        <button type="submit" className="btn btn-primary" onClick={this.handleUpdate}>Update Template</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 themed-grid-col">
                                <div className="ms-5">
                                    <h1 className="text-center">{this.state.name}</h1>
                                    <p className="text-center">Click and Drag to Toggle; Saved Immediately</p>
                                </div>
                                <div className="mb-5 m-auto">
                                    <form action="/create" method="POST">
                                        <div className="d-grid d-sm-block text-center">
                                            <button type="submit" className="btn btn-primary">Create youFree?</button>
                                        </div>
                                    </form>
                                </div>
                                <Template 
                                    selection={this.state.schedule} 
                                    startDate={this.state.startDate} 
                                    numDays={this.state.numDays}
                                    dateFormat={this.state.dateFormat}
                                    // minTime={this.state.minTime}
                                    // maxTime={this.state.maxTime}
                                    parentCallBack = {this.handleCallBack}
                                />
                            </div>
                        </div>
                    </div>
                );
            }
            else if (this.state.weekType == 1) {
                return (
                    <div>
                        <Navbar />
                        <div className="row justify-content-evenly">
                            <div className="col-md-3 themed-grid-col">
                                <div className="mb-5 mt-5m-auto">
                                    <p>Select the type of youFree you wish to create.</p>
                                    <Select
                                        // value={this.state.label} 
                                        options={values} 
                                        placeholder={this.state.label}
                                        onChange={this.handleDisplay}
                                    />
                                </div>
                                <p>Enter the information for your youFree below.</p>
                                <div className="mb-5 m-auto">
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="youFreeName">Please enter a name:</label>
                                        <input className="form-control" type="text" name="youFreeName" id="youFreeName" onChange={this.handleNameChange} required/>
                                        <div className="invalid-feedback">Please provide a name for your youFree.</div> 
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="startDate">Choose Starting Day (Mon,Tue,etc):</label>
                                        <input className="form-control" type="text" name="startDate" id="startDate" onChange={this.handleDaysChange} required/>
                                        <div className="invalid-feedback">Please provide a day of the week.</div> 
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="numberDays">Number of Days:</label>
                                        <input className="form-control" type="text" name="numberDays" id="numberDays" onChange={this.handleNumChange} required/>
                                        <div className="invalid-feedback">Please provide a number of days.</div> 
                                    </div>
                                    {/* <div className="mb-3">
                                        <label className="form-label" htmlFor="minTime">Min Time (1,2,etc):</label>
                                        <input className="form-control" type="text" name="minTime" id="minTime" onChange={this.handleMinChange} required/>
                                        <div className="invalid-feedback">Please provide a minimum time.</div> 
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="maxTime">Max Time (20,21,etc):</label>
                                        <input className="form-control" type="text" name="maxTime" id="maxTime" onChange={this.handleMaxChange} required/>
                                        <div className="invalid-feedback">Please provide a maximum time.</div> 
                                    </div> */}
                                    <div className="d-grid d-sm-block text-center">
                                        <button type="submit" className="btn btn-primary" onClick={this.handleUpdate}>Update Template</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 themed-grid-col">
                                <div className="ms-5">
                                    <h1 className="text-center">{this.state.name}</h1>
                                    <p className="text-center">Click and Drag to Toggle; Saved Immediately</p>
                                </div>
                                <div className="mb-5 m-auto">
                                    <form action="/create" method="POST">
                                        <div className="d-grid d-sm-block text-center">
                                            <button type="submit" className="btn btn-primary">Create youFree?</button>
                                        </div>
                                    </form>
                                </div>
                                    <Template 
                                        selection={this.state.schedule} 
                                        startDate={this.state.startDate} 
                                        numDays={this.state.numDays}
                                        dateFormat={this.state.dateFormat}
                                        // minTime={this.state.minTime}
                                        // maxTime={this.state.maxTime}
                                        parentCallBack = {this.handleCallBack}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                }
        }
    }
}

export default CalendarView;