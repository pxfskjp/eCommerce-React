import React, { Component } from 'react';

import './css/FilterMenu.css';

class FilterMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // currentMaxPriceInput: 100,
            // currentKeywordInput: '',
            maxPrice: 100,
            searchString: null,
            // keywords: []
        };
    }

    handleChange =  event => {
        this.setState({ 
            [event.target.name]: event.target.value 
        });
    }

    handleUpdateFilter = name => event => {
        const value = this.state[name];
        //console.log(value);
        this.props.updateFilter(name, value);
        event.preventDefault();
    }

    render() {
        return (
            <div className="filter-menu-container">
                <h3>Filter Results</h3>


                    {/* <div className="max-price-container"> */}

                        <label for="max-price">Max Price ($)</label>
                        
                        <input 
                            name="maxPrice" 
                            id="max-price" 
                            type="number" 
                            value={this.state.maxPrice}
                            onChange={this.handleChange}
                        />

                        <button type="button" onClick={this.handleUpdateFilter('maxPrice')}>Enter</button>
                    {/* </div> */}

                <label for="search-string">Search</label>
                        
                        <input 
                            name="searchString" 
                            id="search-string" 
                            type="text" 
                            value={this.state.searchString}
                            onChange={this.handleChange}
                        />

                        <button type="button" onClick={this.handleUpdateFilter('searchString')}>Enter</button>


            </div>
        )
    }
}

export default FilterMenu;