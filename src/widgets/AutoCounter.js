import React from "react";
import undo from "../images/undo.png";
import center from "../images/center.png";
import hub from "../images/hub.png";
import depot from "../images/depot.png";
import climb from "../images/climb.png";
import outpost from "../images/outpost.png";


class AutoCounter extends React.Component {

    state = {
        scoreValue: [],
        title: "Auto Pieces",
        id: this.props.id,
        classNameDecorator: this.props.decorator,
        reefHeight: "-",
        alliance: "RED",
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
            return (
                <div className="climb-score-button" onClick={() => this.handleAutoChange("C")}>
                    <div className="auto-score-text">
                        <img src={climb} alt="" className="climb-img" />
                    </div>
                </div>
            );

    }

    autoScore = () => {
            return (
                <div className="auto-score-button" onClick={() => this.handleAutoChange("F")}>
                    <div className="auto-score-text"> Score </div>
                </div>
            );
    }

    outpostIntake = () => {
        return (
            <div className="outpost-intake-button" onClick={() => this.handleAutoChange("OI")}>
                <div className="auto-score-text"> 
                    <img src={outpost} alt="" className="outpost-img" />
                </div>
            </div>
        );
    }

    startDepot = () => {
        return (
            <div className="start-depot-button" onClick={() => this.handleAutoChange("SD")}>
                <div className="auto-score-text">  </div>
            </div>
        );
    }

    startHub = () => {
        return (
            <div className="start-hub-button" onClick={() => this.handleAutoChange("SH")}>
                <div className="auto-score-text">  </div>
            </div>
        );
    }

    startOutpost = () => {
        return (
            <div className="start-outpost-button" onClick={() => this.handleAutoChange("SO")}>
                <div className="auto-score-text">  </div>
            </div>
        );
    }

    depotIntake = () => {
        return (
            <div className="depot-button" onClick={() => this.handleAutoChange("DI")}>
                <div className="auto-score-text"> 
                    <img src={depot} alt="" className="depot-img" /> 
                </div>
            </div>
        );
    }

    centerIntake = () => {
        return (
            <div className="auto-center-button" onClick={() => this.handleAutoChange("CI")}>
                <div className="auto-score-text">                 
                    <img src={center} alt="" className="center-field-img" /> 
                </div>
            </div>
        );
    }

    score = () => {
        return (
            <div className="hub-score-button" onClick={() => this.handleAutoChange("S")}>
                <div className="auto-score-text"> 
                    <img src={hub} alt="" className="hub-img" /> 
                </div>
            </div>
        );
    }

    fumbleAutoClimb = () => {
        return (
            <div className="fumble-auto-climb-button" onClick={() => this.handleAutoChange("FC")}>
                <div className="fumble-auto-climb-text"> </div>
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
            let arr = [
                
                <div className="misc">
                    <div className="empty-space">  hesejj ords that are hidden here </div>
                    <div className="empty-space"> s that are hidden here </div>
                    <div className="outpost-box">
                        {this.outpostIntake()}
                    </div>


                </div>,
                <div className="misc">
                    <div className="depot-box">
                        {this.depotIntake()}
                    </div>
                    <div className="climb-box">
                        <div>
                            {this.AutoClimb()}
                        </div>
                    </div>
                    <div>
                    
                    </div>
                    
                </div>,
                <div classname="misc">
                    <div className="start-box">
                        {this.startDepot()}
                    </div>
                    <div className="start-box">
                        {this.startHub()}
                    </div>
                    <div className="start-box">
                        {this.startOutpost()}
                    </div>
                </div>,
                <div className="misc">
                    <div>
                        
                    </div>
                    <div className="Hub-box">
                        {this.score()}
                    </div>
                    <div>
                        
                    </div>
                </div>,
                <div className="misc">
                    
                    <div className="center-intake">
                        {this.centerIntake()}
                    </div>
                    
                </div>

            ]
            return arr;
    }
    

    render() {
        return (
            <span className={"widget-" + this.state.classNameDecorator} id={this.state.id} value={[this.state.scoreValue.join(" - "), this.state.alliance].join("  -  ")}>

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