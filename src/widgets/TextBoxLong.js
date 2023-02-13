import React from "react";


class TextBoxLong extends React.Component{

    title = this.props.title
    id = this.props.id
    classNameDecorator = this.props.decorator

    render(){
        return (
            <span className={"widget " + this.classNameDecorator}>
                <div className="subtitle">
                    {this.title}
                </div>
            
                <textarea
                    type="text"
                    className="text-box-long widget"
                    onChange={e => {
                        this.props.handleTextBoxChange(this.id, e.target.value)
                    }}
                />

            </span>
        )
    }
}

export default TextBoxLong;