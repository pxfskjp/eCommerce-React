import React from 'react';

class PlaceAutocompleteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { address: '' };

        // Specify form input field:
        const autocompleteFormField = document.getElementById(`street-address-field`);  

        // Instantiate a new autocomplete object:
        const autocomplete = new google.maps.places.Autocomplete((autocompleteFormField), {
            types: [`address`],
            componentRestrictions: [`us`],
        });     

        // Clearing the listener ensures that the results that are returned always correspond to the latest user input.
        // Depending on your implementation, you might need to call this method several times
        google.maps.event.clearInstanceListeners(autocompleteFormField);
        
        // Add the custom Google Places listener, place_changed, 
        // which will activate when a result from the autocomplete list is selected:
        google.maps.event.addListener(autocomplete, `place_changed`, () => {
            // Custom methods to populate form fields.
        })
        
    }

    // componentDidMount() {
        
    // }

}

export default PlaceAutocompleteForm;