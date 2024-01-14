import './App.css';

import CheckBox from './widgets/CheckBox';
import TextBox from './widgets/TextBox'
import Counter from './widgets/Counter'
import Submit from './widgets/Submit'
import TextBoxLong from './widgets/TextBoxLong'
import Slider from './widgets/Slider'
import Export from './widgets/Export';
import Dropdown from './widgets/Dropdown'
import Stopwatch from './widgets/Stopwatch';


import {v4 as uuidv4} from "uuid"
import React from 'react';
import ClearLocalStorage from './widgets/ClearLocalStorage';

import { set, ref } from "firebase/database";
import { db } from "./firebaseConfig";

class Container extends React.Component{
 
  state = {
    scoutingLog: [],
  }

  gatherData = () => {
    var arr = []


    for (var i = 0; i < this.state.scoutingLog.length; i++){


      var element = document.getElementById(this.state.scoutingLog[i]);

      if (element !== null){

        var value;
        if (element.getAttribute("value") !== null && element.getAttribute("value") !== undefined){
         
          value = (element.getAttribute("value"))


          if (element.required && value === "") {

            alert("Required field " + element.getAttribute("title") + " is blank.")
            return [[], false]

          }
        } else {  
          value = element.value
         
        }

        arr.push([element.getAttribute("title"), value])
      }
    }
    return [arr, true]
  }


  handleFormSubmit = (e) => {
    e.preventDefault()


    var data = this.gatherData()

    var sendData = data[1];
    data = data[0];

    const eventID = '2024Testing';

    if (sendData){
      
      let commentData = {
        "Name": data[0][1],
        "What they did well": data[21][1],
        "What they did bad": data[22][1],
        "Additional Comments": data[23][1],
        "Auto Description": data[7][1]
      }
      let jsonData = {
        "Human Player": data[17][1],
        "Driving": data[18][1],
        "Amp Auto": data[5][1],
        "Speaker Auto": data[6][1],
        "Speaker Teleop": data[8][1],
        "Amp Teleop": data[9][1],
        "Amped Speaker": data[10][1],
        "Trap": data[11][1],
        "Fumbles": data[12][1],
        "Average Cycle Time": data[13][1],
        "Taxi in Auto": this.convertCheckBox(data[4][1]),
        "Temp Failure": this.convertCheckBox(data[19][1]),
        "Critical Failure": this.convertCheckBox(data[20][1]),
        "End Park": this.convertCheckBox(data[14][1]),
        "End Onstage": this.convertCheckBox(data[15][1]),
        "Climb Failure": this.convertCheckBox(data[16][1])
      };
      let positions = ["red1", "red2", "red3", "blue1", "blue2", "blue3"];
      //                      event             match #                      position and team #          name       
      set(ref(db, 'scouting/'+eventID+'/match-'+data[1][1]+'/'+positions[data[3][1]]+'-'+data[2][1]+'/data/'), jsonData);
      set(ref(db, 'scouting/'+eventID+'/match-'+data[1][1]+'/'+positions[data[3][1]]+'-'+data[2][1]+'/comments/'), commentData);

      let cachedData = JSON.parse(localStorage.getItem("matchData"))

      if (cachedData != null){
        cachedData.push(data);
        localStorage.setItem("matchData", JSON.stringify(cachedData));
      } else {
        localStorage.setItem("matchData", JSON.stringify([data]));
      }
     
     
      window.scrollTo(0, 0);
      setTimeout(() => {
        document.location.reload();
      }, 3500);
      alert("Data submitted, press ok to continue");
    }
  }

  // convert checkbox value to true/false
  convertCheckBox = (data) => {
    return (data === "1") ? true : false;
  }

  clearLocalStorage = () => {
    var response = window.confirm("Are you sure you want to clear all saved matches?");
    if (!response){alert("Aborted wiping local storage"); return;}
    response = window.confirm("Are you sure you're sure?");
    if (!response){alert("Aborted wiping local storage"); return;}
    localStorage.clear();
    alert("Cleared all match data.")
  }


  assignUUID = () => {
    var id = uuidv4();
    this.state.scoutingLog.push(id);
    return id;
  }


  handleExportData =(_) => {
    let cachedDataJSON = (JSON.parse(localStorage.getItem("matchData")));
    let cachedDataCSV = "";

    if (cachedDataJSON != null){
      for (let i = 0; i < cachedDataJSON.length; i++){
        for (let e = 0; e < cachedDataJSON[i].length; e++){
          cachedDataCSV += cachedDataJSON[i][e][1] + ","
        }
        cachedDataCSV += "\n"
      }
    }

    let file = new Blob([cachedDataCSV], {type: "text/csv"})
    let blobURL = window.URL.createObjectURL(file)

    const anchor = document.createElement('a');
    anchor.href = blobURL
    anchor.target = "_blank"
    anchor.download = "matchData.csv"
 
    anchor.click()
 
    URL.revokeObjectURL(blobURL);
  }

