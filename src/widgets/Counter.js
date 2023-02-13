import React from "react";
import plus from "/workspaces/ScoutingWebsite/src/images/plus.png"
import minus from "/workspaces/ScoutingWebsite/src/images/minus.png"
import notFound from "/workspaces/ScoutingWebsite/src/images/notFound.png"


class Counter extends React.Component{

    state = {
        value: 0,
        id: this.props.id,
        title: this.props.title,
    }

    increaseCounter = () => {
        this.setState({
            value: this.state.value + 1
        })
    }

    decreaseCounter = () => {
        this.setState({
            value: this.state.value - 1
        })
    }
    

    render(){

        return (
                <span className="widget">

                    <div className="subtitle">
                        {this.title}
                    </div>
                    
                    <span className="btn-container" id={this.id}>
                        
                        <button
                            className={"btn dbtn"}
                            onClick={() => this.decreaseCounter(this.id)}>
                            <img
                                src = {minus}
                                alt = {notFound}
                                className="dbtn-ico"/>
                        </button>
                        
                        <div className="value">
                            {this.state.value}
                        </div>    

                        <button
                            className={"btn ubtn"}
                            onClick={() => this.increaseCounter()}>
                            <img
                                src = {plus}
                                alt = {notFound}
                                className="ubtn-ico"/>
                        </button>
                    </span>
                    
                </span>
        )
    }
}

export default Counter;