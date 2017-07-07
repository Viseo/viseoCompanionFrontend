import React, {Component} from 'react';
import {GoogleMap, withGoogleMap,Marker} from 'react-google-maps';
import { geocodeByAddress} from 'react-places-autocomplete'
import AutoCompleteForm from './AutoCompleteAdress';


const GettingStartedGoogleMap = withGoogleMap(props => (
    <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={3}
        defaultCenter={{lat: -25.363882, lng: 131.044922}}
        onClick={props.onMapClick}
    >
        {props.markers.map(marker => (
            <Marker
                {...marker}
                onRightClick={() => props.onMarkerRightClick(marker)}
            />
        ))}
    </GoogleMap>
));
export default class GettingStartedExample extends Component {

    state = {
        markers: [{
            position: {
                lat:48.862725,
                lng: 2.287592000000018,
            },
            key: 'Viseo technologies',
            defaultAnimation: 2,
        }],
    };

    handleMapLoad = (map) => {
        if (map) {
            console.log(map.getZoom());
        }
    };

    handleMapClick = (event) => {
        const nextMarkers = [
            ...this.state.markers,
            {
                position: event.latLng,
                defaultAnimation: 2,
                key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
            },
        ];
        this.setState({
            markers: nextMarkers,
        });

        if (nextMarkers.length === 3) {
            this.props.toast(
                'Right click on the marker to remove it',
                'Also check the code!',
            );
        }
    };

    handleMarkerRightClick = (targetMarker) => {
        const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
        this.setState({
            markers: nextMarkers,
        });
    };


    render() {
        return (
            <div style={{height: '100%'}}>
                <h1>
                    Getting Started
                </h1>

                <GettingStartedGoogleMap
                    containerElement={
                        <div style={{
                            backgroundColor: 'white',
                            position: 'fixed',
                            marginLeft: 300,
                            width: 832,
                            height: 400,
                            zIndex: 9900,
                        }}/>
                    }
                    mapElement={
                        <div style={{aheight: '100%',position:'absolute !important'}}/>
                    }
                    onMapLoad={this.handleMapLoad}
                    onMapClick={this.handleMapClick}
                    markers={this.state.markers}
                    onMarkerRightClick={this.handleMarkerRightClick}
                />
            </div>
        );
    }
};