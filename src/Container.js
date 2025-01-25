import './App.css';

import CheckBox from './widgets/CheckBox';
import TextBox from './widgets/TextBox';
import Counter from './widgets/Counter';
import TeleopCounter from './widgets/TeleopCounter';
import AutoCounter from './widgets/AutoCounter';
import Submit from './widgets/Submit';
import TextBoxLong from './widgets/TextBoxLong';
import Export from './widgets/Export';
import Dropdown from './widgets/Dropdown';

import { v4 as uuidv4 } from "uuid"
import React from 'react';
import ClearLocalStorage from './widgets/ClearLocalStorage';

import { set, ref } from "firebase/database";
import { db } from "./firebaseConfig";

class Container extends React.Component {
  
  state = {
    scoutingLog: [],
    flippedMaps: localStorage.getItem("flippedMaps") //TODO: make this work
  }

  gatherData = () => {
    var arr = []


    for (var i = 0; i < this.state.scoutingLog.length; i++) {


      var element = document.getElementById(this.state.scoutingLog[i]);
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

    var sendData = data[1];
    data = data[0];

    const eventID = '2024cabl';

    if (sendData) {
      let validMatch = true;
      if (this.badMatchNumber(data[1][1])) {
        validMatch = window.confirm("Are you sure your match and team numbers are correct?");
      }
      if (validMatch) {
        for (let i = 0; i < 17; i++) {
          console.log("item " + i + " " + data[i][1])
        }
        let name = data[0][1];
        let matchNumber = data[1][1];
        let position = data[3][1];
        console.log(data[7][1]);
        let autoPieceCounts = JSON.parse(data[5][1]);
        let teleopPieceCounts = JSON.parse(data[8][1]);
        for (let i = 0; i < 17; i++) {
          console.log("item " + i + " " + data[i][1])
        }
        let commentData = { 
          "Name": name,
          "What they did well": data[15][1],
          "What they did bad": data[16][1],
          "Additional Comments": data[17][1],
          "Auto Description": data[6][1],
          "Auto Start": data[4][1],
          "Auto Path": ""
        }
        let jsonData = {     //change this to 2025 data points
          "L4 Auto": Math.floor(Math.random() * 13),
          "L3 Auto": Math.floor(Math.random() * 13),
          "L2 Auto": Math.floor(Math.random() * 13),
          "L1 Auto": Math.floor(Math.random() * 13),
          "Processor Auto": Math.floor(Math.random() * 13),
          "Net Auto": Math.floor(Math.random() * 13),
          "Coral Fumble Auto": Math.floor(Math.random() * 13),
          "Net Fumble Auto": Math.floor(Math.random() * 13),
          "Processor Fumble Auto": Math.floor(Math.random() * 13),
          "L4 Teleop": Math.floor(Math.random() * 13),
          "L3 Teleop": Math.floor(Math.random() * 13),
          "L2 Teleop": Math.floor(Math.random() * 13),
          "L1 Teleop": Math.floor(Math.random() * 13),
          "Processor Teleop": Math.floor(Math.random() * 13),
          "Net Teleop": Math.floor(Math.random() * 13),
          "Coral Fumble Teleop": Math.floor(Math.random() * 13),
          "Net Fumble Teleop": Math.floor(Math.random() * 13),
          "Processor Fumble Teleop": Math.floor(Math.random() * 13),
          "Match Number": matchNumber,
          "Deep Cage": Math.floor(Math.random() * 2),
          "Shallow Cage": Math.floor(Math.random() * 2),
          "Climb Failure": Math.floor(Math.random() * 2),
          "Ground Intake": Math.floor(Math.random() * 2),
          "Station Intake": Math.floor(Math.random() * 2),
          "Temp Failure": Math.floor(Math.random() * 2),
          "Critical Failure": Math.floor(Math.random() * 2),
          "Auto Leave": Math.floor(Math.random() * 2) 
        };
        //                      event             match #                                Name|Position-Team#               
        set(ref(db, 'test2025/' + eventID + '/match-' + matchNumber + '/' + name + '|' + position + '-' + data[2][1] + '/data/'), jsonData);
        set(ref(db, 'test2025/' + eventID + '/match-' + matchNumber + '/' + name + '|' + position + '-' + data[2][1] + '/comments/'), commentData);

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

  badMatchNumber = (val) => {
    return (val.toString().length > 2)
  }

  // takes value from AutoPieces widget 
  // autoPieceCount = (arr) => {
  //   let pieceCounts = {
  //     speaker: 0,
  //     amp: 0,
  //     failedShots: 0,
  //     failedIntakes: 0,
  //     centerIntakes: 0
  //   };
  //   for (let i = 0; i < arr.length; i++) {
  //     let loc;
  //     if (arr[i].includes("F")) {
  //       loc = arr[i].substring(arr[i].length - 2);
  //     } else {
  //       loc = arr[i].substring(arr[i].length - 1);
  //     }
  //     switch (loc) {
  //       case "S":
  //         pieceCounts["speaker"]++
  //         break;
  //       case "A":
  //         pieceCounts["amp"]++
  //         break;
  //       case "FS":
  //         pieceCounts["failedShots"]++
  //         break;
  //       default:
  //         pieceCounts["failedIntakes"]++
  //         break;
  //     }
  //     if (arr[i].substring(0, 1) === "C" && loc !== "FI") {
  //       pieceCounts["centerIntakes"]++;
  //     }
  //   }
  //   return pieceCounts;
  // }

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
                    title: "Processor",
                    value: "Processor"
                  },
                  {
                    title: "Center",
                    value: "Center"
                  },
                  {
                    title: "Not Processor",
                    value: "Not Processor"
                  }
                ]}
              />
            </span>
            <div>
              <AutoCounter
                className="auto-counter"
                id={this.assignUUID()}
                title="Auto Counter"
                decorator="auto-counter"
                value={{}}
                reverse={this.state.flippedMaps}
              />
              <CheckBox
              className="deep-cage"
              title="Leave"
              id={this.assignUUID()}
              value={false}
              decorator="onstage"
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
            className="teleop-counter"
            id={this.assignUUID()}
            title="Piece Counter"
            value={{}}
          />
          <div className="checkboxes1">
            <CheckBox
              className="deep-cage"
              title="Deep Cage"
              id={this.assignUUID()}
              value={false}
              decorator="onstage"
            />
            <CheckBox
              className="shallow-cage"
              title="Shallow Cage"
              id={this.assignUUID()}
              value={false}
              decorator="dissapointmentCheckbox"
            />
            <CheckBox
              className="isFailure"
              title="Climb Failure"
              id={this.assignUUID()}
              value={false}
              decorator="dissapointmentCheckbox"
            />
          </div>
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
