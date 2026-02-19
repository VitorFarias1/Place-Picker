import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import ErrorPage from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, SetAvailablePlaces] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetchingData(true);
      try {
        const response = await fetch('http://localhost:3000/places');
        const resData = await response.json();

        if (!response.ok) {
          throw new Error('Could not fetch data! Try again later!');
        }

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            resData.places,
            position.coords.latitude,
            position.coords.longitude
          )

          SetAvailablePlaces(sortedPlaces);
          setIsFetchingData(false);
        })

      } catch (error) {
        setError({message: error.message || 'Something went wrong, please try again later.'})
        setIsFetchingData(false);
      }
    }

    fetchPlaces();
  }, [])

  if (error) {
    return <ErrorPage title="An error ocurred" message={error.message}/>
  }
  
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetchingData}
      loadingText="Fetching some places..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
