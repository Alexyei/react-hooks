import {useLocalStorage} from "./useStorage";
import translations, {LanguageData} from "./translations/index"
type languagesNames = keyof typeof translations;

export function useTranslation() {
    //допустим мы хотим создать интернациональный файл
    //мы создаём универсальные ключи для фраз используемых на сайте: hi - приветсвие, by - прощание, nested.value - ещё какая-то фраза
    //затем создаём файлы с переводом ключевых фраз, для каждого языка: en.json, sp.json,
    //если мы не знаем перевода для какой-то фразы мы можем оставить её
    //затем выбираем основной язык, допустим пользователь из Испании => основной язык испанский
    //мы ищем требуемую фразу sp.json, если её там нет, ищем эту же фразу в файле дополнительного языка (обычно дополнительный язык английский), если её нет и там то просто возврщаем ключ фразы (hi,by, nested.value)

    //ищем перевод в основном языке допустим английский, затем в дополнительном  (например испанский), иначе возвращаем просто само слово key

    //основной язык
    const [language, setLanguage] = useLocalStorage<languagesNames>("language", "en")
    //запасной язык
    const [fallbackLanguage, setFallbackLanguage] = useLocalStorage<languagesNames>(
        "fallbackLanguage",
        "en"
    )

    const translate = (key:string) => {
        const keys = key.split(".")

        return (
            getNestedTranslation(language!, keys) ??
            getNestedTranslation(fallbackLanguage!, keys) ??
            key
        )
    }

    return {
        language,
        setLanguage,
        fallbackLanguage,
        setFallbackLanguage,
        t: translate,
    }
}

function getNestedTranslation(language:languagesNames, keys:string[]) {
    return keys.reduce((obj:LanguageData|LanguageData[string]|undefined, key) => {
        if (typeof obj === "string" || obj === undefined) return obj;
        return obj[key]
    }, translations[language]) as string | undefined
}

const UseTranslation = () => {
    const { language, setLanguage, setFallbackLanguage, t } = useTranslation()

    return (
        <>
            <div>{language}</div>
            <div>{t("hi")}</div>
            <div>{t("bye")}</div>
            <div>{t("nested.value")}</div>
            <button onClick={() => setLanguage("sp")}>Change To Spanish</button>
            <button onClick={() => setLanguage("en")}>Change To English</button>
            <button onClick={() => setFallbackLanguage("sp")}>Change FB Lang</button>
        </>
    )
}

export default UseTranslation;