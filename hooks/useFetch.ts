import React, {useState, useEffect, ReactElement} from 'react'

const useFetch = ( query, params ) => {
    const [ data, setData ] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);

        if ( Array.isArray(params) ) {
          const response = new Array
          params.map(async param => {
            response.push(await query(param))
            
            try {
              setData(response);
              setIsLoading(false)
            } catch (error) {
              setError(error);
              console.log(error)
            } finally {
              setIsLoading(false);
            }
          })
        } else {
          const response = await query(params)

          try {
            setData(response);
            setIsLoading(false)
          } catch (error) {
            setError(error);
            console.log(error)
          } finally {
            setIsLoading(false);
          }
        }
        
    };
    
    useEffect(() => {
      fetchData();
    }, []);
    
    const refetch = () => {
      setIsLoading(true);
      fetchData();
    };
    
    return { data, isLoading, error, refetch };
}

export default useFetch;