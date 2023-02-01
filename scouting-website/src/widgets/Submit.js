import React from "react";

class Submit extends React.Component{

    url = this.props.url;
    id = this.props.id;
    title = this.props.title;
    data = this.props.data;

    render(){
        return(
            <button
            className="submit"
            >
                {this.title}
            </button>
        )
    }
}

export default Submit