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
          let prediction = this.predictMatches(JSON.parse(res))
          let predictionPercentage = prediction[0]
          let redPoints = prediction[1]
          let bluePoints = prediction[2]
          if (redPoints.r1.points + redPoints.r2.points + redPoints.r3.points > bluePoints.b1.points + bluePoints.b2.points + bluePoints.b3.points){
            document.getElementById("winnerText").innerHTML = "Red"
            document.getElementById("winnerText").style.color = "red"
            document.getElementById("bPercent").innerHTML = `${(100-predictionPercentage*100).toFixed(2)}%`
            document.getElementById("rPercent").innerHTML = `${(predictionPercentage*100).toFixed(2)}%`
          }
          else if (bluePoints.b1.points + bluePoints.b2.points + bluePoints.b3.points > redPoints.r1.points + redPoints.r2.points + redPoints.r3.points){
            document.getElementById("winnerText").innerHTML = "Blue"
            document.getElementById("winnerText").style.color = "blue"
            document.getElementById("bPercent").innerHTML = `${(predictionPercentage*100).toFixed(2)}%`
            document.getElementById("rPercent").innerHTML = `${(100-predictionPercentage*100).toFixed(2)}%`
          }
          else {
            prediction = "Tie"
            document.getElementById("winnerText").innerHTML = "Tie"
            document.getElementById("winnerText").style.color = "black"
            document.getElementById("bPercent").innerHTML = `${(predictionPercentage*100).toFixed(2)}%`
            document.getElementById("rPercent").innerHTML = `${(predictionPercentage*100).toFixed(2)}%`
          }
          document.getElementById("b1").innerHTML = `${bluePoints.b1.teamNumber}`
          document.getElementById("b2").innerHTML = `${bluePoints.b2.teamNumber}`
          document.getElementById("b3").innerHTML = `${bluePoints.b3.teamNumber}`
          document.getElementById("r1").innerHTML = `${redPoints.r1.teamNumber}`
          document.getElementById("r2").innerHTML = `${redPoints.r2.teamNumber}`
          document.getElementById("r3").innerHTML = `${redPoints.r3.teamNumber}`

          document.getElementById("b1Score").innerHTML = `${bluePoints.b1.points}`
          document.getElementById("b2Score").innerHTML = `${bluePoints.b2.points}`
          document.getElementById("b3Score").innerHTML = `${bluePoints.b3.points}`
          document.getElementById("r1Score").innerHTML = `${redPoints.r1.points}`
          document.getElementById("r2Score").innerHTML = `${redPoints.r2.points}`
          document.getElementById("r3Score").innerHTML = `${redPoints.r3.points}`

          document.getElementById("bTotal").innerHTML = `${bluePoints.b1.points + bluePoints.b2.points + bluePoints.b3.points}`
          document.getElementById("rTotal").innerHTML = `${redPoints.r1.points + redPoints.r2.points + redPoints.r3.points}`
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
    redSTDVs.push(parseInt(response.red1[1]))
    redSTDVs.push(parseInt(response.red2[1]))
    redSTDVs.push(parseInt(response.red3[1]))
    redMeans.push(parseInt(response.red1[2]))
    redMeans.push(parseInt(response.red2[2]))
    redMeans.push(parseInt(response.red3[2]))
    blueSTDVs.push(parseInt(response.blue1[1]))
    blueSTDVs.push(parseInt(response.blue2[1]))
    blueSTDVs.push(parseInt(response.blue3[1]))
    blueMeans.push(parseInt(response.blue1[2]))
    blueMeans.push(parseInt(response.blue2[2]))
    blueMeans.push(parseInt(response.blue3[2]))

    let combBlue = this.combinedDistribution(blueMeans, blueSTDVs);
    let combRed = this.combinedDistribution(redMeans, redSTDVs);
    let diffMean = combBlue.mean - combRed.mean //pos value: blue wins, neg value: red wins
    let diffSTDV = Math.sqrt(combBlue.standardDeviation ** 2 + combRed.standardDeviation ** 2)
    // console.log(diffMean + ", " + diffSTDV)
    let prediction = this.areaUnderNormalCurve(0, diffMean, diffSTDV)
    // console.log(prediction)
    let redPoints = {
      r1: {
        teamNumber: parseInt(response.red1[0]),
        points: parseInt(response.red1[2])
      },
      r2: {
        teamNumber: parseInt(response.red2[0]),
        points: parseInt(response.red2[2])
      },
      r3: {
        teamNumber: parseInt(response.red3[0]),
        points: parseInt(response.red3[2])
      }
    }
    let bluePoints = {
      b1: {
        teamNumber: parseInt(response.blue1[0]),
        points: parseInt(response.blue1[2])
      },
      b2: {
        teamNumber: parseInt(response.blue2[0]),
        points: parseInt(response.blue2[2])
      },
      b3: {
        teamNumber: parseInt(response.blue3[0]),
        points: parseInt(response.blue3[2])
      }
    }
    
    return [prediction, redPoints, bluePoints]

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
        <form className='form container'>
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
        <div>
          <div className="row1">
            <table
              className="row1Table"
              id = "row1Table"
            />
          </div>
        </div>
        <div>
          <div className = "resultTable container">
            <table
              className="resultTable"
              id = "resultTable"
              >
                <tr>
                  <th id= "bPercent">B%</th>
                  <th id= "winnerText">winner</th>
                  <th id= "rPercent">R%</th>
                </tr>
                <tr>
                  <th id= "b1">b1</th>
                  <th id= "b1Score">b1Score</th>
                  <th id= "r1Score">r1Score</th>
                  <th id= "r1">r1</th>
                </tr>
                <tr>
                  <th id= "b2">b2</th>
                  <th id= "b2Score">b2Score</th>
                  <th id= "bTotal">bTotal</th>
                  <th id= "rTotal">rTotal</th>
                  <th id= "r2Score">r2Score</th>
                  <th id= "r2">r2</th>
                </tr>
                <tr>
                  <th id= "b3">b3</th>
                  <th id= "b3Score">b3Score</th>
                  <th id= "r3Score">r3Score</th> 
                  <th id= "r3">r3</th>
                </tr>


            </table>
          </div>
        </div>
      </span>
    );
  }


}


export default Container;
