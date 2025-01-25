import React from "react";
import note from "../images/note.png";
import undo from "../images/undo.png";
import ScoringSection from "./ScoringSection";
import ReefSection from "./ReefSection"

class AutoCounter extends React.Component {

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
            <div className="note" key={name}>
                <div className="note-clickable" onClick={() => this.handlePieceChange(name)}>
                    <div className="note-text">
                        {name}
                    </div>
                    <img src={note} alt="" className="note-img"/>
                </div>
            </div>
        )
    }

    pieceLine = (amount, firstChar) => {
        let pieces = [];
        for (let i = 1; i <= amount; i++) {
            pieces.push(this.gamePiece(firstChar + i));
        }
        return pieces;
    }

    wingPieces = () => {
        return this.pieceLine(3, "W");
    }

    centerPieces = () => {
        return this.pieceLine(5, "C");
    }

    bigUIArray = (reverse) => {
        let arr = [
            (<ScoringSection
                fail1="FR"
                fail2="FS"
                failText1="Fumble"
                failText2="Fumble Proccesor"
                l4Text="L4"
                l3Text="L3"
                l2Text="L2"
                l1Text="L1"
                handleScore={this.handleLocationChange}
                key="0"
                reverse={reverse}
            />),
            (<ReefSection

            />),
            (<div className="wing" key="1">
                {this.wingPieces()}
            </div>),
            (<div className="center" key="2">
                {this.centerPieces()}
            </div>),
            (<div className="misc" key="3">
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
                <div className="val-display" id={this.state.id} value={this.state.value.join("-")} title={this.state.title}>
                    {(this.state.value.length > 0) ? this.state.value.join(" - ") : "-"}
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