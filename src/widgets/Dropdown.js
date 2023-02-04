import React from "react";


class Dropdown extends React.Component{

    value = this.props.value;
    id = this.props.id;
    title = this.props.title;
    items = this.props.items;
    handleDropdownChange = this.props.handleDropdownChange;

    render(){

        return (
            
            <div>
                <div
                className="subtitle"
                >
                    {this.title}
                </div>
                
                <select
                    onChange = {() => this.handleDropdownChange(this.id, this.value)}
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