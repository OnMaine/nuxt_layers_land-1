import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import { defineNitroPlugin } from 'nitropack/runtime/plugin';
import { useSentryConfigEvent } from '@/composables/use_sentry';

export default defineNitroPlugin(nitroApp => {
  // TODO: remove after plugin fix https://github.com/getsentry/sentry-javascript/issues/12490
  // @ts-ignore
  globalThis._sentryEsmLoaderHookRegistered = true;
  Sentry.init({
    dsn: 'https://24f226992901ba9d081399c8cd0c9106@o4507786061414400.ingest.de.sentry.io/4507786062987344',
    environment: 'local',
    integrations: [nodeProfilingIntegration()],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
    // ignoreErrors: getFlatSentryExceptionsArr(SENTRY_EXCEPTIONS),
    beforeSend: (event, hint) => useSentryConfigEvent(event, hint, { process: 'server' }),
  });

  nitroApp.hooks.hook('error', error => {
    Sentry.captureException(error);
  });

  nitroApp.hooks.hook('request', event => {
    event.context.$sentry = Sentry;
  });

  nitroApp.hooks.hookOnce('close', async () => {
    await Sentry.close(2000);
  });
});