import React from "react";


class Slider extends React.Component{

    state = {
        value: this.props.value,
        id: this.props.id,
        title: this.props.title,
        decorator: this.props.decorator,
    }


    handleSliderChange = (value) => {
        this.setState({value: value})
    }


    render(){
        return (
            <span className="widget">
                <div className={"subtitle " + this.state.decorator}>
                    {this.state.title} 
                </div>
                <span className="slider-valueslide">
                    <input
                        type="range"
                        className="slider"
                        onChange={e => {
                            this.handleSliderChange(e.target.value)
                        }}
                        id={this.state.id}
                        value={(this.state.value) ? this.state.value : 3}
                        title={this.state.title}
                        min={(this.state.minValue) ? this.state.minValue : 1}
                        max="5"     
                    />
                </span>
                
            </span>
        )
    }
}

export default Slider;