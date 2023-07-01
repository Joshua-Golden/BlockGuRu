import { supabase } from "../lib/supabase";
import { Post } from "../types";

const getAllContent = async (): Promise<Post[]> => {
    const { data:PostCategory, error } = await supabase
        .from('PostCategories')
        .select('id, post_id, category_id, Post(*), Category(*)')
    
    if (error) {
        console.log(error.message);
    }
    return ( PostCategory as any ) || [];
};

export default getAllContent;