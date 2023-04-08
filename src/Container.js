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




class Container extends React.Component{

  scriptUrl = "https://script.google.com/macros/s/AKfycbxMo0sqdHmJ7udyYsqQ_mqgJE97269smFSVlDlkZm1YbmhzT7ZtDYn5mqerLEo51rTS/exec"
 
  state = {
    items: [],
    teams: [
        [
        -1,
        -1,
        -1
        ],
        [
        -1,
        -1,
        -1
        ]
      ]
  }
  
  combinedDistribution = (means, standardDeviations) => {
    let sum = 0;
    let squaresSum = 0;
    let n = means.length;
    for (let i = 0; i < n; i++) {
        sum += means[i];
        squaresSum += standardDeviations[i] ** 2;
    }
    let mean = sum;
    let standardDeviation = Math.sqrt(squaresSum);
    return { mean, standardDeviation };
  }

  areaUnderNormalCurve = (value, mean, standardDeviation) => {
    // Convert the value to a z-score using the mean and standard deviation
    let z = (value - mean) / standardDeviation;
    // Use the cumulative distribution function to calculate the area under the curve to the right
    let area = 0.5 * (1 - this.erf(z / Math.sqrt(2)));
    return area;
  }

  erf = (x) => {
    let a1 = 0.254829592;
    let a2 = -0.284496736;
    let a3 = 1.421413741;
    let a4 = -1.453152027;
    let a5 = 1.061405429;
    let p = 0.3275911;
    let sign = 1;
    if (x < 0) {
        sign = -1;
    }
    x = Math.abs(x);
    let t = 1 / (1 + p * x);
    let y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
  }

  assignUUID = (name) => {
    var id = uuidv4()
    if (name !== undefined && name !== null){
      id = name
    }
    this.state.items.push(id)
    return id
  }


  gatherTeams = () => {
    var arr = []
    for (var i = 0; i < this.state.items.length; i++){
      var element = document.getElementById(this.state.items[i]);
      arr.push(element.value)
    }
    return arr
  }
  
  handleSubmit = (event) => {
    event.preventDefault()
    let data = this.gatherTeams()
    let isValid = true
    for (var i = 0; i < data.length; i++){
      if (data[i] === "" || !Number.isInteger(parseInt(data[i])) || parseInt(data[i]) < 0){
        isValid = false
      }
    }

    let response = undefined

    if (!isValid) {
      alert("Please enter a valid team number")
    }
    else {
      let fullEndpoint = this.scriptUrl + `?r1=${data[0]}&r2=${data[1]}&r3=${data[2]}&b1=${data[3]}&b2=${data[4]}&b3=${data[5]}` 
      console.log(fullEndpoint)
      fetch(fullEndpoint, {
        method: 'GET',
        })
        .then(data=>{return data.text()})
        .then(res=>{
          let predictionPercentage = this.predictMatches(JSON.parse(res))
          let matchScores = this.predictMatchScores(JSON.parse(res))
        })
        .catch((error) => {
          console.error('Error:', error)
          alert("Something went wrong, check your team numbers.")
        }
        )
    }
  }

  predictMatches = (res) => {
    let response = res
    let redSTDVs = []
    let redMeans = []
    let blueSTDVs = []
    let blueMeans = []
    redSTDVs.push(parseInt(response.red1[0]))
    redSTDVs.push(parseInt(response.red2[0]))
    redSTDVs.push(parseInt(response.red3[0]))
    redMeans.push(parseInt(response.red1[1]))
    redMeans.push(parseInt(response.red2[1]))
    redMeans.push(parseInt(response.red3[1]))
    blueSTDVs.push(parseInt(response.blue1[0]))
    blueSTDVs.push(parseInt(response.blue2[0]))
    blueSTDVs.push(parseInt(response.blue3[0]))
    blueMeans.push(parseInt(response.blue1[1]))
    blueMeans.push(parseInt(response.blue2[1]))
    blueMeans.push(parseInt(response.blue3[1]))

    let combBlue = this.combinedDistribution(blueMeans, blueSTDVs);
    let combRed = this.combinedDistribution(redMeans, redSTDVs);
    let diffMean = combBlue.mean - combRed.mean //pos value: blue wins, neg value: red wins
    let diffSTDV = Math.sqrt(combBlue.standardDeviation ** 2 + combRed.standardDeviation ** 2)
    // console.log(diffMean + ", " + diffSTDV)
    let prediction = this.areaUnderNormalCurve(0, diffMean, diffSTDV)
    // console.log(prediction)
    

  }
  
  /*
  Blue Points
  Red Points
  Match percentage
  Points for each team
  Team number
  */
  render () {
    return (
      <span>
        <form className='container'>
          <ul className="container">
            <div className="redContainer">
              <TextBox 
                className="red red1"
                id={this.assignUUID("r1Input")}
                title="Red 1"
                required={true}
              />
              <TextBox 
                className="red red1"
                id={this.assignUUID("r2Input")}
                title="Red 2"
                required={true}
              />
              <TextBox 
                className="red red1"
                id={this.assignUUID("r3Input")}
                title="Red 3"
                required={true}
              />
            </div>
            <div>
              <TextBox 
                className="blue blue1"
                id={this.assignUUID("b1Input")}
                title="Blue 1"
                required={true}
              />
              <TextBox 
                className="blue blue2"
                id={this.assignUUID("b2Input")}
                title="Blue 2"
                required={true}
              />
              <TextBox 
                className="blue blue3"
                id={this.assignUUID("b3Input")}
                title="Blue 3"
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


        <div className='team-number-container widget'>
          <div className="red-team-number-container">
            <div className="team-number">{this.state.teams[0]}</div>
            <div className="team-number">{this.state.teams[1]}</div>
            <div className="team-number">{this.state.teams[2]}</div>
          </div>
          <div className="blue-team-number-container">
            <div className="team-number">{this.state.teams[3]}</div>
            <div className="team-number">{this.state.teams[4]}</div>
            <div className="team-number">{this.state.teams[5]}</div>
          </div>
        </div>
      </span>
    );
  }


}


export default Container;
