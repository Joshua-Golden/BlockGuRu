import {useState, useEffect} from 'react'
import { Alert } from 'react-native';

const useFetch = ( query, params ) => {
    const [ data, setData ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

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
          Alert.alert(
            'Something went wrong',
            error.message,
            [{
              text: 'Try again',
              onPress: () => refetch(),
            }]
          )
        } finally {
          setIsLoading(false);
        }
      }
        
    };
    
    useEffect(() => {
      fetchData();
    }, []);
    
    const refetch = () => {
      fetchData();
    };
    
    return { data, isLoading, error, refetch };
}

export default useFetch;