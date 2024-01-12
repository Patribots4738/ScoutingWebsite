import React from "react";

class Stopwatch extends React.Component {
    
    state = {
        total: 0,
        count: 0,
        isActive: false,
        time: 0,
        interval: null,
        value: this.props.value,
        id: this.props.id,
        title: this.props.title,
        decorator: this.props.decorator
    }

    // Adds current time displayed on timer to total time, and sets value to the total / number of times
    // increments count
    handleSplit = () => {
        var total = this.state.total + this.state.time;
        var count = this.state.count + 1;
        this.setState({
            total: total,
            count: count,
            value: ((total / count) / 1000).toFixed(2) + "s",
            time: 0
        });
    }

    // starts timer and starts time incrementing function on 10ms interval
    handleStart = () => {
        if (!this.state.isActive) {
            this.setState({
                interval: setInterval(() => {
                    this.setState({
                        time: this.state.time + 10
                    })
                }, 10),
                isActive: true
            });
        }
    }

    // stops time setting function
    handleStop = () => {
        if (this.state.isActive) {
            this.setState({
                isActive: false
            })
            clearInterval(this.state.interval);
        }
    }

    // stops time setting function and sets time to 0
    handleReset = () => {
        this.setState({
            isActive: false,
            time: 0
        })
        clearInterval(this.state.interval);
    }

    render() {
        return (
            <span className="widget">
                <div className={"subtitle " + this.state.decorator}>
                    {this.state.title}
                </div>
                <div className="stop-watch">
                    <div className="timer">
                        <span className="digits">
                            {("0" + Math.floor((this.state.time / 60000) % 60)).slice(-2)}:
                        </span>
                        <span className="digits">
                            {("0" + Math.floor((this.state.time / 1000) % 60)).slice(-2)}.
                        </span>
                        <span className="digits mili-sec">
                            {("0" + ((this.state.time / 10) % 100)).slice(-2)}
                        </span>
                    </div>
                    <div className="average-time" id={this.state.id} value={this.state.value} title={this.state.title}>
                        Current Time Average: {this.state.value}
                    </div>
                    <div className="control-buttons">
                        <button className="stopwatch-btn" onClick={() => this.handleStart()}>
                            Start
                        </button>
                        <button className="stopwatch-btn" onClick={() => this.handleStop()}>
                            Stop
                        </button>
                        <button className="stopwatch-btn" onClick={() => this.handleSplit()}>
                            Split
                        </button>
                        <button className="stopwatch-btn" onClick={() => this.handleReset()}>
                            Reset
                        </button>
                    </div>
                </div>
            </span>
        );
    }
}

export default Stopwatch