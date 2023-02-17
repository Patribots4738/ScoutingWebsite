import React from "react";
import plus from "/workspaces/ScoutingWebsite/src/images/plus.png"
import minus from "/workspaces/ScoutingWebsite/src/images/minus.png"
import notFound from "/workspaces/ScoutingWebsite/src/images/notFound.png"


class Counter extends React.Component{

    value = this.props.value;
    id = this.props.id;
    title = this.props.title;
    classNameDecorator = this.props.decorator

    render(){

        return (
                <div className={"widget " + this.classNameDecorator}>

                    <div className="counterTitle">
                        {this.title}
                    </div>

                    <div className="value">
                            {this.props.value}
                        </div> 
                    
                    <div className="btn-container">
                        
                        <button
                            className={"btn dbtn"}
                            onClick={() => this.props.decreaseCounter(this.id)}
                        >
                            <img
                                src = {minus}
                                alt = {notFound}
                                className="btn-ico-down"
                            />
                        </button>
                        
                           

                        <button
                            className={"btn ubtn"}
                            onClick={() => this.props.increaseCounter(this.id)}
                            src={plus}
                        >
                            <img
                                src = {plus}
                                alt = {notFound}
                                className="btn-ico-up"
                                
                            />
                        </button>
                    </div>
                    
                </div>
        )
    }
}

export default Counter;