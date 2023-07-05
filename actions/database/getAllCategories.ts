import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { Categories } from "../../types";


const getAllCategories = async (): Promise<Categories[]> => {
    const { data:Categories, error } = await supabase
        .from('Category')
        .select('*')
    
    if (error) {
        console.log(error.message);
    }    

    return ( Categories as any ) || [];
};

export default getAllCategories;