import './App.css';

import CheckBox from './widgets/CheckBox';
import TextBox from './widgets/TextBox';
import Counter from './widgets/Counter';
import TeleopCounter from './widgets/TeleopCounter';
import Submit from './widgets/Submit';
import TextBoxLong from './widgets/TextBoxLong';
import Export from './widgets/Export';
import Dropdown from './widgets/Dropdown';
import AutoPieces from './widgets/AutoPieces';

import { v4 as uuidv4 } from "uuid"
import React from 'react';
import ClearLocalStorage from './widgets/ClearLocalStorage';

import { set, ref } from "firebase/database";
import { db } from "./firebaseConfig";

class Container extends React.Component {
  
  state = {
    scoutingLog: [],
  }

  gatherData = () => {
    var arr = []


    for (var i = 0; i < this.state.scoutingLog.length; i++) {


      var element = document.getElementById(this.state.scoutingLog[i]);
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

    var sendData = data[1];
    data = data[0];

    const eventID = '2024test';

    if (sendData) {
      let validMatch = true;
      if (this.badMatchNumber(data[1][1])) {
        validMatch = window.confirm("Are you sure your match and team numbers are correct?");
      }
      if (validMatch) {
        
        let name = data[0][1];
        let matchNumber = data[1][1];
        let position = data[3][1];
        let autoPieces = data[5][1].split(",");
        let autoPieceCounts = this.autoPieceCount(autoPieces);
        let teleopPieceCounts = JSON.parse(data[7][1]);

        let commentData = {
          "Name": name,
          "What they did well": data[13][1],
          "What they did bad": data[14][1],
          "Additional Comments": data[15][1],
          "Auto Description": data[6][1],
          "Auto Pieces": autoPieces,
          "Auto Start": data[4][1]
        }
        let jsonData = {
          "Amp Auto": autoPieceCounts["amp"],
          "Speaker Auto": autoPieceCounts["speaker"],
          "Center Intakes Auto": autoPieceCounts["centerIntakes"],
          "Failed Intakes Auto": autoPieceCounts["failedIntakes"],
          "Failed Shots Auto": autoPieceCounts["failedShots"],
          "Speaker Teleop": this.sumTeleopScore(teleopPieceCounts, "speaker"),
          "Amp Teleop": this.sumTeleopScore(teleopPieceCounts, "amp"),
          "Passes": this.sumTeleopScore(teleopPieceCounts, "pass"),
          "Fumbles Speaker": this.sumTeleopScore(teleopPieceCounts, "fumbleSpeaker"),
          "Fumbles Amp": this.sumTeleopScore(teleopPieceCounts, "fumbleAmp"),
          "Speaker Wing Cycles": teleopPieceCounts["speaker"]["wing"],
          "Speaker Center Cycles": teleopPieceCounts["speaker"]["center"],
          "Speaker Source Cycles": teleopPieceCounts["speaker"]["source"],
          "Amp Wing Cycles": teleopPieceCounts["amp"]["wing"],
          "Amp Center Cycles": teleopPieceCounts["amp"]["center"],
          "Amp Full Cycles": teleopPieceCounts["amp"]["source"],
          "Pass Wing Cycles": teleopPieceCounts["pass"]["wing"],
          "Pass Center Cycles": teleopPieceCounts["pass"]["center"],
          "Pass Full Cycles": teleopPieceCounts["pass"]["source"],
          "Fumbles Speaker Wing Cycles": teleopPieceCounts["fumbleSpeaker"]["wing"],
          "Fumbles Speaker Center Cycles": teleopPieceCounts["fumbleSpeaker"]["center"],
          "Fumbles Speaker Full Cycles": teleopPieceCounts["fumbleSpeaker"]["source"],
          "Fumbles Amp Wing Cycles": teleopPieceCounts["fumbleAmp"]["wing"],
          "Fumbles Amp Center Cycles": teleopPieceCounts["fumbleAmp"]["center"],
          "Fumbles Amp Full Cycles": teleopPieceCounts["fumbleAmp"]["source"],
          "Wing Cycles": this.sumCycles(teleopPieceCounts, "wing"),
          "Center Cycles": this.sumCycles(teleopPieceCounts, "center"),
          "Full Cycles": this.sumCycles(teleopPieceCounts, "source"),
          "Match Number": matchNumber,
          "Temp Failure": data[11][1],
          "Critical Failure": data[12][1],
          "End Onstage": data[8][1],
          "Climb Failure": data[9][1],
          "Trap": data[10][1]
        };
        //                      event             match #                                Name|Position-Team#               
        set(ref(db, 'scouting/' + eventID + '/match-' + matchNumber + '/' + name + '|' + position + '-' + data[2][1] + '/data/'), jsonData);
        set(ref(db, 'scouting/' + eventID + '/match-' + matchNumber + '/' + name + '|' + position + '-' + data[2][1] + '/comments/'), commentData);

        localStorage.setItem("name", name);
        localStorage.setItem("matchNumber", matchNumber);
        localStorage.setItem("position", position);

        let cachedData = JSON.parse(localStorage.getItem("matchData"));
        
        if (cachedData === null) {
          cachedData = {};
        }

        let matchPath = `match-${matchNumber}`;
        let botPath = `${name}|${position}-${data[2][1]}`;

        if (cachedData[matchPath] === undefined) {
          cachedData[matchPath] = {};
          cachedData[matchPath][botPath] = { data: jsonData, comments: commentData };
        } else {
          cachedData[matchPath][botPath] = { data: jsonData, comments: commentData };
        }
        
        cachedData = JSON.stringify(cachedData, null, "\t");

        localStorage.setItem("matchData", cachedData);

        window.scrollTo(0, 0);
        setTimeout(() => {
          document.location.reload();
        }, 3500);
        alert("Data submitted, press ok to continue");
      }
    }
  }

  sumTeleopScore = (data, location) => {
    return data[location]["wing"] + data[location]["center"] + data[location]["source"]
  }

  sumCycles = (data, location) => {
    return data["speaker"][location] + data["amp"][location] + data["pass"][location];
  }

  badMatchNumber = (val) => {
    return (val.toString().length > 2)
  }

  // takes value from AutoPieces widget 
  autoPieceCount = (arr) => {
    let pieceCounts = {
      speaker: 0,
      amp: 0,
      failedShots: 0,
      failedIntakes: 0,
      centerIntakes: 0
    };
    for (let i = 0; i < arr.length; i++) {
      let loc;
      if (arr[i].includes("F")) {
        loc = arr[i].substring(arr[i].length - 2);
      } else {
        loc = arr[i].substring(arr[i].length - 1);
      }
      console.log(loc);
      switch (loc) {
        case "S":
          pieceCounts["speaker"]++
          break;
        case "A":
          pieceCounts["amp"]++
          break;
        case "FS":
          pieceCounts["failedShots"]++
          break;
        default:
          pieceCounts["failedIntakes"]++
          break;
      }
      if (arr[i].substring(0, 1) === "C" && loc !== "FI") {
        pieceCounts["centerIntakes"]++;
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

  render() {
    return (
      <ul className="container">
        <span className="label cookie">
          By Continuing to Use Our Website You Agree to Use Cookies :)
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
              title={"Name"}
              value={localStorage.getItem("name")}
              required={"true"}
              numeric={false}
            />
            <TextBox
              className="textbox match"
              id={this.assignUUID()}
              title={"Match Number"}
              value={+localStorage.getItem("matchNumber") + 1}
              required={true}
              numeric={true}
            />
          </div>
          <div>
            <TextBox
              className="textbox team"
              id={this.assignUUID()}
              title={"Team Number"}
              value={""}
              required={true}
              numeric={true}
            />
            <Dropdown
              className="dropdown alliance-color"
              id={this.assignUUID()}
              title={"Position"}
              value={localStorage.getItem("position")}
              selected={localStorage.getItem("position")}
              required={true}
              items={[
                {
                  title: "r1",
                  value: "r1"
                },
                {
                  title: "r2",
                  value: "r2"
                },
                {
                  title: "r3",
                  value: "r3"
                },
                {
                  title: "b1",
                  value: "b1"
                },
                {
                  title: "b2",
                  value: "b2"
                },
                {
                  title: "b3",
                  value: "b3"
                }
              ]}
            />
          </div>
        </div>

        <div className="auto-container">
          <h2 className="subtitle section-title">
            AUTONOMOUS
          </h2>
          <div className="style1">
          <span>
            <Dropdown
                className="dropdown alliance-color"
                id={this.assignUUID()}
                title={"Starting Side"}
                value={localStorage.getItem("position")}
                selected={localStorage.getItem("position")}
                required={true}
                items={[
                  {
                    title: "Amp",
                    value: "Amp"
                  },
                  {
                    title: "Middle",
                    value: "Middle"
                  },
                  {
                    title: "Source",
                    value: "Source"
                  }
                ]}
              />
            </span>
            <div>
              <AutoPieces
                value={[]}
                id={this.assignUUID()}
                title="Auto Pieces"
                decorator="auto-pieces"
                upperLimit={10}
              />
            </div>
            <div>
              <TextBoxLong
                className="text-box"
                id={this.assignUUID()}
                title={"Describe Auto Path"}
                value={""}
                numeric={false}
              />
            </div>
          </div>
        </div>

        <div className="teleop-container">
          <h2 className="subtitle section-title">
            TELEOP
          </h2>
          <TeleopCounter
            value={{}}
            id={this.assignUUID()}
            title="Piece Counter"
            className="teleop-counter"
          />
          <div className="checkboxes1">
            <CheckBox
              className="onstage"
              title="End Onstage"
              id={this.assignUUID()}
              value={false}
              decorator="onstage"
            />
            <CheckBox
              className="isFailure"
              title="Climb Failure"
              id={this.assignUUID()}
              value={false}
              decorator="dissapointmentCheckbox"
            />
          </div>
          <Counter
            className="counter widget"
            id={this.assignUUID()}
            title={"Trap"}
            value={0}
            upperLimit={3}
            decorator={"trap"}
          />
        </div>

        <div className="post-match-container">
          <h2 className="subtitle section-title">
            POST-MATCH
          </h2>
          <div className="checkboxes1">
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
          <div>
            <TextBoxLong
              className="text-box-long"
              id={this.assignUUID()}
              title={"What they did well"}
              value={""}
              numeric={false}
              placeholder=""
            />
          </div>
          <div>
            <TextBoxLong
              className="text-box-long"
              id={this.assignUUID()}
              title={"What they didn't do well"}
              value={""}
              numeric={false}
              placeholder=""
            />
          </div>
          <div>
            <TextBoxLong
              className="text-box-long"
              id={this.assignUUID()}
              title={"Additional comments"}
              value={""}
              numeric={false}
              placeholder=""
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
