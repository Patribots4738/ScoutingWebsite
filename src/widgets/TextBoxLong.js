import React from "react";


class TextBoxLong extends React.Component{

    state = {
        value: "",
        id: this.props.id,
        title: this.props.title
    }

    handleTextBoxChange = (value) => {
        if (this.validInput(value)) {
            this.setState({value: value});
        }
    }

    validInput = (value) => {
        return (
            !value.includes("/") && 
            !value.includes("__.*__") && 
            !value.includes("..") && 
            value !== '.' &&
            value.length < 1000
        );
    }

    render(){
        return (
            <span className="widget">
                <div className="subtitle">
                    {this.state.title}
                </div>
            
                <textarea
                    type="text"
                    className="text-box-long widget"
                    onChange={e => {
                        this.handleTextBoxChange(e.target.value)
                    }}
                    id={this.state.id}
                    value={this.state.value}
                    title={this.state.title}
                    placeholder={this.props.placeholder}
                />

            </span>
        )
    }
}

export default TextBoxLong;