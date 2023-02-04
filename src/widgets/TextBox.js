import React from "react";


class TextBox extends React.Component{

    title = this.props.title
    id = this.props.id

    render(){

        return (
            <div>
                <div>
                    {this.title}
                </div>
            
                <input
                    type="text"
                    className="textbox"
                    onChange={e => {
                        this.props.handleTextBoxChange(this.id, e.target.value)
                    }}
                />
            </div>
        )
    }
}

export default TextBox;