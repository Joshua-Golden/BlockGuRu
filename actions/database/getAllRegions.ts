import { supabase } from "../../lib/supabase";
import { Regions } from "../../types";

const getAllRegions = async (): Promise<Regions[]> => {
  const {data:Regions, error } = await supabase
        .from('Region')
        .select('*')

    if (error) {
        console.log(error.message)
    }

    return (Regions as any) || [];
}

export default getAllRegions;