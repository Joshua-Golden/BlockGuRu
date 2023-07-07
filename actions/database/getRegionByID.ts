import { supabase } from "../../lib/supabase";
import { Regions } from "../../types";
import getAllRegions from "./getAllRegions";


const getRegionByID = async (id:number): Promise<Regions[]> => {
     if (!id) {
        const allRegions = await getAllRegions();
        return allRegions;
    }
    const { data:PostContent, error } = await supabase
        .from('Region')
        .select()
        .eq('id', `${id}`)
        .single()
    
    if (error) {
        console.log(error.message);
    }

    return ( PostContent as any ) || [];
};

export default getRegionByID;