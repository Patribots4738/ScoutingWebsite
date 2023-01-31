import React from "react";


class CheckBox extends React.Component{
        
    value = this.props.value    
    id = this.props.id
    title = this.props.title

    render(){
        return (
            <div>
                <div>
                    {this.title}
                </div>
            
                <input
                    type="checkbox"
                    className={this.title+".inp"}
                    value={this.value}
                    onChange={() => this.props.handleCheckBoxChange(this.id)}
                />
            </div>
        )
    }
}

export default CheckBox;