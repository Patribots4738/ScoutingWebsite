import React from "react";
import reefbaseblue from "../images/reefbaseblue.png";
import reefbasered from "../images/reefbasered.png";

class ReefSection extends React.Component {

    state = {
        toggleBlueAllianceReef: "reef-button-display",
        toggleRedAllianceReef: "reef-button-display-red"
    }

    handleToggleBlue = () => {
        if (this.state.toggleBlueAllianceReef == "reef-button-display-toggle") {
            this.setState({
                toggleBlueAllianceReef: "reef-button-display"
            });
        } else if (this.state.toggleBlueAllianceReef == "reef-button-display") {
            this.setState({
                toggleBlueAllianceReef: "reef-button-display-toggle"
            });
        }
    }

    handleToggleRed = () => {
        if (this.state.toggleRedAllianceReef == "reef-button-display-red-toggle") {
            this.setState({
                toggleRedAllianceReef: "reef-button-display-red"
            });
        } else if (this.state.toggleRedAllianceReef == "reef-button-display") {
            this.setState({
                toggleRedAllianceReef: "reef-button-display-red-toggle"
            });
        }
    }

    render() {  
        if (this.props.alliance == "BLUE") {
        return (
            <div className="reef-section">
                <img src={reefbaseblue} alt="" className="reef-base-graphic"/>
                <div className="reef-top-position">
                    <button className="reef-button" onClick={() => this.props.handleReefFace(this.props.faceF)}>
                        <div className={this.state.toggleBlueAllianceReef}>
                            <div className="reef-base-text">
                                {this.props.faceF}
                            </div> 
                        </div>
                    </button>
                    <button className="reef-button" onClick={() => this.props.handleReefFace(this.props.faceE)}>
                        <div className={this.state.toggleBlueAllianceReef} onClick={() => this.handleToggleBlue}>
                            <div className="reef-base-text">
                                {this.props.faceE}
                            </div> 
                        </div>
                    </button>
                </div>
                <div className="reef-middle-position">
                    <button className="reef-button" onClick={() => this.props.handleReefFace(this.props.faceA)}>
                        <div className={this.state.toggleBlueAllianceReef} onClick={() => this.handleToggleBlue}>
                            <div className="reef-base-text">
                                {this.props.faceA}
                            </div> 
                        </div>
                    </button>
                    <button className="reef-button" onClick={() => this.props.handleReefFace(this.props.faceD)}>
                        <div className={this.state.toggleBlueAllianceReef} onClick={() => this.handleToggleBlue}>
                            <div className="reef-base-text">
                                {this.props.faceD}
                            </div> 
                        </div>
                    </button>
                </div>
                <div className="reef-bottom-position">
                    <button className="reef-button" onClick={() => this.props.handleReefFace(this.props.faceB)}>
                        <div className={this.state.toggleBlueAllianceReef} onClick={() => this.handleToggleBlue}>
                            <div className="reef-base-text">
                                {this.props.faceB}
                            </div> 
                        </div>
                    </button>
                    <button className="reef-button" onClick={() => this.props.handleReefFace(this.props.faceC)}>
                        <div className={this.state.toggleBlueAllianceReef} onClick={() => this.handleToggleBlue}>
                            <div className="reef-base-text">
                                {this.props.faceC}
                            </div> 
                        </div>
                    </button>
                </div>
                <div className="staged-tree" onClick={() => this.props.handleReefFace("S")}>
                    <div className="algae-graphic"></div>
                </div>
            </div>
        );
        } else if (this.props.alliance == "RED") {
            return (
                <div className="reef-section">
                <img src={reefbasered} alt="" className="reef-base-graphic"/>
                <div className="reef-top-position">
                    <button className="reef-button" onClick={() => this.props.handleReefFace(this.props.faceF)}{...() => this.handleToggleRed}>
                        <div className={this.state.toggleRedAllianceReef}>
                            <div className="reef-base-text">
                                {this.props.faceF}
                            </div> 
                        </div>
                    </button>
                    <button className="reef-button" onClick={() => this.props.handleReefFace(this.props.faceE)}>
                        <div className={this.state.toggleRedAllianceReef} onClick={() => this.handleToggleRed}>
                            <div className="reef-base-text">
                                {this.props.faceE}
                            </div> 
                        </div>
                    </button>
                </div>
                <div className="reef-middle-position">
                    <button className="reef-button" onClick={() => this.props.handleReefFace(this.props.faceA)}>
                        <div className={this.state.toggleRedAllianceReef} onClick={() => this.handleToggleRed}>
                            <div className="reef-base-text">
                                {this.props.faceA}
                            </div> 
                        </div>
                    </button>
                    <button className="reef-button" onClick={() => this.props.handleReefFace(this.props.faceD)}>
                        <div className={this.state.toggleRedAllianceReef} onClick={() => this.handleToggleRed}>
                            <div className="reef-base-text">
                                {this.props.faceD}
                            </div> 
                        </div>
                    </button>
                </div>
                <div className="reef-bottom-position">
                    <button className="reef-button" onClick={() => this.props.handleReefFace(this.props.faceB)}>
                        <div className={this.state.toggleRedAllianceReef} onClick={() => this.handleToggleRed}>
                            <div className="reef-base-text">
                                {this.props.faceB}
                            </div> 
                        </div>
                    </button>
                    <button className="reef-button" onClick={() => this.props.handleReefFace(this.props.faceC)}>
                        <div className={this.state.toggleRedAllianceReef} onClick={() => this.handleToggleRed}>
                            <div className="reef-base-text">
                                {this.props.faceC}
                            </div> 
                        </div>
                    </button>
                </div>
                <div className="staged-tree" onClick={() => this.props.handleReefFace("S")}>
                    <div className="algae-graphic"></div>
                </div>
            </div>
            );
        }
    }
}

export default ReefSection