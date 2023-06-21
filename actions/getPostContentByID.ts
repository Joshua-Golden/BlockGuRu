import { supabase } from "../lib/supabase";
import { Post } from "../types";
import getVideos from "./getVideos";


const getPostContentByID = async (postcontentid:number): Promise<Post[]> => {
    const { data:PostContent, error } = await supabase
        .from('PostContent')
        .select()
        .eq('id', `${postcontentid}`)
        .single()
    
    if (error) {
        console.log(error.message);
    }

    return ( PostContent as any ) || [];
};

export default getPostContentByID;