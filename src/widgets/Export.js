import React from "react";

class Export extends React.Component{

    id = this.props.id;
    title = this.props.title;

    render(){
        return(
            <button
                className="export widget"
                onClick={this.props.handleExportData}
            >
                {this.title}
            </button>
        )
    }
}

export default Export