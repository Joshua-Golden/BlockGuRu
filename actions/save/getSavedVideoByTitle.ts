import * as SecureStore from 'expo-secure-store';
import filter from 'lodash.filter'
import { SavedVideos } from "../../types";
import getSavedVideos from './getSavedVideos';

const getSavedVideoByTitle = async (key:string, title:string): Promise<SavedVideos[]> => {
    try {
        const result = await getSavedVideos(key)
        const contains = (title , query) => {           
            if (title.toLowerCase().match(query)) {
                return true;
            }
            return false;
        }
        const formattedQuery = title.toLowerCase();
        const filteredData = await filter(result, (current) => {
            return contains(formattedQuery, current)
        });
        return ( filteredData as any ) || [];
    } catch(error) {
        console.error(error.message)
        return ( error as any ) || [];
    }    
}

export default getSavedVideoByTitle