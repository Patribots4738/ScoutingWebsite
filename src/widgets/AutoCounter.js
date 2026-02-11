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
        autoPath: "-",
        alliance: "RED",
    }


    handleAdd = ( count = 1) => {
        const newScores = Array (count).fill(this.state.autoPath);
        this.setState({ 
            scoreValue: [...this.state.scoreValue, ... newScores]
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
            { autoPath: value },
            () => { this.handleAdd(); }
        )
    }

    handleAutoChange = (value, count = 1) => {
        this.setState(
            { autoPath: value },
            () => { this.handleAdd(count); }
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
                <div className="auto-score-text"> SD </div>
            </div>
        );
    }

    startHub = () => {
        return (
            <div className="start-hub-button" onClick={() => this.handleAutoChange("SH")}>
                <div className="auto-score-text"> SH </div>
            </div>
        );
    }

    startOutpost = () => {
        return (
            <div className="start-outpost-button" onClick={() => this.handleAutoChange("SO")}>
                <div className="auto-score-text"> SO </div>
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



    undo = () => {
        return (
            <div className="undo-button-text" onClick={() => this.handleRemove()}>
                <img src={undo} alt="" className="undo-img" />
            </div>
        );
    }

    score5x = () => {
        return (
            <div className="hub-score-button-5x" onClick={() => this.handleAutoChange("S", 5)}>
                <div className="auto-score-text"> 
                    <span> x5</span>
                </div>
            </div>
        );
    }
    
    score10x = () => {
        return (
            <div className="hub-score-button-10x" onClick={() => this.handleAutoChange("S", 10)}>
                <div className="auto-score-text">  
                    <span> x10</span>
                </div>
            </div>
        );
    }

    score1x = () => {
        return (
            <div className="hub-score-button-1x" onClick={() => this.handleAutoChange("S", 1)}>
                <div className="auto-score-text">  
                    <span> x1</span>
                </div>
            </div>
        );
    }

    bigUIArray = () => {
            let arr = [
                <div className="left-auto-widget">
                        {this.depotIntake()}
                        {this.AutoClimb()}
                        {this.outpostIntake()}
                </div>,
                <div classname="Pose-box">
                        {this.startDepot()}
                        {this.startHub()}
                        {this.startOutpost()}
                </div>,
                <div className="misc">
                        {this.score()}
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

                <div className="point-increase">
                            {this.score1x()}
                            {this.score5x()}
                            {this.score10x()}
                            
                </div>
            </span>
        )
    }
}

export default AutoCounter