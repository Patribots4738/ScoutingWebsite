import React from "react";
import plus from "/workspaces/ScoutingWebsite/src/images/plus.png"
import minus from "/workspaces/ScoutingWebsite/src/images/minus.png"
import notFound from "/workspaces/ScoutingWebsite/src/images/notFound.png"




class Counter extends React.Component{


    state = {
        value: 0,
        id: this.props.id,
        title: this.props.title,
        upperLimit: this.props.upperLimit,
        classNameDecorator: this.props.decorator,
    }


    increaseCounter = () => {
        if (this.state.value !== this.state.upperLimit){
            this.setState({
                value: this.state.value + 1
            })
        }
    }


    decreaseCounter = () => {
        if (this.state.value !== 0){
            this.setState({
                value: this.state.value - 1
            })
        }
    }
   


    render(){
        return (
                <span className= {"widget"}>


                    <div className= {"subtitle " + this.state.classNameDecorator}>
                        {this.state.title}
                    </div>
                   
                    <span className="btn-container">
                       
                        <button
                            className={"btn dbtn"}
                            onClick={() => this.decreaseCounter()}>
                            -
                        </button>
                       
                        <div className="value" id={this.state.id} value={this.state.value} title={this.state.title}>
                            {this.state.value}
                        </div>    


                        <button
                            className={"btn ubtn"}
                            onClick={() => this.increaseCounter()}>
                            +
                        </button>
                    </span>
                   
                </span>
        )
    }
}


export default Counter;
