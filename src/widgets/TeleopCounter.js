import React from "react";
import note from "../images/note.png";
import ScoringSection from "./ScoringSection";

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
            "PA": 0,
            "NA": 0,
            "CF": 0,
            "NF": 0,
            "PF": 0
        },
        scoreLog: []
    }

    handleScore = (location) => {
        let newValue = {...this.state.value};
        newValue[location]++;
        this.setState({
            value: newValue,
            scoreLog: [...this.state.scoreLog, location]
        });
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

    getScoreResult = (result) => {
        if (result.substring(0, 6) === "FUMBLE") {
            return result.substring(0, 6) + " " + result.substring(6);
        }
        return result;
    }

    handleRemove = (logElement, index) => {
        let intakeLoc = logElement[0];
        let resultLoc = logElement[1];
        let newValue = {...this.state.value};
        let newLog = [...this.state.scoreLog];
        newValue[resultLoc][intakeLoc]--;
        newLog.splice(index, 1);
        this.setState({
            value: newValue,
            scoreLog: newLog
        });
    }

    render() {
        return (
            <span className={"widget"+this.state.classNameDecorator}>
                <div className= {"subtitle"}>
                    {this.state.title}
                </div>
                <div className="teleop-counter-container">
                    <div className="score-btn-container">
                        <button className="tele-btn" > L1 </button>
                        <button className="tele-btn"> L2 </button>
                        <button className="tele-btn"> L3 </button>
                        <button className="tele-btn"> L4 </button>
                        <button className="tele-btn"> Processor </button>
                        <button className="tele-btn"> Net </button>
                        <button className="tele-btn"> Coral F </button>
                        <button className="tele-btn"> Net F </button>
                        <button className="tele-btn"> Processor F </button>
                    </div>
                    <div>
                        Score Log 
                    </div>
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