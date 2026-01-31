import React from "react";
import undo from "../images/undo.png";
import ScoringSection from "./ScoringSection";
import Counter from "./Counter";

class AutoCounter extends React.Component {

    state = {
        scoreValue: [],
        title: "Auto Pieces",
        id: this.props.id,
        classNameDecorator: this.props.decorator,
        reefHeight: "-",
        alliance: localStorage.getItem("alliance"),
    }

    allianceButtons = () => {
        if (this.state.alliance === "BLUE") {
            return (
                <div>
                    <button className="active-blue-button" onClick={() => this.handleAllianceBlue()}>
                        <div className="alliance-text">Blue</div>
                    </button>
                    <button className="inactive-red-button" onClick={() => this.handleAllianceRed()}>
                        <div className="alliance-text">Red</div>
                    </button>
                </div>
            );
        } else if (this.state.alliance === "RED") {
            return (
                <div>
                    <button className="inactive-blue-button" onClick={() => this.handleAllianceBlue()}>
                        <div className="alliance-text">Blue</div>
                    </button>
                    <button className="active-red-button" onClick={() => this.handleAllianceRed()}>
                        <div className="alliance-text">Red</div>
                    </button>
                </div>
            );
        } else {
            return (
                <div>
                    <button className="inactive-blue-button" onClick={() => this.handleAllianceBlue()}>
                        <div className="alliance-text">Blue</div>
                    </button>
                    <button className="inactive-red-button" onClick={() => this.handleAllianceRed()}>
                        <div className="alliance-text">Red</div>
                    </button>
                </div>
            );
        }
    }

    handleAllianceRed = () => {
        this.setState({
            alliance: "RED"
        })
    }

    handleAllianceBlue = () => {
        this.setState({
            alliance: "BLUE"
        })
    }

    handleAdd = () => {
        this.setState({
            scoreValue: [...this.state.scoreValue, this.state.reefHeight]
        });
    }

    handleRemove = () => {
        if (this.state.scoreValue.length > 0) {
            this.setState({
                scoreValue: this.state.scoreValue.slice(0, this.state.scoreValue.length - 1)
            });
        }
    }

    handleLocationChange = (value) => {
        this.setState(
            { reefHeight: value },
            () => { this.handleAdd(); }
        )
    }

    handleAutoChange = (value) => {
        this.setState(
            { reefHeight: value },
            () => { this.handleAdd(); }
        )
    }


    AutoClimb = () => {
        if (this.state.alliance === "BLUE") {
            return (
                <div className="auto-climb-button" onClick={() => this.handleAutoChange("C")}>
                    <div className="auto-climb-text">Auto Climb</div>
                </div>
            );
        } else if (this.state.alliance === "RED") {
            return (
                <div className="auto-climb-button-red" onClick={() => this.handleAutoChange("C")}>
                    <div className="auto-climb-text">Auto Climb</div>
                </div>
            );
        }
    }

    autoScore = () => {
        if (this.state.alliance === "BLUE") {
            return (
                <div className="auto-score-button" onClick={() => this.handleAutoChange("F")}>
                    <div className="auto-score-text"> Score </div>
                </div>
            );
        } else if (this.state.alliance === "RED") {
            return (
                <div className="auto-score-button-red" onClick={() => this.handleAutoChange("F")}>
                    <div className="auto-score-text">Score</div>
                </div>
            );
        }
    }

    fumbleAutoClimb = () => {
        return (
            <div className="fumble-auto-climb-button" onClick={() => this.handleAutoChange("FC")}>
                <div className="fumble-auto-climb-text">Fumble Auto Climb</div>
            </div>
        );
    }


    undo = () => {
        return (
            <div className="undo-button-text" onClick={() => this.handleRemove()}>
                <img src={undo} alt="" className="undo-img" />
            </div>
        );
    }

    bigUIArray = () => {
        if (this.state.alliance === "BLUE") {
            let arr = [    
                                
                (<div className="misc">
                    <div className="score-box">
                        {this.autoScore()}
                    </div>
                    <div className="algae-box">
                        <div>
                            {this.AutoClimb()}
                        </div>
                        <div>
                            {this.fumbleAutoClimb()}
                        </div>
                    </div>
                </div>)
            ]
            return arr;
        } else if (this.state.alliance === "RED") {
            let arr = [                   
                <div>
                    {this.autoScore()}
                </div>,
                (<div className="misc">
                    <div className="algae-box">
                        <div>
                            {this.AutoClimb()}
                        </div>
                        <div>
                            {this.fumbleAutoClimb()}
                        </div>
                    </div>
                </div>)
            ]
            return arr;
        }
    }

    render() {
        return (
            <span className={"widget-" + this.state.classNameDecorator} id={this.state.id} value={[this.state.scoreValue.join(" - "), this.state.alliance].join("  -  ")}>
                <div>
                    {this.allianceButtons()}
                </div>
                <div className={"subtitle"}>
                    {this.state.title}
                </div>
                <div className="awsome-val-display">
                    <div className="val-display" id={this.state.id} value={this.state.scoreValue.join("-")} title={this.state.title}>
                        {(this.state.scoreValue.length > 0) ? [...this.state.scoreValue].join(" - ") : "-"}
                    </div>
                    <div className="undo-button">
                        {this.undo()}
                    </div>
                </div>
                <div className="selector">
                    <div className="field-map">
                        {this.bigUIArray()}
                    </div>
                </div>
            </span>
        )
    }
}

export default AutoCounter