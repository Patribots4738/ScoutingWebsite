import React from "react";


class Dropdown extends React.Component{

    value = this.props.value;
    id = this.props.id;
    title = this.props.title;
    items = this.props.items;

    render(){

        return (
            
            <div>
                <div
                className="subtitle"
                >
                    {this.title}
                </div>
                
                <select name={this.title} id={this.id}>
                    {this.items.map(item => (
                        <option value={item.name}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>
            
        )
    }
}

export default Dropdown;