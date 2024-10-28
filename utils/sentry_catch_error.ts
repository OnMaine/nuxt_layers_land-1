import type { SentryErrorOptions } from '@/types';

export const sentryCatchError = async ({
  sentryResolver,
  isMessage,
  error,
  request,
}: SentryErrorOptions) => {
  const sentryInstance = await sentryResolver;

  const { url, status, message } = error;

  if (isMessage) {
    sentryInstance.captureMessage(error, 'error');
  } else {
    sentryInstance.captureException(request, (scope: any) => {
      scope.setTransactionName(`Response Error ${status}. ${message}`);
      scope.setContext('errorData', {
        url,
        status,
        message,
      });
      
      if(status) {
        scope.setTag('statusCode', status);
      }

      return scope;
    });
  }
};