import React from "react";

class Submit extends React.Component{

    id = this.props.id;
    title = this.props.title;
    data = this.props.data;
    classNameDecorator = this.props.decorator
    render(){
        return(
            <button
            className={"widget submit " + this.classNameDecorator}
                onClick={this.props.handleFormSubmit}
            >
                {this.title}
            </button>
        )
    }
}

export default Submit