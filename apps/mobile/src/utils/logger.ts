const prepareMessage = (messages: unknown[]) =>
  messages.map(message => JSON.stringify(message)).join(' ');

export const logger = (source: string) => ({
  info: (...messages: unknown[]) => {
    console.log(
      '[INFO]',
      `[${source}]`,
      `[${new Date().toISOString()}]`,
      prepareMessage(messages),
    );
  },
  warn: (...messages: unknown[]) => {
    console.log(
      '[WARN]',
      `[${source}]`,
      `[${new Date().toISOString()}]`,
      prepareMessage(messages),
    );
  },
});
