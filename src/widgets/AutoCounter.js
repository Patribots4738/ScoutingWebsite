import React from "react";
import note from "../images/note.png";
import undo from "../images/undo.png";
import ScoringSection from "./ScoringSection";
import ReefSection from "./ReefSection";

class AutoCounter extends React.Component {

    state = {
        scorevalue: [],
        upperLimit: this.props.upperLimit,
        title: this.props.title,
        id: this.props.id,
        classNameDecorator: this.props.decorator,
        reefHeight: "-",
        reefLocation: "-"
    }

    handleAdd = () => {
        if (this.state.scorevalue.length < this.state.upperLimit) {
            this.setState({
                scorevalue: [...this.state.scorevalue, this.state.reefHeight + this.state.reefLocation]
            });
        }
    }

    findPiece = (piece) => {
        for (let i = 0; i < this.state.scorevalue.length; i++) {
            if ((piece === this.state.scorevalue[i].substring(0, 1)) ^ (piece === this.state.scorevalue[i].substring(0, 2)))
                return i;
        }
        return -1;
    }

    handleRemove = () => {
        if (this.state.scorevalue.length > 0) {
            this.setState({
                scorevalue: this.state.scorevalue.slice(0, this.state.scorevalue.length - 1)
            });
        }
    }

    handlePieceChange = (value) => {
        this.setState({
            reefHeight: value
        });
    }

    handleLocationChange = (value) => {
        let index = this.findPiece(this.state.reefHeight);

        if (index === -1) {
            /**
             * If the currently selected piece isn't found
             * we change the selected location and add the 
             * piece with its location to the list
             */
            this.setState(
                {reefLocation: value}, 
            )
        } else {
            /**
             * If the piece is found, change its location
             * in the list to the newly selected location
             */
            const valueCopy = [value];
            let element = valueCopy[index];
            let height = 
                element.substring(0, 1) === "P" 
                    ? element.substring(0, 1) 
                    : element.substring(0, 2)
            valueCopy[index] = height + value;

            this.setState({
                reefLocation: value
            })
        }
    }

    proccesser = () => {
        return(
            <div className="proccesser-button" onClick={() => this.handleLocationChange("P")}>
                <div className="proccesser-text">Proccesor</div>
            </div>
        );
    }

    net = () => {
        return(
            <div className="net-button" onClick={() => this.handleLocationChange("N")}>
                <div className="net-text">Net</div>
            </div>
        );
    }

    bigUIArray = (reverse) => {
        let arr = [
            (<ScoringSection
                fail1="FR"
                fail2="FS"
                failText="Fumble"
                scoreText="Score"
                l4Text="L4"
                l3Text="L3"
                l2Text="L2"
                l1Text="L1"
                handleLevel={this.handleLocationChange}
                handleScore={this.handleAdd}
            />),
            (<ReefSection
                handleReefFace={this.handlePieceChange}
                faceA="A"
                faceB="B"
                faceC="C"
                faceD="D"
                faceE="E"
                faceF="F"
            />),
            (<div className="misc" key="3">
                <div className="undo-button">
                    <div className="undo-button-text" onClick={() => this.handleRemove()}>
                        <img src={undo} alt="UNDO" className="undo-img"/>
                    </div>
                </div>
                <div className="value-display">
                    <div className="value-text">
                        {this.state.reefHeight + this.state.reefLocation}
                    </div>
                </div>
                <div className="algae-box">
                    <div>
                        {this.proccesser()}
                    </div>
                    <div>
                        {this.net()}
                    </div>
                </div>
            </div>)
        ]

        return reverse ? arr.reverse() : arr;
    }

    render() {
        return (
            <span className={"widget-" + this.state.classNameDecorator}>
                <div className= {"subtitle"}>
                    {this.state.title}
                </div>
                <div className="val-display" id={this.state.id} value={this.state.scorevalue.join("-")} title={this.state.title}>
                    {(this.state.scorevalue.length > 0) ? [...this.state.scorevalue].join(" - ") : "-"}
                </div>
                <div className="selector">
                    <div className="field-map">
                        {this.bigUIArray(this.props.reverse)}
                    </div>
                </div>
            </span>
        )
    }
}

export default AutoCounter