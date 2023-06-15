import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Video } from "../types";
import getVideos from "./getVideos";


const getAllCategories = async (): Promise<Video[]> => {
    const { data:Categories, error } = await supabase
        .from('Categories')
        .select('*')
    
    if (error) {
        console.log(error.message);
    }    

    return ( Categories as any ) || [];
};

export default getAllCategories;