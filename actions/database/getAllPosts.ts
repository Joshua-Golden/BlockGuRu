import { supabase } from "../../lib/supabase";
import { Post } from "../../types";

const getAllPosts = async (): Promise<Post[]> => {
  const {data:Posts, error } = await supabase
        .from('Post')
        .select('*')

    if (error) {
        console.log(error.message)
    }

    return (Posts as any) || [];
}

export default getAllPosts;