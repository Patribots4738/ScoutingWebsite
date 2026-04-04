import React from "react";
import Slider from "./Slider.js";
// import { preload } from "react-dom";

class TeleopCounter extends React.Component {

    state = {
        title: this.props.title,
        id: this.props.id,
        classNameDecorator: this.props.className,
        hubValue: 0,
        passValue: 0,
        scoreAmount: 1,
        scoreLocation: "HUB",
        fumblePercent: 100
    }
    
    handleScore = () => {
        let newLog
        if (this.state.scoreLocation === "HUB") {
            newLog = this.state.hubValue + this.state.scoreAmount
            this.setState({
                hubValue: newLog
            })
        } else if (this.state.scoreLocation === "PASS") {
            newLog = this.state.passValue + this.state.scoreAmount
            this.setState({
                passValue: newLog
            })
        }
    }

    handleScoreLocation = (location) => {
        if (location === "HUB") {
            document.querySelector('.Hub-btn').style.setProperty('background-color','var(--team-active-color)')
            document.querySelector('.Hub-btn').style.setProperty('border-style','inset')
            document.querySelector('.Pass-btn').style.setProperty('background-color','darkorchid')
            document.querySelector('.Pass-btn').style.setProperty('border-style','outset')
        } else if (location === "PASS") {
            document.querySelector('.Pass-btn').style.setProperty('background-color','purple')
            document.querySelector('.Pass-btn').style.setProperty('border-style','inset')
            document.querySelector('.Hub-btn').style.setProperty('background-color','var(--team-color)')
            document.querySelector('.Hub-btn').style.setProperty('border-style','outset')
        }
        this.setState({
            scoreLocation: location
        })
    }
    
    handleScoreAmount = (amount) => {
        this.setState({
            scoreAmount: amount
        })
    }

    handleRemove = () => {
        let newLog
        if (this.state.scoreLocation === "HUB") {
            newLog = this.state.hubValue - this.state.scoreAmount
            if (newLog < 0) {
                this.setState({
                    hubValue: 0
                })
            } else {
                this.setState({
                    hubValue: newLog
                })
            }
        } else if (this.state.scoreLocation === "PASS") {
            newLog = this.state.passValue - this.state.scoreAmount
            if (newLog < 0) {
                this.setState({
                    passValue: 0
                })
            } else {
                this.setState({
                    passValue: newLog
                })
            }
        }
    }

    scoreBtn = () => {
        return(
            <div className="score-btn" onClick={() => this.handleScore()}>
                <div className="score-btn-text">Shoot</div>
            </div>
        )
    }

    removeBtn = () => {
        return(
            <div className="fumble-btn" onClick={() => this.handleRemove()}>
                <div className="fumble-btn-text">Remove</div>
            </div>
        )
    }

    hubBtn = () => {
        return(
            <button className="Hub-btn" onClick={() => this.handleScoreLocation("HUB")}>
                <div className="score-btn-text">HUB</div>
            </button>
        )
    }

    passBtn = () => {
        return(
            <button className="Pass-btn" onClick={() => this.handleScoreLocation("PASS")}>
                <div className="score-btn-text">PASS</div>
            </button>
        )
    }

    //this guy is very silly
    bigUIArray = () => {
        return (
        <div className="reef-map">
            <div className="teleop-misic">
                <div className="teleop-display-box">
                    <div className="teleop-display">
                        <div className="teleop-display-text">
                            {this.state.hubValue}
                        </div>
                    </div>
                    <div className="teleop-display">
                        <div className="teleop-display-text">
                            {this.state.passValue}
                        </div>
                    </div>
                </div>
                <div className="location-box">
                    {this.hubBtn()}
                    {this.passBtn()}
                </div>
                <div className="teleop-score-box">
                    {this.scoreBtn()}
                    {this.removeBtn()}
                </div>
            </div>
            <div className="teleop-scoring">
                <object className="fuel-graphic" aria-label={"Fuel Icon"}> {this.state.scoreAmount} </object>
                <button className="amount-btn" onClick={() => this.handleScoreAmount(1)}>
                    1x
                </button>
                <button className="amount-btn" onClick={() => this.handleScoreAmount(5)}>
                    5x
                </button>
                <button className="amount-btn" onClick={() => this.handleScoreAmount(10)}>
                    10x
                </button>
            </div>
            <Slider
                title="Accuracey"
                units="%"
                changeFunc={this.getPercent}
                value={this.state.fumblePercent}
                minValue={0}
                maxVaule={100}
                decorator="acurate-title"
                sliderdecorator="acurate-slider"
                boxdecorator="teleop-slider-box"
                id={3}
            />
        </div>  
        )
    }

    getPercent = (input) => {
        var value
        var element = document.getElementById(3)
        value = input
        if (!value) {
            value = element.value
        }
        console.log("Getter: " + value)
        this.setState({
            fumblePercent: value
        })
    }

    render() {
        return (                                                                                         //0                     //1                 //2
            <span className={"widget-" + this.state.classNameDecorator} id={this.state.id} value={[this.state.hubValue, this.state.passValue, this.state.fumblePercent]}>
                <div className= {"subtitle"}>
                    {this.state.title}
                </div>
                <div className="teleop-counter-container">
                    {this.bigUIArray()}
                </div>
            </span>
        );
    }
}

export default TeleopCounter;