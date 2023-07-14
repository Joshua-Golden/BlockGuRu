import createSecureStore from '@neverdull-agency/expo-unlimited-secure-store';
import getPausedVideo from './getPausedVideo';

const secureStore = createSecureStore()

const savePausedVideo = async ( key:string, object:object )=> {
    try {
        secureStore.setItem(key, JSON.stringify(object))
        const result = await getPausedVideo(key)
        return ( result as any ) || [];
    } catch(error) {
        console.error(error.message)
        return ( error as any ) || [];
    }
}

export default savePausedVideo