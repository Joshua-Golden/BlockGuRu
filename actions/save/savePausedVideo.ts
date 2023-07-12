import createSecureStore from '@neverdull-agency/expo-unlimited-secure-store';

const secureStore = createSecureStore()

const savePausedVideo = async ( key:string, object:object )=> {
    try {
        secureStore.setItem(key, JSON.stringify(object))
        
    } catch(error) {
        console.error(error.message)
        return ( error as any ) || [];
    }
}

export default savePausedVideo