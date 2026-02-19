import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import ErrorPage from './Error.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, SetAvailablePlaces] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetchingData(true);
      try {
        const response = await fetch('http://localhost:3000/placesss');
        const resData = await response.json();

        if (!response.ok) {
          throw new Error('Could not fetch data! Try again later!');
        }

        SetAvailablePlaces(resData.places);
        
      } catch (error) {
        setError({message: error.message || 'Something went wrong, please try again later.'})
      }

      setIsFetchingData(false);
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
