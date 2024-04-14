import React from "react";
import speaker from "../images/speaker.png";

class ScoringSection extends React.Component {

    render() {
        return (
            <div className="scoring">
                <div className="amp" onClick={() => this.props.handleScore(this.props.amp)}>
                    <div className="amp-graphic"></div>
                    <div className="amp-text">AMP</div>
                </div>
                <div className="speaker" onClick={() => this.props.handleScore(this.props.speaker)}>
                    <div className="speaker-inner">
                        <img src={speaker} alt="" className="speaker-img"/>
                        <div className="speaker-text">SPEAKER</div>
                    </div>
                </div>
                <div className="fail">
                    <div className="fail-button" onClick={() => this.props.handleScore(this.props.fail1)}>
                        <div className="fail-text">
                            {this.props.failText1}
                        </div>
                    </div>
                    <div className="fail-button" onClick={() => this.props.handleScore(this.props.fail2)}>
                        <div className="fail-text">
                            {this.props.failText2}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ScoringSection