import React from "react";
import TeleopSelecterWidget from "./TeleopSelecterWidget";
// import { preload } from "react-dom";

class TeleopCounter extends React.Component {

    state = {
        title: this.props.title,
        id: this.props.id,
        classNameDecorator: this.props.className,
        hubValue: 0,
        passValue: 0,
        scoreAmount: 1,
        scoreLocation: "HUB"
    }
    

    let 

    handleScore = () => {
        let amount = this.state.scoreAmount
        let preLog
        let newLog
        if (this.state.scoreLocation === "HUB") {
            preLog = this.state.hubValue
            switch (amount) {
                case "1":
                    newLog = preLog + 1
                    break;
                case "5":
                    newLog = preLog + 5
                    break;
                case "10":
                    newLog = preLog + 10
                    break;
                default: 
                    newLog = preLog + 0
                    break
                }
            this.setState({
                hubValue: newLog
            })
        } else if (this.state.scoreLocation === "PASS") {
            preLog = this.state.passValue
            switch (amount) {
                case "1":
                    newLog = preLog + 1
                    break;
                case "5":
                    newLog = preLog + 5
                    break;
                case "10":
                    newLog = preLog + 10
                    break;
                default: 
                    newLog = preLog + 0
                    break
                }
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
        let amount = this.state.scoreAmount
        let newLog
        if (this.state.scoreLocation === "HUB") {
            switch (amount) {
                case "1":
                    newLog = this.state.hubValue - 1
                    break;
                case "5":
                    newLog = this.state.hubValue - 5
                    break;
                case "10":
                    newLog = this.state.hubValue - 10
                    break;
                default: 
                    newLog = this.state.hubValue - 0
                    break
                }
                console.log(newLog);
            this.setState({
                hubValue: newLog
            })
        } else if (this.scoreLocation === "PASS") {
            switch (amount) {
                case "1":
                    newLog = this.state.passValue - 1
                    break;
                case "5":
                    newLog = this.state.passValue - 5
                    break;
                case "10":
                    newLog = this.state.passValue - 10
                    break;
                default: 
                    newLog = this.state.passValue - 0
                    break
                }
            this.setState({
                passValue: newLog
            })
        }
    }

    scorebtn = () => {
        return(
            <div className="score-btn" onClick={() => this.handleScore(this.state.scoreAmount)}>
                <div className="score-btn-text">Shoot</div>
            </div>
        )
    }

    removebtn = () => {
        return(
            <div className="fumble-btn" onClick={() => this.handleRemove(this.state.scoreAmount)}>
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
        <div className="bigUIArr">
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
                    {this.scorebtn()}
                    {this.removebtn()}
                </div>
            </div>
            <TeleopSelecterWidget
                handleScoreAmount={this.handleScoreAmount}
                x1="1"
                x5="5"
                x10="10"
            />
        </div>    
        )
    }

    render() {
        return (
            <span className={"widget-" + this.state.classNameDecorator} id={this.state.id} value={JSON.stringify({hubValue: this.state.hubValue, passValue: this.state.passValue})}>
                <div className= {"subtitle"}>
                    {this.state.title}
                </div>
                <div className="teleop-counter-container">
                    <div className="reef-map">
                        {this.bigUIArray()}
                    </div>
                </div>
            </span>
        );
    }
}

export default TeleopCounter;