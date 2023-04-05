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


const readerOptions = {
  sheetID: '',
  returnAllResults: false,
}

class Container extends React.Component{

  scriptUrl = "https://script.google.com/macros/s/AKfycbz1Q-xLuk8w2mi7Edy06wgCHmsskpAkMMLso09RboigvgdegC7LOf0uNQAPYtvz-jNH/exec"
 
  state = {
    items: [],
    teams: {
      red: {
        red1: -1,
        red2: -1,
        red3: -1
      },
      blue: {
        blue1: -1,
        blue2: -1,
        blue3: -1
      }
    }
  }


  assignUUID = () => {
    var id = uuidv4()
    this.state.items.push(id)
    return id
  }


  gatherTeams = () => {
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
    this.setState({
      teams: {
        red: {
          red1: document.getElementByID("r1Input").value,
          red2: document.getElementByID("r2Input").value,
          red3: document.getElementByID("r3Input").value
        },
        blue: {
          blue1: -1,
          blue2: -1,
          blue3: -1
        }
      }
    })
    return arr
  }
  
  handleSubmit = (event) => {
    let data = this.gatherTeams()
    console.log(data)
    event.preventDefault()
  }

  render () {
    return (
      <span>
        <form className='container'>
          <ul className="container">
            <div className="redContainer">
              <TextBox 
                className="red red1"
                id="r1Input"
                title="Red 1"
                required={true}
              />
              <TextBox 
                className="red red1"
                id="r2Input"
                title="Red 2"
                required={true}
              />
              <TextBox 
                className="red red1"
                id="r3Input"
                title="Red 3"
                required={true}
              />
            </div>
            <div>
              <TextBox 
                className="blue blue1"
                id="b1Input"
                title="Blue 1"
                required={true}
              />
              <TextBox 
                className="blue blue2"
                id={this.assignUUID()}
                title="b2Input"
                required={true}
              />
              <TextBox 
                className="blue blue3"
                id={this.assignUUID()}
                title="b3Input"
                required={true}
              />
            </div>
            <div className="submitContainer">
              <button className='submit btn' onClick={this.handleSubmit}>
                Calculate Match Outcome
              </button>
            </div>
          </ul>
        </form>

        <div className='container'>
          <span className="teamNumbers">{this.state.teams}</span>
        </div>
      </span>
    );
  }


}


export default Container;
