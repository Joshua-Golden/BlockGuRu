import { supabase } from "../../lib/supabase";
import { Post } from "../../types";
import getAllPosts from "./getAllPosts";


const getPostsByID = async (id:number): Promise<Post[]> => {
    if (!id) {
        const allPosts = await getAllPosts();
        return allPosts;
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

export default getPostsByID;