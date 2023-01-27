import logo from './logo.svg';
// import './App.css';
import CheckBox from './CheckBox';
import {v4 as uuidv4} from "uuid"
import React from 'react';

class Container extends React.Component{

  state = {
    items: [
      id: uuidv4(),: {
              type: "checkbox",
              title: "Test checkbox",
              value: false
            },
      {
        id: uuidv4(),
        type: "textEntry",
        name: "Test text entry",
        value: ""
      },
      {
        id: uuidv4(),
        type: "counter",
        name: "Test counter",
        limits: {max: 10, min: -10},
        increment: 1,
        
      }
    ]
  }

  handleCheckboxChange = (id) => {
    this.state.id.value = !this.state.id.value
  }

  render () {
    return (
      <div className="App">
        <CheckBox 
          title="Test checkbox"
          handleCheckboxChange={this.handleCheckboxChange}
        />
        
      </div>
    );
  }
}

export default Container;
