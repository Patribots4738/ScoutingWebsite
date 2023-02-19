import React from "react";


class Slider extends React.Component{

    state = {
        value: 50,
        id: this.props.id,
        title: this.props.title,
    }

    handleSliderChange = (value) => {
        this.setState({value: value})
    }

    render(){
        return (
            <span className="widget">
                <div className="subtitle">
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
                    value={this.state.value}
                    title={this.state.title}
                    min="0"
                    max="100"
                    
                />
                </div>
                <div className="subtitle slider-value">
                    {this.state.value}
                </div>

            </span>
        )
    }
}

export default Slider;