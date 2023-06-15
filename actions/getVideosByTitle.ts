import { supabase } from "../lib/supabase";
import { Video } from "../types";
import getVideos from "./getVideos";


const getVideosByTitle = async (title:string): Promise<Video[]> => {
    if (!title) {
        const allVideos = await getVideos();
        return allVideos;
    }

    const { data:Videos, error } = await supabase
        .from('Videos')
        .select('*')
        .ilike('title', `%${title}%`)
    
    if (error) {
        console.log(error.message);
    }

    return ( Videos as any ) || [];
};

export default getVideosByTitle;