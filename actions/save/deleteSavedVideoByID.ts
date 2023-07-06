import * as SecureStore from 'expo-secure-store';
import { SavedVideos } from "../../types";
import getSavedVideos from './getSavedVideos';

const deleteSavedVideoByID = async (key:string, id:number): Promise<SavedVideos[]> => {
    if( key ) {        
        try {
            var currentVideos = await getSavedVideos(key)
            
            var isFiltered = false
            var isMatch = false
            if ( currentVideos.length > 0 ) {
                currentVideos.map((current, index) => {
                    console.log('filtering', current.id,'and', id)
                    console.log('at index', index)
                    if( current.id === String(id) ) {
                        console.log('match found')
                        if (index === 0) {
                            console.log('shifting index', index)
                            currentVideos.splice(index, 1)
                        } else if (index > 0) {
                            console.log('splicing index', index)
                            currentVideos.splice(0, 1)
                        }                        
                        isMatch = true
                    } else {
                        isMatch = false
                    }
                    isFiltered = true
                })
            }
            if (isFiltered && isMatch) {
                await SecureStore.setItemAsync(key, JSON.stringify(currentVideos))
                console.log('deleted video ' + id)
            } else if (!isMatch) {
                console.log('No id match found to delete.')
                console.log('Aborting delete.')
            }
        } catch(error) {
            console.error(error.message)
        }
    } else {
        console.error("Key value empty.")
    }

    var currentVideos = await getSavedVideos(key)
    console.log('currentVideos', currentVideos)
    return [];
}

export default deleteSavedVideoByID