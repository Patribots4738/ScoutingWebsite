import logo from './logo.svg';
// import './App.css';
import CheckBox from './CheckBox';
import {v4 as uuidv4} from "uuid"
import React from 'react';

class Container extends React.Component{

  state = {
    items: [
      {
        id: uuidv4(),
        title: "Test checkbox",
        value: false,
        type: "checkbox"
      },
      {
        id: uuidv4()
      },
      {
        id: uuidv4()
      },
      {
        id: uuidv4()
      }
    ]
  }

  getIDFromTitle = (title) => {
    
    this.state.items.filter(item => {
      if (item.title === title){
        return item.id
      }
    })
  }

  handleCheckboxChange = (id) => {
    console.log(id)

    this.setState({

      items: this.state.items.map(item => {
        console.log(item.id, id)
        if (item.id === id) {
          item.value = !item.value
          console.log(item.value)
        }
        return item
      })

    })
  }

  render () {
    return (

      <ul className="App">

        {this.state.items.map(item => {

          console.log("salkjdsa;fzdf;DS")
          // if (item.type === "checkbox") {
             (
              <CheckBox
                key={uuidv4()}
                title={"me fr"}
                handleCheckboxChange={this.handleCheckboxChange}
              />
             )
            {console.log(item.id, " ", item.title)}
            
          // }
        })
        }

      </ul>
    );
  }
}

export default Container;
