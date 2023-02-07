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
        id: uuidv4(),
        title: "Test header",
        type: "header",
      },
      {
        id: uuidv4(),
        title: "Test image",
        src: patribotsLogo,
        type: "image",
      },
      {
        id: uuidv4(),
        title: "Test label",
        type: "label",
      },
      {
        id: uuidv4(),
        title: "Test text box",
        type: "textbox",
        value: ""
      },
      {
        id: uuidv4(),
        title: "Test checkbox 2",
        value: false,
        type: "checkbox"
      },
      {
        id: uuidv4(),
        title: "Test counter 4",
        value: 0,
        type: "counter"
      },
      {
        id: uuidv4(),
        title: "Test dropdown",
        type: "dropdown",
        items: [
          {
            id: uuidv4(),        
            title: "option1",
          },
          {
            id: uuidv4(),        
            title: "option2",
          },
          {
            id: uuidv4(),        
            title: "option3",
          },
        ],
        value: -1,
      },
      {
        id: uuidv4(),
        title: "Test submit button",
        type: "submit"
      },
    ],
    test: 0
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
    var arr = this.state.items.map(item => {
      if (item.type !== "submit" && item.type !== "label"){
        return [item.title, item.value]
      }
    })
    return arr.slice(0, arr.length-1)
  }

  increaseCounter = (id) => {
    this.setState({
        items: this.state.items.map(item => {
          if (item.id === id) {
            item.value = item.value + 1
          }
          return item
        })
    })
  }

  decreaseCounter = (id) => {
    this.setState({
        items: this.state.items.map(item => {
          if (item.id === id) {
            item.value = item.value - 1
          }
          return item
        })
    })
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

    fetch(this.scriptUrl, {method: 'POST', body: formDataObject})
    .catch(err => console.log(err))
  }


  render () {
    return (
      <ul className="App">
        {this.state.items.map(item => {
          if (item.type === "checkbox") {
            return (
              <CheckBox
                id={item.id}
                title={item.title}
                value={item.value}
                handleCheckBoxChange={this.handleCheckBoxChange}
              />
             ) 
          }
          else if (item.type === "textbox"){
            return (
              <TextBox
                id={item.id}
                title={item.title}
                handleTextBoxChange={this.handleTextBoxChange}
                value={item.value}
              />
            )
          }
          else if (item.type === "counter"){
            return (
              <Counter
              id={item.id}
              title={item.title}
              value={item.value}
              increaseCounter={this.increaseCounter}
              decreaseCounter={this.decreaseCounter}
              />
            )
          }
          else if (item.type === "submit"){
            return (
              <Submit
                id={item.id}
                title={item.title}
                handleFormSubmit={this.handleFormSubmit}
              />              
            )
          }
          else if (item.type === "dropdown"){
            return (
              <Dropdown
                id={item.id}
                title={item.title}
                data={item.data}
                items={item.items}
                handleDropdownChange={this.handleDropdownChange}
                value={item.value}
              />              
            )
          }
          else if (item.type === "label"){
            return (
              <div className='label'>
                {item.title}
              </div>
            )
          }
          else if (item.type === "header"){
            return (
              <h1 className='header'>
                {item.title}
              </h1>
            )
          }
          else if (item.type === "image"){
            return (
              <img
                src = {item.src}
                alt = {notFound}
              />
            )
          }
        })
        }
      </ul>
    );
  }
}

export default Container;
