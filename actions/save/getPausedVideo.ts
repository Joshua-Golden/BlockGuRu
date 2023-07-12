import createSecureStore from '@neverdull-agency/expo-unlimited-secure-store';

const secureStore = createSecureStore()

const getPausedVideo = async ( key:string ) => {
    try {
        const result = await secureStore.getItem(key)
        if ( result !== null && result !== undefined ) {
            return ( result as any ) || []
        } else {
            return []
        }
    } catch(error) {
        console.error(error.message)
        return ( error as any ) || [];
    }
}

export default getPausedVideo