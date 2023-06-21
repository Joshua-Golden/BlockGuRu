import { supabase } from "../lib/supabase";
import { Post } from "../types";
import getVideos from "./getVideos";


const getVideosByID = async (id:number): Promise<Post[]> => {
    if (!id) {
        const allVideos = await getVideos();
        return allVideos;
    }

    const { data:Posts, error } = await supabase
        .from('Post')
        .select('*')
        .eq('id', `${id}`)
    
    if (error) {
        console.log(error.message);
    }

    return ( Posts as any ) || [];
};

export default getVideosByID;