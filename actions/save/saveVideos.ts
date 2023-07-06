import * as SecureStore from 'expo-secure-store';
import { SavedVideos } from "../../types";
import getSavedVideos from './getSavedVideos';
import filter from 'lodash.filter'


const saveVideos = async (key:string, id:number, title:string, uri:string, video_path:string, image_path:string, fileSize:number): Promise<SavedVideos[]> => {
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
            save(id, title, uri, video_path, image_path, fileSize)
        }
        
    } catch(error) {
        console.error(error.message)
        return ( error as any ) || [];
    }

    async function push(filteredData) {
        const data = { "id": id, "title": title, "uri": uri, "video_path": video_path, 'image_path': image_path, "fileSize": fileSize}
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
    async function save(id, title, uri, video_path, image_path, fileSize) {
        const data = new Array
        data.push({ "id": id, "title": title, "uri": uri, "video_path": video_path, 'image_path':image_path, 'fileSize': fileSize })
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