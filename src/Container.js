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
import Dropdown from './widgets/Dropdown';
import TextBoxLong from './widgets/TextBoxLong'
import Slider from './widgets/Slider'

import {v4 as uuidv4} from "uuid"
import React from 'react';

class Container extends React.Component{

  scriptUrl = "https://script.google.com/macros/s/AKfycbxlWrIFQhOyLexyXtRoVkoiuOWNnvaZNy8WAUNqd5i_T9mAxMwEp7TdaD-NutzOBZuJ/exec"
  
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
        } else {
          var value = element.value
        }
       
        arr.push([element.getAttribute("title"), value])
      }
    }
    return arr
  }

  handleFormSubmit = (e) =>{
    e.preventDefault()

    var data = this.gatherData()

    var formDataObject = new FormData()

    for (var i = 0; i < data.length; i++){
      console.log(data[i][0], data[i][1])
      formDataObject.append(data[i][0], data[i][1])
    }

    console.log(formDataObject)

    // fetch(this.scriptUrl, {method: 'POST', body: formDataObject})
    // .catch(err => console.log(err))

    window.location.reload()
  }

  assignUUID = () => {
    var id = uuidv4()
    this.state.items.push(id)
    return id
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
          />
          <TextBox
            className="textbox match"
            id={this.assignUUID()}
            title={"Match Number"}
            value={""}
          />
          <TextBox
            className="textbox team"
            id={this.assignUUID()}
            title={"Team Number"}
            value={""}
          />
        </div>
        
        <div className="auto-container">
          <h2 className="subtitle section-title">
            AUTONOMOUS
          </h2>
          <div>
            <CheckBox className="mobility" title="Mobility" id={this.assignUUID()} value={false}/>
            <CheckBox className="docked" title="Docked" id={this.assignUUID()} value={false}/>    
            <CheckBox className="engaged" title="Engaged" id={this.assignUUID()} value={false}/>  
          </div>
          <img src={cone} className="cone"/>
          <img src={cube} className="cube"/>
          <div>
            <span className="upper">
              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Cone"}
                value={0}
                increaseCounter={this.increaseCounter}
                decreaseCounter={this.decreaseCounter}
              />

              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Cube"}
                value={0}
                increaseCounter={this.increaseCounter}
                decreaseCounter={this.decreaseCounter}
              />
            </span>
          </div>
          <div>
            <span className="mid">
              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Cone"}
                value={0}
                increaseCounter={this.increaseCounter}
                decreaseCounter={this.decreaseCounter}
              />

              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Cube"}
                value={0}
                increaseCounter={this.increaseCounter}
                decreaseCounter={this.decreaseCounter}
              />
            </span>
          </div>
          <div>
            <span className="lower">
              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Cone"}
                value={0}
                increaseCounter={this.increaseCounter}
                decreaseCounter={this.decreaseCounter}
              />

              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Cube"}
                value={0}
                increaseCounter={this.increaseCounter}
                decreaseCounter={this.decreaseCounter}
              />
            </span>
          </div>
        </div>
       
        <div className="teleop-container">
          <h2 className="subtitle section-title">
            TELEOP
          </h2>
            <img src={cone} className="cone"/>
            <img src={cube} className="cube"/>
          <div>
            <span className="upper">
              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Cone Upper"}
                value={0}
              />

              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Cube Upper"}
                value={0}
              />
            </span>
          </div>
          <div>
            <span className="mid">
              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Cone Middle"}
                value={0}
              />

              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Cube Middle"}
                value={0}
              />
            </span>
          </div>
          <div>
            <span className="lower">
              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Cone Lower"}
                value={0}
              />

              <Counter
                className="counter widget"
                id={this.assignUUID()}
                title={"Cube Lower"}
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

        </div>
        
        <div className="post-match-container">
          <h2 className="subtitle section-title">
            POST-MATCH
          </h2>
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
              title={"Other notes"}
              value={""}
            />
          </div>
          <div>
            <Slider title="Rate their driving" id={this.assignUUID()}/>
            <Slider title="Rate their accuracy" id={this.assignUUID()}/>
          </div>
        </div>

        <div className='btn-container'>
          <Submit title="Submit" handleFormSubmit={this.handleFormSubmit}/>
        </div>
      </ul>
    );
  }

}

export default Container;
