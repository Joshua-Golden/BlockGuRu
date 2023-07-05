import * as Crypto from 'expo-crypto';
import { Cryptography } from '../../types';

const encodeQuery = (data:string) => {
    if ( data ) {
        const algorithm = Crypto.CryptoDigestAlgorithm.SHA256

        async function Encode() {
            const digest = await Crypto.digestStringAsync(algorithm, data)
            
            return ( digest as any ) || [];
        }
        Encode()
    }
    
    return [];
}

export default encodeQuery;