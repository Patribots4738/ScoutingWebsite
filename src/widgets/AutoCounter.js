import React from "react";
import undo from "../images/undo.png";
import ScoringSection from "./ScoringSection";

class AutoCounter extends React.Component {

    state = {
        scoreValue: [],
        title: "Auto Pieces",
        id: this.props.id,
        classNameDecorator: this.props.decorator,
        reefHeight: "-",
        alliance: localStorage.getItem("alliance"),
        redAllianceBtn: "inactive-red-button",
        blueAllianceBtn: "active-blue-button",
    }

    handleAllianceRed = () => {
        this.setState({
            alliance: "RED",
            blueAllianceBtn: "inactive-blue-button",
            redAllianceBtn: "active-red-button",
            redProcessor: "processor-location",
            blueProcessor: "processor-location-disabled"
        })
    }

    handleAllianceBlue = () => {
        this.setState({
            alliance: "BLUE",
            redAllianceBtn: "inactive-red-button",
            blueAllianceBtn: "active-blue-button",
            blueProcessor: "processor-location",
            redProcessor: "processor-location-disabled"
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

    handleAlgaeChange = (value) => {
        this.setState(
            { reefHeight: value },
            () => { this.handleAdd(); }
        )
    }


    processor = () => {
        if (this.state.alliance === "BLUE") {
            return (
                <div className="processor-button" onClick={() => this.handleAlgaeChange("P")}>
                    <div className="processor-text">Processor</div>
                </div>
            );
        } else if (this.state.alliance === "RED") {
            return (
                <div className="processor-button-red" onClick={() => this.handleAlgaeChange("P")}>
                    <div className="processor-text">Processor</div>
                </div>
            );
        }
    }

    net = () => {
        if (this.state.alliance === "BLUE") {
            return (
                <div className="processor-button" onClick={() => this.handleAlgaeChange("N")}>
                    <div className="processor-text">Net</div>
                </div>
            );
        } else if (this.state.alliance === "RED") {
            return (
                <div className="processor-button-red" onClick={() => this.handleAlgaeChange("N")}>
                    <div className="processor-text">Net</div>
                </div>
            );
        }
    }

    fumbleAlgaeProcessor = () => {
        return (
            <div className="fumble-algae-button" onClick={() => this.handleAlgaeChange("FP")}>
                <div className="fumble-algae-text">Fumble Processor</div>
            </div>
        );
    }

    fumbleAlgaeNet = () => {
        return (
            <div className="fumble-algae-button" onClick={() => this.handleAlgaeChange("FN")}>
                <div className="fumble-algae-text">Fumble Net</div>
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
                (<ScoringSection
                    fail1="FC"
                    failText="Fumble Coral"
                    l4Text="L4"
                    l3Text="L3"
                    l2Text="L2"
                    l1Text="L1"
                    algaeText="Remove Algae"
                    algaeremove="RA"
                    handleLevel={this.handleLocationChange}
                    alliance={this.state.alliance}
                />),
                (<div className="misc">
                    <div className="algae-box">
                        <div>
                            {this.processor()}
                        </div>
                        <div>
                            {this.fumbleAlgaeProcessor()}
                        </div>
                        <div>
                            {this.net()}
                        </div>
                        <div>
                            {this.fumbleAlgaeNet()}
                        </div>
                    </div>
                </div>)
            ]
            return arr;
        } else if (this.state.alliance === "RED") {
            let arr = [
                (<ScoringSection
                    fail1="FC"
                    failText="Fumble Coral"
                    l4Text="L4"
                    l3Text="L3"
                    l2Text="L2"
                    l1Text="L1"
                    algaeText="Remove Algae"
                    algaeremove="RA"
                    handleLevel={this.handleLocationChange}
                    alliance={this.state.alliance}
                />),
                (<div className="misc">
                    <div className="algae-box">
                        <div>
                            {this.processor()}
                        </div>
                        <div>
                            {this.fumbleAlgaeProcessor()}
                        </div>
                        <div>
                            {this.net()}
                        </div>
                        <div>
                            {this.fumbleAlgaeNet()}
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
                    <button className={this.state.blueAllianceBtn} onClick={() => this.handleAllianceBlue()}>
                        <div className="alliance-text">Blue</div>
                    </button>
                    <button className={this.state.redAllianceBtn} onClick={() => this.handleAllianceRed()}>
                        <div className="alliance-text">Red</div>
                    </button>
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