import { addBreadcrumb } from './crashlytics';

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
    addBreadcrumb(`[INFO] ${source} ${message}`);
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
    addBreadcrumb(`[WARN] ${source} ${message}`);
  },
});
