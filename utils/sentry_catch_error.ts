interface SentryErrorOptions {
  sentryResolver: Promise<any>;
  isMessage: boolean;
  error: string;
  request?: RequestInfo;
}

export const sentryCatchError = async ({
  sentryResolver,
  isMessage,
  error,
  request,
}: SentryErrorOptions) => {
  const sentryInstance = await sentryResolver;

  if (isMessage) {
    sentryInstance.captureMessage(error, 'error');
  } else {
    sentryInstance.captureException(request, (scope: any) => {
      scope.setTransactionName(error);
      return scope;
    });
  }
};