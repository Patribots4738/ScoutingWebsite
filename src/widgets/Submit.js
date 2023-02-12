import React from "react";

class Submit extends React.Component{

    id = this.props.id;
    title = this.props.title;
    data = this.props.data;

    render(){
        return(
            <button
                className="submit widget"
                onClick={this.props.handleFormSubmit}
            >
                {this.title}
            </button>
        )
    }
}

export default Submit