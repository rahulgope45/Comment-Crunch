import "dotenv/config";
import {fetchYoutubeMetaData} from '../services/youtube.service.js';
import {extractVideoId, youtube} from '../lib/youtube.js';

export const testYoutubeflow = async ()=>{
    try {
        const testUrl = 'https://www.youtube.com/watch?v=XYGqqbOX6Lk&list=RDXYGqqbOX6Lk&start_radio=1';

        const videoId = extractVideoId(testUrl);

        if(!videoId){
            console.log("URL is not correct")
            return;
        }

        //fetching data
        const metadata = await fetchYoutubeMetaData(videoId);

        if(!metadata){
            console.log("Failed to fetch metadata")
            return;
        }

        console.log('Video Data -:');
        console.log(JSON.stringify(metadata,null,2));
    } catch (error) {
        console.log("Test Failed",error);
    }
}
testYoutubeflow()