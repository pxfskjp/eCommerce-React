import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    console.log('LocationSearchInput handleSelect address: ', address);
    this.handleChange(address);
    geocodeByAddress(address)
      .then(results => {
        getLatLng(results[0])
          .then(latLng => {
            console.log('Success', latLng);
            this.props.handleSelectLocation(address);
          })
          .catch(error => console.error('Error', error));
      })
      .catch(error => console.error('Error', error));
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;

// class PlaceAutocompleteForm extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { address: '' };

//         // Specify form input field:
//         const autocompleteFormField = document.getElementById(`street-address-field`);  

//         // Instantiate a new autocomplete object:
//         const autocomplete = new google.maps.places.Autocomplete((autocompleteFormField), {
//             types: [`address`],
//             componentRestrictions: [`us`],
//         });     

//         // Clearing the listener ensures that the results that are returned always correspond to the latest user input.
//         // Depending on your implementation, you might need to call this method several times
//         google.maps.event.clearInstanceListeners(autocompleteFormField);

//         // Add the custom Google Places listener, place_changed, 
//         // which will activate when a result from the autocomplete list is selected:
//         google.maps.event.addListener(autocomplete, `place_changed`, () => {
//             // Custom methods to populate form fields.
//         })
        
//     }

//     // componentDidMount() {
        
//     // }

// }

// export default PlaceAutocompleteForm;