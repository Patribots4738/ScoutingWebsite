import React from "react";
import undo from "../images/undo.png";
import ScoringSection from "./ScoringSection";
import ReefSection from "./ReefSection";

class AutoCounter extends React.Component {

    state = {
        scoreValue: [],
        title: "Auto Pieces",
        id: this.props.id,  
        classNameDecorator: this.props.decorator,
        reefLocation: "D",
        reefHeight: "-",
        alliance: this.props.currentalliance,
        redAllianceBtn: "inactive-red-button",
        blueAllianceBtn: "active-blue-button",
        toggleBlueAllianceReefA: "reef-button-display",
        toggleBlueAllianceReefB: "reef-button-display",
        toggleBlueAllianceReefC: "reef-button-display",
        toggleBlueAllianceReefD: "reef-button-display",
        toggleBlueAllianceReefE: "reef-button-display",
        toggleBlueAllianceReefF: "reef-button-display",
        toggleRedAllianceReefA: "reef-button-display-red",
        toggleRedAllianceReefB: "reef-button-display-red",
        toggleRedAllianceReefC: "reef-button-display-red",
        toggleRedAllianceReefD: "reef-button-display-red",
        toggleRedAllianceReefE: "reef-button-display-red",
        toggleRedAllianceReefF: "reef-button-display-red",
        toggleStaged: "staged-tree",
        redProcessor: "processor-location-disabled",
        blueProcessor: "processor-location",
        autoExport: []
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
            scoreValue: [...this.state.scoreValue, this.state.reefLocation + this.state.reefHeight]
        });
        this.handleExport()
    }

    handleRemove = () => {
        if (this.state.scoreValue.length > 0) {
            this.setState({
                scoreValue: this.state.scoreValue.slice(0, this.state.scoreValue.length - 1)
            });
        }
        this.handleExport()
    }

    handleExport = () => {
        this.setState({
            autoExport: [ this.state.scoreValue.join(" - ") , this.state.alliance]
        })
    }

    handlePieceChange = (value) => {
        this.setState({
            reefLocation: value
        });
        this.handleToggleReef(value)
    }

    handleLocationChange = (value) => {
        if (this.state.reefLocation == "S") {
            
        } else {
            this.setState(
                {reefHeight: value}, 
                () => {this.handleAdd();}
            )
        }
    }

    handleAlgaeChange = (value) => {
        this.setState(
            {reefHeight: value}, 
            () => {this.handleAdd();}
        )
    }


    proccesser = () => {
        if (this.state.alliance == "BLUE") {
            return(
                <div className="processor-button" onClick={() => this.handleAlgaeChange("P")}>
                    <div className="processor-text">Processor</div>
                </div>
            );
        } else if (this.state.alliance == "RED") {
            return(
                <div className="processor-button-red" onClick={() => this.handleAlgaeChange("P")}>
                    <div className="processor-text">Processor</div>
                </div>
            );
        }
    }

    net = () => {
        if (this.state.alliance == "BLUE") {
        return(
            <div className="processor-button" onClick={() => this.handleAlgaeChange("N")}>
                <div className="processor-text">Net</div>
            </div>
        );
        } else if (this.state.alliance == "RED") {
            return(
                <div className="processor-button-red" onClick={() => this.handleAlgaeChange("N")}>
                    <div className="processor-text">Net</div>
                </div>
            );
        }
    }

    fumbleAlgaeProcessor = () => {
        return(
            <div className="fumble-algae-button" onClick={() => this.handleAlgaeChange("FP")}>
                <div className="fumble-algae-text">Fumble Processor</div>
            </div>
        );
    }

    fumbleAlgaeNet = () => {
        return(
            <div className="fumble-algae-button" onClick={() => this.handleAlgaeChange("FN")}>
                <div className="fumble-algae-text">Fumble Net</div>
            </div>
        );
    }

    undo = () => {
        return(
            <div className="undo-button-text" onClick={() => this.handleRemove()}>
                <img src={undo} alt="" className="undo-img"/>
            </div>
        );
    }

    handleToggleReef = (location) => {
        switch (location) {
            case "A":
                return this.checkToggled("Apple")
            case "B":
                return this.checkToggled("Banana")
            case "C":
                return this.checkToggled("Cranberry")
            case "D":
                return this.checkToggled("Durain")
            case "E":
                return this.checkToggled("Emu Berry")
            case "F":
                return this.checkToggled("Fig")
            case "S":
                return this.checkToggled("Salamander")
            default:
        }
    }

    checkToggled = (button) => {
        this.setState({
            toggleBlueAllianceReefA: "reef-button-display",
            toggleBlueAllianceReefB: "reef-button-display",
            toggleBlueAllianceReefC: "reef-button-display",
            toggleBlueAllianceReefD: "reef-button-display",
            toggleBlueAllianceReefE: "reef-button-display",
            toggleBlueAllianceReefF: "reef-button-display",
            toggleRedAllianceReefA: "reef-button-display-red",
            toggleRedAllianceReefB: "reef-button-display-red",
            toggleRedAllianceReefC: "reef-button-display-red",
            toggleRedAllianceReefD: "reef-button-display-red",
            toggleRedAllianceReefE: "reef-button-display-red",
            toggleRedAllianceReefF: "reef-button-display-red",
            toggleStaged: "staged-tree"
        })
        switch (button) {
            case "Apple":
                return this.setState({toggleBlueAllianceReefA: "reef-button-display-on", toggleRedAllianceReefA: "reef-button-display-on"})
            case "Banana":
                return this.setState({toggleBlueAllianceReefB: "reef-button-display-on", toggleRedAllianceReefB: "reef-button-display-on"})
            case "Cranberry":
                return this.setState({toggleBlueAllianceReefC: "reef-button-display-on", toggleRedAllianceReefC: "reef-button-display-on"})
            case "Durain":
                return this.setState({toggleBlueAllianceReefD: "reef-button-display-on", toggleRedAllianceReefD: "reef-button-display-on"})
            case "Emu Berry":
                return this.setState({toggleBlueAllianceReefE: "reef-button-display-on", toggleRedAllianceReefE: "reef-button-display-on"})
            case "Fig":
                return this.setState({toggleBlueAllianceReefF: "reef-button-display-on", toggleRedAllianceReefF: "reef-button-display-on"})
            case "Salamander":
                return this.setState({toggleStaged: "staged-tree-on"})
            default:
        }
    }

    bigUIArray = () => {
        if (this.state.alliance == "BLUE") {
            let arr = [
                (<ScoringSection
                    fail1="FR"
                    fail2="FS"
                    failText="Fumble"
                    l4Text="L4"
                    l3Text="L3"
                    l2Text="L2"
                    l1Text="L1"
                    algaeText="Remove Algae"
                    algaeremove="RG"
                    handleLevel={this.handleLocationChange}
                    alliance={this.state.alliance}
                />),
                (<ReefSection
                    handleReefFace={this.handlePieceChange}
                    faceA="A"
                    faceB="B"
                    faceC="C"
                    faceD="D"
                    faceE="E"
                    faceF="F"
                    toggleBlueAllianceReefA={this.state.toggleBlueAllianceReefA}
                    toggleBlueAllianceReefB={this.state.toggleBlueAllianceReefB}
                    toggleBlueAllianceReefC={this.state.toggleBlueAllianceReefC}
                    toggleBlueAllianceReefD={this.state.toggleBlueAllianceReefD}
                    toggleBlueAllianceReefE={this.state.toggleBlueAllianceReefE}
                    toggleBlueAllianceReefF={this.state.toggleBlueAllianceReefF}
                    toggleRedAllianceReefA={this.state.toggleRedAllianceReefA}
                    toggleRedAllianceReefB={this.state.toggleRedAllianceReefB}
                    toggleRedAllianceReefC={this.state.toggleRedAllianceReefC}
                    toggleRedAllianceReefD={this.state.toggleRedAllianceReefD}
                    toggleRedAllianceReefE={this.state.toggleRedAllianceReefE}
                    toggleRedAllianceReefF={this.state.toggleRedAllianceReefF}
                    toggleStaged={this.state.toggleStaged}
                    alliance={this.state.alliance}
                />),
                (<div className="misc">
                    <div className="undo-button">
                        {this.undo()}
                    </div>
                    <div className="value-display">
                        <div className="value-text">
                            {this.state.reefLocation}
                        </div>
                    </div>
                    <div className="algae-box">
                        <div>
                            {this.proccesser()}
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
        } else if (this.state.alliance == "RED") {
            let arr = [
                (<div className="misc" key="3">
                    <div className="undo-button">
                        {this.undo()}
                    </div>
                    <div className="value-display">
                        <div className="value-text">
                            {this.state.reefLocation}
                        </div>
                    </div>
                    <div className="algae-box">
                        <div>
                            {this.proccesser()}
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
                </div>),
                (<ReefSection
                    handleReefFace={this.handlePieceChange}
                    faceA="A"
                    faceB="B"
                    faceC="C"
                    faceD="D"
                    faceE="E"
                    faceF="F"
                    toggleBlueAllianceReefA={this.state.toggleBlueAllianceReefA}
                    toggleBlueAllianceReefB={this.state.toggleBlueAllianceReefB}
                    toggleBlueAllianceReefC={this.state.toggleBlueAllianceReefC}
                    toggleBlueAllianceReefD={this.state.toggleBlueAllianceReefD}
                    toggleBlueAllianceReefE={this.state.toggleBlueAllianceReefE}
                    toggleBlueAllianceReefF={this.state.toggleBlueAllianceReefF}
                    toggleRedAllianceReefA={this.state.toggleRedAllianceReefA}
                    toggleRedAllianceReefB={this.state.toggleRedAllianceReefB}
                    toggleRedAllianceReefC={this.state.toggleRedAllianceReefC}
                    toggleRedAllianceReefD={this.state.toggleRedAllianceReefD}
                    toggleRedAllianceReefE={this.state.toggleRedAllianceReefE}
                    toggleRedAllianceReefF={this.state.toggleRedAllianceReefF}
                    toggleStaged={this.state.toggleStaged}
                    alliance={this.state.alliance}
                />),
                (<ScoringSection
                    fail1="FR"
                    fail2="FS"
                    failText="Fumble"
                    l4Text="L4"
                    l3Text="L3"
                    l2Text="L2"
                    l1Text="L1"
                    algaeText="Remove Algae"
                    algaeremove="RG"
                    handleLevel={this.handleLocationChange}
                    alliance={this.state.alliance}
                />)
            ]
            return arr;
        }
    }

    render() {
        return (
            <span className={"widget-" + this.state.classNameDecorator} id={this.state.id} value={this.state.autoExport.join("  -  ")}>
                <div>
                    <button className= {this.state.blueAllianceBtn} onClick={() => this.handleAllianceBlue()}>
                        <div className="alliance-text">Blue</div>
                    </button>
                    <button className= {this.state.redAllianceBtn} onClick={() => this.handleAllianceRed()}>
                        <div className="alliance-text">Red</div>
                    </button>
                </div>
                <div className= {"subtitle"}>
                    {this.state.title}
                </div>
                <div className="val-display" id={this.state.id} value={this.state.scoreValue.join("-")} title={this.state.title}>
                    {(this.state.scoreValue.length > 0) ? [...this.state.scoreValue].join(" - ") : "-"}
                </div>
                <div className={this.state.redProcessor}>Processor Side</div>
                <div className="selector">
                    <div className="field-map">
                        {this.bigUIArray()}
                    </div>
                </div>
                <div className={this.state.blueProcessor}>Processor Side</div>
            </span>
        )
    }
}

export default AutoCounter