import locales from "./index.js";

const languages = {
  "en-US": "English",
  "vi-VN": "Tiếng Việt",
};

let currentLang = localStorage.getItem("lang") || "vi-VN"

export const untils = {
    setLang(lang) {
        currentLang = lang;
        localStorage.setItem("lang", lang);
    },
    getLang(){
        return currentLang;
    },

    mess(key){
        const keys = key.split('.');
        let result = locales[currentLang];

        for (let k of keys) {
            result = result?.[k];
            if (!result) break;
        }

        return result;
    }
        
}