import { supabase } from "../lib/supabase";
import { PostCategory } from "../types";

const getPostCategoryByVidID = async (post_id:number): Promise<PostCategory[]>=> {
    const { data:PostCategories, error } = await supabase
        .from('PostCategories')
        .select(`id, category_id, post_id, Category(*) `)
        .eq('post_id', post_id)
    

    if (error) {
        console.log(error.message);
    }
    
    return ( PostCategories as any ) || [];
};

export default getPostCategoryByVidID;