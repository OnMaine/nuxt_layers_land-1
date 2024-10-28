import type {
  ErrorEvent,
  EventHint,
} from '@sentry/types';
import {
  SENTRY_EXCEPTIONS_MESSAGES,
  SENTRY_EXCEPTIONS_CODES,
} from '@/constants';
import de from '@/locales/de.json';
import en from '@/locales/en.json';
import es from '@/locales/es.json';
import fr from '@/locales/fr.json';
import pl from '@/locales/pl.json';
import pt from '@/locales/pt.json';
import sv from '@/locales/sv.json';
import tr from '@/locales/tr.json';
import type { SentryEventTags } from '@/types';
import { setSentryEventTags } from '@/utils/set_tags_to_sentry_events';

const locales: Record<string, any> = { de, en, es, fr, pl, pt, sv, tr };

const getNestedTranslation = (keys: string[], localeData: any): string | null => {
  return keys.reduce((translation, key) => {
    return translation && translation[key]
      ? translation[key]
      : null;
  }, localeData);
};

const getAllExceptionsMessages = (): string[] => {
  const { localized, not_localized } = SENTRY_EXCEPTIONS_MESSAGES;

  const localizedMessages = localized.flatMap(messageKey => {
    const keys = messageKey.split('.');
    const translations = Object.values(locales)
      .map(localeData => getNestedTranslation(keys, localeData))
      .filter((translation): translation is string => translation !== null);

    return translations.length > 0
      ? translations
      : [];
  });

  return [...not_localized, ...localizedMessages];
};

const shouldIgnoreEvent = (statusCode?: number, statusMessage?: string): boolean => {
  if (statusCode && SENTRY_EXCEPTIONS_CODES.includes(statusCode)) {
    return true;
  }

  if (statusMessage) {
    const allExceptionsMessages = getAllExceptionsMessages();
    return allExceptionsMessages.some(exception => statusMessage.includes(exception));
  }

  return false;
};

export const useSentryConfigEvent = (
  event: ErrorEvent, 
  hint: EventHint,
  tags: SentryEventTags,
): ErrorEvent | null => {
  const { statusMessage, statusCode } = hint.originalException as {
    statusMessage: string;
    statusCode: number;
  };

  if (tags) {
    setSentryEventTags(event, { ...tags });
  }

  return shouldIgnoreEvent(statusCode, statusMessage)
    ? null
    : event;
};