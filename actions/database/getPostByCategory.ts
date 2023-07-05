import { supabase } from "../../lib/supabase";
import { Categories } from "../../types";

const getPostByCategory = async (id:number): Promise<Categories[]> => {
    const { data:Post, error } = await supabase
        .from('Category')
        .select()
        .eq('id', `${id}`)
    
    if (error) {
        console.log(error.message);
    }
    return ( Post as any ) || [];
};

export default getPostByCategory;