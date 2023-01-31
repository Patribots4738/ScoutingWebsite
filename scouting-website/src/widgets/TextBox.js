import React from "react";


class TextBox extends React.Component{

    title = this.props.title

    render(){

        return (
            <div>
                <div>
                    {this.title}
                </div>
            
                <input
                    type="text"
                    className={this.title}
                />
            </div>
        )
    }
}

export default TextBox;