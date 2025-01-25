import React from "react";

class ScoringSection extends React.Component {

    render() {
        return (
            <div className="scoring">
                <div className="place-button" onClick={() => this.props.handleScore(this.props.l4Text)}>
                    <div className="autolevel-text">
                            {this.props.l4Text}
                    </div>  
                </div>
                <div className="place-button" onClick={() => this.props.handleScore(this.props.l3Text)}>
                    <div className="autolevel-text">
                            {this.props.l3Text}
                    </div>  
                </div>
                <div className="place-button" onClick={() => this.props.handleScore(this.props.l2Text)}>
                    <div className="autolevel-text">
                            {this.props.l2Text}
                    </div>  
                </div>
                <div className="place-button" onClick={() => this.props.handleScore(this.props.l1Text)}>
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