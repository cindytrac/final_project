import React, { useState} from "react";
import ScheduleSelector from "react-schedule-selector";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import Select from "react-select";
import icsToJson from 'ics-to-json';
import Navbar from "./NavBar";
import axios from 'axios';

function datePicker() {
    const defaultSelected = {
        from: pastMonth,
        to: addDays(pastMonth, 4)
      };
      const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
    
      let footer = <p>Please pick the first day.</p>;
      if (range?.from) {
        if (!range.to) {
          footer = <p>{format(range.from, 'PPP')}</p>;
        } else if (range.to) {
          footer = (
            <p>
              {format(range.from, 'PPP')}–{format(range.to, 'PPP')}
            </p>
          );
        }
      }
    
      return (
        <DayPicker
          mode="range"
          defaultMonth={pastMonth}
          selected={range}
          footer={footer}
          onSelect={setRange}
        />
      );
    }
  
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
    {label: "Custom Week", startDate: new Date("10-10-2022"), numDays: 5, dateFormat: "m/d"}
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
            schedule: [],
            otherSchedule: origSchedule,
            selectedOption: null,
            label: "Blank Week",
            startDate: new Date("10-09-2022"),
            numDays: 7,
            dateFormat: "d/m",
            //selectedFile: null,
            dateValue: []
        }

    // this.display = { 
    //     selectedOption: null,
    //     label: "Blank Week",
    //     startDate: new Date("10-09-2022"),
    //     numDays: 7,
    //     dateFormat: "d/m"
    // };

    // this.state = { schedule: [],
    //     otherSchedule: origSchedule,
    //  };

    // this.file = {
    //     selectedFile: null,
    //   };

      this.onFileChange = this.onFileChange.bind(this);
      this.handleDisplay = this.handleDisplay.bind(this);
      this.handleState = this.handleState.bind(this);
      this.handleDateChange = this.handleDateChange(this);

    }
      
    handleDisplay = selectedOption => {
        this.setState({ selectedOption: selectedOption });
        this.setState({ label: selectedOption.label})
        this.setState({ startDate: selectedOption.startDate });
        this.setState({ numDays: selectedOption.numDays });
        this.setState({ dateFormat: selectedOption.dateFormat });
        //console.log(selectedOption);
    };

    handleState = newSchedule => {
        this.setState({ schedule: newSchedule })
        this.setState({ otherSchedule: [...origSchedule, ...newSchedule]})
    }

      // On file select (from the pop up)
      onFileChange = event => {
      
        // Update the state
        this.setState({ selectedFile: event.target.files[0]});
        console.log("hello from the inside of onFileChange");
        console.log(event.target.files[0]);
        const icsRes = fetch(event.target.files[0])
        const icsData = icsRes.text()
            // Convert
        const data = icsToJson(icsData)
        this.console.log(data)
      };

      handleDateChange = newDays => {
        this.setState({ dateValue: newDays})
      }
    
      
      // On file upload (click the upload button)
      onFileUpload = () => {
      
        // Create an object of formData
        const formData = new FormData();

        console.log("hello from the inside of onFileUpload");
      
        // Update the formData object
        // formData.append(
        //   "myFile",
        //   this.file.selectedFile,
        //   this.file.selectedFile.name
        // );
      
        // Details of the uploaded file
        // console.log("hello");
        // console.log(this.file.selectedFile);
      
        // Request made to the backend api
        // Send formData object
        // axios.post("api/uploadfile", formData);
      };
      
      // File content to be displayed after
      // file upload is complete
      fileData = () => {
      
        if (this.file.selectedFile) {
           
          return (
            <div>
                <h2>File Details:</h2>
                <p>File Name: {this.file.selectedFile.name}</p>
                <p>File Type: {this.file.selectedFile.type}</p>
                <p>
                    Last Modified:{" "}
                    {this.file.selectedFile.lastModifiedDate.toDateString()}
                </p>
            </div>
          );
        } else {
          return (
            <div>
              <br />
              <h4>Choose before Pressing the Upload button</h4>
            </div>
          );
        }
      };
      

    render() {

        return (
            <div>
                <div className="container">
                    <Navbar />
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <Select
                                value={this.state.selectedOption} 
                                options={values} 
                                onChange={this.handleDisplay}
                            />
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                </div>
                <div>
                    <h3>
                        File Upload using React!
                    </h3>
                    <div>
                        {/* <input type="file" id="myFile" name="filename" display="none"/> */}
                        <input type="file" onChange={this.onFileChange} />
                        <button onClick={this.onFileUpload}>
                            Upload!
                        </button>
                    </div>
                    {/* {this.fileData()} */}
                </div>

                <p>Select the times you're free below!</p>
                <DatePicker 
                    returnValue={"range"}
                    isOpen={true}
                    onChange={this.handleDateChange} 
                    value={this.state.dateValue} />

                <div id="message">
                <h3>My Availability</h3>
                <p>Click and Drag to Toggle; Saved Immediately</p>
                </div>
                <div className="row justify-content-center">
                <div className="col-6">
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
                {/* <div className="col-6">
                    <ScheduleSelector
                    selection={this.state.otherSchedule}
                    startDate={new Date('2022-10-01')}
                    numDays={7}
                    minTime={8}
                    maxTime={22}
                    hourlyChunks={4}
                    timeFormat={"h:mm a"}
                    unselectedColor={"#FA3D24"}
                    selectedColor={"rgba(80, 182, 51, 1)"}
                    hoveredColor={"#ADB2AE"}
                    />
                </div> */}
                </div>
            </div>
        );
    }
}

export default CalendarView;
