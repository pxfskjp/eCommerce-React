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
            <div className="filter-menu">
                <h3>Filter Results</h3>


                    <div className="filter-input-container">

                        <label for="max-price" className="filter-label">Max Price ($)</label>
                        
                        <input 
                            name="maxPrice" 
                            id="max-price" 
                            type="number" 
                            value={this.state.maxPrice}
                            onChange={this.handleChange}
                            className="filter-input"
                        />

                        <button type="button" onClick={this.handleUpdateFilter('maxPrice')} className="filter-button">Apply</button>
                    </div>

                    <div className="filter-input-container">

                        <label for="search-string" className="filter-label">Search</label>
                        
                        <input 
                            name="searchString" 
                            id="search-string" 
                            type="text" 
                            value={this.state.searchString}
                            onChange={this.handleChange}
                            className="filter-input"
                        />

                        <button 
                            type="button" 
                            onClick={this.handleUpdateFilter('searchString')} 
                            className="filter-button"
                        >
                            Apply
                        </button>
                        
                        <button 
                            type="button" 
                            onClick={this.props.clearAllKeywords} 
                            className="clear-filter-button"
                        >
                            Clear Search Filter
                        </button>
                    </div>


            </div>
        )
    }
}

export default FilterMenu;