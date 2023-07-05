import * as SecureStore from 'expo-secure-store';
import { SavedVideos } from "../../types";
import getSavedVideos from './getSavedVideos';
import filter from 'lodash.filter'


const saveVideos = async (key:string, id:number, title:string, uri:string): Promise<SavedVideos[]> => {
    var currentVideos = await getSavedVideos('posts')    
    try {
        const contains = (query, { title }) => {
            if (title.toLowerCase().match(query)) {
                return false;
            }
            return true;
        }
        const formattedQuery = title.toLowerCase();
        if (currentVideos.length > 0 && currentVideos !== null && currentVideos[0] !== null ) {
            const filteredData = await filter(currentVideos, (current) => {
                return contains(formattedQuery, current)
            });
            push(filteredData)
        } else {
            save(id, title, uri)
        }
        
    } catch(error) {
        console.error(error.message)
        return ( error as any ) || [];
    }

    async function push(filteredData) {
        const data = { "id": id, "title": title, "uri": uri }
        filteredData.push(data)
        console.log(filteredData)

        try  {
            console.log('saving post')
            const savedVideo = await SecureStore.setItemAsync(key, JSON.stringify(filteredData))
            console.log('Saved post to secure store')
            return ( savedVideo as any ) || [];

        } catch (error) {
            console.error(error.message)
        } 
    }
    async function save(id, title, uri) {
        const data = new Array
        data.push({ "id": id, "title": title, "uri": uri })
        console.log(data)
        try  {
            console.log('saving post')
            const savedVideo = await SecureStore.setItemAsync(key, JSON.stringify(data))
            console.log('Saved post to secure store')
            return ( savedVideo as any ) || [];

        } catch (error) {
            console.error(error.message)
        } 
    }
}

export default saveVideos