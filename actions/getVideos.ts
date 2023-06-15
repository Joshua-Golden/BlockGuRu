import { supabase } from "../lib/supabase"
import { Video } from "../types";

const getVideos = async (): Promise<Video[]> => {
    const {data:Videos, error } = await supabase
    .from('Videos')
    .select('*')

    if (error) {
        console.log(error.message)
    }

    return (Videos as any) || [];
}

export default getVideos;