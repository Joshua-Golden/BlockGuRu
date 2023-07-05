import * as SecureStore from 'expo-secure-store';
import { SavedVideos } from "../../types";
import getSavedVideos from './getSavedVideos';

const deleteSavedVideoByTitle = async (key:string, title:string): Promise<SavedVideos[]> => {
    if( key ) {        
        try {
            var currentVideos = await getSavedVideos(key)
            
            currentVideos.map((current, index) => {
                if( current.title === title) {
                   currentVideos = currentVideos.splice(index, index)
                   console.log(currentVideos.splice(index, index))
                }
            })
            if (currentVideos.length <= 0 ) {
                console.log('deleted video ' + title)
                console.log('storage empty')

            } else {
                await SecureStore.setItemAsync(key, JSON.stringify(currentVideos))
                console.log('deleted video ' + title)
            }

        } catch(error) {
            console.error(error.message)
        }
    } else {
        console.error("Key value empty.")
    }
    return [];
}

export default deleteSavedVideoByTitle