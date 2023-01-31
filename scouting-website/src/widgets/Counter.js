import React from "react";


class Counter extends React.Component{

    value = this.props.value;
    id = this.props.id;
    title = this.props.title;

    render(){

        return (
            <div>
                <div>
                    <div>
                        {this.title}
                    </div>
                    <div>
                        {this.props.value}
                    </div>
                    
                    <button
                        className={this.title + ".ubtn"}
                        onClick={() => this.props.increaseCounter(this.id)}
                    >
                        +
                    </button>
                    <button
                        className={this.title + ".dbtn"}
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