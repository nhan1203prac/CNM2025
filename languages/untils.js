const languages = {
  "en-US": "English",
  "vi-VN": "Tiếng Việt",
};

let currentLang = "vi-VN";

export const untils = {
    setLang(lang) {
        currentLang = lang;
    },
    getLang(){
        return currentLang;
    },

    mess(key){
        const keys = key.split('.');
        let result = languages[currentLang];

        for (let k of keys) {
            result = result?.[k];
            if (!result) break;
        }

        return result;
    }
        
}