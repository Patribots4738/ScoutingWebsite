import React from "react";
import note from "../images/note.png";
import speaker from "../images/speaker.png";
import undo from "../images/undo.png";

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
            this.setState(
                {location: value}, 
                () => {this.handleAdd();}
            )
        } 
        else {
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
            <div className="note" onClick={() => this.handlePieceChange(name)}>
                <div className="note-text">
                    {name}
                </div>
                <img src={note} alt="" className="note-img"/>
            </div>
        )
    }

    render() {
        return (
            <span className={"widget-" + this.state.classNameDecorator}>
                <div className= {"subtitle"}>
                    {this.state.title}
                </div>
                <div className="val-display" id={this.state.id} value={this.state.value} title={this.state.title}>
                    {(this.state.value.length > 0) ? this.state.value.join(" - ") : "-"}
                </div>
                <div className="selector">
                    <div className="field-map">
                        <div className="scoring">
                            <div className="amp" onClick={() => this.handleLocationChange("A")}>
                                <div className="amp-graphic"></div>
                                <div className="amp-text">AMP</div>
                            </div>
                            <div className="speaker" onClick={() => this.handleLocationChange("S")}>
                                <img src={speaker} alt="" className="speaker-img"/>
                                <div className="speaker-text">SPEAKER</div>
                            </div>
                            <div className="fail">
                                <div className="fail-button" onClick={() => this.handleLocationChange("FI")}>
                                    <div className="fail-text">
                                        F INTAKE
                                    </div>
                                </div>
                                <div className="fail-button" onClick={() => this.handleLocationChange("FS")}>
                                    <div className="fail-text">
                                        F SHOT
                                    </div>
                                </div>
                            </div>
                        </div>
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
                            <div className="auto-button" onClick={() => this.handleRemove()}>
                                <div className="auto-button-text">
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