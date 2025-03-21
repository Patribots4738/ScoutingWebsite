import './App.css';

import CheckBox from './widgets/CheckBox';
import TextBox from './widgets/TextBox';
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
    scoutingLog: []
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

    var sendData = data[1]
    data = data[0]

    const eventID = '2025CASDPractice';

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
        let autoExported = data[4][1].split("  -  ");
        let autoPieces = autoExported[0];
        let autoPieceCounts = this.autoPieceCount(autoPieces.split(" - "));
        let teleopPieceCounts = JSON.parse(data[7][1]);
        let position = autoExported[1];
        let didItLeave = 0;

        if (data[3][1] === "" && data[5][1] === false) {
          didItLeave = 0;
        } else if (data[3][1] !== "" || data[5][1] === true) {
          didItLeave = 1;
        }
        
        let commentData = { 
          "Name": name,
          "What they did well": data[16][1],
          "What they did bad": data[17][1],
          "Additional Comments": data[18][1],
          "Auto Description": data[6][1],
          "Auto Start": data[3][1],
          "Auto Path": autoPieces
        }

        let jsonData = {     
          "L4 Auto": autoPieceCounts["L4"],
          "L3 Auto": autoPieceCounts["L3"],
          "L2 Auto": autoPieceCounts["L2"],
          "L1 Auto": autoPieceCounts["L1"],
          "Processor Auto": autoPieceCounts["processor"],
          "Net Auto": autoPieceCounts["net"],
          "Coral Fumble Auto": autoPieceCounts["coralFumble"],
          "Net Fumble Auto": autoPieceCounts["netFumble"],
          "Processor Fumble Auto": autoPieceCounts["processorFumble"],
          "Algae Removed Auto": autoPieceCounts["algaeRemove"],
          "L4 Teleop": teleopPieceCounts["L4"],
          "L3 Teleop": teleopPieceCounts["L3"],
          "L2 Teleop": teleopPieceCounts["L2"],
          "L1 Teleop": teleopPieceCounts["L1"],
          "Processor Teleop": teleopPieceCounts["P"],
          "Net Teleop": teleopPieceCounts["N"],
          "Coral Fumble Teleop": teleopPieceCounts["CF"],
          "Net Fumble Teleop": teleopPieceCounts["NF"],
          "Processor Fumble Teleop": teleopPieceCounts["PF"],
          "Algae Removed Teleop": teleopPieceCounts["RA"],
          "Match Number": matchNumber,
          "Deep Cage": data[8][1],
          "Shallow Cage": data[9][1],
          "Climb Failure": data[10][1],
          "Ground Intake": data[13][1],
          "Station Intake": data[14][1],
          "Temp Failure": data[11][1],
          "Critical Failure": data[12][1],
          "Auto Leave": didItLeave,
          "Defense": data[15][1]
        };
        //                      event             match #                                Name|Position-Team#               
        set(ref(db, '2025Scouting/' + eventID + '/match-' + matchNumber + '/' + name + '|' + position + '-' + data[2][1] + '/data/'), jsonData);
        set(ref(db, '2025Scouting/' + eventID + '/match-' + matchNumber + '/' + name + '|' + position + '-' + data[2][1] + '/comments/'), commentData);

        localStorage.setItem("name", name)
        localStorage.setItem("matchNumber", matchNumber)
        localStorage.setItem("alliance", position)

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
      L4: 0,
      L3: 0,
      L2: 0,
      L1: 0,
      processor: 0,
      net: 0,
      coralFumble: 0,
      netFumble: 0,
      processorFumble: 0,
      algaeRemove: 0
    }

    for (let i = 0; i < arr.length; i++) {
      let loc = arr[i];
      // eslint-disable-next-line default-case
      switch (loc) {
        case "L1":
          pieceCounts["L1"]++
          break
        case "L2": 
          pieceCounts["L2"]++
          break
        case "L3":
          pieceCounts["L3"]++
          break
        case "L4":
          pieceCounts["L4"]++
          break
        case "P":
          pieceCounts["processor"]++
          break
        case "N":
          pieceCounts["net"]++
          break
        case "FR":
          pieceCounts["coralFumble"]++
          break
        case "FP":
          pieceCounts["processorFumble"]++
          break
        case "FN":
          pieceCounts["netFumble"]++
          break
        case "RG":
          pieceCounts["algaeRemove"]++
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
          </div>
        </div>
        <div className="auto-container">
          <h2 className="subtitle section-title">
            AUTONOMOUS
          </h2>
          <div className="style1">
            <span>
              <Dropdown
                className="dropdown-auto"
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
                    title: "Opposite Processor",
                    value: "Opposite Processor"
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
              />
              <div>
                <CheckBox
                className="byebye-auto"
                title="Leave in Auto"
                id={this.assignUUID()}
                value={false}
                decorator="dissapointmentCheckbox"
                />
              </div>
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
              title="Deep Climb"
              id={this.assignUUID()}
              value={false}
              decorator="onstage"
            />
            <CheckBox
              className="shallow-cage"
              title="Shallow Climb"
              id={this.assignUUID()}
              value={false}
              decorator="onstage"
            />
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
            <div>
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
              <CheckBox
                className="defense"
                title="Defense"
                id={this.assignUUID()}
                value={false}
                decorator={"onstage"}
              />
            </div>
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