import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';



import viewTranslationZh_TW from '../locales/zh-TW/view.json'
import modelTranslationZh_TW from '../locales/zh-TW/model.json'
import errorTranslationZh_TW from '../locales/zh-TW/error.json'

const resources = {
    // 'de': {
    //   translation: de,
    // },
    // 'en': {
    //   translation: en,
    // },
    // 'fn': {
    //   translation: fn,
    // },
    'zh-TW':{

        view:viewTranslationZh_TW,
        model:modelTranslationZh_TW,
        error:errorTranslationZh_TW,
    }
  };

i18n
    // load translation using http -> see /public/locales
    // learn more: https://github.com/i18next/i18next-http-backend
    // .use(Backend)                                      //vite 處理靜態檔案方式不能用backend
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        resources,                                           //vite 需要直接將靜態資源引入
        lng:"zh-TW",
        fallbackLng: "zh-TW",
        defaultNS: "model",
        debug: true,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    });

export default i18n;