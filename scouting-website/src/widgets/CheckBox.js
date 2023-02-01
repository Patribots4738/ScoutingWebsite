import React from "react";


class CheckBox extends React.Component{
        
    value = this.props.value    
    id = this.props.id
    title = this.props.title

    render(){
        return (
            <div>
                <div
                className="subtitle"
                >
                    {this.title}
                </div>
            
                <input
                    type="checkbox"
                    className={"textInput"}
                    value={this.value}
                    onChange={() => this.props.handleCheckBoxChange(this.id)}
                />
            </div>
        )
    }
}

export default CheckBox;