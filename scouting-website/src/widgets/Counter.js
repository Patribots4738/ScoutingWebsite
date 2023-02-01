import React from "react";


class Counter extends React.Component{

    value = this.props.value;
    id = this.props.id;
    title = this.props.title;

    render(){

        return (
            <div>
                <div>
                    <div
                    className="subtitle"
                    >
                        {this.title}
                    </div>
                    <div
                    className="value"
                    >
                        {this.props.value}
                    </div>
                    
                    <button
                        className={"ubtn"}
                        onClick={() => this.props.increaseCounter(this.id)}
                    >
                        +
                    </button>
                    <button
                        className={"dbtn"}
                        onClick={() => this.props.decreaseCounter(this.id)}
                    >
                        -
                    </button>
                </div>
            </div>
        )
    }
}

export default Counter;