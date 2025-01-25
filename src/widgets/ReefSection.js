import React from "react";
import reefbaseblue from "../images/reefbaseblue.png";

class ReefSection extends React.Component {

    render() {
        return (
            <div className="reef-section">
                <div className="reef-base">
                    <img src={reefbaseblue} alt="" className="reef-base-graphic"/>
                    <div className="reefA-position">
                        <div className="reef-button" onClick={() => this.props.handleReefFace(this.props.faceA)}>
                            <div className="reef-base-text">
                                {this.props.faceA}
                            </div> 
                        </div>
                    </div>
                    <div className="reefB-position">
                        <div className="reef-button" onClick={() => this.props.handleReefFace(this.props.faceB)}>
                            <div className="reef-base-text">
                                {this.props.faceB}
                            </div> 
                        </div>
                    </div>
                    <div className="reefC-position">
                        <div className="reef-button" onClick={() => this.props.handleReefFace(this.props.faceC)}>
                            <div className="reef-base-text">
                                {this.props.faceC}
                            </div> 
                        </div>
                    </div>
                    <div className="reefD-position">
                        <div className="reef-button" onClick={() => this.props.handleReefFace(this.props.faceD)}>
                            <div className="reef-base-text">
                                {this.props.faceD}
                            </div> 
                        </div>
                    </div>
                    <div className="reefE-position">
                        <div className="reef-button" onClick={() => this.props.handleReefFace(this.props.faceE)}>
                            <div className="reef-base-text">
                                {this.props.faceE}
                            </div> 
                        </div>
                    </div>
                    <div className="reefF-position">
                        <div className="reef-button" onClick={() => this.props.handleReefFace(this.props.faceF)}>
                            <div className="reef-base-text">
                                {this.props.faceF}
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReefSection