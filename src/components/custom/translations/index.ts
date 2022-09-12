
import enData  from './en.json'
import spData from './sp.json'
export type LanguageData = {[x:string]:string|{[x:string]:string}}
const en = enData as LanguageData;
const sp = spData as LanguageData;

export default {en,sp}


// export * as sp from "./sp.json"