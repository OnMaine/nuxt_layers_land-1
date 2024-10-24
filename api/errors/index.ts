import { useNuxtApp } from '#imports';

export const getErrors = () => {
  const { $api } = useNuxtApp();

  return $api('/api/test444');
};
