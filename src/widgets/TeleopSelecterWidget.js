import React from "react";
// import reef from "../images/reef.png";

class TeleopSelecterWidget extends React.Component {

    render() {
        return(
            <div className="teleop-scoring">
                <object className="fuel-graphic" aria-label={"Fuel Icon"}></object>
                <button className="amount-btn" onClick={() => this.props.handleScoreAmount(this.props.x1)}>
                    1x
                </button>
                <button className="amount-btn" onClick={() => this.props.handleScoreAmount(this.props.x5)}>
                    5x
                </button>
                <button className="amount-btn" onClick={() => this.props.handleScoreAmount(this.props.x10)}>
                    10x
                </button>
            </div>
        );
    }
}

export default TeleopSelecterWidget