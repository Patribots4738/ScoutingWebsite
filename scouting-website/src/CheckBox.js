import React from "react";


class CheckBox extends React.Component{

    render(){

        // const {id, title} = this.props.checkBox;

        return (
            <input
                type="checkbox"
                className={"test"}
                checked={false}
                onChange={() => this.props.handleChangeProps("test")}
            />
        )
    }
}

export default CheckBox;