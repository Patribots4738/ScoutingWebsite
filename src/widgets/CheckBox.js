import React from "react";


class CheckBox extends React.Component{
        
    value = this.props.value    
    id = this.props.id
    title = this.props.title
    classNameDecorator = this.props.decorator

    render(){
        return (
            <div className={"widget " + this.classNameDecorator}>
                <div
                className="subtitle"
                >
                    {this.title}
                </div>
            
                <input
                    type="checkbox"
                    className="checkbox"
                    value={this.value}
                    onChange={() => this.props.handleCheckBoxChange(this.id)}
                />
                
            </div>
        )
    }
}

export default CheckBox;