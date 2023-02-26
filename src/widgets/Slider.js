import React from "react";


class Slider extends React.Component{

    state = {
        value: this.props.value,
        id: this.props.id,
        title: this.props.title,
        decorator: this.props.decorator,
        minValue: this.props.minValue
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
                
                <div className="subtitle slider-label">
                <input
                    type="range"
                    className="slider widget"
                    onChange={e => {
                        this.handleSliderChange(e.target.value)
                    }}
                    id={this.state.id}
                    value={(this.state.value) ? this.state.value : 50}
                    title={this.state.title}
                    min={(this.state.minValue) ? this.state.minValue : 0}
                    max="100"
                    
                />
                </div>
                <div className={"subtitle slider-value" + this.state.decorator}>
                    {this.state.value}
                </div>

            </span>
        )
    }
}

export default Slider;