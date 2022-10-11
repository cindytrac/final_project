import React, { useState} from "react";
import ScheduleSelector from "react-schedule-selector";
import DatePicker from "react-datepicker";
import Select from "react-select";
import icsToJson from 'ics-to-json';
import Navbar from "./NavBar";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
  
let origSchedule = [new Date('2022-10-01 10:00:00'),
new Date('2022-10-01 11:00:00'),
new Date('2022-10-01 12:00:00'),
new Date('2022-10-01 13:00:00'),
new Date('2022-10-01 14:00:00'),
new Date('2022-10-02 12:00:00'),
new Date('2022-10-02 13:00:00'),
new Date('2022-10-02 14:00:00'),
new Date('2022-10-02 15:00:00'),
new Date('2022-10-02 16:00:00'),]

let blankSchedule = []

const values = [
    {label: "Blank Week", startDate: new Date("10-09-2022"), numDays: 7, dateFormat: "ddd"},
    {label: "Blank Work Week", startDate: new Date("10-10-2022"), numDays: 5, dateFormat: "ddd"},
    {label: "Custom Week", startDate: new Date("10-11-2022"), numDays: 5, dateFormat: "M/D"}
]

// const inputFile = document.querySelector('input')

// const convert = async (inputFile) => {
//     const icsRes = await fetch(inputFile)
//     const icsData = await icsRes.text()
//     // Convert
//     const data = icsToJson(icsData)
//     return data
// }

// const json = convert(inputFile)
// let dates = []

// console.log(json);

// json.forEach((element,index) => {
//     let date = {
//         startDate: element.startDate,
//         endDate: element.endDate
//     }
//     dates.append(date)
// })


class CalendarView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "Hello",
            schedule: [],
            otherSchedule: origSchedule,
            selectedOption: {
                label: "Blank Week",
                startDate: new Date("10-09-2022"),
                numDays: 7,
                dateFormat: "ddd"
            },
            //selectedFile: null,
            days: {
                from: { year: 2022, month: 10, day: 2},
                to: { year: 2022, month: 10, day: 5 }
            },
            selectedDate: new Date("10-13-2022")
        }

    //   this.onFileChange = this.onFileChange.bind(this);
      this.handleDisplay = this.handleDisplay.bind(this);
      this.handleState = this.handleState.bind(this);
      this.handleDateChange = this.handleDateChange.bind(this);
      this.submitCalendar = this.submitCalendar.bind(this);

    }
      
    handleDisplay = selectedOption => {
        this.setState({ selectedOption: selectedOption });
    };

    handleState = newSchedule => {
        this.setState({ schedule: newSchedule })
        this.setState({ otherSchedule: [...origSchedule, ...newSchedule]})
    }

    handleNameChange = newName => {
        this.setState({name: newName});
        console.log(this.state.name);
    }

    handleDateChange = newDay => {
        this.setState({selectedDate: newDay});
        console.log(this.selectedDay);
      };

      submitCalendar = submit => {
        for (let i = 0; i < this.state.schedule.length; i++) {
            console.log(new Date(this.state.schedule[i]));
        }
      }



    //   // On file select (from the pop up)
    //   onFileChange = event => {
      
    //     // Update the state
    //     this.setState({ selectedFile: event.target.files[0]});
    //     console.log("hello from the inside of onFileChange");
    //     console.log(event.target.files[0]);
    //     const icsRes = fetch(event.target.files[0])
    //     const icsData = icsRes.text()
    //         // Convert
    //     const data = icsToJson(icsData)
    //     this.console.log(data)
    //   };
    
      // On file upload (click the upload button)
    //   onFileUpload = () => {
      
    //     // Create an object of formData
    //     const formData = new FormData();

    //     console.log("hello from the inside of onFileUpload");
      
    //     // Update the formData object
    //     // formData.append(
    //     //   "myFile",
    //     //   this.file.selectedFile,
    //     //   this.file.selectedFile.name
    //     // );
      
    //     // Details of the uploaded file
    //     // console.log("hello");
    //     // console.log(this.file.selectedFile);
      
    //     // Request made to the backend api
    //     // Send formData object
    //     // axios.post("api/uploadfile", formData);
    //   };
      
      // File content to be displayed after
      // file upload is complete
    //   fileData = () => {
      
    //     if (this.file.selectedFile) {
           
    //       return (
    //         <div>
    //             <h2>File Details:</h2>
    //             <p>File Name: {this.file.selectedFile.name}</p>
    //             <p>File Type: {this.file.selectedFile.type}</p>
    //             <p>
    //                 Last Modified:{" "}
    //                 {this.file.selectedFile.lastModifiedDate.toDateString()}
    //             </p>
    //         </div>
    //       );
    //     } else {
    //       return (
    //         <div>
    //           <br />
    //           <h4>Choose before Pressing the Upload button</h4>
    //         </div>
    //       );
    //     }
    //   };
      
    render() {

        return (
            <div>
                <Navbar />
                <div className="row justify-content-evenly">
                    <div className="col-md-3 themed-grid-col">
                        {/* <div className="mb-5 mt-5 ms-4 m-auto">
                            <label className="form-label" htmlFor="yfTitle">Please enter a name:</label>
                            <input className="form-control" type="text" onChange={this.handleNameChange} />
                        </div> */}
                        <div className="mb-5 mt-5m-auto">
                            <p>Select the type of youFree you wish to create.</p>
                            <Select
                                value={this.state.selectedOption.label} 
                                options={values} 
                                onChange={this.handleDisplay}
                            />
                        </div>
                        <p>Enter the information for your youFree below.</p>
                        <div className="mb-5 m-auto">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="yfTitle">Please enter a name:</label>
                                    <input className="form-control" type="text" onChange={this.handleNameChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="startDate">Start Date:</label>
                                    <input className="form-control" type="text" name="startDate" id="startDate" required/>
                                    <div className="invalid-feedback">Please provide a start date.</div> 
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="numberDays">Number of Days:</label>
                                    <input className="form-control" type="text" name="numberDays" id="numberDays" required/>
                                    <div className="invalid-feedback">Please provide a number of days.</div> 
                                </div>
                                <div className="d-grid d-sm-block text-center">
                                    <button type="submit" className="btn btn-primary" >Create Calendar</button>
                                </div>
                            </form>
                        </div>
                        {/* <div className="mb-5 m-auto"> */}
                            {/* Currently just shows the calendar */}
                            {/* <DatePicker 
                                selected={this.state.selectedDate}
                                onChange={this.handleDateChange}
                                onSelect={this.handleDateChange} 
                            />
                        </div> */}
                    </div>
                    <div className="col-md-6 themed-grid-col">
                        <p className="text-center">Click and Drag to Toggle; Saved Immediately</p>
                        <div className="mb-5 m-auto">
                            <form action="/create" method="POST">
                                <div className="d-grid d-sm-block text-center">
                                    <button type="submit" className="btn btn-primary">Create youFree?</button>
                                </div>
                            </form>
                        </div>
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
                </div>
                {/* <div>
                    <h3>
                        File Upload using React!
                    </h3>
                    <div>
                        <input type="file" onChange={this.onFileChange} />
                        <button onClick={this.onFileUpload}>
                            Upload!
                        </button>
                    </div> */}
                    {/* {this.fileData()} */}
                {/* </div> */}
            </div>
        );
    }
}

export default CalendarView;
