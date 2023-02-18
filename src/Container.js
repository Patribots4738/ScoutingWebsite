import logo from './logo.svg';
import cone from './images/cone.png'
import cube from './images/cube.png'
import notFound from './images/notFound.png'
import patribotsLogo from './images/patribotsLogo.png'
import './App.css';

import CheckBox from './widgets/CheckBox';
import TextBox from './widgets/TextBox'
import Counter from './widgets/Counter'
import Submit from './widgets/Submit'
import TextBoxLong from './widgets/TextBoxLong'
import Slider from './widgets/Slider'
import Export from './widgets/Export';

import {v4 as uuidv4} from "uuid"
import React from 'react';

class Container extends React.Component{

  scriptUrl = "https://script.google.com/macros/s/AKfycbz1Q-xLuk8w2mi7Edy06wgCHmsskpAkMMLso09RboigvgdegC7LOf0uNQAPYtvz-jNH/exec"
  
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
        if (value == true || value == false){
          console.log(value)
          value = value ? "1" : "0";
          console.log(value + "\n\n")
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
      .catch(err => console.log(err))

      let cachedData = JSON.parse(localStorage.getItem("matchData"))
      console.log(cachedData)

      if (cachedData != null){
        cachedData.push(data)
        localStorage.setItem("matchData", JSON.stringify(cachedData))
      } else {
        localStorage.setItem("matchData", JSON.stringify([data]))
      }

      window.location.reload()
    }
  }

  assignUUID = () => {
    var id = uuidv4()
    this.state.items.push(id)
    return id
  }

  handleExportData =(e) => {
    let cachedData = (localStorage.getItem("matchData"))

    let file = new Blob([cachedData], {type: "text/json"})
    let blobURL = window.URL.createObjectURL(file)

    const anchor = document.createElement('a');
    anchor.href = blobURL
    anchor.target = "_blank"
    anchor.download = "matchData.json"
  
    anchor.click()
  
    URL.revokeObjectURL(blobURL);
  }

  render () {
    return (
      <ul className="container">

        <h1 className="title">
          PATRIBOTS SCOUTNG
        </h1>

        <div className='identification-container'>
          <h2 className="subtitle section-title">
            IDENTIFICATION
          </h2>

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
          <TextBox
            className="textbox team"
            id={this.assignUUID()}
            title={"Team Number"}
            value={""}
            required={true}
          />
        </div>
        
        <div className="auto-container">
          <h2 className="subtitle section-title">
            AUTONOMOUS
          </h2>
          <div>
            <CheckBox className="mobility" title="Mobility" id={this.assignUUID()} value={false}/>
            <CheckBox className="docked" title="Docked Auto" id={this.assignUUID()} value={false}/>    
            <CheckBox className="engaged" title="Engaged Auto" id={this.assignUUID()} value={false}/>  
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
              />

              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Cube Upper Auto"}
                value={0}
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
              />

              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Cube Middle Auto"}
                value={0}
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
              />

              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Cube Lower Auto"}
                value={0}
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
            <span className="upper">
              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Cone Upper Teleop"}
                value={0}
              />

              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Cube Upper Teleop"}
                value={0}
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
              />

              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Cube Middle Teleop"}
                value={0}
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
              />

              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Cube Lower Teleop"}
                value={0}
              />
            </span>
          </div>
          <div className="fumbles">
            <Counter 
                className="counter widget"
                id={this.assignUUID()}
                title={"Fumbles"}
                value={0}/>
          </div>
          <div>
            <CheckBox className="docked" title="Docked Teleop" id={this.assignUUID()} value={false}/>    
            <CheckBox className="engaged" title="Engaged Teleop" id={this.assignUUID()} value={false}/>  
          </div>

        </div>
        
        <div className="post-match-container">
          <h2 className="subtitle section-title">
            POST-MATCH
          </h2>
          <div>
            <Slider title="Rate their driving" id={this.assignUUID()}/>
            <Slider title="Rate their accuracy" id={this.assignUUID()}/>
          </div>
          <div>
            <Slider title="Rate their speed" id={this.assignUUID()}/>
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

        <div className='btn-container'>
          <Submit title="Submit" handleFormSubmit={this.handleFormSubmit}/>
          <Export title="Export Data" handleExportData={this.handleExportData}/>
        </div>
      </ul>
    );
  }

}

export default Container;
