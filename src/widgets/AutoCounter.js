import React from "react";
import undo from "../images/undo.png";
import center from "../images/center.png";
import hub from "../images/hub.png";
import depot from "../images/depot.png";
import climb from "../images/climb.png";
import outpost from "../images/outpost.png";


class AutoCounter extends React.Component {

    state = {
        scoreValue: 0,
        title: "Auto Pieces",
        id: this.props.id,
        classNameDecorator: this.props.decorator,
        autoPath: [],
        alliance: "RED",
        scoreAmount: 1
    }


    handleRemove = () => {
        if (this.state.autoPath.length > 0) {
            this.setState({
                autoPath: this.state.autoPath.slice(0, this.state.autoPath.length - 1)
            });
        }
    }

    handleLocationChange = (value) => {
        this.setState({
            scoreAmount: value
        })
    }

    handleAutoChange = (value) => {
        let newValue = ""
        let newPath = []
        if (value === "S") {
            newValue = value + this.state.scoreAmount
            newPath = [...this.state.autoPath, newValue]
        } else if (value.charAt(0) === 'S') {
            if (this.state.autoPath.find((start) => (start.charAt(0) == "S")) != undefined) {
                this.state.autoPath.shift()
                newPath = [value, ...this.state.autoPath]
            } else {
                newPath = [value, ...this.state.autoPath]
            }
        }  else {
            newPath = [...this.state.autoPath, value]
        }
        this.setState({
            autoPath: newPath
        })
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

    outpostIntake = () => {
        return (
            <div className="outpost-intake-button" onClick={() => this.handleAutoChange("IO")}>
                <div className="auto-score-text"> 
                    <img src={outpost} alt="" className="outpost-img" />
                </div>
            </div>
        );
    }

    startDepot = () => {
        return (
            <div className="start-depot-button" onClick={() => this.handleAutoChange("SD")}>
                SD
            </div>
        );
    }

    startHub = () => {
        return (
            <div className="start-hub-button" onClick={() => this.handleAutoChange("SH")}>
                SH
            </div>
        );
    }

    startOutpost = () => {
        return (
            <div className="start-outpost-button" onClick={() => this.handleAutoChange("SO")}>
                SO
            </div>
        );
    }

    depotIntake = () => {
        return (
            <div className="depot-button" onClick={() => this.handleAutoChange("ID")}>
                <div className="auto-score-text"> 
                    <img src={depot} alt="" className="depot-img" /> 
                </div>
            </div>
        );
    }

    centerIntake = () => {
        return (
            <div className="auto-center-button" onClick={() => this.handleAutoChange("IN")}>
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

    undo = () => {
        return (
            <div className="undo-button-text" onClick={() => this.handleRemove()}>
                <img src={undo} alt="" className="undo-img" />
            </div>
        );
    }

    score5x = () => {
        return (
            <div className="hub-score-button-5x" onClick={() => this.handleLocationChange(5)}>
                <div className="auto-score-text"> 
                    <span> x5</span>
                </div>
            </div>
        );
    }
    
    score10x = () => {
        return (
            <div className="hub-score-button-10x" onClick={() => this.handleLocationChange(10)}>
                <div className="auto-score-text">  
                    <span> x10</span>
                </div>
            </div>
        );
    }

    score1x = () => {
        return (
            <div className="hub-score-button-1x" onClick={() => this.handleLocationChange(1)}>
                <div className="auto-score-text">  
                    <span> x1</span>
                </div>
            </div>
        );
    }

    climbFailure = () => {
        return (
            <div className="climb-fail-button" onClick={() => this.handleAutoChange("CF")}>
                <div className="auto-score-text">
                    <span> Climb Failure </span>
                </div>
            </div>
        );
    }

    bigUIArray = () => {
        return (
            <div className="field-map-Auto">
                <div className="left-auto-widget">
                    {this.depotIntake()}
                    {this.AutoClimb()}
                    {this.outpostIntake()}
                </div>
                <div className="Pose-box">
                    {this.startDepot()}
                    {this.startHub()}
                    {this.startOutpost()}
                </div>
                <div className="misc">
                    {this.score()}
                </div>
                <div className="misc">
                    <div className="center-intake">
                        {this.centerIntake()}
                    </div>
                </div>
            </div>
        );
    }
    

    render() {
        return (
            <span className={"widget-" + this.state.classNameDecorator} id={this.state.id} value={this.state.autoPath.join(" - ")}>
                <div className={"subtitle"}>
                    {this.state.title}
                </div>
                <div className="awsome-val-display">
                    <div className="val-display" id={this.state.id} title={this.state.title}>
                        {(this.state.autoPath.length > 0) ? this.state.autoPath.join(" - ") : "-"}
                    </div>
                    <div className="undo-button">
                        {this.undo()}
                    </div>
                </div>
                <div className="selector">
                    {this.bigUIArray()}
                </div>
                <div className="point-increase">
                    {this.climbFailure()}
                    {this.score1x()}
                    {this.score5x()}
                    {this.score10x()}          
                </div>
            </span>
        )
    }
}

export default AutoCounter