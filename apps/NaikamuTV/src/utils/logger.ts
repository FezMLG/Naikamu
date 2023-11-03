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
      '\u001B[43m',
      '\u001B[30m',
      '[WARN]',
      '\u001B[0m',
      `[${source}]`,
      `[${new Date().toISOString()}]`,
      prepareMessage(messages),
    );
  },
});
