import React from "react";
import note from "../images/note.png";
import ScoringSection from "./ScoringSection";

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
            "P": 0,
            "N": 0,
            "CF": 0,
            "NF": 0,
            "PF": 0
        },
        scoreLocation: "L4",
        scoreLog: []
    }

    // handleScore = (location) => {
    //     let newValue = {...this.state.value};
    //     newValue[location]++;
    //     this.setState({
    //         value: newValue,
    //         scoreLog: [...this.state.scoreLog, location]
    //     });
    // }

    handleScore = (confirmed) => {
        let newValue = {...this.state.value};
        if (confirmed) {
            newValue[this.state.scoreLocation] ++;
            this.setState({
                scoreLog: [...this.state.scoreLog, this.state.scoreLocation]
            })
            console.log(newValue[this.state.scoreLocation]);
        }
        // else if (confirmed && this.state.scoreLocation.slice(0, 1) === "L") {
        //     newValue[this.state.scoreLocation + "F"]++;
        //     this.setState({
        //         scoreLog: [...this.state.scoreLog, "CF"]
        //     })
        //     console.log(this.state.value[this.state.scoreLocation]);
        //     this.setState({
        //         value: newValue
        //     })
        // }
        else {
            newValue[this.state.scoreLocation + "F"] --;
            this.setState({
                scoreLog: [...this.state.scoreLog, this.state.scoreLocation + "F"]
            })
            console.log(newValue[this.state.scoreLocation]);
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

    handleRemove = (logElement, index) => {
        let newValue = {...this.state.value};
        let newLog = [...this.state.scoreLog];
        newValue[logElement]--;
        newLog.splice(index, 1);
        this.setState({
            value: newValue,
            scoreLog: newLog
        });
        console.log(this.state.value[logElement]);
    }

    render() {
        return (
            <span className={"widget"+this.state.classNameDecorator}>
                <div className= {"subtitle"}>
                    {this.state.title}
                </div>
                <div className="teleop-counter-container">
                    <div className="score-btn-container">
                        <button className="tele-btn" onClick={() => this.handleScoreLocation("L1")}> L1 </button>
                        <button className="tele-btn" onClick={() => this.handleScoreLocation("L2")}> L2 </button>
                        <button className="tele-btn" onClick={() => this.handleScoreLocation("L3")}> L3 </button>
                        <button className="tele-btn" onClick={() => this.handleScoreLocation("L4")}> L4 </button>
                        <button className="tele-btn" onClick={() => this.handleScoreLocation("P")}> Processor </button>
                        <button className="tele-btn" onClick={() => this.handleScoreLocation("N")}> Net </button>
                        <button className="tele-btn" onClick={() => this.handleScore(true)}> Score </button>
                        <button className="tele-btn" onClick={() => this.handleScore(false)}> Fumble </button>
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
        );
    }
}

export default TeleopCounter;