import "dotenv/config";
import { youtube_v3 } from 'googleapis';
export declare const youtube: youtube_v3.Youtube;
export declare const extractVideoId: (url: string) => string | null;
export declare const testYoutubeConnection: () => Promise<boolean>;
//# sourceMappingURL=youtube.d.ts.map