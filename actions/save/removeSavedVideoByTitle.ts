import createSecureStore from '@neverdull-agency/expo-unlimited-secure-store';
import { SavedVideos } from "../../types";
import getSavedVideos from './getSavedVideos';
import filter from 'lodash.filter'

const secureStore = createSecureStore();

const removeSavedVideoByTitle = async (key:string, title:string): Promise<SavedVideos[]> => {
    async function removeQueryFromList(title, currentVideos) {
        const contains = (query, { title }) => {
            if (title.toLowerCase().match(query)) {
                console.log('removing query from list')
                return false;
            }
            return true;
        }
        
        const formattedQuery = title.toLowerCase();
        if (currentVideos.length > 0 && currentVideos !== null && currentVideos[0] !== null ) {
            const filteredData = await filter(currentVideos, (current) => {
                return contains(formattedQuery, current.post)
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
            removeQueryFromList(title, currentVideos)
        } catch(error) {
            console.error(error.message)
        }
    } else {
        console.error("Key value empty.")
    }
    return [];
}

export default removeSavedVideoByTitle