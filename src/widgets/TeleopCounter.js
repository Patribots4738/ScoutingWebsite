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
        intakeLocation: "wing"
    }

    handleLocationChange = (location) => {
        this.setState({
            intakeLocation: location
        });
    }

    handleScore = (location) => {
        let newValue = {...this.state.value};
        newValue[location][this.state.intakeLocation]++;
        this.setState({
            value: newValue
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

    render() {
        return (
            <span className={"widget"+this.state.classNameDecorator}>
                <div className= {"subtitle"}>
                    {this.state.title}
                </div>
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
            </span>
        )
    }
}

export default TeleopCounter;