  render () {
    return (
      <ul className="container">
        <span className="label cookie">
          By continuing to Use Our Website You Agree to Use Cookies :)
        </span>
        <a
          className="scouting-guidelines widget"
          href="https://docs.google.com/document/d/1Ia6xii1MCRcM0T9CLcPGnI98FGZ5JFwIAK3yKLTfOWg"
          target="_blank"
          rel="noreferrer"
        >
          Scouting Guidelines
        </a>

        <h1 className="title">
          PATRIBOTS SCOUTING
        </h1>

        <div className='identification-container'>
          <h2 className="subtitle section-title">
            IDENTIFICATION
          </h2>

          <div>
            <TextBox
              className="textbox name"
              id={this.assignUUID()}
              title= {"Title"}
              value={""}
              required={ "true" }
            />
            <TextBox
              className="textbox match"
              id={this.assignUUID()}
              title={"Match Number"}
              value={""}
              required={true}
            />
          </div>
          <div>
            <TextBox
              className="textbox team"
              id={this.assignUUID()}
              title={"Team Number"}
              value={""}
              required={true}
            />
            <Dropdown
              className="dropdown alliance-color"
              id={this.assignUUID()}
              title={"Position"}
              value={""}
              required={true}
              items={[
                {
                  title: "r1"
                },
                {
                  title: "r2"
                },
                {
                  title: "r3"
                },
                {
                  title: "b1"
                },
                {
                  title: "b2"
                },
                {
                  title: "b3"
                }
              ]}
            />
            </div>
        </div>
      
        <div className="auto-container">
          <h2 className="subtitle section-title">
            AUTONOMOUS
          </h2>
          <div ClassName = "style1">
            <CheckBox 
              className="leave"
              title="Taxi" 
              id={this.assignUUID()} 
              value={false}
              decorator = "autoCheckbox"
            />
            <div
            />
            <span className="upper">
              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Lower Hub Auto"}
                value={0}
                upperLimit={4}
                decorator = {"amp"}
              />

              
              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Upper Hub Auto"}
                value={0}
                upperLimit={4}
                decorator = {"speaker"}
              />
              
            </span>
          <div>
            <TextBox
              className="textbox textbox box"
              id={this.assignUUID()}
              title={"Describe Auto Path"}
              value={""}
              required={true}
            />
            </div>
          </div>
        </div>

        <div className="teleop-container">
          <h2 className="subtitle section-title">
            TELEOP
          </h2>
          <div>
            <span className="uppers">
              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Lower Hub Teleop"}
                value={0}
                upperLimit={107}
                decorator = {"speaker"}
              />


              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Upper Hub Teleop"}
                value={0}
                upperLimit={107}
                decorator = {"amp"}
              />
            </span>
          </div>
          <div>
              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Amped Speaker"}
                value={0}
                upperLimit = {107}
                decorator = {"amped"}
                />
            <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Trap"}
                value={0}
                upperLimit = {3}
                decorator = {"trap"}
                />
          </div>
          <div>
            <Counter
              className="counter widget"
              id={this.assignUUID()}
              title={"Fumbles"}
              value={0}
              decorator = {"fumbles"}
              />
          </div>
      
  
          <Stopwatch
            className="stop-watch"
            value="0.00s"
            id={this.assignUUID()}
            title="Cycle Timer"
            decorator={"stopwatch"}
          />
          <div className = "checkboxes1">
            <CheckBox 
              className="docked" 
              title="End Park" 
              id={this.assignUUID()} 
              value={false}
              decorator = "teleopCheckbox"
            />
            <CheckBox 
              className="onstage" 
              title="Park" 
              id={this.assignUUID()} 
              value={false}
              decorator = "onstage"
            />
          </div>
          <div>
            <CheckBox 
              className="isFailure" 
              title="Climb Failure" 
              id={this.assignUUID()} 
              value={false}
              decorator = "dissapointmentCheckbox"
            />
          </div>
          <div>
          <Dropdown
              className="dropdown alliance-color"
              id={this.assignUUID()}
              title={"Rungs Climbed"}
              value={""}
              required={true}
              items={[
                {
                  title: "1"
                },
                {
                  title: "2"
                },
                {
                  title: "3"
                },
                {
                  title: "4"
                }
              ]}
            />
            </div>

        </div>
       
        <div className="post-match-container">
          <h2 className="subtitle section-title">
            POST-MATCH
          </h2>
          <div>
            <Slider
              title="Human Player"
              id={this.assignUUID()}
              decorator = "slide"
            />
          <div>
            <Slider
              title="Driving"
              id={this.assignUUID()}
              decorator = "slide"
            />
          </div>
          </div>
          <Slider
              className="slid"
              id={this.assignUUID()}
              value={10}
              title="qwerty"
              min={0}
              max={30}
            />
          <div className="checkboxes">
            <CheckBox
                className="temporary"
                title="Temporary Failure"
                id={this.assignUUID()}
                value={false}
                decorator = {"temporary"}
              />
            <CheckBox
              className="critical"
              title="Critical Failure"
              id={this.assignUUID()}
              value={false}
              decorator = {"critical"}
            />
          </div>

          <div>
            <TextBoxLong
              className="text-box-long"
              id={this.assignUUID()}
              title={"What they did well"}
              value={""}
            />
          </div>
          <div>
            <TextBoxLong
              className="text-box-long"
              id={this.assignUUID()}
              title={"What they didn't do well"}
              value={""}
            />
          </div>
          <div>
            <TextBoxLong
              className="text-box-long"
              id={this.assignUUID()}
              title={"Additional comments"}
              value={""}
            />
          </div>
         
        </div>

        <div className= 'submit-container'>
          <Submit title="Submit" handleFormSubmit={this.handleFormSubmit}/>
        </div>

        <div className='export-container'>
          <Export title="Export Data" handleExportData={this.handleExportData}/>
          <ClearLocalStorage title="Clear match saves" clearLocalStorage={this.clearLocalStorage}/>
        </div>
      </ul>
    );
  }


}

export default Container;
