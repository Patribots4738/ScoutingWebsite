import React from "react";

class ScoringSection extends React.Component {

    render() {
        console.log("alliance" + this.props.alliance) 
        if (this.props.alliance == "BLUE") {
        return (
            <div className="scoring">
                <div className="place-button" onClick={() => this.props.handleLevel(this.props.l4Text)}>
                    <div className="autolevel-text">
                            {this.props.l4Text}
                    </div>  
                </div>
                <div className="place-button" onClick={() => this.props.handleLevel(this.props.l3Text)}>
                    <div className="autolevel-text">
                            {this.props.l3Text}
                    </div>  
                </div>
                <div className="place-button" onClick={() => this.props.handleLevel(this.props.l2Text)}>
                    <div className="autolevel-text">
                            {this.props.l2Text}
                    </div>  
                </div>
                <div className="place-button" onClick={() => this.props.handleLevel(this.props.l1Text)}>
                    <div className="autolevel-text">
                            {this.props.l1Text}
                    </div>  
                </div>
                <div className="fail-button" onClick={() => this.props.handleLevel(this.props.fail1)}>
                    <div className="fail-text">
                            {this.props.failText}
                    </div>
                </div>
                <div className="algae-button" onClick={() => this.props.handleLevel(this.props.algaeremove)}>
                    <div className="algae-text">
                        {this.props.algaeText}
                    </div>
                </div>
            </div>
        );
        } else if (this.props.alliance == "RED") {
            return (
                <div className="scoring-red">
                    <div className="place-button-red" onClick={() => this.props.handleLevel(this.props.l4Text)}>
                        <div className="autolevel-text">
                                {this.props.l4Text}
                        </div>  
                    </div>
                    <div className="place-button-red" onClick={() => this.props.handleLevel(this.props.l3Text)}>
                        <div className="autolevel-text">
                                {this.props.l3Text}
                        </div>  
                    </div>
                    <div className="place-button-red" onClick={() => this.props.handleLevel(this.props.l2Text)}>
                        <div className="autolevel-text">
                                {this.props.l2Text}
                        </div>  
                    </div>
                    <div className="place-button-red" onClick={() => this.props.handleLevel(this.props.l1Text)}>
                        <div className="autolevel-text">
                                {this.props.l1Text}
                        </div>  
                    </div>
                    <div className="fail-button" onClick={() => this.props.handleLevel(this.props.fail1)}>
                        <div className="fail-text">
                                {this.props.failText}
                        </div>
                    </div>
                    <div className="algae-button" onClick={() => this.props.handleLevel(this.props.algaeremove)}>
                        <div className="algae-text">
                            {this.props.algaeText}
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default ScoringSection