import React from "react";

class AutoPieces extends React.Component {

    state = {
        value: [],
        upperLimit: this.props.upperLimit,
        title: this.props.title,
        id: this.props.id,
        classNameDecorator: this.props.decorator,
        piece: "P",
        location: "F"
    }

    handleAdd = () => {
        if (this.state.value.length < this.state.upperLimit && !this.findPiece()) {
            this.setState({
                value: [...this.state.value, this.state.piece + this.state.location]
            });
        }
    }

    findPiece = () => {
        for (let i = 0; i < this.state.value.length; i++) {
            if (this.state.piece === this.state.value[i].substr(0, this.state.value[i].length - 1)) 
                return true;
        }
        return false;
    }

    handleRemove = () => {
        if (this.state.value.length > 0) {
            this.setState({
                value: this.state.value.slice(0, this.state.value.length - 1)
            });
        }
    }

    handlePieceChange = (e) => {    
        this.setState({
            piece: e.target.value
        });
    }

    handleLocationChange = (e) => {
        this.setState({
            location: e.target.value
        });
    }

    render() {
        return (
            <span className={"widget-" + this.state.classNameDecorator}>
                <div className= {"subtitle"}>
                    {this.state.title}
                </div>
                <div className="auto-pieces-body">
                    <div className="val-display" id={this.state.id} value={this.state.value} title={this.state.title}>
                        {(this.state.value.length > 0) ? this.state.value.join(" - ") : "-"}
                    </div>
                    <div className="auto-dropdowns">
                        <select className="auto-dropdown" onChange={this.handlePieceChange}>
                            <option value="P">P</option>
                            <option value="W1">W1</option>
                            <option value="W2">W2</option>
                            <option value="W3">W3</option>
                            <option value="C1">C1</option>
                            <option value="C2">C2</option>
                            <option value="C3">C3</option>
                            <option value="C4">C4</option>
                            <option value="C5">C5</option>
                        </select>
                        <select className="auto-dropdown" onChange={this.handleLocationChange}>
                            <option value="F">F</option>
                            <option value="S">S</option>
                            <option value="A">A</option>
                        </select>
                    </div>
                    <div className="auto-buttons">
                        <button onClick={this.handleAdd} className="auto-button">
                            <div className="auto-btn-text">Add</div>
                        </button>
                        <button onClick={this.handleRemove} className="auto-button">
                            <div className="auto-btn-text">Remove</div>
                        </button>
                    </div>
                </div>
            </span>
        )
    }
}

export default AutoPieces 