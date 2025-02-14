import React from "react";
import reefbaseblue from "../images/reefbaseblue.png";
import reefbasered from "../images/reefbasered.png";

class ReefSection extends React.Component {

    render() {  
        if (this.props.alliance === "BLUE") {
        return (
            <div className="reef-section">
                <img src={reefbaseblue} alt="" className="reef-base-graphic"/>
                <div className="reef-top-position">
                    <button className="reef-button" onClick={() => this.props.handleReefFace(this.props.faceF)}>
                        <div className={this.props.toggleBlueAllianceReefF}>
                            <div className="reef-base-text">
                                {this.props.faceF}
                            </div> 
                        </div>
                    </button>
                    <button className="reef-button" onClick={() => this.props.handleReefFace(this.props.faceE)}>
                        <div className={this.props.toggleBlueAllianceReefE}>
                            <div className="reef-base-text">
                                {this.props.faceE}
                            </div> 
                        </div>
                    </button>
                </div>
                <div className="reef-middle-position">
                    <button className="reef-button" onClick={() => this.props.handleReefFace(this.props.faceA)}>
                        <div className={this.props.toggleBlueAllianceReefA}>
                            <div className="reef-base-text">
                                {this.props.faceA}
                            </div> 
                        </div>
                    </button>
                    <button className="reef-button" onClick={() => this.props.handleReefFace(this.props.faceD)}>
                        <div className={this.props.toggleBlueAllianceReefD}>
                            <div className="reef-base-text">
                                {this.props.faceD}
                            </div> 
                        </div>
                    </button>
                </div>
                <div className="reef-bottom-position">
                    <button className="reef-button" onClick={() => this.props.handleReefFace(this.props.faceB)}>
                        <div className={this.props.toggleBlueAllianceReefB}>
                            <div className="reef-base-text">
                                {this.props.faceB}
                            </div> 
                        </div>
                    </button>
                    <button className="reef-button" onClick={() => this.props.handleReefFace(this.props.faceC)}>
                        <div className={this.props.toggleBlueAllianceReefC}>
                            <div className="reef-base-text">
                                {this.props.faceC}
                            </div> 
                        </div>
                    </button>
                </div>
                <div className={this.props.toggleStaged} onClick={() => this.props.handleReefFace("S")}>
                    <div className="algae-graphic">S</div>
                </div>
            </div>
        );
        } else if (this.props.alliance === "RED") {
            return (
                <div className="reef-section">
                <img src={reefbasered} alt="" className="reef-base-graphic"/>
                <div className="reef-bottom-position">
                    <button className="reef-button" onClick={() => this.props.handleReefFace(this.props.faceC)}>
                        <div className={this.props.toggleRedAllianceReefC}>
                            <div className="reef-base-text">
                                {this.props.faceC}
                            </div> 
                        </div>
                    </button>
                    <button className="reef-button" onClick={() => this.props.handleReefFace(this.props.faceB)}>
                        <div className={this.props.toggleRedAllianceReefB}>
                            <div className="reef-base-text">
                                {this.props.faceB}
                            </div> 
                        </div>
                    </button>
                </div>
                <div className="reef-middle-position">
                    <button className="reef-button" onClick={() => this.props.handleReefFace(this.props.faceD)}>
                        <div className={this.props.toggleRedAllianceReefD}>
                            <div className="reef-base-text">
                                {this.props.faceD}
                            </div> 
                        </div>
                    </button>
                    <button className="reef-button" onClick={() => this.props.handleReefFace(this.props.faceA)}>
                        <div className={this.props.toggleRedAllianceReefA}>
                            <div className="reef-base-text">
                                {this.props.faceA}
                            </div> 
                        </div>
                    </button>
                </div>
                <div className="reef-top-position">
                    <button className="reef-button" onClick={() => this.props.handleReefFace(this.props.faceE)}>
                        <div className={this.props.toggleRedAllianceReefE}>
                            <div className="reef-base-text">
                                {this.props.faceE}
                            </div> 
                        </div>
                    </button>
                    <button className="reef-button" onClick={() => this.props.handleReefFace(this.props.faceF)}>
                        <div className={this.props.toggleRedAllianceReefF}>
                            <div className="reef-base-text">
                                {this.props.faceF}
                            </div> 
                        </div>
                    </button>
                </div>
                <div className={this.props.toggleStaged} onClick={() => this.props.handleReefFace("S")}>
                    <div className="algae-graphic">S</div>
                </div>
            </div>
            );
        }
    }
}

export default ReefSection