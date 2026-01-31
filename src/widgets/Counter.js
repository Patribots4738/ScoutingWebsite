import React from "react";

class Counter extends React.Component{

    state = {
        value: 0,
        id: this.props.id,
        title: this.props.title,
        upperLimit: this.props.upperLimit,
        classNameDecorator: this.props.decorator,
    }

    increaseCounter = (amount = 1) => {
        if (this.state.value + amount <= this.state.upperLimit){
            this.setState({
                value: this.state.value + amount
            })
        }
    }

    decreaseCounter = (amount = 1) => {
        if (this.state.value - amount >= 0){
            this.setState({
                value: this.state.value - amount
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
                            className={"btn-dbtn-5"}
                            onClick={() => this.decreaseCounter(5)}>
                            -5
                        </button>

                        <button
                            className={"btn-dbtn-1"}
                            onClick={() => this.decreaseCounter(1)}>
                            -1
                        </button>
                       
                        <div className="value" id={this.state.id} value={this.state.value} title={this.state.title}>
                            {this.state.value}
                        </div>    

                        <button
                            className={"btn-ubtn-1"}
                            onClick={() => this.increaseCounter(1)}>
                            +1
                        </button>

                        <button
                            className={"btn-ubtn-5"}
                            onClick={() => this.increaseCounter(5)}>
                            +5
                        </button>

                    

                    </span>
                   
                </span>
        )
    }
}

export default Counter;
