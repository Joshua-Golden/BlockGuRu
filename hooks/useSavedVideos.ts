import React, {useState, useEffect, ReactElement} from 'react'
import * as SecureStore from 'expo-secure-store';
import getSavedVideos from '../actions/save/getSavedVideos';

const useSavedVideos = (key) => {    
    const [ data, setData ] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchVideos = async () => {
        setIsLoading(true)
        const result = await getSavedVideos('posts')

        setData(result)
        try {

        } catch(error) {
            console.error(error.message)
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }
    fetchVideos();
    const refetch = () => {
        setIsLoading(true);
        fetchVideos();
    };

    return { data, isLoading, error, refetch };
}
export default useSavedVideos