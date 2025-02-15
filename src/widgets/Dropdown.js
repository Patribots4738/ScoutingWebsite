import React from "react";


class Dropdown extends React.Component{

    state = {
        value: this.props.value,
        id: this.props.id,
        title: this.props.title,
        items: this.props.items,
        handleDropdownChange: this.props.handleDropdownChange,
        selected: this.props.selected,
        className: this.props.className
    }
    
    handleDropdownChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    render(){
        return (
            <span className={"widget"}>
                <div className={"subtitle"}>
                    {this.state.title}
                </div>
                
                <select
                    type="dropdown"
                    className={this.state.className}
                    onChange = {this.handleDropdownChange}
                    id = {this.state.id}
                    value = {this.state.value}
                    title = {this.state.title}
                >
                    {this.state.items.map(item => {
                        return (
                        <option 
                            key={item.id} 
                            value={item.value}
                        >
                            {item.title}
                        </option>
                        );
                    })}
                </select>
                
            </span>
            
        )
    }
}

export default Dropdown;