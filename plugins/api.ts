import {
  showError,
} from '#imports';
import { defineNuxtPlugin } from '#app';
import { ofetch } from 'ofetch';
import {
  sentryCatchError
} from '@/utils';
import {
    BAD_GATEWAY_STATUS_CODE,
    BAD_REQUEST_STATUS_CODE,
    FORBIDDEN_STATUS_CODE,
    TOO_MANY_REQUESTS_STATUS_CODE,
    UNPROCESSABLE_STATUS_CODE,
  } from '@/constants';

export default defineNuxtPlugin(nuxtApp => {
  const $i18n: any = nuxtApp.$i18n;

  const sentryResolver = import.meta.server
    ? import('@sentry/node')
    : import('@sentry/vue');

  const apiFetch = ofetch.create({
    async onResponseError({ response, request }) {

      const { status, _data, url } = response;

      console.log(status, 'status');

      switch (status) {
        case 444:
        case FORBIDDEN_STATUS_CODE:
        case UNPROCESSABLE_STATUS_CODE:
        case BAD_REQUEST_STATUS_CODE: {
          const error = typeof _data.error === 'object'
            ? _data.error
            : _data;

            console.log('error', error);
            console.log()

            await sentryCatchError({
              sentryResolver,
              isMessage: false,
              error: {
                message: JSON.stringify(error.message),
                status,
                url,
              },
              request,
            });


          break;
        }
        case TOO_MANY_REQUESTS_STATUS_CODE:
        case BAD_GATEWAY_STATUS_CODE: {

          nuxtApp.runWithContext(() => {
            showError({
              statusCode: status,
              statusMessage: $i18n.t('common.too_many_requests'),
              fatal: true,
            });
          });

          break;
        }
      }
    },
  });

  return {
    provide: {
      api: apiFetch,
    },
  };
});
