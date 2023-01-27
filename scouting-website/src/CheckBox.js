import React from "react";


class CheckBox extends React.Component{

    render(){

        // const {id, title} = this.props.checkBox;

        return (
            <div>
                <div>
                    {this.props.title}
                </div>
            
                <input
                    type="checkbox"
                    className={"checkbox"}
                    checked={false}
                    onChange={() => this.props.handleCheckboxChange("test")}
                />
            </div>
        )
    }
}

export default CheckBox;