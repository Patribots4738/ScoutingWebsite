import React from "react";
import plus from "/workspaces/ScoutingWebsite/src/images/plus.png"
import minus from "/workspaces/ScoutingWebsite/src/images/minus.png"
import notFound from "/workspaces/ScoutingWebsite/src/images/notFound.png"


class Counter extends React.Component{

    value = this.props.value;
    id = this.props.id;
    title = this.props.title;

    render(){

        return (
                <div className="widget">

                    <div className="subtitle">
                        {this.title}
                    </div>

                    
                    
                    <div className="btn-container">
                        
                        <button
                            className={"btn dbtn"}
                            onClick={() => this.props.decreaseCounter(this.id)}
                        >
                            <img
                                src = {minus}
                                alt = {notFound}
                                className="btn-ico"
                            />
                        </button>
                        
                        <div className="value">
                            {this.props.value}
                        </div>    

                        <button
                            className={"btn ubtn"}
                            onClick={() => this.props.increaseCounter(this.id)}
                            src={plus}
                        >
                            <img
                                src = {plus}
                                alt = {notFound}
                                className="btn-ico"
                            />
                        </button>
                    </div>
                    
                </div>
        )
    }
}

export default Counter;