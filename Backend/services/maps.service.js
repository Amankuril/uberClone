const axios = require('axios');
const captainModel = require('../models/captain.model');


// This function is used to get the coordinates of a given address using Nominatim API
module.exports.getAddressCoordinate = async (address) => {
    const url = `https://nominatim.openstreetmap.org/search`;

    try {
        const response = await axios.get(url, {
            params: {
                q: address,
                format: 'json',
                limit: 1
            },
            headers: {
                'User-Agent': 'uberClone/1.0 (kurilaman21@gmail.com)' // Required
            }
        });

        if (response.data.length > 0) {
            const location = response.data[0];
            return {
                lat: parseFloat(location.lat),
                lng: parseFloat(location.lon)
            };
        } else {
            throw new Error('No results found for this address.');
        }

    } catch (error) {
        console.error('Geocoding error:', error.message);
        throw error;
    }
};


const getAddressCoordinate = module.exports.getAddressCoordinate;


// This function is used to get the distance and time between two addresses using OpenRouteService API
module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination addresses are required');
    }

    try {
        // Step 1: Convert addresses to coordinates
        const originCoords = await getAddressCoordinate(origin);
        const destinationCoords = await getAddressCoordinate(destination);

        const originAdress = [originCoords.lng, originCoords.lat];
        const destinationAdress = [destinationCoords.lng, destinationCoords.lat];

        // Step 2: Call OpenRouteService
        const apiKey = process.env.ORS_API_KEY;
        const url = 'https://api.openrouteservice.org/v2/directions/driving-car';

        const response = await axios.post(
            url,
            {
                coordinates: [originAdress, destinationAdress]
            },
            {
                headers: {
                    Authorization: apiKey,
                    'Content-Type': 'application/json'
                }
            }
        );

        const summary = response.data.routes[0].summary;

        return {
            distance: summary.distance,     // in meters
            duration: summary.duration      // in seconds
        };

    } catch (err) {
        console.error('Error in getDistanceTime:', err.message);
        throw err;
    }
};


// This function is used to get the autocomplete suggestions for a given input
module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('Query is required');
    }

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}&addressdetails=1&limit=5`;

    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'uber-clone-learning-app/1.0' // Can be anything unique
            }
        });

        return response.data.map((place) => place.display_name).filter(value => value);

    } catch (err) {
        console.error('Error fetching autocomplete suggestions:', err.message);
        throw err;
    }
};



// This function is used to get the captains in a given radius from a point (ltd, lng)
module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

    // radius in km


    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ ltd, lng ], radius / 6371 ]
            }
        }
    });

    return captains;


}