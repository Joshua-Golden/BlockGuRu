import { supabase } from "../lib/supabase";
import { Post } from "../types";
import getVideos from "./getVideos";


const getPostCategoryByID = async (category_id:number): Promise<Post[]> => {
    console.log(category_id)
    const { data:PostCategory, error } = await supabase
        .from('PostCategories')
        .select(`category_id, video_id, Post(*) `)
        .eq('category_id', `${category_id}`)
    
    if (error) {
        console.log(error.message);
    }
    return ( PostCategory as any ) || [];
};

export default getPostCategoryByID;