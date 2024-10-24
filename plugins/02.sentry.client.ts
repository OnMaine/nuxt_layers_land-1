import { useRouter } from 'vue-router';
import { useRuntimeConfig } from '#imports';
import { defineNuxtPlugin } from '#app';
import {
  init,
  browserTracingIntegration,
  replayIntegration,
} from '@sentry/vue';
import { useSentryConfigEvent } from '@/composables';

export default defineNuxtPlugin(nuxtApp => {

  const router = useRouter();
  const { public: { apiBaseUrl } } = useRuntimeConfig();

  init({
    app: nuxtApp.vueApp,
    dsn: 'https://24f226992901ba9d081399c8cd0c9106@o4507786061414400.ingest.de.sentry.io/4507786062987344',
    environment: 'local',
    integrations: [
      browserTracingIntegration({ router }),
      replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    beforeSend: (event, hint) => useSentryConfigEvent(event, hint, { process: 'client' }, nuxtApp),
    tracesSampleRate: 1.0,
    tracePropagationTargets: ['localhost'],
    replaysSessionSampleRate: 1.0,
    replaysOnErrorSampleRate: 1.0,
  });
});