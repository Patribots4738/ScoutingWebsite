import React from "react";


class Dropdown extends React.Component{

    value = this.props.value;
    id = this.props.id;
    title = this.props.title;
    items = this.props.items;
    handleDropdownChange = this.props.handleDropdownChange;
    

    render(){
        return (
            <div className="widget">
                <div
                className="subtitle"
                >
                    {this.title}
                </div>
                
                <select
                    type="dropown"
                    className="dropdown"
                    onChange = {this.handleDropdownChange}
                    id = {this.id}
                    value = {this.props.value}
                >
                    {this.items.map(item => {
                        return (
                        <option 
                            key={item.id} 
                            value={this.items.indexOf(item)}
                        >
                            {item.title}
                        </option>
                        );
                    })}
                </select>

            </div>
            
        )
    }
}

export default Dropdown;