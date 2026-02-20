import { useEffect, useState } from "react";

export function useFetch(fetchFn, initialValue) {
    const [isFetchingData, setIsFetchingData] = useState(false);
    const [error, setError] = useState(null);
    const [fetchedData, setFetchedData] = useState(initialValue);

    useEffect(() => {
        async function fetchData() {
            setIsFetchingData(true);
            try {
                const data = await fetchFn();
                setFetchedData(data);
            } catch (error) {
                setError({ message: error.message || 'Failed to fetch data.' })
            }
            setIsFetchingData(false);
        }

        fetchData();
    }, [fetchFn])

    return {
        isFetchingData,
        error,
        setFetchedData,
        fetchedData
    }
}