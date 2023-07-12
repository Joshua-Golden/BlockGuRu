import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { Techniques } from "../../types";


const getAllCategories = async (): Promise<Techniques[]> => {
    const { data:Techniques, error } = await supabase
        .from('Technique')
        .select('*')
    
    if (error) {
        console.log(error.message);
    }    

    return ( Techniques as any ) || [];
};

export default getAllCategories;