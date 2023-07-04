import { useState } from 'react'
import * as FileSystem from 'expo-file-system';

const useDownload = ( query, params ) => {
    const [ download, setDownload ] = useState('');
    const [ isDownloading, setIsDownloading ] = useState(false);
    const [ downloadError, setDownloadError ] = useState('');

    const videoDir = FileSystem.cacheDirectory + '/videos';
    const videoFileURI = (videoID: string) => videoDir + `blockguru${videoID}_.mp4`;
    const videoURL = query

    const ensureDirExists = async ( videoDir ) => {
        const dirInfo = await FileSystem.getInfoAsync(videoDir);
        if (!dirInfo.exists) {
          console.log("Video directory doesn't exist, creating...");
          await FileSystem.makeDirectoryAsync(videoDir, { intermediates: true });
        }
    }

      
    const downloadVideo = async ( videoURL, params ) => {
        try{
            await ensureDirExists( videoDir );
            const result = await FileSystem.downloadAsync(videoURL, videoFileURI(params.id));
    
            setIsDownloading(true)
            setDownload(result.uri)    
        } catch(error) {
            setDownloadError(error)
            console.error(error.message)
        } finally {
            setIsDownloading(false)
        }
    }

    downloadVideo( videoURL, params)
    return { download, isDownloading, downloadError }
}

export default useDownload;