import React from "react";


class CheckBox extends React.Component{

    state ={ 
        value: 0,
        id: this.props.id,
        title: this.props.title,
        classNameDecorator: this.props.decorator
    }

    handleCheckBoxChange = () => {
        this.setState({value: (this.state.value) ? 0 : 1})
    }

    render(){
        return (
            <span className={"widget " + this.state.classNameDecorator}>
                <div className={"subtitle" + this.state.classNameDecorator}>
                    {this.state.title}
                </div>
                <input
                    type="checkbox"
                    className="checkbox"
                    value={this.state.value}
                    onChange={() => this.handleCheckBoxChange()}
                    id={this.state.id}
                    title={this.state.title}
                />     
            </span>
        )
    }
}

export default CheckBox;