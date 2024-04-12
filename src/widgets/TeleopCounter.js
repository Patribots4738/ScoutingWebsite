import React from "react";
import speaker from "../images/speaker.png";
import note from "../images/note.png";

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

    render() {
        return (
            <span className={"widget"+this.state.classNameDecorator}>
                <div className= {"subtitle"}>
                    {this.state.title}
                </div>
                <div className="field-map" id={this.state.id} value={JSON.stringify(this.state.value)}>
                    <div className="scoring">
                        <div className="amp" onClick={() => this.handleScore("amp")}>
                            <div className="amp-graphic"></div>
                            <div className="amp-text">AMP</div>
                        </div>
                        <div className="speaker" onClick={() => this.handleScore("speaker")}>
                            <img src={speaker} alt="" className="speaker-img"/>
                            <div className="speaker-text">SPEAKER</div>
                        </div>
                        <div className="fail">
                            <div className="fail-button" onClick={() => this.handleScore("fumbleAmp")}>
                                <div className="fail-text">
                                    F AMP
                                </div>
                            </div>
                            <div className="fail-button" onClick={() => this.handleScore("fumbleSpeaker")}>
                                <div className="fail-text">
                                    F SPEAKER
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field-column">
                        <div className="upper-section">
                            <div className="pass-button" onClick={() => this.handleScore("pass")}>
                                <div className="pass-text">
                                    PASS
                                </div>
                            </div>
                        </div>
                        <div className="section-container-teleop">
                                <div className="field-section" onClick={() => this.handleLocationChange("wing")}>
                                    <div className="inner-flex">
                                        <div className="field-section-text">
                                            WING
                                        </div>
                                        <img className="note-img" alt="" src={note}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <div className="field-column">
                        <div className="upper-section">
                            <div className="intake-text">
                                INTAKE FROM:
                            </div>
                        </div>
                        <div className="section-container-teleop">
                            <div className="field-section" onClick={() => this.handleLocationChange("center")}>
                                <div className="inner-flex">
                                    <div className="field-section-text">
                                        CENTER
                                    </div>
                                    <img className="note-img" alt="" src={note}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field-column">
                        <div className="upper-section">
                            <div className="intake-value-text">
                                {this.state.intakeLocation.toUpperCase()}
                            </div>
                        </div>
                        <div className="section-container-teleop">
                            <div className="field-section" onClick={() => this.handleLocationChange("source")}>
                                <div className="inner-flex">
                                    <div className="field-section-text">
                                        OPP WING
                                    </div>
                                    <img className="note-img" alt="" src={note}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        )
    }

}

export default TeleopCounter