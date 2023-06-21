import { supabase } from "../lib/supabase";
import { Post } from "../types";
import getVideos from "./getVideos";


const getVideosByCategory = async (category:string): Promise<Post[]> => {
    if (!category) {
        const allVideos = await getVideos();
        return allVideos;
    }

    const { data:Videos, error } = await supabase
        .from('Post')
        .select('*')
        .ilike('category', `%${category}%`)
    
    if (error) {
        console.log(error.message);
    }

    return ( Videos as any ) || [];
};

export default getVideosByCategory;