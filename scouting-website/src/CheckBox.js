import React from "react";


class CheckBox extends React.Component{

    state = false;

    render(){

        // const {id, title} = this.props.checkBox;

        var state = false;

        return (
            <div>
                <div>
                    {this.props.title}
                </div>
            
                <input
                    type="checkbox"
                    className={this.props.title}
                    checked={state}
                    onChange={() => this.props.handleCheckboxChange(this.props.id)}
                />
            </div>
        )
    }
}

export default CheckBox;