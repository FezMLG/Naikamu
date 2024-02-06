import * as Sentry from '@sentry/react-native';

const prepareMessage = (messages: unknown[]) =>
  messages.map(message => JSON.stringify(message)).join(' ');

export const logger = (source: string) => ({
  info: (...messages: unknown[]) => {
    const message = prepareMessage(messages);

    console.log(
      '[INFO]',
      `[${source}]`,
      `[${new Date().toISOString()}]`,
      prepareMessage(messages),
    );
    Sentry.addBreadcrumb({
      level: 'info',
      message: `${source} ${message}`,
    });
  },
  warn: (...messages: unknown[]) => {
    const message = prepareMessage(messages);

    console.log(
      '\u001B[43m',
      '\u001B[30m',
      '[WARN]',
      '\u001B[0m',
      `[${source}]`,
      `[${new Date().toISOString()}]`,
      prepareMessage(messages),
    );
    Sentry.addBreadcrumb({
      level: 'warning',
      message: `${source} ${message}`,
    });
  },
});
