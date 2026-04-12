import { extractVideoId } from "../lib/youtube.js";

describe("extractVideoId", () => {

    test("should extract ID from standard youtube URL", () => {
        const url = "https://www.youtube.com/watch?v=abc123XYZ78";
        expect(extractVideoId(url)).toBe("abc123XYZ78");
    });

    test("should extract ID from shortened youtu.be URL", () => { 
        const url = "https://youtu.be/abc123XYZ78";
        expect(extractVideoId(url)).toBe("abc123XYZ78");
    });

    test("should extract ID from embed URL", () => {
        const url = "https://www.youtube.com/embed/abc123XYZ78";
        expect(extractVideoId(url)).toBe("abc123XYZ78");
    });

    test("should extract ID with extra query params", () => {
        const url = "https://www.youtube.com/watch?v=abc123XYZ78&t=30s";
        expect(extractVideoId(url)).toBe("abc123XYZ78");
    });

    test("should extract ID from mobile URL", () => {
        const url = "https://m.youtube.com/watch?v=abc123XYZ78";
        expect(extractVideoId(url)).toBe("abc123XYZ78");
    });

    test("should return ID if input is already a valid ID", () => {
        const id = "abc123XYZ78";
        expect(extractVideoId(id)).toBe(id);
    });

    test("should return null for invalid URL", () => {
        const url = "https://example.com/video";
        expect(extractVideoId(url)).toBeNull();
    });

    test("should return null for random string", () => {
        expect(extractVideoId("randomstring")).toBeNull();
    });

    test("should handle empty string", () => {
        expect(extractVideoId("")).toBeNull();
    });

});