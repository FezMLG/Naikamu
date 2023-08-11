export const logger = (...messages: unknown[]) => {
  const stringified = messages
    .map(message => JSON.stringify(message))
    .join(' ');

  return {
    info: () => {
      console.log('[INFO]', `[${new Date().toISOString()}]`, stringified);
    },
    warn: () => {
      console.log('[WARN]', `[${new Date().toISOString()}]`, stringified);
    },
  };
};
