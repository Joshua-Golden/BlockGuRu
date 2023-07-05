import { supabase } from "../../lib/supabase";
import { Categories } from "../../types";
import getAllCategories from "./getAllCategories";


const getCategoryByID = async (id:number): Promise<Categories[]> => {
     if (!id) {
        const allVideos = await getAllCategories();
        return allVideos;
    }
    const { data:PostContent, error } = await supabase
        .from('Category')
        .select()
        .eq('id', `${id}`)
        .single()
    
    if (error) {
        console.log(error.message);
    }

    return ( PostContent as any ) || [];
};

export default getCategoryByID;