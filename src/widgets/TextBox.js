import React from "react";


class TextBox extends React.Component{

    title = this.props.title
    id = this.props.id

    render(){

        return (
            <div className="widget">
                <div className="subtitle">
                    {this.title}
                </div>
            
                <textarea
                    type="text"
                    className="text-box widget"
                    onChange={e => {
                        this.props.handleTextBoxChange(this.id, e.target.value)
                    }}
                />

            </div>
        )
    }
}

export default TextBox;