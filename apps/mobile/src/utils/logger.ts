export const logger = (...message: unknown[]) => {
  const stringified = JSON.stringify(message.join(' '));
  return {
    info: () => {
      console.log('[INFO]', `[${new Date().toISOString()}]`, stringified);
    },
    warn: () => {
      console.log('[WARN]', `[${new Date().toISOString()}]`, stringified);
    },
  };
};
