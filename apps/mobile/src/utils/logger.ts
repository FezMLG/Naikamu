export const logger = (source: string) => {
  const prepareMessage = (...messages: unknown[]) => {
    return messages.map(message => JSON.stringify(message)).join(' ');
  };

  return {
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
  };
};
