import { supabase } from "../lib/supabase";
import { Video } from "../types";
import getVideos from "./getVideos";


const getVideosByCategory = async (category:string): Promise<Video[]> => {
    if (!category) {
        const allVideos = await getVideos();
        return allVideos;
    }

    const { data:Videos, error } = await supabase
        .from('Videos')
        .select('*')
        .ilike('category', `%${category}%`)
    
    if (error) {
        console.log(error.message);
    }

    return ( Videos as any ) || [];
};

export default getVideosByCategory;