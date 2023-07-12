import createSecureStore from '@neverdull-agency/expo-unlimited-secure-store';
import { SavedVideos } from "../../types";
import getSavedVideos from './getSavedVideos';
import filter from 'lodash.filter'

const secureStore = createSecureStore()

const saveVideos = async (key:string, video_id:number, post:object, postCategories:object, postContent:object, uri:string, fileSize:number): Promise<SavedVideos[]> => {
    var currentVideos = await getSavedVideos('posts')
    try {
        const contains = (query, { title }) => {
            if (title.toLowerCase().match(query)) {
                return false;
            }
            return true;
        }
        
        const formattedQuery = post.title.toLowerCase();
        if (currentVideos.length > 0 && currentVideos !== null && currentVideos[0] !== null ) {
            const filteredData = await filter(currentVideos, (current) => {
                return contains(formattedQuery, current.post)
            });
            push(filteredData)
        } else {
            save(video_id, post, postCategories, postContent, uri, fileSize)
        }
        
    } catch(error) {
        console.error(error.message)
        return ( error as any ) || [];
    }

    async function push(filteredData) {
        const data = { 
            "video_id": video_id, 
            "post": post, 
            "postCategories": postCategories, 
            "postContent": postContent, 
            "uri": uri, 
            "fileSize": fileSize
        }
        filteredData.push(data)
        console.log(filteredData)

        try  {
            console.log('saving post')
            const savedVideo = secureStore.setItem(key, JSON.stringify(filteredData))
            console.log('Saved post to secure store')
            return ( savedVideo as any ) || [];

        } catch (error) {
            console.error(error.message)
        } 
    }
    async function save(video_id, post, postCategories, postContent, uri, fileSize) {
        const data = new Array
        data.push({ 
            "video_id": video_id,
            "post": post,
            "postCategories": postCategories,
            "postContent": postContent,
            "uri": uri,
            'fileSize': fileSize 
        })
        console.log(data)
        try  {
            console.log('saving post')
            const savedVideo = secureStore.setItem(key, JSON.stringify(data))
            console.log('Saved post to secure store')
            return ( savedVideo as any ) || [];

        } catch (error) {
            console.error(error.message)
        } 
    }
}

export default saveVideos