import logo from './logo.svg';
import notFound from './images/notFound.png'
import patribotsLogo from './images/patribotsLogo.png'
import './App.css';

import CheckBox from './widgets/CheckBox';
import TextBox from './widgets/TextBox'
import Counter from './widgets/Counter'
import Submit from './widgets/Submit'
import Dropdown from './widgets/Dropdown';

import {v4 as uuidv4} from "uuid"
import React from 'react';

class Container extends React.Component{

  scriptUrl = "https://script.google.com/macros/s/AKfycbxlWrIFQhOyLexyXtRoVkoiuOWNnvaZNy8WAUNqd5i_T9mAxMwEp7TdaD-NutzOBZuJ/exec"
  
  state = {
    items: [
      {
        
      }
    ]
  }
  
  handleDropdownChange = (event) => {
    this.setState({
      items: this.state.items.map(item => {
        if (item.id === event.target.id){
          item.value = event.target.value
        }
        return item
      })},
    )
    
  }
  
  gatherData = () => {
    var arr = []

    for (var i = 0; i < this.state.items.length; i++){
      if (this.state.items[i].type !== "submit"
          && this.state.items[i].type !== "label"
          && this.state.items[i].type !== "image"
          && this.state.items[i].type !== "header"){

            arr.push([this.state.items[i].title, this.state.items[i].value])

          }
    }

    return arr
  }

  getIDFromTitle = (title) => {
    this.state.items.filter(item => {
      if (item.title === title){
        return item.id
      }
    })
  }

  handleCheckBoxChange = (id) => {
    this.setState({
      items: this.state.items.map(item => {
        if (item.id === id) {
          item.value = !item.value
        }
        return item
      })
    })
  }

  handleTextBoxChange = (id, value) => {
    this.setState({
      items: this.state.items.map(item => {
        if (item.id === id) {
          item.value = value
        }
        return item
      })
    })
  }

  handleFormSubmit = (e) =>{
    e.preventDefault()

    var data = this.gatherData()

    var formDataObject = new FormData()

    for (var i = 0; i < data.length; i++){
      formDataObject.append(data[i][0], data[i][1])
    }

    console.log(formDataObject)

    fetch(this.scriptUrl, {method: 'POST', body: formDataObject})
    .catch(err => console.log(err))
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
            id={uuidv4()}
            title={"Name"}
            handleTextBoxChange={this.handleTextBoxChange}
            value={""}
          />
          <TextBox
            className="textbox match"
            id={uuidv4()}
            title={"Match Number"}
            handleTextBoxChange={this.handleTextBoxChange}
            value={""}
          />
          <TextBox
            className="textbox team"
            id={uuidv4()}
            title={"Team Number"}
            handleTextBoxChange={this.handleTextBoxChange}
            value={""}
          />
        </div>
        
        <div className="auto-container">
          <h2 className="subtitle section-title">
            AUTONOMOUS
          </h2>
          <div>
            <span className="upper">
              <Counter
                className="counter widget"
                id={uuidv4()}
                title={"Cone"}
                value={0}
                increaseCounter={this.increaseCounter}
                decreaseCounter={this.decreaseCounter}
              />

              <Counter
                className="counter widget"
                id={uuidv4()}
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
                id={uuidv4()}
                title={"Cone"}
                value={0}
                increaseCounter={this.increaseCounter}
                decreaseCounter={this.decreaseCounter}
              />

              <Counter
                className="counter widget"
                id={uuidv4()}
                title={"Cube"}
                value={0}
                increaseCounter={this.increaseCounter}
                decreaseCounter={this.decreaseCounter}
              />
            </span>
          </div>
          <div className="auto-container">
            <span className="lower">
              <Counter
                className="counter widget"
                id={uuidv4()}
                title={"Cone"}
                value={0}
                increaseCounter={this.increaseCounter}
                decreaseCounter={this.decreaseCounter}
              />

              <Counter
                className="counter widget"
                id={uuidv4()}
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
          <div>
            <span className="upper">
              <Counter
                className="counter widget"
                id={uuidv4()}
                title={"Cone"}
                value={0}
                increaseCounter={this.increaseCounter}
                decreaseCounter={this.decreaseCounter}
              />

              <Counter
                className="counter widget"
                id={uuidv4()}
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
                id={uuidv4()}
                title={"Cone"}
                value={0}
                increaseCounter={this.increaseCounter}
                decreaseCounter={this.decreaseCounter}
              />

              <Counter
                className="counter widget"
                id={uuidv4()}
                title={"Cube"}
                value={0}
                increaseCounter={this.increaseCounter}
                decreaseCounter={this.decreaseCounter}
              />
            </span>
          </div>
          <div className="teleop-container">
            <span className="lower">
              <Counter
                className="counter widget"
                id={uuidv4()}
                title={"Cone"}
                value={0}
                increaseCounter={this.increaseCounter}
                decreaseCounter={this.decreaseCounter}
              />

              <Counter
                className="counter widget"
                id={uuidv4()}
                title={"Cube"}
                value={0}
                increaseCounter={this.increaseCounter}
                decreaseCounter={this.decreaseCounter}
              />
            </span>
          </div>
        </div>
      </ul>
    );
  }
}

export default Container;
