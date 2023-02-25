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

import {v4 as uuidv4} from "uuid"
import React from 'react';
import ClearLocalStorage from './widgets/ClearLocalStorage';


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
     
     
      window.scrollTo(0, 0);
      alert("Data submitted, please wait")
      setTimeout(() => {
        document.location.reload();
      }, 3000);
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
        <button 
        className="label"
        decorator = "hide"
        >
          By Continuing to Use Our Website You Agree to Use Cookies :)
        </button>

        <h1 className="title">
          PATRIBOTS SCOUTING
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
          <div ClassName = "style1">
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
                upperLimit={6}
                decorator = {"cones"}
              />


              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Cube Lower Auto"}
                value={0}
                upperLimit={3}
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
                upperLimit={6}
                decorator = {"cones"}
              />


              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Cube Lower Teleop"}
                value={0}
                upperLimit={3}
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
              title="Rate their accuracy" 
              id={this.assignUUID()}
              decorator = "slide"
            />
          </div>
          <div>
            <Slider
              title="Rate their speed"
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
            <div>
            <CheckBox
              className="defend"
              title="Did they defend"
              id={this.assignUUID()}
              value={false}
              decorator = "defend"
            />
            </div>
            <div>
              <Slider 
                title={"If they defended, rate their defense (-1 for no defense)"} 
                id={this.assignUUID()}
                decorator="double-line"
                minValue={-1}
                value={-1}
                
                />
            </div>
            <div>
            <TextBoxLong
              className="text-box-long"
              id={this.assignUUID()}
              title={"If they defended, how did they do?"}
              value={""}
              />
            </div>
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
        <div className='btn-container'>
          <Export title="Export Data" handleExportData={this.handleExportData}/>
          <ClearLocalStorage title="Clear match saves" clearLocalStorage={this.clearLocalStorage}/>
        </div>
      </ul>
    );
  }


}


export default Container;
