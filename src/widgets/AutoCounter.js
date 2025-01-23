import React from "react";

class AutoCounter extends React.Component {

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
        reverse: this.props.reverse,
        reefLoc: "A",
        path: ""
    }

    handleScore = (location) => {
        let newValue = {...this.state.value};
        switch (location) {
            case "Processor":
                newValue["Processor"]++;
                this.addPath("P");
                break;
            case "Net":
                newValue["Net"]++;
                this.addPath("N");
                break;
            case "Processor Fumble":
                newValue["Processor Fumble"]++;
                this.addPath("PF");
                break;
            case "Net Fumble":
                newValue["Net Fumble"]++;
                this.addPath("NF");
                break;
            case "L1":
                newValue["L1"]++;
                this.addPath(this.state.reefLoc + "L1");
                break;
            case "L2":
                newValue["L2"]++;
                this.addPath(this.state.reefLoc + "L2");
                break;
            case "L3":
                newValue["L3"]++;
                this.addPath(this.state.reefLoc + "L3");
                break;
            case "L4":
                newValue["L4"]++;
                this.addPath(this.state.reefLoc + "L4");
                break;
        }
        this.setState({
            value: newValue
        });
    }
    
    addPath = (location) => {
        let newPath = {...this.state.path};
        if (location.indexOf("L") === 3) {
            newPath = [...this.state.path, ("- " + this.state.reefLoc + location)];
        }
        else {
            newPath = [...this.state.path, ("- " + location)];
        }
        this.setState({
            path: newPath
        });
    }

    // TODO: needs to use the path name to remove pieces
    undoPath = () => {
        let newPath = {...this.state.path};
        let newValue = {...this.state.value};
        if (!newValue.substring(newValue.getlength() - 1).isNaN()) {
            // handle coral removal
        }
        else {
            // handle anything else removed
        }
        // switch (logElement) {
        //     case "Processor":
        //         newValue["Auto Processor"]--;
        //         break;
        //     case "Net":
        //         newValue["Auto Net"]--;
        //         break;
        //     case "Net Fumble":
        //         newValue["Auto Net Fumble"]--;
        //         break;
        //     case "Processor Fumble":
        //         newValue["Auto Processor Fumble"]--;
        //         break;
        //     case "Coral Fumble":
        //         newValue["Auto Coral Fumble"]--;
        //         break;
        //     default:
        //         newValue[logElement]--;
        //     } 
            
        
    }

    // changes reefLoc based on the parameter
    handleReefLoc = (location) => {
        this.setState({
            reefLoc: location
        });
    }
    
    render() {
        return (
            <div className="auto-counter-container">
                <button className="auto-btn" onClick={() => this.handleReefLoc("A")}> A </button>
                <button className="auto-btn" onClick={() => this.handleReefLoc("B")}> B </button>
                <button className="auto-btn" onClick={() => this.handleReefLoc("C")}> C </button>
                <button className="auto-btn" onClick={() => this.handleReefLoc("D")}> D </button>
                <button className="auto-btn" onClick={() => this.handleReefLoc("E")}> E </button>
                <button className="auto-btn" onClick={() => this.handleReefLoc("F")}> F </button>
                <button className="auto-btn" onClick={() => this.handleScore("L2")}> L1 </button>
                <button className="auto-btn" onClick={() => this.handleScore("L2")}> L2 </button>
                <button className="auto-btn" onClick={() => this.handleScore("L3")}> L3 </button>
                <button className="auto-btn" onClick={() => this.handleScore("L4")}> L4 </button>
                <button className="auto-btn" onClick={() => this.handleScore("Processor")}> Processor </button>
                <button className="auto-btn" onClick={() => this.handleScore("Net")}> Net </button>
                <button className="auto-btn" onClick={() => this.handleScore("Processor Fumble")}> Processor Fumble </button>
                <button className="auto-btn" onClick={() => this.handleScore("Net Fumble")}> Net Fumble </button>
                <button className="auto-btn" onClick={() => this.handleScore("Failed Intake")}> Failed Intake </button>
                <button className="auto-btn" onClick={() => this.undoPath()}> Undo </button>

            </div>
        )
    }
}

export default AutoCounter;