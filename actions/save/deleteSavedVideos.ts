import * as SecureStore from 'expo-secure-store';
import { SavedVideos } from "../../types";
import getSavedVideos from './getSavedVideos';

const deleteSavedVideos = async (key:string): Promise<SavedVideos[]> => {
    if( key ) {        
        try {
            await SecureStore.setItemAsync(key, JSON.stringify(''))
        } catch(error) {
            console.error(error.message)
        }
    } else {
        console.error("Key value empty.")
    }
    return [];
}

export default deleteSavedVideos