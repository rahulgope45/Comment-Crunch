import "dotenv/config";
import { google } from 'googleapis';




export const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY!
})

//Extract Youtube video Id

export const extractVideoId = (url: string): string | null => {



    try {
        const parsed = new URL(url);

        //This one for //youtube/id
        if (parsed.hostname.includes("youtube.be")) {
            return parsed.pathname.slice(1);
        }

        // youtube.com/watch?v=<id>
        if (parsed.searchParams.get("v")) {
            return parsed.searchParams.get("v");
        }

        // /embed/<id>
        const paths = parsed.pathname.split("/");
        const embedIndex = paths.indexOf("embed");
        if (embedIndex !== -1 && paths[embedIndex + 1]) {
            return paths[embedIndex + 1] ?? null;
        }
        } catch (error) {
          console.log(error)
        }

        //Ditched this one upper one is better
        // const patterns = [
        //     "(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})",
        //     "(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})",
        //     "(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})",
        //     "(?:https?:\/\/)?(?:m\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})",
        // ]

        // for (let pattern of patterns) {
        //     const match = url.match(pattern)
        //     if (match) {
        //         return match[1] ?? null;
        //     }
        // }

        if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
            return url
        }
        return null;
    }

//Testing Youtube Service 

export const testYoutubeConnection = async():Promise<boolean>=>{
  /*
  testYoutubeConnection is for testing Youtube connection confirming 
  env with a simple request to the api
  */

  try {
    if(!process.env.YOUTUBE_API_KEY){
        return false
    }
   
    const request = await youtube.videos.list({
        part:['snippet'],
        id:['dQw4w9WgXcQ'],
        maxResults:1
    });

    if( request.status === 200 ){
        console.log("Youtube API is connected")
        return true
    }

  return false
    
  } catch (error) {
    console.log(error,"Api connection failed")
    return false
  }
}
