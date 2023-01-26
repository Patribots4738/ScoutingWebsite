import logo from './logo.svg';
import './App.css';
import CheckBox from './CheckBox';
import {v4 as uuidv4} from "uuid"
import React from 'react';

class App extends React.component{

  state = {
    items: [
      {
        id: uuidv4(),
        name: "Test tester"
      }
    ]
  }

  // handleCheckboxChange = (id) > {

  // }

  render () {
    return (
      <div className="App">
        <CheckBox></CheckBox>
        
      </div>
    );
  }
}

export default App;
