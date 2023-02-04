import logo from './logo.svg';
// import './App.css';

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
        title: "Test text box",
        type: "text"
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
        title: "test dropdown",
        type: "dropdown",
        items: [{
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
    ]
  }

  gatherData = () => {
    return this.state.items.map(item => {
      return item.title, item.value
    })
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
          console.log(item.id + ", " +
                      item.value
                      )
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
  
  handleDropdownChange = (id, value) => {
    console.log(id, value)
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
      console.log(data[i])
      formDataObject.append(data[i], data[i])
    }

    fetch(this.scriptUrl, {method: 'POST', body: formDataObject})
    .then(res => {
        console.log("SUCCESSFULLY SUBMITTED")
    })
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
          else if (item.type === "text"){
            return (
              <TextBox
                id={item.id}
                title={item.title}
                handleTextBoxChange={this.handleTextBoxChange}
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
                value={0}
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
