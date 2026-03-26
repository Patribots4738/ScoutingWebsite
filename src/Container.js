import './App.css';

import CheckBox from './widgets/CheckBox';
import TextBox from './widgets/TextBox';
//import TeleopCounter from './widgets/TeleopCounter';
import Submit from './widgets/Submit';
import TextBoxLong from './widgets/TextBoxLong';
import Export from './widgets/Export';
//import Dropdown from './widgets/Dropdown';
import AutoCounter from './widgets/AutoCounter';
// import Counter from './widgets/Counter';

import { v4 as uuidv4 } from "uuid"
import React from 'react';
import ClearLocalStorage from './widgets/ClearLocalStorage';

import { set, ref } from "firebase/database";
import { db } from "./firebaseConfig";
import Dropdown from './widgets/Dropdown';
// import Slider from './widgets/Slider';
import TeleopCounter from "./widgets/TeleopCounter";

import { GameId, EventId } from "./GameIds";

class Container extends React.Component {

  
  constructor(props) {
    super(props);
    this.state = {
        selectedAlliance: localStorage.getItem('alliance'),
    };
    this.scoutingLog = [];  
  }

  gatherData = () => {
    var arr = []

    for (var i = 0; i < this.scoutingLog.length; i++) {

      var element = document.getElementById(this.scoutingLog[i]);
      console.log(element);
      if (element !== null) {
        var value;
        if (element.getAttribute("value") !== null && element.getAttribute("value") !== undefined) {

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

    var sendData = data[1]
    data = data[0]

    const eventID = EventId;
    const gameID = GameId;

    if (sendData) {
      let validMatch = true;
      if (this.badMatchNumber(data[1][1])) {
        validMatch = window.confirm("Are you sure your match and team numbers are correct?");
      }
      if (validMatch) {
        for (let i = 0; i < 17; i++) {
          console.log("item " + i + " " + data[i][1] + data[i][1].id)
        }
        let name = data[0][1];
        let matchNumber = data[1][1];
        let alliance = data[2][1];
        let teamNumber = data[3][1];
        let autoExported = data[4][1].split("  -  ");
        let autoPieces = autoExported[0];
        let autoPieceCounts = this.autoPieceCount(autoPieces.split(" - "));
        let scoreCount = data[6][1];
        let passCount = data[7][1];
        let fumblePercent = data[8][1];
        
        let commentData = { 
          "Name": name,
          "Team": teamNumber,
          "Comments": data[21][1],
          "Auto Description": data[5][1],
          "Auto Path": autoPieces,
          "Off Time": data[9][1],
        }

        let jsonData = {     
          "Climb Auto": autoPieceCounts["C"],
          "Start Depot": autoPieceCounts["SD"],
          "Start Hub": autoPieceCounts["SH"],
          "Start Outpost": autoPieceCounts["SO"],
          "Outpost Intake": autoPieceCounts["OI"],
          "Depot Intake": autoPieceCounts["DI"],
          "Center Intake Auto": autoPieceCounts["CI"],
          "Score Auto": autoPieceCounts["S"],
          "Climb Failure Auto": autoPieceCounts["CF"],
          "Score Teleop": scoreCount,
          "Pass Teleop": passCount,
          "Fumble Percent": fumblePercent,
          "Match Number": matchNumber,
          "Team": teamNumber,
          "Alliance": alliance,
          "L1 Climb": data[10][1],
          "L2 Climb": data[11][1],
          "Traversal Climb": data[13][1],
          "Climb Failure": data[12][1],
          "Ground Intake": data[18][1],
          "Station Intake": data[19][1],
          "Temp Failure": data[14][1],
          "Critical Failure": data[15][1],
          "Over Bump": data[16][1],
          "Under Trench": data[17][1],
          "Shooting While Driving": data[20][1],
        };
        //           game           event                  match #           Name            team             
        set(ref(db, gameID + '/' + eventID + '/match-' + matchNumber + '/' + name + '|'  + data[3][1] + '/data/'), jsonData);
        set(ref(db, gameID + '/' + eventID + '/match-' + matchNumber + '/' + name + '|'  + data[3][1] + '/comments/'), commentData);

        localStorage.setItem("name", name)
        localStorage.setItem("matchNumber", matchNumber)
        localStorage.setItem("alliance", alliance)

        let cachedData = JSON.parse(localStorage.getItem("matchData"))
        
        if (cachedData === null) {
          cachedData = {}
        }

        let matchPath = `match-${matchNumber}`
        let botPath = `${name}|-${data[2][1]}`

        if (cachedData[matchPath] === undefined) {
          cachedData[matchPath] = {};
          cachedData[matchPath][botPath] = { data: jsonData, comments: commentData }
        } else {
          cachedData[matchPath][botPath] = { data: jsonData, comments: commentData }
        }
        
        cachedData = JSON.stringify(cachedData, null, "\t")

        localStorage.setItem("matchData", cachedData)

        window.scrollTo(0, 0)
        setTimeout(() => {
          document.location.reload()
        }, 3500)
        alert("Data submitted, press ok to continue")
      }
    }
  }

  badMatchNumber = (val) => {
    return (val.toString().length > 2)
  }

  autoPieceCount  = (arr) => {
    let pieceCounts = {
      C: 0,
      SD: 0,
      SH: 0,
      SO: 0,
      OI: 0,
      DI: 0,
      CI: 0,
      S: 0,
      CF: 0
    }

    for (let i = 0; i < arr.length; i++) {
      let loc = arr[i];
      // eslint-disable-next-line default-case
      switch (loc) {
        case "C":
          pieceCounts["C"]++
          break
        case "SD": 
          pieceCounts["SD"]++
          break
        case "SH":
          pieceCounts["SH"]++
          break
        case "SO":
          pieceCounts["SO"]++
          break
        case "OI":
          pieceCounts["OI"]++
          break
        case "DI":
          pieceCounts["DI"]++
          break
        case "CI":
          pieceCounts["CI"]++
          break
        case "S":
          pieceCounts["S"]++
          break
        case "CF":
          pieceCounts["CF"]++
          break
      }
    }
    
    return pieceCounts;
  }

  clearLocalStorage = () => {
    var response = window.confirm("Are you sure you want to clear all saved matches?");
    if (!response) { alert("Aborted wiping local storage"); return; }
    response = window.confirm("Are you sure you're sure?");
    if (!response) { alert("Aborted wiping local storage"); return; }
    localStorage.clear();
    alert("Cleared all match data.")
  }

  assignUUID = () => {
    var id = uuidv4();
    this.scoutingLog.push(id);
    return id;
  }
  
  handleExportData = (_) => {
    let cachedDataJSON = localStorage.getItem("matchData");

    if (cachedDataJSON != null) {
      let file = new Blob([cachedDataJSON], { type: "text/json" })

      let blobURL = window.URL.createObjectURL(file)

      const anchor = document.createElement('a');
      anchor.href = blobURL
      anchor.target = "_blank"
      anchor.download = "matchData.json"

      anchor.click()

      URL.revokeObjectURL(blobURL);
    }
  }

  checkAlliance = () => {
    if (this.state.selectedAlliance === "BLUE") {
      document.querySelector(':root').style.setProperty('--team-color','blue')
      document.querySelector(':root').style.setProperty('--team-active-color','navy')
    } else if (this.state.selectedAlliance === "RED") {
      document.querySelector(':root').style.setProperty('--team-color','red')
      document.querySelector(':root').style.setProperty('--team-active-color','maroon')
    }
  }

  handleAllianceChange = (alliance) => {
    this.setState({
      selectedAlliance: {alliance}
    })
    console.log("Alliance: " + alliance)
    console.log("What Site Be Thinking: " + this.state.selectedAlliance)
  }

  render() {
    this.checkAlliance()
    return (
      <ul className="container">
        <span className="label cookie">
          By Continuing to Use Our Website You Agree to Use Cookies :)
        </span>
        <a className="qualitativeScouting" href="/SuperDuperExtremelyTuffAppAndQuantativeScouting"><p>Qualitative Scouting</p></a>
        <a
          className="scouting-guidelines"
          href="https://docs.google.com/document/d/1OiVVfB9Mx3mIwIE4ahyO1Sa65VuAJsUcy7czSVyzZJ4/edit?usp=sharing"
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
              title={"Name"}
              value={localStorage.getItem("name")}
              required={"true"}
              numeric={false}
            />
            <TextBox
              className="textbox match"
              id={this.assignUUID()}
              title="Match Number"
              value={+localStorage.getItem("matchNumber") + 1}
              required={true}
              numeric={true}
            />
          </div>
          <div>
            <Dropdown
              className="dropdown alliance"
              id={this.assignUUID()}
              title="Alliance"
              value={this.state.selectedAlliance}
              items={[
                {id:1, value: "RED", title: "Red"},
                {id:2, value: "BLUE", title: "Blue"}
              ]}
              selected={this.handleAllianceChange}
            />
            <TextBox
              className="textbox team"
              id={this.assignUUID()}
              title="Team Number"
              value={""}
              required={true}
              numeric={true}
            />          
          </div>
        </div>
        <div className="auto-container">
          <h2 className="subtitle section-title">
            AUTO
          </h2>
          <div className="auto-widget-box">
            <AutoCounter
              title="Auto Path"
              id={this.assignUUID()}
            />
          </div>
          <div className="auto-notes-box">
            <TextBoxLong
              className="text-box-long"
              id={this.assignUUID()}
              title="Auto Notes"
              value={""}
              numeric={false}
              placeholder="Describe any abnormalities in the auto, anything that would not have been included in the auto path, and if their climb failed or where they ended. "
            />
          </div>
        </div>
        <div className="teleop-container">
          <h2 className="subtitle section-title">
            TELEOP
          </h2>
          <TeleopCounter
            id={this.assignUUID()}
            title={"Teleop Scoring"}
            className={"teleop"}
          />
        
          <div className="tele-offcyle-box">
            <TextBoxLong
              className="text-box-long"
              id={this.assignUUID()}
              title="Off Time"
              value=""
              numeric={false}
              placeholder="Describe what the robot was doing while their HUB was deactivated. Were they doing defense? Were they collecting fuel? Were they passing?"
            />
          </div>
          <div className="checkboxes-top">
            <CheckBox
              className="climb1"
              title="L1 Climb"
              id={this.assignUUID()}
              value={false}
              decorator="onstage"
            />
            <CheckBox
              className="climb2"
              title="L2 Climb"
              id={this.assignUUID()}
              value={false}
              decorator="onstage"
            />
            <CheckBox
              className="climb3"
              title="Traversal Climb"
              id={this.assignUUID()}
              value={false}
              decorator="onstage"
            />
          </div>
          <div className="checkboxes-bottom">
            <CheckBox
              className="isFailure"
              title="Climb Failure"
              id={this.assignUUID()}
              value={false}
              decorator="onstage"
            />
          </div>
        </div>
        <div className="post-match-container">
          <h2 className="subtitle section-title">
            POST-MATCH
          </h2>
          <div className="checkboxes2">
            <div className="checkboxes-post">
              <CheckBox
                className="temporary"
                title="Temp. Failure"
                id={this.assignUUID()}
                value={false}
                decorator={"temporary"}
              />
              <CheckBox
                className="critical"
                title="Critical Failure"
                id={this.assignUUID()}
                value={false}
                decorator={"critical"}
              />
            </div>
            <div className="checkboxes-post">
              <CheckBox
                className="Bump"
                title="Over Bump"
                id={this.assignUUID()}
                value={false}
                decorator={"critical"}
              />
              <CheckBox
                className="trench"
                title="Under Trench"
                id={this.assignUUID()}
                value={false}
                decorator={"critical"}
              />
            </div>
            <div className="checkboxes-post">
              <CheckBox
                className="ground-intake"
                title="Ground Intake"
                id={this.assignUUID()}
                value={false}
                decorator={"critical"}
              />
              <CheckBox
                className="station-intake"
                title="Station Intake"
                id={this.assignUUID()}
                value={false}
                decorator={"critical"}
              />
            </div>
            <div className="checkboxes-post">
              <CheckBox
                className="shoot&drive"
                title="Shooting While Driving"
                id={this.assignUUID()}
                value={false}
                decorator={"critical"}
              />
            </div>

          </div>
          <div>
            <TextBoxLong
              className="text-box-long"
              id={this.assignUUID()}
              title={"Comments"}
              value={""}
              numeric={false}
              placeholder="Include anything abnormal that could have influenced the match, their driving and defense capabilities, and things they did well and not so well."
            />
          </div>

        </div>
        <a
          className="suggestions"
          href="https://docs.google.com/forms/d/e/1FAIpQLScuS7hTiPxkxvk8t2dImAYtfXdHkqCzennD2szbqtXMaAw5zg/viewform?usp=header"
          target="_blank"
          rel="noreferrer"
        >
          Suggestions or Bugs
        </a>
        <div className='submit-container'>
          <Submit title="Submit" handleFormSubmit={this.handleFormSubmit} />
        </div>

        <div className='export-container'>
          <Export title="Export Data" handleExportData={this.handleExportData} />
          <ClearLocalStorage title="Clear local data" clearLocalStorage={this.clearLocalStorage} />
        </div>
      </ul>
    );
  }





  

}
export default Container;

