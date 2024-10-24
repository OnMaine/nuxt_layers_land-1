export default defineCachedEventHandler(async event => {
  throw createError({
    statusCode: 429,
    // statusMessage: 'asdasdasdad',
  })
  // return {text: 'api/test.get.ts from original project'};
});