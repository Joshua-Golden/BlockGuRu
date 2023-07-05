import * as FileSystem from 'expo-file-system';
import { useRef } from 'react';

// create private id number for video download
const video_id = Math.random().toString().slice(2,10);
const videoDir = FileSystem.documentDirectory + 'videos/';

const ensureDirExists = async ( videoDir ) => {
    const dirInfo = await FileSystem.getInfoAsync(videoDir);
    if (!dirInfo.exists) {
    console.log("Video directory doesn't exist, creating...");
    await FileSystem.makeDirectoryAsync(videoDir, { intermediates: true });
    }
};
const callback = downloadProgress => {
    const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
};
const downloadResumable = useRef(FileSystem.createDownloadResumable(
    videoURL,
    videoDir + `${video_id}.mp4`,
    {},
    callback
));

const useDownload = (post) => {
    
}

export { useDownload, ensureDirExists, downloadResumable }