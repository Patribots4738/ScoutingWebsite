import React from "react";
import reef from "../images/reef.png";
import TeleopReef from "./TeleopReef";

class TeleopCounter extends React.Component {

    state = {
        title: this.props.title,
        id: this.props.id,
        classNameDecorator: this.props.className,
        value: {
            "L1": 0,
            "L2": 0,
            "L3": 0,
            "L4": 0,
            "Processor": 0,
            "Net": 0,
            "Coral Fumble": 0,
            "Net Fumble": 0,
            "Processor Fumble": 0
        },
        scoreLocation: "-",
        scoreLog: []
    }

    logScore = (location) => {
        let newLog;
        newLog = [...this.state.scoreLog, this.state.scoreLocation];
        this.setState({
            scoreLog: newLog
        })
    }

    handleScore = (confirmed) => {
        let newValue = {...this.state.value};
        if (confirmed) {
            newValue[this.state.scoreLocation]++;
            this.logScore(this.state.scoreLocation)

        }
        else if (this.state.scoreLocation.slice(0, 1) === "L") {
            newValue["Coral Fumble"]++;
            this.logScore("Coral Fumble");
        }
        else {
            newValue[this.state.scoreLocation + " Fumble"]++;
            this.logScore(this.state.scoreLocation + "Fumble");
        }

        this.setState({
            value: newValue
        })
    }

    handleScoreLocation = (location) => {
        this.setState({
            scoreLocation: location
        })
    }

    scoreLogUI = () => {
        let UIList = [];
        for (let i = this.state.scoreLog.length - 1; i >= 0; i--) {
            UIList.push(
                <div className="score-cell" key={i}>
                    <div className="score-cell-text">
                        <div className="cell-text">
                            {this.state.scoreLog[i].toUpperCase()}
                        </div>
                    </div>
                    <div className="score-cell-remove" onClick={() => this.handleRemove(this.state.scoreLog[i], i)}>
                        <div className="cell-text">
                            X
                        </div>
                    </div>
                </div>
            )
        }
        return UIList;
    }

    handleRemove = (logElement, index) => {
        let newValue = {...this.state.value};
        let newLog = [...this.state.scoreLog];
        newValue[logElement]--;
        newLog.splice(index, 1);
        this.setState({
            value: newValue,
            scoreLog: newLog
        });
    }

    processorbtn = () => {
        return(
            <div className="processor-btn" onClick={() => this.handleScoreLocation("P")}>
                <div className="processor-btn-text">Processor</div>
            </div>
        );
    }

    netbtn = () => {
        return(
            <div className="processor-btn" onClick={() => this.handleScoreLocation("N")}>
                <div className="processor-btn-text">Net</div>
            </div>
        );
    }

    scorebtn = () => {
        return(
            <div className="score-btn" onClick={() => this.handleScore(true)}>
                <div className="score-btn-text">Score</div>
            </div>
        );
    }

    fumblebtn = () => {
        return(
            <div className="fumble-btn" onClick={() => this.handleScore(false)}>
                <div className="fumble-btn-text">Fumble</div>
            </div>
        );
    }

    //this guy is very silly
    bigUIArray = () => {
        let arr = [
            (<TeleopReef
                handleLocation={this.handleScoreLocation}
                l1Score="L1"
                l2Score="L2"
                l3Score="L3"
                l4Score="L4"
            />),
            (<div className="teleop-misic">
                <div className="teleop-algae-box">
                    {this.processorbtn()}
                    {this.netbtn()}
                </div>
                <div className="teleop-display">
                    <div className="teleop-display-text">
                        {this.state.scoreLocation}
                    </div>
                </div>
                <div className="teleop-score-box">
                    {this.scorebtn()}
                    {this.fumblebtn()}
                </div>
            </div>)
        ]
        return arr;
    }

    //this is fine it can be better!!!!!! :)
    render() {
        return (
            <span className={"widget-" + this.state.classNameDecorator}>
                <div className= {"subtitle"}>
                    {this.state.title}
                </div>
                <div className="teleop-counter-container">
                    <div className="reef-map">
                        {this.bigUIArray()}
                    </div>
                    <div className="subtitle">Score Log</div>
                    <div className="log-container">
                        <div className="log-display-teleop">
                            {this.scoreLogUI()}
                        </div>
                    </div>
                </div>
            </span>
        );
    }
}

export default TeleopCounter;