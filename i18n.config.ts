import { defineI18nConfig } from '#i18n';
import de from '@/locales/de.json';
import en from '@/locales/en.json';
import es from '@/locales/es.json';
import fr from '@/locales/fr.json';
import pl from '@/locales/pl.json';
import pt from '@/locales/pt.json';
import sv from '@/locales/sv.json';
import tr from '@/locales/tr.json';

export default defineI18nConfig(() => {
  return {
    messages: {
      en,
      es,
      de,
      fr,
      pl,
      pt,
      sv,
      tr,
    },

    fallbackLocale: 'en',
  };
});
