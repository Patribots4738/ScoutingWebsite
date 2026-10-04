
import React from "react";


class ClearLocalStorage extends React.Component{


    id = this.props.id;
    title = this.props.title;


    render(){
        return(
            <button
                className="clear-localstorage widget"
                onClick={this.props.clearLocalStorage}
            >
                <span className="btn-text">{this.title}</span>
            </button>
        )
    }
}


export default ClearLocalStorage
