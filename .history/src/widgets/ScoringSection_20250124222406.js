import React from "react";
import reef from "../images/reef.png";
import speaker from "../images/speaker.png";

class ScoringSection extends React.Component {

    render() {
        return (
            <div className="scoring">
                <div className="place-L4" onClick={() => this.props.handleScore()}>
                    <div className="autolevel-text">
                            {this.props.l4Text}
                        </div>  
                    </div>
                    <div className="place-L4" onClick={() => this.props.handleScore()}>
                    <div className="autolevel-text">
                            {this.props.l3Text}
                        </div>  
                    </div>
                    <div className="place-L4" onClick={() => this.props.handleScore()}>
                    <div className="autolevel-text">
                            {this.props.l2Text}
                        </div>  
                    </div>
                    <div className="place-L4" onClick={() => this.props.handleScore()}>
                    <div className="autolevel-text">
                            {this.props.l1Text}
                        </div>  
                    </div>
                    <div className="fail-button" onClick={() => this.props.handleScore(this.props.fail1)}>
                        <div className="fail-text">
                            {this.props.failText1}
                        </div>
                    </div>
            </div>
        );
    }
}

export default ScoringSection