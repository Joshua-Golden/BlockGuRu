import createSecureStore from '@neverdull-agency/expo-unlimited-secure-store';
import { SavedVideos } from "../../types";
import getSavedVideos from './getSavedVideos';
import filter from 'lodash.filter'

const secureStore = createSecureStore();

const removeSavedVideoByID = async (key:string, id:number): Promise<SavedVideos[]> => {

    async function removeQueryFromList(id, currentVideos) {
        const contains = (query, { id }) => {
            if (JSON.stringify(id).match(query)) {
                console.log('removing query from list')
                return false;
            }
            return true;
        }
        
        if (currentVideos.length > 0 && currentVideos !== null && currentVideos[0] !== null ) {
            const filteredData = await filter(currentVideos, (current) => {
                return contains(id, current.post)
            });
            push(filteredData)
        } else {
            console.log('Cannot remove item. There may be nothing removable in saved list.')
        }
    }
    async function push(filteredData) {
        try  {
            console.log('saving post without queried item')
            const savedVideo = secureStore.setItem(key, JSON.stringify(filteredData))
            console.log('Saved post without queried item to secure store')
            return ( savedVideo as any ) || [];

        } catch (error) {
            console.error(error.message)
        } 
    }

    if( key ) {  
        try {
            var currentVideos = await getSavedVideos(key)
            removeQueryFromList(id, currentVideos)
            const result = await getSavedVideos(key)
            console.log(result)
        } catch(error) {
            console.error(error.message)
        }
    } else {
        console.error("Key value empty.")
    }
    return [];
}

export default removeSavedVideoByID