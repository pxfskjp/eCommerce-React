import React, { Component } from 'react';

class FilterMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // currentMaxPriceInput: 100,
            currentKeywordInput: '',
            maxPrice: 100,
            keywords: []
        };
    }

    handleChange =  event => {
        this.setState({ 
            [event.target.name]: event.target.value 
        }, () => console.log(this.state));
    }

    render() {
        return (
            <div className="filter-menu-container">
                <h3>Filter Results</h3>


                    <div className="max-price-container">

                        <label for="max-price">Max Price ($)</label><br/>
                        
                        <input 
                            name="maxPrice" 
                            id="max-price" 
                            type="number" 
                            value={this.state.maxPrice}
                            onChange={this.handleChange}
                        />

                        <button type="button">Enter</button>
                    </div>


                <p>Keyword</p>

                    <input type="text" value={this.state.currentKeywordInput}/>
                    <button type="button">Enter</button>


            </div>
        )
    }
}

export default FilterMenu;