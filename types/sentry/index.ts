export interface SentryErrorOptions {
  sentryResolver: Promise<any>;
  isMessage: boolean;
  error: {
    url: string;
    status?: number;
    message?: string;
  };
  request?: RequestInfo;
}

export interface SentryEventTags {
  process: 'client' | 'server';
}

export interface SentryExceptions {
  [key: string]: string | string[];
}