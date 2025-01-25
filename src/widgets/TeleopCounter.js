import React from "react";
import reef from "../images/reef.png";

class TeleopCounter extends React.Component {

    state = {
        title: this.props.title,
        id: this.props.id,
        classNameDecorator: this.props.className,
        value: {
            "L1": 0,
            "L2": 0,
            "L3": 0,
            "L4": 0,
            "Processor": 0,
            "Net": 0,
            "Coral Fumble": 0,
            "Net Fumble": 0,
            "Processor Fumble": 0
        },
        scoreLocation: "L4",
        scoreLog: []
    }

    logScore = (location) => {
        let newLog;
        newLog = [...this.state.scoreLog, this.state.scoreLocation];
        this.setState({
            scoreLog: newLog
        })
    }

    handleScore = (confirmed) => {
        let newValue = {...this.state.value};
        if (confirmed) {
            newValue[this.state.scoreLocation]++;
            this.logScore(this.state.scoreLocation)

        }
        else if (this.state.scoreLocation.slice(0, 1) === "L") {
            newValue["Coral Fumble"]++;
            this.logScore("Coral Fumble");
        }
        else {
            newValue[this.state.scoreLocation + " Fumble"]++;
            this.logScore(this.state.scoreLocation + "Fumble");
        }

        this.setState({
            value: newValue
        })
    }

    handleScoreLocation = (location) => {
        this.setState({
            scoreLocation: location
        })
    }

    checkScore = () => {
        // console.log(this.state.value);
        console.log("L1:" + this.state.value["L1"]);
        console.log("L2:" + this.state.value["L2"]);
        console.log("L3:" + this.state.value["L3"]);
        console.log("L4:" + this.state.value["L4"]);
        console.log("P:" + this.state.value["P"]);
        console.log("N:" + this.state.value["N"]);
        console.log("CF:" + this.state.value["CF"]);
        console.log("NF:" + this.state.value["NF"]);
        console.log("PF:" + this.state.value["PF"]);

    }

    scoreLogUI = () => {
        let UIList = [];
        for (let i = this.state.scoreLog.length - 1; i >= 0; i--) {
            UIList.push(
                <div className="score-cell" key={i}>
                    <div className="score-cell-text">
                        <div className="cell-text">
                            {this.state.scoreLog[i].toUpperCase()}
                        </div>
                    </div>
                    <div className="score-cell-remove" onClick={() => this.handleRemove(this.state.scoreLog[i], i)}>
                        <div className="cell-text">
                            X
                        </div>
                    </div>
                </div>
            )
        }
        return UIList;
    }

    // TODO: change handle remove to remove elements that are not named the same as their score acronym (ie CORAL FUMBLE)
    handleRemove = (logElement, index) => {
        let newValue = {...this.state.value};
        let newLog = [...this.state.scoreLog];
        newValue["Teleop" + logElement]--;
        newLog.splice(index, 1);
        this.setState({
            value: newValue,
            scoreLog: newLog
        });
    }

    //make this a grid of divs https://www.tldraw.com/
    render() {
        return (
            <span className={"widget" + this.state.classNameDecorator} id={this.state.id} value={JSON.stringify(this.state.value)}>
                <div className= {"subtitle"}>
                    {this.state.title}
                </div>
                <div className="teleop-counter-container">
                        <img src={reef} alt="reef" className="reef"/>
                    <div className="score-btn-container"> 
                        <div className="reef">

                        </div>
                        <div className="reef-btns">

                        </div>
                        <div className="misc">

                        </div>
                        <button className="tele-btn" onClick={() => this.handleScoreLocation("L1")}> L1 </button>
                        <button className="tele-btn" onClick={() => this.handleScoreLocation("L2")}> L2 </button>
                        <button className="tele-btn" onClick={() => this.handleScoreLocation("L3")}> L3 </button>
                        <button className="tele-btn" onClick={() => this.handleScoreLocation("L4")}> L4 </button>
                        <button className="tele-btn" onClick={() => this.handleScoreLocation("Processor")}> Processor </button>
                        <button className="tele-btn" onClick={() => this.handleScoreLocation("Net")}> Net </button>
                        <button className="tele-btn" onClick={() => this.handleScore(true)}> Score </button>
                        <button className="tele-btn" onClick={() => this.handleScore(false)}> Fumble </button>
                        <button className="tele-btn" onClick={() => this.checkScore()}> check score </button>
                    </div>
                    <div>
                        Score Log 
                    </div>
                    <div className="log-container">
                        <div className="log-display-teleop">
                            {this.scoreLogUI()}
                        </div>
                    </div>
                </div>
            </span>
        )
    }
}

export default TeleopCounter;