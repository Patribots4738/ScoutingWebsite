import React from "react";
import reef from "../images/reef.png";

class TeleopReef extends React.Component {

    render() {
        return(
            <div className="teleop-scoring">
                <img src={reef} alt="" className="reef-graphic"/>
                <div className="tele-btn" onClick={() => this.props.handleLocation(this.props.l4Score)}>
                    <div className="tele-btn-text">L4</div>
                </div>
                <div className="tele-btn" onClick={() => this.props.handleLocation(this.props.l3Score)}>
                    <div className="tele-btn-text">L3</div>
                </div>
                <div className="tele-btn" onClick={() => this.props.handleLocation(this.props.l2Score)}>
                    <div className="tele-btn-text">L2</div>
                </div>
                <div className="tele-btn" onClick={() => this.props.handleLocation(this.props.l1Score)}>
                    <div className="tele-btn-text">L1</div>
                </div>
            </div>
        );
    }
}

export default TeleopReef