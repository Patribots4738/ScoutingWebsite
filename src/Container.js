import './App.css';

import CheckBox from './widgets/CheckBox';
import TextBox from './widgets/TextBox';
import Counter from './widgets/Counter';
import Submit from './widgets/Submit';
import TextBoxLong from './widgets/TextBoxLong';
import Slider from './widgets/Slider';
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
        let autoPieces = data[5][1];
        let autoPieceCounts = this.autoPieceCount(autoPieces);
        let commentData = {
          "Name": name,
          "What they did well": data[21][1],
          "What they did bad": data[22][1],
          "Additional Comments": data[23][1],
          "Auto Description": data[6][1],
          "Auto Pieces": autoPieces
        }
        let jsonData = {
          "Human Player": data[17][1],
          "Driving": data[18][1],
          "Amp Auto": autoPieceCounts["amp"],
          "Speaker Auto": autoPieceCounts["speaker"],
          "Center Intakes Auto": autoPieceCounts["centerIntakes"],
          "Failed Intakes Auto": autoPieceCounts["failedIntakes"],
          "Failed Shots Auto": autoPieceCounts["failedShots"],
          "Speaker Teleop": data[7][1],
          "Amp Teleop": data[8][1],
          "Pass": data[9][1],
          "Trap": data[10][1],
          "Fumbles Speaker": data[11][1],
          "Fumbles Amp": data[12][1],
          "Match Number": matchNumber,
          "Leave in Auto": data[4][1],
          "Temp Failure": data[19][1],
          "Critical Failure": data[20][1],
          "End Park": data[13][1],
          "End Onstage": data[14][1],
          "Climb Failure": data[15][1],
          "Co-Op": data[16][1]
        };

        let positions = ["red1", "red2", "red3", "blue1", "blue2", "blue3"];
        //                      event             match #                                Name|Position-Team#               
        set(ref(db, 'scouting/' + eventID + '/match-' + data[1][1] + '/' + name + '|' + positions[position] + '-' + data[2][1] + '/data/'), jsonData);
        set(ref(db, 'scouting/' + eventID + '/match-' + data[1][1] + '/' + name + '|' + positions[position] + '-' + data[2][1] + '/comments/'), commentData);

        localStorage.setItem("name", name);
        localStorage.setItem("matchNumber", matchNumber);
        localStorage.setItem("position", position);

        let cachedData = JSON.parse(localStorage.getItem("matchData"))

        if (cachedData != null) {
          cachedData.push(data);
          localStorage.setItem("matchData", JSON.stringify(cachedData));
        } else {
          localStorage.setItem("matchData", JSON.stringify([data]));
        }

        console.log(localStorage.getItem("matchData"));


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
        case "FI":
          pieceCounts["failedIntakes"]++
          break;
      }
      if (arr[i].substring(0, 1)) {
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
    let cachedDataJSON = (JSON.parse(localStorage.getItem("matchData")));
    let cachedDataCSV = "";

    if (cachedDataJSON != null) {
      for (let i = 0; i < cachedDataJSON.length; i++) {
        for (let e = 0; e < cachedDataJSON[i].length; e++) {
          cachedDataCSV += cachedDataJSON[i][e][1] + ","
        }
        cachedDataCSV += "\n"
      }
    }

    let file = new Blob([cachedDataCSV], { type: "text/csv" })
    let blobURL = window.URL.createObjectURL(file)

    const anchor = document.createElement('a');
    anchor.href = blobURL
    anchor.target = "_blank"
    anchor.download = "matchData.csv"

    anchor.click()

    URL.revokeObjectURL(blobURL);
  }

  sliderNumbers = () => {
    return "1 ‎ ‎ ‎ ‎ ‎ ‎ ‎ 2 ‎ ‎ ‎ ‎ ‎ ‎ ‎ 3 ‎ ‎ ‎ ‎ ‎ ‎ ‎ 4 ‎ ‎ ‎ ‎ ‎ ‎ ‎ 5";
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
          <div ClassName="style1">
            <CheckBox
              className="leave"
              title="Leave in Auto"
              id={this.assignUUID()}
              value={false}
              decorator="autoCheckbox"
            />
            <div
            />
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
          <div>
            <span className="uppers">
              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Speaker Teleop"}
                value={0}
                upperLimit={107}
                decorator={"speaker-teleop"}
              />


              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Amp Teleop"}
                value={0}
                upperLimit={107}
                decorator={"amp-teleop"}
              />
            </span>
          </div>
          <div>
            <Counter
              className="counter widget"
              id={this.assignUUID()}
              title={"Amped Speaker"}
              value={0}
              upperLimit={107}
              decorator={"amped"}
            />
            <Counter
              className="counter widget"
              id={this.assignUUID()}
              title={"Trap"}
              value={0}
              upperLimit={3}
              decorator={"trap"}
            />
          </div>
          <div>
            <Counter
              className="counter widget"
              id={this.assignUUID()}
              title={"Fumbles Speaker"}
              value={0}
              decorator={"fumbles"}
            />
            <Counter
              className="counter widget"
              id={this.assignUUID()}
              title={"Fumbles Amp"}
              value={0}
              decorator={"fumbles"}
            />
          </div>
          <div className="checkboxes1">
            <CheckBox
              className="docked"
              title="End Park"
              id={this.assignUUID()}
              value={false}
              decorator="teleopCheckbox"
            />
            <CheckBox
              className="onstage"
              title="End Onstage"
              id={this.assignUUID()}
              value={false}
              decorator="onstage"
            />
          </div>
          <div className="checkboxes1">
            <CheckBox
              className="isFailure"
              title="Climb Failure"
              id={this.assignUUID()}
              value={false}
              decorator="dissapointmentCheckbox"
            />
            <CheckBox
              className="coopertition"
              title="Coopertition"
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
          <div>
            <new className="slider-reference">‎ ‎ ‎ ‎ ‎ Terrible</new>
            <Slider
              title="Human Player"
              id={this.assignUUID()}
              decorator="slide"
            />
            <new className="slider-reference">Incredible</new>
            <div className="slider-nums">{this.sliderNumbers()}</div>
          </div>
          <div>
            <new className="slider-reference">‎ ‎ ‎ ‎ ‎ Terrible</new>
            <Slider
              title="Driving"
              id={this.assignUUID()}
              decorator="slide"
            />
            <new className="slider-reference">Incredible</new>
            <div className="slider-nums">{this.sliderNumbers()}</div>
          </div>
          <div className="checkboxes">
            <CheckBox
              className="temporary"
              title="Temporary Failure"
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
          <ClearLocalStorage title="Clear match saves" clearLocalStorage={this.clearLocalStorage} />
        </div>
      </ul>
    );
  }


}

export default Container;
