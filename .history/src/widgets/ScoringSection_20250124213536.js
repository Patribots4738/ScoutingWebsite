import React from "react";
import reef from "../images/reef.png";
import speaker from "../images/speaker.png";

class ScoringSection extends React.Component {

    render() {
        return (
            <div className="scoring">
                <div>\
                    <div className="fail-button" onClick={() => this.props.handleScore(this.props.fail1)}>
                        <div className="fail-text">
                            {this.props.failText1}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ScoringSection