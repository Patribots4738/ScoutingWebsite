import React from "react";

class Submit extends React.Component{

    id = this.props.id;
    title = this.props.title;
    data = this.props.data;

    render(){
        return(
            <button
                className="widget submit"
                onClick={this.props.handleFormSubmit}
            >
                <span className="btn-text">{this.title}</span>
            </button>
        )
    }
}

export default Submit