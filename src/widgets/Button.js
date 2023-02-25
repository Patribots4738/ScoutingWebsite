import React from "react";
import styled from 'styled-components/native';

class Button extends React.Component{

    id = this.props.id;
    title = this.props.title;

    hide = () => {
        this.setState({visibility: hidden})
    }

    render(){
        return(
            <button
                
            >
                
            </button>
        )
    }
}

export default Button