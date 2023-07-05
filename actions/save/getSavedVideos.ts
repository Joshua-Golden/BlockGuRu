import * as SecureStore from 'expo-secure-store';
import { SavedVideos } from "../../types";

const getSavedVideos = async (key:string): Promise<SavedVideos[]> => {
    try {
        const result = await SecureStore.getItemAsync(key)
        if ( result === '[null]' ) {
            console.log('returned nothing')
            return [];
        } else {
            return ( JSON.parse(result) as any ) || [];
        }
        
    } catch(error) {
        console.error(error.message)
        return ( error as any ) || [];
    }    
}

export default getSavedVideos