import React, { Component } from 'react';

class FilterMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMaxPriceInput: 100,
            currentKeywordInput: '',
            maxPrice: 100,
            keywords: []
        };
    }

    render() {
        return (
            <div className="filter-menu-container">
                <h3>Filter Results</h3>

                <form className="max-price-form">
                    <div className="max-price-indicator">
                        <p>Max Price: ${this.state.maxPrice}</p>
                    </div>
                    <input type="number" value={this.state.currentMaxPriceInput}/>
                    <button type="submit"/>
                </form>

                <p>Keyword:</p>
                <form className="keyword-form">
                    <input type="text" value={this.state.currentKeywordInput}/>
                    <button type="submit"/>
                </form>

            </div>
        )
    }
}

export default FilterMenu;