import React from "react";
import reef from "../images/reef.png";
import speaker from "../images/speaker.png";

class ScoringSection extends React.Component {

    render() {
        return (
            <div className="scoring">
                <div className={this.props.reverse ? "amp-reverse" : "amp"} onClick={() => this.props.handleScore(this.props.amp)}>
                    <div className="amp-graphic"></div>
                    <div className="amp-text">PROCCESSER</div>
                </div>
                <div className="speaker" onClick={() => this.props.handleScore(this.props.speaker)}>
                    {
                        this.props.reverse
                            ? (
                                <div className="speaker-inner-reverse">
                                    <div className="speaker-text-reverse">SPEAKER</div>
                                    <img src={reef} alt="" className="speaker-img-reverse"/>
                                </div>
                            )
                            : (
                                <div className="speaker-inner">
                                    <img src={reef} alt="" className="speaker-img"/>
                                    <div className="speaker-text">REEF</div>
                                </div>
                            )
                    }
                </div>
                <div>
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