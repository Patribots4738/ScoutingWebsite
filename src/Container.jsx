import './CSS/App.css'
import CheckBox from './widgets/CheckBox'
import Submit from './widgets/Submit'
import TextBoxLong from './widgets/TextBoxLong'
import Export from './widgets/Export'

import { v4 as uuidv4 } from "uuid"
import ClearLocalStorage from './widgets/ClearLocalStorage'
import React from 'react'

import { set, ref } from "firebase/database"
import { db } from "./firebaseConfig"
import TeleopComponent from './components/TeleopComponent'
import AutoComponent from './components/AutoComponent'
import IdentificationComponent from './components/IdentificationComponent'

class Container extends React.Component {

  state = {
    selectedAlliance: localStorage.getItem('alliance'),
    scoutingLog: []
  }

  gatherData = () => {
    var arr = []

    for (var i = 0; i < this.state.scoutingLog.length; i++) {

      var element = document.getElementById(this.state.scoutingLog[i]);
      console.log(element)
      if (element !== null) {
        var value
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
    // CALP stands for California Palmdale
    const eventID = '2026CASCMP';
    const gameID = '2026REBUILT';

    if (sendData) {
      let validMatch = true;
      if (this.badMatchNumber(data[1][1])) {
        validMatch = window.confirm("Are you sure your match and team numbers are correct?");
      }
      if (validMatch) {
        for (let i = 0; i < 19; i++) {
          console.log("item " + i + " " + data[i][1] + " ID: "+ data[i][1].id)
        }
        let name = data[0][1]
        let matchNumber = data[1][1]
        let alliance = data[2][1]
        let teamNumber = data[3][1]
        let autoPath = data[4][1]
        let autoComment = data[5][1]
        let scoreCount = (data[6][1].split(","))[0]
        let passCount = (data[6][1].split(","))[1]
        let fumblePercent = (data[6][1].split(","))[2]
        let teleopComment = data[7][1]
        let climbL1 = data[8][1]
        let climbL2 = data[9][1]
        let climbTransversal = data[10][1]
        let climbFailure = data[11][1]
        let tempFail = data[12][1]
        let criticalFail = data[13][1]
        let bump = data[14][1]
        let trench = data[15][1]
        let groundIntake = data[16][1]
        let stationIntake = data[17][1]
        let shootScoot = data[18][1]
        let extraComment = data[19][1]

        let commentData = { 
          "Name": name,
          "Team": teamNumber,
          "Comments": extraComment,
          "Auto Description": autoComment,
          "Auto Path": autoPath,
          "Off Time": teleopComment
        }

        let jsonData = {     
          "Score Auto": this.autoPieceCount(autoPath),
          "Score Teleop": scoreCount,
          "Pass Teleop": passCount,
          "Fumble Percent": fumblePercent,
          "Match Number": matchNumber,
          "Team": teamNumber,
          "Alliance": alliance,
          "L1 Climb": climbL1,
          "L2 Climb": climbL2,
          "Traversal Climb": climbTransversal,
          "Climb Failure": climbFailure,
          "Ground Intake": groundIntake,
          "Station Intake": stationIntake,
          "Temp Failure": tempFail,
          "Critical Failure": criticalFail,
          "Over Bump": bump,
          "Under Trench": trench,
          "Shooting While Driving": shootScoot,
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

  autoPieceCount(jstring) {
    let arr = jstring.split(" - ")
    arr.shift()
    let ScoreArr = arr.filter(this.checkIfScore)
    console.log("ScoreAr: " + ScoreArr)
    let pieceCounts = 0
    let num = 0
    for (let i = 0; i < ScoreArr.length; i++) {
      if (parseInt(ScoreArr[i].slice(1, 3) === null)) {
        num = 0
      } else {
        num = parseInt(ScoreArr[i].slice(1, 3))
      }
      pieceCounts = pieceCounts + num
    }
    console.log(pieceCounts)
    return pieceCounts;
  }

  checkIfScore(point) {
    return point.charAt(0) === 'S'
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
    this.state.scoutingLog.push(id);
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
    if (localStorage.getItem("alliance") === "BLUE") {
      document.querySelector(':root').style.setProperty('--team-color','blue')
      document.querySelector(':root').style.setProperty('--team-active-color','navy')
    } else if (localStorage.getItem("alliance") === "RED") {
      document.querySelector(':root').style.setProperty('--team-color','red')
      document.querySelector(':root').style.setProperty('--team-active-color','maroon')
    }
  }

  handleAllianceChange = (alliance) => {
    localStorage.setItem("alliance", alliance)
    this.checkAlliance()
  }

  render() {
    this.checkAlliance()
    return (
      <ul className="container">
        <span className="label cookie">By Continuing to Use Our Website You Agree to Use Cookies :)</span>
        <a
          className="scouting-guidelines"
          href="https://docs.google.com/document/d/1OiVVfB9Mx3mIwIE4ahyO1Sa65VuAJsUcy7czSVyzZJ4/edit?usp=sharing"
          target="_blank"
          rel="noreferrer"
        >Scouting Guidelines</a>
        <h1 className="title">PATRIBOTS SCOUTING</h1>
        <button onClick={() => {location.href = 'Hub'}}>Hi Test</button>
        <div className='identification-container'>
          <IdentificationComponent />
        </div>
        <div className="auto-container">
          <AutoComponent />
        </div>
        <div className="teleop-container">
          <TeleopComponent />
        </div>
        <div className="endgame-container">

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
                id={this.assignUUID()} //12
                value={false}
                decorator={"temporary"}
              />
              <CheckBox
                className="critical"
                title="Critical Failure"
                id={this.assignUUID()} //13
                value={false}
                decorator={"critical"}
              />
            </div>
            <div className="checkboxes-post">
              <CheckBox
                className="Bump"
                title="Over Bump"
                id={this.assignUUID()} //14
                value={false}
                decorator={"critical"}
              />
              <CheckBox
                className="trench"
                title="Under Trench"
                id={this.assignUUID()} //15
                value={false}
                decorator={"critical"}
              />
            </div>
            <div className="checkboxes-post">
              <CheckBox
                className="ground-intake"
                title="Ground Intake"
                id={this.assignUUID()} //16
                value={false}
                decorator={"critical"}
              />
              <CheckBox
                className="station-intake"
                title="Station Intake"
                id={this.assignUUID()} //17
                value={false}
                decorator={"critical"}
              />
            </div>
            <div className="checkboxes-post">
              <CheckBox
                className="shoot&drive"
                title="Shooting While Driving"
                id={this.assignUUID()} //18
                value={false}
                decorator={"critical"}
              />
            </div>
          </div>
          <div>
            <TextBoxLong
              className="text-box-long"
              id={this.assignUUID()} //19
              title={"Comments"}
              value={""}
              numeric={false}
              placeholder="Include anything abnormal that could have influenced the match, their driving and defense capabilities, and things they did well and not so well."
            />
          </div>
        </div>
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