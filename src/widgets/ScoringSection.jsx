import React from "react";
import Counter from "./Counter";

class ScoringSection extends React.Component {

    render() {
        if (this.props.alliance === "BLUE") {
        return (
            <div className="scoring">
                <div>
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
                </div>
            </div>
        );
        } else if (this.props.alliance === "RED") {
            return (
                <div className="scoring">
                    <div>
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


                    </div>
                </div>
            );
        }
    }
}

export default ScoringSection