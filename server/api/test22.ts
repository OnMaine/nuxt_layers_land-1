export default defineCachedEventHandler(async event => {
    throw createError({
      status: 444,
      url: 'asdasda',
      statusCode: 444,
      statusMessage: '444 asdasda',
    })
  });