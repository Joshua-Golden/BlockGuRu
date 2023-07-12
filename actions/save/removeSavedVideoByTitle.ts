import createSecureStore from '@neverdull-agency/expo-unlimited-secure-store';
import { SavedVideos } from "../../types";
import getSavedVideos from './getSavedVideos';

const secureStore = createSecureStore();

const removeSavedVideoByTitle = async (key:string, title:string): Promise<SavedVideos[]> => {
    if( key ) {        
        try {
            var currentVideos = await getSavedVideos(key)
            
            var isFiltered = false
            var isMatch = false
            if ( currentVideos.length > 0 ) {
                currentVideos.map((current, index) => {
                    console.log('filtering', current.title,'and', title)
                    console.log('at index', index)
                    if( current.title === title) {
                        console.log('found matching title')
                        if ( index === 0 ) {
                            console.log('shifting index', index)
                            currentVideos.shift()
                            console.log(currentVideos)
                        } else if (index > 0) {
                            currentVideos.splice(0, index)
                            console.log('title removed')
                            console.log(currentVideos)
                        }
                        isMatch = true
                    } else {
                        isMatch = false
                    }
                    isFiltered = true
                })
            }
            if (isFiltered && isMatch) {
                secureStore.setItem(key, JSON.stringify(currentVideos))
                console.log('deleted video ' + title)
            } else if (!isMatch) {
                console.log('No title match found to delete.')
                console.log('Aborting delete.')
            }
        } catch(error) {
            console.error(error.message)
        }
    } else {
        console.error("Key value empty.")
    }
    return [];
}

export default removeSavedVideoByTitle