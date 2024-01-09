import cone from './images/cone.png'
import cube from './images/cube.png'
import notFound from './images/notFound.png'
import './App.css';

import CheckBox from './widgets/CheckBox';
import TextBox from './widgets/TextBox'
import Counter from './widgets/Counter'
import Submit from './widgets/Submit'
import TextBoxLong from './widgets/TextBoxLong'
import Slider from './widgets/Slider'
import Export from './widgets/Export';
import Dropdown from './widgets/Dropdown'

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


        if (element.getAttribute("value") !== null && element.getAttribute("value") !== undefined){
         
          var value = (element.getAttribute("value"))


          if (element.required && value == "") {

            alert("Required field " + element.getAttribute("title") + " is blank.")
            return [[], false]

          }
        } else {  

          var value = element.value
         
        }

        arr.push([element.getAttribute("title"), value])
      }
    }
    return [arr, true]
  }


  handleFormSubmit = (e) => {
    e.preventDefault()


    var data = this.gatherData()

    var sendData = data[1]
    data = data[0]

    const eventID = '2022cabb';

    if (sendData){
      
        var commentData = {
            "Additional comments": data[30][1],
            "Cycle Time": data[25][1],
            "Rate their driving": data[24][1],
            "Supercharged Pieces": data[20][1],
            "What they did well": data[28][1],
            "What they didn't do well": data[29][1]
        }
        var jsonData = {
            "Chargepad Failure": data[23][1],
            "Critical Failure": data[27][1],
            "Cube Lower Auto": data[12][1],
            "Cube Lower Teleop": data[18][1],
            "Cube Middle Auto": data[10][1],
            "Cube Middle Teleop": data[16][1],
            "Cube Upper Auto": data[8][1],
            "Cube Upper Teleop": data[14][1],
            "Cone Lower Auto": data[11][1],
            "Cone Lower Teleop": data[17][1],
            "Cone Middle Auto": data[9][1],
            "Cone Middle Teleop": data[15][1],
            "Cone Upper Auto": data[7][1],
            "Cone Upper Teleop": data[13][1],
            "Critical Failure": data[27][1],
            "Docked Auto": data[5][1],
            "Docked Teleop": data[21][1],
            "Engaged Auto": data[6][1],
            "Engaged Teleop": data[22][1],
            "Fumbles": data[19][1],
            "Leave in Auto": data[4][1],
            "Temporary Failure": data[26][1],
          };

      set(ref(db, 'scouting/'+eventID+'/matchNumber/'+ data[1][1] +'/'+ 'allianceColor/' +data[3][1]+'/'+data[2][1]+'/'+data[0][1]+'/data/'), jsonData);
      set(ref(db, 'scouting/'+eventID+'/matchNumber/'+ data[1][1] +'/'+ 'allianceColor/' +data[3][1]+'/'+data[2][1]+'/'+data[0][1]+'/comments/'), commentData);

      let cachedData = JSON.parse(localStorage.getItem("matchData"))


      if (cachedData != null){
        cachedData.push(data)
        localStorage.setItem("matchData", JSON.stringify(cachedData))
      } else {
        localStorage.setItem("matchData", JSON.stringify([data]))
      }
     
     
      window.scrollTo(0, 0);
      setTimeout(() => {
        document.location.reload();
      }, 3500);
      alert("Data submitted, press ok to continue")
    }
  }


  clearLocalStorage = () => {
    var response = window.confirm("Are you sure you want to clear all saved matches?")
    if (!response){alert("Aborted wiping local storage"); return;}
    response = window.confirm("Are you sure you're sure?")
    if (!response){alert("Aborted wiping local storage"); return;}
    localStorage.clear()
    alert("Cleared all match data.")
  }


  assignUUID = () => {
    var id = uuidv4()
    this.state.scoutingLog.push(id)
    return id
  }


  handleExportData =(_) => {
    let cachedDataJSON = (JSON.parse(localStorage.getItem("matchData")))
    let cachedDataCSV = ""

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
          By Continuing to Use Our Website You Agree to Use Cookies :)
        </span>
        <a
        className="scouting-guidelines widget"
        href="https://docs.google.com/document/d/1Ia6xii1MCRcM0T9CLcPGnI98FGZ5JFwIAK3yKLTfOWg"
        target="_blank"
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
              title={"Name"}
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
              title={"Aliance Color"}
              value={""}
              required={true}
              items={[
                {
                  title: "Red"
                },
                {
                  title: "Blue"
                },

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
              title="Leave in Auto" 
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
                title={"Amps Auto"}
                value={0}
                upperLimit={4}
                decorator = {"amp"}
              />


              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Speaker Auto"}
                value={0}
                upperLimit={4}
                decorator = {"speaker"}
              />
              
            </span>
            <div>
              <TextBoxLong
                className="text-box"
                id={this.assignUUID()}
                title={"Describe Auto Path"}
                value={""}
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
                title={"Speaker Teleop"}
                value={0}
                upperLimit={107}
                decorator = {"speaker"}
              />


              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Amp Teleop"}
                value={0}
                upperLimit={107}
                decorator = {"amp"}
              />
            </span>
          </div>
          <div className="fumbles">
            <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Fumbles"}
                value={0}
                decorator = {"fumbles"}
                />
            <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Amplified Speaker"}
                value={0}
                upperLimit = {12}
                decorator = {"amped"}
                />
          </div>
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
              title="End Onstage" 
              id={this.assignUUID()} 
              value={false}
              decorator = "onstage"
            />
            <CheckBox 
              className="engaged" 
              title="Stage Trap" 
              id={this.assignUUID()} 
              value={false}
              decorator = "teleopCheckbox"
            /> 
            <CheckBox 
              className="isFailure" 
              title="Climb Failure" 
              id={this.assignUUID()} 
              value={false}
              decorator = "dissapointmentCheckbox"
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
            <Slider
              title="Cycle Time"
              id={this.assignUUID()}
              decorator = "slide"
            />
          </div>
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
