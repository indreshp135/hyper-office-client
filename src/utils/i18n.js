import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import Cache from 'i18next-localstorage-cache';
import { i18nkey } from '../config';
import { languages } from './lng';

const apiKey = i18nkey;
const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`;

i18next
  .use(HttpBackend)
  .use(initReactI18next)
  .use(Cache)
  .init({
    fallbackLng: 'en',

    ns: ['default'],
    defaultNS: 'default',

    supportedLngs: languages.map((l) => l.code),

    backend: {
      loadPath
    }
  });
