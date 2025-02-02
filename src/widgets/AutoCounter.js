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
        alliance: "BLUE",
        redAllianceBtn: "inactive-red-button",
        blueAllianceBtn: "active-blue-button"
    }

    handleAllianceRed = () => {
        this.setState({
            alliance: "RED",
            blueAllianceBtn: "inactive-blue-button",
            redAllianceBtn: "active-red-button"
        })
    }

    handleAllianceBlue = () => {
        this.setState({
            alliance: "BLUE",
            redAllianceBtn: "inactive-red-button",
            blueAllianceBtn: "active-blue-button"
        })
    }

    handleAdd = () => {
        this.setState({
            scoreValue: [...this.state.scoreValue, this.state.reefLocation + this.state.reefHeight]
        });
    }

    findPiece = (piece) => {
        for (let i = 0; i < this.state.scoreValue.length; i++) {
            if ((piece === this.state.scoreValue[i].substring(0, 1)) ^ (piece === this.state.scoreValue[i].substring(0, 2)))
                return i;
        }
        return -1;
    }

    handleRemove = () => {
        if (this.state.scoreValue.length > 0) {
            this.setState({
                scoreValue: this.state.scoreValue.slice(0, this.state.scoreValue.length - 1)
            });
        }
    }

    handlePieceChange = (value) => {
        this.setState({
            reefLocation: value
        });
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
                    alliance={this.state.alliance}
                />),
                (<div className="misc">
                    <div className="undo-button">
                        {this.undo()}
                    </div>
                    <div className="value-display">
                        <div className="value-text">
                            {this.state.reefLocation + this.state.reefHeight}
                        </div>
                    </div>
                    <div className="algae-box">
                        <div>
                            {this.proccesser()}
                        </div>
                        <div>
                            {this.fumnleAlgaeProcessor()}
                        </div>
                        <div>
                            {this.net()}
                        </div>
                        <div>
                            {this.fumnleAlgaeNet()}
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
                            {this.state.reefLocation + this.state.reefHeight}
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
            <span className={"widget-" + this.state.classNameDecorator} id={this.state.id} value={this.state.scoreValue}>
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
                <div className="selector">
                    <div className="field-map">
                        {this.bigUIArray()}
                    </div>
                </div>
                <div className="processor-location">Processor Side</div>
            </span>
        )
    }
}

export default AutoCounter