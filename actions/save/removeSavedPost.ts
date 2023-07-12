import createSecureStore from '@neverdull-agency/expo-unlimited-secure-store';

const secureStore = createSecureStore()

const removeSavedPost = async ( key:string )=> {
    console.log(key)
    try {
        const result = await secureStore.removeItem(key)
        return ( result as any ) || []
    } catch(error) {
        console.error(error.message)
        return ( error as any ) || [];
    }
}

export default removeSavedPost