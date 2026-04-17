
export interface ValidResults {
    is_valid: boolean;
    reason: string | null
    cleaned_text: string
}

//============= Cleaning links emails whitespaces ===============
export const cleanText = (text: string): string => {
    if (!text) {
        return " "
    }

    //removing links
    text = text.replace(/http\S+|www\.\S+/g, "");

    //removing emails
    text = text.replace(/\S+@\S+/, "");

    //removing whitespaces
    text = text.split(/\S+/).join('')

    return text;

}

export const validateComment = (text: string): ValidResults => {
    if (!text) {
        return { is_valid: false, reason: "too_short", cleaned_text: "" }
    }

    //Contains link
    if (/http\S+|www\.\S+/.test(text)) {
        return { is_valid: false, reason: "contains_link", cleaned_text: cleanText(text) }
    }

    const cleaned = cleanText(text)

    //min lenght
    if (text.length < 3) {
        return { is_valid: false, reason: "too_short", cleaned_text: cleaned }
    }

    //max lenght
    if (text.length > 5000) {
        return { is_valid: false, reason: "too_long", cleaned_text: cleaned }
    }

    const alphaCount = [...cleaned].filter((c) => /[a-zA-Z\s]/.test(c)).length;

    //alphabet ration
    const alphaRatio = cleaned.length > 0 ? alphaCount / cleaned.length : 0;

    if (alphaRatio < 0.3) {
        return { is_valid: false, reason: "too_many_special_chars", cleaned_text: cleaned }
    }

    //too many caps
    if (cleaned.length) {
        const uuperCount = [...cleaned].filter((c) => /[A-Z]/.test(c)).length

        const upperRatio = uuperCount / cleaned.length

        if (upperRatio > 0.7) {
            return { is_valid: false, reason: "excessive_caps", cleaned_text: cleaned }
        }
    }

    // Repeated characters
    if (/(.)\1{5,}/.test(cleaned)) {
        return {
            is_valid: false,
            reason: "repeated_characters",
            cleaned_text: cleaned,
        };
    }



    return {
        is_valid: true,
        reason: null,
        cleaned_text: cleaned,
    };
}

export const procesForSentiment = (text :string): string=>{
 const maxLength = 500
  return text.length > maxLength ? text.slice(0, maxLength) : text;
}