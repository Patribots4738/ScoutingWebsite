import React from "react";


class Slider extends React.Component{

    state = {
        value: this.props.value,
        minValue: this.props.minValue,
        maxValue: this.props.maxValue,
        units: this.props.units,
        id: this.props.id,
        title: this.props.title,
        decorator: this.props.decorator,
        sliderdecorator: this.props.sliderdecorator,
        boxdecorator: this.props.boxdecorator
    }


    handleSliderChange = (value) => {
        this.setState({value: value})
    }


    render(){
        return (
            <span className={this.state.boxdecorator}>
                <div className={this.state.decorator}>
                    {this.state.title}: {this.state.value} {this.state.units}
                </div>
                    <input
                        type="range"
                        className={this.state.sliderdecorator}
                        onChange={e => {
                            this.handleSliderChange(e.target.value)
                        }}
                        id={this.state.id}
                        value={this.state.value}
                        min={this.state.minValue}
                        max={this.state.maxValue}   
                    />
            </span>
        )
    }
}

export default Slider;