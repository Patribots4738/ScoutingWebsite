import React from "react";
import note from "../images/note.png";
import ScoringSection from "./ScoringSection";

class TeleopCounter extends React.Component {

    state = {
        title: this.props.title,
        id: this.props.id,
        classNameDecorator: this.props.className,
        value: {
            speaker: {
                wing: 0,
                center: 0,
                source: 0
            },
            amp: {
                wing: 0,
                center: 0,
                source: 0
            },
            pass: {
                wing: 0,
                center: 0,
                source: 0
            },
            fumbleSpeaker: {
                wing: 0,
                center: 0,
                source: 0
            },
            fumbleAmp: {
                wing: 0,
                center: 0,
                source: 0
            }
        },
        intakeLocation: "wing",
        scoreLog: []
    }

    handleLocationChange = (location) => {
        this.setState({
            intakeLocation: location
        });
    }

    handleScore = (location) => {
        let newValue = {...this.state.value};
        newValue[location][this.state.intakeLocation]++;
        console.log(this.state.scoreLog);
        this.setState({
            value: newValue,
            scoreLog: [...this.state.scoreLog, [this.state.intakeLocation, location]]
        });
    }

    fieldSection = (location, text) => {
        return (
            <div className="section-container-teleop">
                <div className="field-section" onClick={() => this.handleLocationChange(location)}>
                    <div className="inner-flex">
                        <div className="field-section-text">
                            {text}
                        </div>
                        <img className="note-img" alt="" src={note}/>
                    </div>
                </div>
            </div>
        )
    }

    scoreLogUI = () => {
        let UIList = [];
        for (let i = this.state.scoreLog.length - 1; i >= 0; i--) {
            UIList.push(
                <div className="score-cell" key={i}>
                    <div className="score-cell-text">
                        <div className="cell-text">
                            {this.state.scoreLog[i][0].toUpperCase()} TO {this.getScoreResult(this.state.scoreLog[i][1].toUpperCase())}
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
        console.log(newValue);
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
                    <div className="field-map" id={this.state.id} value={JSON.stringify(this.state.value)}>
                        <ScoringSection
                            speaker="speaker"
                            amp="amp"
                            fail1="fumbleAmp"
                            fail2="fumbleSpeaker"
                            failText1="F AMP"
                            failText2="F SPEAKER"
                            handleScore={this.handleScore}
                        />
                        <div className="field-column">
                            <div className="upper-section">
                                <div className="pass-button" onClick={() => this.handleScore("pass")}>
                                    <div className="pass-text">
                                        PASS
                                    </div>
                                </div>
                            </div>
                            {this.fieldSection("wing", "WING")}
                        </div>
                        <div className="field-column">
                            <div className="upper-section">
                                <div className="intake-text">
                                    INTAKE FROM:
                                </div>
                            </div>
                            {this.fieldSection("center", "CENTER")}
                        </div>
                        <div className="field-column">
                            <div className="upper-section">
                                <div className="intake-value-text">
                                    {this.state.intakeLocation.toUpperCase()}
                                </div>
                            </div>
                            {this.fieldSection("source", "OPP WING")}
                        </div>
                    </div>
                    <div className= {"subtitle"}>
                        Score Log 
                    </div>
                    <div className="log-container">
                        <div className="log-display-teleop">
                            {this.scoreLogUI()}
                        </div>
                    </div>
                </div>
            </span>
        )
    }
}

export default TeleopCounter;