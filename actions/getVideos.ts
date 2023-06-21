import { supabase } from "../lib/supabase"
import { Post } from "../types";

const getVideos = async (): Promise<Post[]> => {
    const {data:Videos, error } = await supabase
        .from('Post')
        .select('*')

    if (error) {
        console.log(error.message)
    }

    return (Videos as any) || [];
}

export default getVideos;