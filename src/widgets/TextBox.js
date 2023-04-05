import React from "react";


class TextBox extends React.Component{

    state = {
        value: "",
        id: this.props.id,
        title: this.props.title,
        required: this.props.required,
    }

    handleTextBoxChange = (value) => {
        this.setState({value: value})
    }

    determineRequired = (required) => {
        if (required) {
            return (
                <input
                        type="text"
                        className="text-box widget"
                        onChange={e => {
                            this.handleTextBoxChange(e.target.value)
                        }}
                        id={this.state.id}
                        value={this.state.value}
                        required
                        title={this.state.title}
                    />
            )
        } else {
            return (
                <input
                        type="text"
                        className="text-box widget"
                        onChange={e => {
                            this.handleTextBoxChange(e.target.value)
                        }}
                        id={this.state.id}
                        value={this.state.value}
                        title={this.state.title}
                    />
            )
        }
    }

    render(){
        return (
            <span className="widget">
                <div className={"subtitle " + this.props.className}>
                    {this.state.title}
                </div>

                {this.determineRequired(this.state.required)}

            </span>
        )
    }
}

export default TextBox;