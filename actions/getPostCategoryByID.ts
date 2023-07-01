import { supabase } from "../lib/supabase";
import { PostCategory } from "../types";
import getAllPosts from "./getAllPosts";

const getPostCategoryByID = async (category_id:number[]): Promise<PostCategory[]>=> {
    const { data:PostCategories, error } = await supabase
    .from('PostCategories')
    .select(`category_id, post_id, Post(*), Category(*) `)
    .eq('category_id', category_id)

    if (error) {
        console.log(error.message);
    }
    
    return ( PostCategories as any ) || [];
};

export default getPostCategoryByID;