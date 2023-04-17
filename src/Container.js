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



class Container extends React.Component{

  scriptUrl = "https://script.google.com/macros/s/AKfycbz7hdELAhAZDZP2XlLzwdOtyO-Xo10KLsbTw5skSf1R0wDRgOimbqA928yt8Q088s3M/exec"
 
  state = {
    items: [],
  }

  gatherData = () => {
    var arr = []


    for (var i = 0; i < this.state.items.length; i++){


      var element = document.getElementById(this.state.items[i]);


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

    if (sendData){
      var formDataObject = new FormData()
      
      for (var i = 0; i < data.length; i++){
        formDataObject.append(data[i][0], data[i][1])
      }


      fetch(this.scriptUrl, {method: 'POST', body: formDataObject})
      .then(response => console.log(response.json()))
      .catch(err => console.log(err))


      let cachedData = JSON.parse(localStorage.getItem("matchData"))

      if (cachedData != null){
        cachedData.push(data)
        localStorage.setItem("matchData", JSON.stringify(cachedData))
      } else {
        localStorage.setItem("matchData", JSON.stringify([data]))
      }
     
      console.log(JSON.stringify(data))
      window.scrollTo(0, 0);
      // setTimeout(() => {
      //   document.location.reload();
      // }, 2750);
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
    this.state.items.push(id)
    return id
  }


  handleExportData = (_) => {
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

  submitAllData = () => {
    if (!window.confirm("Only press OK if your scouting lead has told you specifically to do this.")) {return}

    let data = localStorage.getItem("matchData")

    let formDataObject = new FormData()
    let fails = 0
    
    for (let i = 0; i < data.length; i++){
      formDataObject.append(data[i], data[i])
    }

    for (let i = 0; i < data.length; i++){
      for (let e = 0; e < data[i].length; e++){
        formDataObject.append(data[i][e][0], data[i][e][1])
      }
      fetch(this.scriptUrl, {method: 'POST', body: formDataObject})
      .catch(err => {console.log(err); fails++})
      formDataObject = new FormData();
    }

    if (fails) {alert("Failed to submit " + fails + " matches, please talk to your scouting lead.")}
    
    else {alert("All data exported")}
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
          <div className = "style1">
            <CheckBox 
              className="mobility"
              title="Mobility Auto" 
              id={this.assignUUID()} 
              value={false}
              decorator = "autoCheckbox"
            />
            <CheckBox 
              className="docked" 
              title="Docked Auto"
              id={this.assignUUID()}
              value={false}
              decorator = "autoCheckbox"
            />    
            <CheckBox
              className="engaged"
              title="Engaged Auto"
              id={this.assignUUID()}
              value={false}
              decorator = "autoCheckbox"
            />  
          </div>
          <img src={cone} alt={notFound} className="cone"/>
          <img src={cube} alt={notFound} className="cube"/>
          <div>
            <span className="upper">
              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Cone Upper Auto"}
                value={0}
                upperLimit={6}
                decorator = {"cones"}
              />


              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Cube Upper Auto"}
                value={0}
                upperLimit={3}
                decorator = {"cubes"}
              />
            </span>
          </div>
          <div>
            <span className="mid">
              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Cone Middle Auto"}
                value={0}
                upperLimit={6}
                decorator = {"cones"}
              />


              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Cube Middle Auto"}
                value={0}
                upperLimit={3}
                decorator = {"cubes"}
              />
            </span>
          </div>
          <div>
            <span className="lower">
              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Cone Lower Auto"}
                value={0}
                upperLimit={9}
                decorator = {"cones"}
              />


              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Cube Lower Auto"}
                value={0}
                upperLimit={9}
                decorator = {"cubes"}
              />
            </span>
          </div>
        </div>
       
        <div className="teleop-container">
          <h2 className="subtitle section-title">
            TELEOP
          </h2>
          <img src={cone} alt={notFound} className="cone"/>
          <img src={cube} alt={notFound} className="cube"/>
          <div>
            <span className="uppers">
              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Cone Upper Teleop"}
                value={0}
                upperLimit={6}
                decorator = {"cones"}
              />


              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Cube Upper Teleop"}
                value={0}
                upperLimit={3}
                decorator = {"cubes"}
              />
            </span>
          </div>
          <div>
            <span className="mid">
              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Cone Middle Teleop"}
                value={0}
                upperLimit={6}
                decorator = {"cones"}
              />


              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Cube Middle Teleop"}
                value={0}
                upperLimit={3}
                decorator = {"cubes"}
              />
            </span>
          </div>
          <div>
            <span className="lower">
              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Cone Lower Teleop"}
                value={0}
                upperLimit={9}
                decorator = {"cones"}
              />


              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Cube Lower Teleop"}
                value={0}
                upperLimit={9}
                decorator = {"cubes"}
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
                title={"Supercharged Pieces"}
                value={0}
                upperLimit = {12}
                decorator = {"supercharged"}
                />
          </div>
          <div>
            <CheckBox 
              className="docked" 
              title="Docked Teleop" 
              id={this.assignUUID()} 
              value={false}
              decorator = "teleopCheckbox"
            />    
            <CheckBox 
              className="engaged" 
              title="Engaged Teleop" 
              id={this.assignUUID()} 
              value={false}
              decorator = "teleopCheckbox"
            />  
            <CheckBox 
              className="isFailure" 
              title="Chargepad Failure" 
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
              title="Rate their driving"
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
          {/* <Export title="Export All Data" handleExportData={this.submitAllData}/> */}
        </div>
      </ul>
    );
  }


}


export default Container;
