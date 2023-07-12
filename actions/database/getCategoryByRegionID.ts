import { supabase } from "../../lib/supabase";
import { Regions } from "../../types";
import getAllPosts from "./getAllPosts";

const getCategoryByRegionID = async (region_id:number[]): Promise<Regions[]>=> {
    const { data:Categories, error } = await supabase
    .from('Category')
    .select(`*`)
    .eq('region_id', region_id)

    if (error) {
        console.log(error.message);
    }
    
    return ( Categories as any ) || [];
};

export default getCategoryByRegionID;