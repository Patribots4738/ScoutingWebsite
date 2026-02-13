import React from "react";
import TeleopReef from "./TeleopSelecterWidget";

class TeleopCounter extends React.Component {

    state = {
        title: this.props.title,
        id: this.props.id,
        classNameDecorator: this.props.className,
        hubValue: 0,
        passValue: 0,
        scoreAmount: localStorage.getItem("scoreAmount"),
        scoreLocation: "HUB"
    }

    handleScore = () => {
        let amount = this.scoreAmount
        let newLog
        if (this.scoreLocation == "HUB") {
            switch (amount) {
                case "x1":
                    newLog = this.state.hubValue + 1
                    break;
                case "x5":
                    newLog = this.state.hubValue + 5
                    break;
                case "x10":
                    newLog = this.state.hubValue + 10
                    break;
                }
            this.setState({
                hubValuevalue: newLog
            })
        } else if (this.scoreLocation == "PASS") {
            switch (amount) {
                case "x1":
                    newLog = this.state.passValue + 1
                    break;
                case "x5":
                    newLog = this.state.passValue + 5
                    break;
                case "x10":
                    newLog = this.state.passValue + 10
                    break;
                }
            this.setState({
                passValue: newLog
            })
        }
    }

    handleScoreLocation = (location) => {
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
        let amount = this.scoreAmount
        let newLog
        if (this.scoreLocation == "HUB") {
            switch (amount) {
                case "x1":
                    newLog = this.state.hubValue - 1
                    break;
                case "x5":
                    newLog = this.state.hubValue - 5
                    break;
                case "x10":
                    newLog = this.state.hubValue - 10
                    break;
                }
            this.setState({
                hubValuevalue: newLog
            })
        } else if (this.scoreLocation == "PASS") {
            switch (amount) {
                case "x1":
                    newLog = this.state.passValue - 1
                    break;
                case "x5":
                    newLog = this.state.passValue - 5
                    break;
                case "x10":
                    newLog = this.state.passValue - 10
                    break;
                }
            this.setState({
                passValue: newLog
            })
        }
    }

    scorebtn = () => {
        return(
            <div className="score-btn" onClick={() => this.handleScore()}>
                <div className="score-btn-text">Shoot</div>
            </div>
        )
    }

    removebtn = () => {
        return(
            <div className="fumble-btn" onClick={() => this.handleRemove()}>
                <div className="fumble-btn-text">Remove</div>
            </div>
        )
    }

    //this guy is very silly
    bigUIArray = () => {
        let arr = [
            (<div className="teleop-misic">
                <div className="teleop-display-box">
                    <div className="teleop-display">
                        <div className="teleop-display-text">
                            Hub: {this.state.hubValue}
                        </div>
                    </div>
                    <div className="teleop-display">
                        <div className="teleop-display-text">
                            Pass: {this.state.passValue}
                        </div>
                    </div>
                    <button className="Hub-btn" onClick={this.handleScoreLocation("HUB")}>
                        Hub
                    </button>
                    <button className="Pass-btn" onClick={this.handleScoreLocation("PASS")}>
                        Pass
                    </button>
                </div>
                <div className="teleop-score-box">
                    {this.scorebtn()}
                    {this.removebtn()}
                </div>
            </div>),
            (<TeleopReef
                handleScoreAmount={this.handleScoreAmount}
                x1="x1"
                x5="x5"
                x10="x10"
            />)
        ]
        return arr;
    }

    render() {
        return (
            <span className={"widget-" + this.state.classNameDecorator} id={this.state.id} value={JSON.stringify(this.state.value)}>
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