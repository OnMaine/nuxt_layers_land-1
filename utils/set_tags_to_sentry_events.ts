import type { ErrorEvent } from '@sentry/types';
import type { SentryEventTags } from '@/types';

export const setSentryEventTags = (
  event: ErrorEvent, 
  tags: Partial<SentryEventTags>,
): void => {
  event.tags = {
    ...event.tags || {},
    ...tags,
  };
};