import { SavedVideos } from "../../types";
import createSecureStore from '@neverdull-agency/expo-unlimited-secure-store';

const secureStore = createSecureStore();

const removeSavedVideos = async (key:string): Promise<SavedVideos[]> => {
    if( key ) {        
        try {
            secureStore.removeItem(key)
        } catch(error) {
            console.error(error.message)
        }
    } else {
        console.error("Key value empty.")
    }
    return [];
}

export default removeSavedVideos