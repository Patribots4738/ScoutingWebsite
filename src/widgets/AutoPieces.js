import React from "react";
import note from "../images/note.png";
import undo from "../images/undo.png";
import ScoringSection from "./ScoringSection";

class AutoPieces extends React.Component {

    state = {
        value: [],
        upperLimit: this.props.upperLimit,
        title: this.props.title,
        id: this.props.id,
        classNameDecorator: this.props.decorator,
        piece: "P",
        location: "FS"
    }

    handleAdd = () => {
        if (this.state.value.length < this.state.upperLimit) {
            this.setState({
                value: [...this.state.value, this.state.piece + this.state.location]
            });
        }
    }

    findPiece = (piece) => {
        for (let i = 0; i < this.state.value.length; i++) {
            if ((piece === this.state.value[i].substring(0, 1)) ^ (piece === this.state.value[i].substring(0, 2)))
                return i;
        }
        return -1;
    }

    handleRemove = () => {
        if (this.state.value.length > 0) {
            this.setState({
                value: this.state.value.slice(0, this.state.value.length - 1)
            });
        }
    }

    handlePieceChange = (value) => {
        this.setState({
            piece: value
        });
    }

    handleLocationChange = (value) => {
        let index = this.findPiece(this.state.piece);

        if (index === -1) {
            /**
             * If the currently selected piece isn't found
             * we change the selected location and add the 
             * piece with its location to the list
             */
            this.setState(
                {location: value}, 
                () => {this.handleAdd();}
            )
        } else {
            /**
             * If the piece is found, change its location
             * in the list to the newly selected location
             */
            const valueCopy = [...this.state.value];
            let element = valueCopy[index];
            let piece = 
                element.substring(0, 1) === "P" 
                    ? element.substring(0, 1) 
                    : element.substring(0, 2)
            valueCopy[index] = piece + value;

            this.setState({
                location: value,
                value: valueCopy
            })
        }
    }

    gamePiece = (name) => {
        return(
            <div className="note">
                <div className="note-clickable" onClick={() => this.handlePieceChange(name)}>
                    <div className="note-text">
                        {name}
                    </div>
                    <img src={note} alt="" className="note-img"/>
                </div>
            </div>
        )
    }

    render() {
        return (
            <span className={"widget-" + this.state.classNameDecorator}>
                <div className= {"subtitle"}>
                    {this.state.title}
                </div>
                <div className="val-display" id={this.state.id} value={this.state.value.join("-")} title={this.state.title}>
                    {(this.state.value.length > 0) ? this.state.value.join(" - ") : "-"}
                </div>
                <div className="selector">
                    <div className="field-map">
                        <ScoringSection
                            speaker="S"
                            amp="A"
                            fail1="FI"
                            fail2="FS"
                            failText1="F INTAKE"
                            failText2="F SHOT"
                            handleScore={this.handleLocationChange}
                        />
                        <div className="wing">
                            {this.gamePiece("W1")}
                            {this.gamePiece("W2")}
                            {this.gamePiece("W3")}
                        </div>
                        <div className="center">
                            {this.gamePiece("C1")}
                            {this.gamePiece("C2")}
                            {this.gamePiece("C3")}
                            {this.gamePiece("C4")}
                            {this.gamePiece("C5")}
                        </div>
                        <div className="misc">
                            <div className="auto-button">
                                <div className="auto-button-text" onClick={() => this.handleRemove()}>
                                    <img src={undo} alt="UNDO" className="undo-img"/>
                                </div>
                            </div>
                            <div className="value-display">
                                <div className="value-text">
                                    {this.state.piece + this.state.location}
                                </div>
                            </div>
                            {this.gamePiece("P")}
                        </div>
                    </div>
                </div>
            </span>
        )
    }
}

export default AutoPieces 